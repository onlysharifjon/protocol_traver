import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { content, LOCALES, SETTING_KEY_GROUP, type Locale } from "./data";

type ItinTitle = { main: string; accent: string };
type ItinBlock = {
  type: string;
  opt?: boolean;
  sunset?: boolean;
  icon?: string;
  eyebrow?: string;
  title?: string;
  body?: string[];
  quote?: string;
  tags?: string[];
  tip?: string;
  data?: unknown;
};
type ItinDay = {
  num: string;
  label: string;
  title: ItinTitle;
  subtitle: string;
  overview: { program: string; city: string; gold: boolean };
  blocks: ItinBlock[];
};
type ItinSeed = {
  slug: string;
  theme: string;
  cover: {
    eyebrow: string;
    title: ItinTitle;
    subtitle: string;
    rule: string;
    chips: string[];
    tagline: string;
  };
  overview: { eyebrow: string; title: string; meta: string; col3: string };
  days: ItinDay[];
  closing: { title: ItinTitle; text: string; route: string[]; tagline: string };
  footer: string;
};

// --- Connection (singleton across hot reloads) ---
const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "protocol.db");

function createConnection(): Database.Database {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 8000");
  db.pragma("foreign_keys = ON");
  migrateLegacySchema(db);
  initSchema(db);
  migrateDocumentsFile(db);
  seedIfEmpty(db);
  seedNavItems(db);
  rebuildDocuments(db);
  seedItineraries(db);
  seedVipDestinations(db);
  seedVipServices(db);
  seedVipSettings(db);
  seedAboutSettings(db);
  return db;
}

// Add the `file` column to `documents` on pre-existing databases.
function migrateDocumentsFile(db: Database.Database) {
  const hasTable = db
    .prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='documents'")
    .get();
  if (hasTable && !columnExists(db, "documents", "file")) {
    db.exec("ALTER TABLE documents ADD COLUMN file TEXT NOT NULL DEFAULT ''");
  }
}

// Rebuild doc_groups + documents from `content` once, so the real licence /
// registration documents (and their downloadable PDFs) replace the earlier
// placeholder seed even on databases that were already populated. Guarded by a
// version flag so it runs exactly once per version bump.
const DOCS_VERSION = "2";
function rebuildDocuments(db: Database.Database) {
  const tx = db.transaction(() => {
    const flag = db
      .prepare("SELECT value FROM settings WHERE key = '__docs_version' AND lang = 'ru'")
      .get() as { value: string } | undefined;
    if (flag?.value === DOCS_VERSION) return;

    db.exec("DELETE FROM documents");
    db.exec("DELETE FROM doc_groups");

    const groupStmt = db.prepare(
      "INSERT INTO doc_groups (lang, position, title, intro) VALUES (?, ?, ?, ?)"
    );
    const docStmt = db.prepare(
      `INSERT INTO documents
        (lang, group_id, position, type, title, subtitle, issuer, issued, status, status_type, file)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const lang of LOCALES as Locale[]) {
      content[lang].documentGroups.forEach((g, gi) => {
        const info = groupStmt.run(lang, gi, g.title, g.intro);
        const gid = Number(info.lastInsertRowid);
        g.docs.forEach((d, di) =>
          docStmt.run(lang, gid, di, d.type, d.title, d.subtitle, d.issuer, d.issued, d.status, d.statusType, d.file ?? "")
        );
      });
    }

    db.prepare(
      "INSERT INTO settings (key, lang, value, grp) VALUES ('__docs_version', 'ru', ?, 'system') " +
        "ON CONFLICT(key, lang) DO UPDATE SET value = excluded.value"
    ).run(DOCS_VERSION);
  });
  tx.exclusive();
}

// --- Nav items seed (idempotent; runs even on a pre-existing DB) ---
// seedIfEmpty only fills nav_items on a brand-new database, so menu items added
// to `content.nav` in code never reached DBs seeded earlier (e.g. MICE & VIP).
// This adds any code-defined nav entry missing for a locale — matched by href —
// appending it at the end, without touching or removing existing rows so
// admin-customised entries (labels, order, extra links) are preserved.
function seedNavItems(db: Database.Database) {
  const tx = db.transaction(() => {
    const has = db.prepare(
      "SELECT 1 FROM nav_items WHERE lang = ? AND href = ? LIMIT 1"
    );
    const maxPos = db.prepare(
      "SELECT COALESCE(MAX(position), -1) AS m FROM nav_items WHERE lang = ?"
    );
    const ins = db.prepare(
      "INSERT INTO nav_items (lang, position, label, href) VALUES (?, ?, ?, ?)"
    );
    for (const lang of LOCALES as Locale[]) {
      for (const n of content[lang].nav) {
        if (has.get(lang, n.href)) continue;
        const next = (maxPos.get(lang) as { m: number }).m + 1;
        ins.run(lang, next, n.label, n.href);
      }
    }
  });
  tx.exclusive();
}

// --- VIP destinations seed (idempotent) ---
const VIP_DESTINATIONS: {
  eyebrow: string;
  title: string;
  body_ru: string;
  body_en: string;
  image: string;
}[] = [
  {
    eyebrow: "Жемчужина Востока / Pearl of the East",
    title: "Самарканд / Samarkand",
    body_ru:
      "Город, в котором синева небес отражается в куполах тысячелетней империи. Самарканд — сердце Шёлкового пути — предлагает закат над Регистаном в абсолютном уединении, ужин среди мозаик XV века и ночлег в особняке, где история — не экспонат, а живой воздух вокруг вас.",
    body_en:
      "A city where the blue of the heavens mirrors the domes of a millennial empire. Samarkand — the soul of the Silk Road — offers a private sunset over the Registan, dinner among 15th-century mosaics, and nights in a residence where history isn't a museum piece, it's the very air you breathe.",
    image: "/images/dest-samarkand.jpg",
  },
  {
    eyebrow: "Священный город / Sacred City",
    title: "Бухара / Bukhara",
    body_ru:
      "Бухара не меняется — она вечна. Здесь каждая улочка хранит тайну, а воздух пропитан шафраном и молитвой. Эксклюзивный опыт — закрытый доступ в медресе на рассвете, ночь в рияде с личным дворецким и шёлковые ткани прямо с рук мастера, чья семья ткёт уже восемь поколений.",
    body_en:
      "Bukhara doesn't change — it endures. Every alleyway holds a secret; the air is steeped in saffron and prayer. Exclusive access to a madrassa at dawn, a night in a private riad with a personal butler, and silk purchased directly from a master whose family has woven for eight generations.",
    image: "/images/dest-bukhara.jpg",
  },
  {
    eyebrow: "Затерянный оазис / Lost Oasis",
    title: "Хива / Khiva",
    body_ru:
      "Когда стены Ичан-калы закрываются на рассвете только для вас — понимаешь, что попал в другое измерение. Хива — музей под открытым небом, дошедший до нас нетронутым сквозь века. Приватная прогулка по крепостным стенам, ужин на кровле с видом на пустыню Кызылкум и звёздное небо без единого огня вокруг — вот роскошь, которую не купить нигде больше.",
    body_en:
      "When the walls of Ichan-Kala open at dawn for you alone, you understand you've crossed into another dimension. Khiva is an open-air museum delivered intact across the centuries. A private walk along the fortress ramparts, dinner on a rooftop facing the Kyzylkum desert, and a starlit sky with no light for miles — a luxury found nowhere else on earth.",
    image: "/images/dest-khiva.jpg",
  },
  {
    eyebrow: "Столица / Capital",
    title: "Ташкент / Tashkent",
    body_ru:
      "Восток встречается с авангардом. Ташкент — это динамичная столица, где советский модернизм соседствует с древними базарами и ультрасовременными кварталами. Для взыскательного путешественника — закрытые дегустации, апартаменты с видом на ночной город и персональный гид, открывающий ворота туда, куда не ступает случайный турист.",
    body_en:
      "Where East meets the avant-garde. Tashkent is a vibrant capital where Soviet modernism stands alongside ancient bazaars and cutting-edge districts. For the discerning traveller — private tastings, suites overlooking the glittering city skyline, and a personal guide who unlocks doors no casual tourist ever finds.",
    image: "/images/dest-tashkent.jpg",
  },
  {
    eyebrow: "Колыбель ремёсел / Cradle of Crafts",
    title: "Ферганская долина / Fergana Valley",
    body_ru:
      "Там, где горы смыкаются в объятиях, рождается самое сердце Средней Азии. Ферганская долина — это живая легенда шёлка, фарфора и пряностей, где мастера передают секреты из рук в руки уже тысячу лет. Для избранного гостя — частный визит в ателье икат-ткачества, дегустация редких сортов плова прямо у тандыра и рассвет над виноградниками, о котором не пишут в путеводителях.",
    body_en:
      "Cradled between mountain ranges lies the very heart of Central Asia. The Fergana Valley is a living legend of silk, porcelain, and spice, where masters have passed their secrets hand to hand for a thousand years. For the privileged guest — a private visit to an ikat weaving atelier, a tasting of rare plov varieties straight from the tandoor, and a dawn over the vineyards that no guidebook has ever described.",
    image: "/images/dest-fergana.jpg",
  },
];

function seedVipDestinations(db: Database.Database) {
  const tx = db.transaction(() => {
    const n = db.prepare("SELECT COUNT(*) AS n FROM vip_destinations").get() as {
      n: number;
    };
    if (n.n > 0) return;
    const stmt = db.prepare(
      `INSERT INTO vip_destinations (lang, position, eyebrow, title, body_ru, body_en, image)
       VALUES ('ru', @position, @eyebrow, @title, @body_ru, @body_en, @image)`
    );
    VIP_DESTINATIONS.forEach((d, i) => stmt.run({ ...d, position: i }));
  });
  tx.exclusive();
}

// --- VIP service cards seed (idempotent) ---
const VIP_SERVICES: {
  num: string;
  title_ru: string; title_en: string;
  tag_ru: string; tag_en: string;
  body_ru: string; body_en: string;
  details_ru: string; details_en: string;
}[] = [
  {
    num: "01",
    title_ru: "Консьерж-сервис 24/7", title_en: "24/7 Concierge Service",
    tag_ru: "Персональный менеджер", tag_en: "Personal manager",
    body_ru: "За каждым гостем закрепляется персональный менеджер, доступный круглосуточно на протяжении всего путешествия. Любая просьба — от столика в ресторане до решения непредвиденной ситуации — выполняется без лишних звонков и ожидания.",
    body_en: "Every guest is assigned a personal manager, available around the clock throughout the entire journey. Any request — from a restaurant table to resolving the unexpected — is handled without extra calls or waiting.",
    details_ru: "Бронирование столиков и мест в любое время\nПокупка и доставка товаров по запросу\nРешение нештатных ситуаций на месте\nСвязь на родном языке гостя",
    details_en: "Table and venue reservations at any hour\nPurchase and delivery of goods on request\nOn-the-spot handling of unforeseen situations\nCommunication in the guest's native language",
  },
  {
    num: "02",
    title_ru: "VIP-обслуживание в аэропортах", title_en: "Airport VIP Service",
    tag_ru: "Встреча без очередей", tag_en: "Arrival without queues",
    body_ru: "Прибытие и вылет — без очередей, формальностей и ожидания. Гость проходит контроль через залы повышенной комфортности, минуя общий поток, и сразу попадает в подготовленный для него автомобиль.",
    body_en: "Arrival and departure — without queues, formalities or waiting. The guest passes through premium lounges, bypassing the general flow, and steps straight into a car prepared for them.",
    details_ru: "Сопровождение от трапа до автомобиля\nЗалы повышенной комфортности (VIP / CIP)\nУскоренное прохождение паспортного контроля\nПомощь с багажом и таможенными процедурами",
    details_en: "Escort from the aircraft steps to the car\nPremium comfort lounges (VIP / CIP)\nFast-track passport control\nAssistance with luggage and customs procedures",
  },
  {
    num: "03",
    title_ru: "VIP-транспорт", title_en: "VIP Transport",
    tag_ru: "Полный парк под любой формат", tag_en: "A full fleet for any format",
    body_ru: "В нашем распоряжении весь спектр транспорта для частных и групповых поездок: представительские седаны, внедорожники, минивэны и автобусы — для любой численности гостей и любого формата маршрута.",
    body_en: "We have the full range of transport for private and group travel: executive sedans, SUVs, minivans and coaches — for any number of guests and any route format.",
    details_ru: "Представительские седаны\nВнедорожники для дальних переездов\nМинивэны для небольших групп\nАвтобусы для делегаций",
    details_en: "Executive sedans\nSUVs for long-distance transfers\nMinivans for small groups\nCoaches for delegations",
  },
  {
    num: "04",
    title_ru: "Вертолётные экскурсии", title_en: "Helicopter Excursions",
    tag_ru: "Шёлковый путь с высоты", tag_en: "The Silk Road from above",
    body_ru: "Купола Регистана, пустыня Кызылкум и крепостные стены Хивы выглядят иначе с высоты птичьего полёта. Мы организуем вертолётные экскурсии и трансферы между городами маршрута для тех, кто ценит время и впечатления одинаково высоко.",
    body_en: "The domes of Registan, the Kyzylkum desert and the fortress walls of Khiva look different from a bird's-eye view. We arrange helicopter excursions and inter-city transfers for those who value time and impressions equally.",
    details_ru: "Панорамные облёты исторических городов\nМежгородские трансферы по воздуху\nИндивидуальные маршруты облёта\nКоординация с авиационными властями",
    details_en: "Panoramic flights over historic cities\nInter-city transfers by air\nBespoke aerial routes\nCoordination with aviation authorities",
  },
  {
    num: "05",
    title_ru: "Частные самолёты", title_en: "Private Jets",
    tag_ru: "От разрешений до посадки", tag_en: "From permits to landing",
    body_ru: "Мы берём на себя всю организацию рейсов на частных самолётах: получение разрешений на полёт и посадку, координацию с аэропортами Узбекистана и подготовку наземного обслуживания к моменту приземления.",
    body_en: "We take on the entire organisation of private jet flights: obtaining flight and landing permits, coordinating with Uzbekistan's airports and preparing ground handling for the moment of arrival.",
    details_ru: "Получение разрешений на вход в воздушное пространство\nСлоты на посадку и стоянку воздушного судна\nНаземное обслуживание и топливо\nКоординация экипажа и расписания",
    details_en: "Airspace entry permits\nLanding and parking slots\nGround handling and fuel\nCrew and schedule coordination",
  },
  {
    num: "06",
    title_ru: "Программы под запрос", title_en: "Bespoke Programmes",
    tag_ru: "Маршрут вне каталога", tag_en: "Off-catalogue itineraries",
    body_ru: "Когда стандартного маршрута недостаточно, мы организуем то, что в него обычно не входит: встречи с дизайнерами и художниками, визиты в частные мастерские и коллекции, закрытые экспозиции и события, подобранные под интересы конкретного гостя.",
    body_en: "When a standard itinerary isn't enough, we arrange what usually isn't included: meetings with designers and artists, visits to private workshops and collections, closed exhibitions and events curated around a specific guest's interests.",
    details_ru: "Встречи с дизайнерами и художниками\nВизиты в мастерские и частные коллекции\nДоступ к закрытым экспозициям\nИндивидуальные тематические программы",
    details_en: "Meetings with designers and artists\nVisits to workshops and private collections\nAccess to closed exhibitions\nIndividual themed programmes",
  },
];

function seedVipServices(db: Database.Database) {
  const tx = db.transaction(() => {
    const n = db.prepare("SELECT COUNT(*) AS n FROM vip_services").get() as { n: number };
    if (n.n > 0) return;
    const stmt = db.prepare(
      `INSERT INTO vip_services
        (position, num, title_ru, title_en, tag_ru, tag_en, body_ru, body_en, details_ru, details_en)
       VALUES (@position, @num, @title_ru, @title_en, @tag_ru, @tag_en, @body_ru, @body_en, @details_ru, @details_en)`
    );
    VIP_SERVICES.forEach((s, i) => stmt.run({ ...s, position: i }));
  });
  tx.exclusive();
}

// --- VIP Services page text seed (idempotent; adds missing keys only) ---
const VIP_SETTINGS: { key: string; ru: string; en: string }[] = [
  { key: "vip_eyebrow", ru: "Услуги", en: "Services" },
  { key: "vip_title1", ru: "Безупречность,", en: "Seamlessness," },
  { key: "vip_title2", ru: "организованная заранее", en: "arranged in advance" },
  { key: "vip_intro", ru: "Каждая деталь путешествия — от телефонного звонка до взлёта частного самолёта — продумана и подтверждена прежде, чем вы успеете о ней спросить.", en: "Every detail of the journey — from the first phone call to the take-off of a private jet — is thought through and confirmed before you even think to ask." },
  { key: "vip_services_eyebrow", ru: "Что мы предлагаем", en: "What we offer" },
  { key: "vip_services_title1", ru: "Шесть направлений,", en: "Six directions," },
  { key: "vip_services_title2", ru: "один стандарт", en: "one standard" },
  { key: "vip_services_intro", ru: "Мы не продаём отдельные услуги — мы выстраиваем вокруг гостя инфраструктуру, в которой не остаётся нерешённых вопросов.", en: "We don't sell isolated services — we build an infrastructure around the guest in which no question is left unresolved." },
  { key: "vip_quote", ru: "Мы организуем то, что для обычного гостя остаётся за кадром — от разрешения на посадку до встречи с мастером, чьё имя знают немногие.", en: "We arrange what stays off-screen for the ordinary guest — from a landing permit to a meeting with a master whose name few know." },
  { key: "vip_cta_title", ru: "Расскажите нам, что вам нужно — остальное мы возьмём на себя.", en: "Tell us what you need — we'll take care of the rest." },
  { key: "vip_cta_button", ru: "Связаться с нами", en: "Get in touch" },
];

function seedVipSettings(db: Database.Database) {
  const tx = db.transaction(() => {
    const ins = db.prepare(
      "INSERT OR IGNORE INTO settings (key, lang, value, grp) VALUES (?, ?, ?, 'vip')"
    );
    for (const s of VIP_SETTINGS) {
      ins.run(s.key, "ru", s.ru);
      ins.run(s.key, "en", s.en);
    }
  });
  tx.exclusive();
}

// --- About page text seed (idempotent) ---
// The current About page (sections 01–04) is fully described by these keys.
// Repeating blocks use numbered keys; origin text stores paragraphs split by a
// blank line. Old keys from the previous About design are removed so the
// dashboard form shows only fields that map to the live page.
const ABOUT_SETTINGS: { key: string; ru: string; en: string }[] = [
  // Hero
  { key: "about_hero_eyebrow", ru: "О компании", en: "About Us" },
  { key: "about_hero_title1", ru: "Новый взгляд", en: "A new perspective" },
  { key: "about_hero_title2", ru: "на ", en: "on " },
  { key: "about_hero_title_em", ru: "привычное путешествие", en: "familiar travel" },
  { key: "about_hero_lead", ru: "Protocol Travel Services — одна из первых компаний в Узбекистане, посвятившая себя исключительно VIP-путешествиям.", en: "Protocol Travel Services is one of the first companies in Uzbekistan dedicated exclusively to VIP travel." },
  // 01 — Who we are
  { key: "about_s1_num", ru: "01 — Кто мы", en: "01 — Who we are" },
  { key: "about_s1_title1", ru: "Молодая компания", en: "A young company" },
  { key: "about_s1_title2", ru: "со ", en: "with " },
  { key: "about_s1_title_em", ru: "зрелым опытом", en: "seasoned experience" },
  { key: "about_s1_lead", ru: "Мы не несём на себе груз устаревших процессов индустрии. Каждое решение мы принимаем заново — руководствуясь одним вопросом: достаточно ли это хорошо для нашего гостя.", en: "We don't carry the weight of the industry's outdated processes. Every decision we make anew — guided by a single question: is this good enough for our guest?" },
  { key: "about_intro1_label", ru: "Позиция", en: "Position" },
  { key: "about_intro1_text", ru: "Мы — новая компания, и в этом наша сила: мы свободны смотреть на индустрию въездного туризма по-новому, не повторяя чужих шаблонов.", en: "We are a new company, and therein lies our strength: we are free to look at the inbound tourism industry afresh, without repeating anyone else's templates." },
  { key: "about_intro2_label", ru: "Опыт", en: "Experience" },
  { key: "about_intro2_text", ru: "За нами стоит команда, чей практический опыт в организации путешествий по Шёлковому пути начинается с 2018 года — годы выстраивания отношений с лучшими гидами и экспертами региона.", en: "Behind us stands a team whose hands-on experience organising Silk Road journeys dates back to 2018 — years of building relationships with the region's finest guides and experts." },
  { key: "about_intro3_label", ru: "Фокус", en: "Focus" },
  { key: "about_intro3_text", ru: "Ультра-премиальный въездной туроператор. Не массовый турбизнес — частный сервис для тех, кто воспринимает безупречность как стандарт, а не привилегию.", en: "An ultra-premium inbound tour operator. Not mass tourism — a private service for those who see flawlessness as a standard, not a privilege." },
  { key: "about_intro4_label", ru: "Подход", en: "Approach" },
  { key: "about_intro4_text", ru: "Каждый маршрут создаётся вокруг вас: вашего темпа, ваших увлечений, ваших личных встреч с памятниками, что некогда стояли в центре мира.", en: "Every itinerary is built around you: your pace, your passions, your private encounters with monuments that once stood at the centre of the world." },
  // 02 — Our story
  { key: "about_s2_num", ru: "02 — Наша история", en: "02 — Our story" },
  { key: "about_s2_title1", ru: "Опыт начинается", en: "Experience that begins" },
  { key: "about_s2_title2", ru: "с ", en: "in " },
  { key: "about_s2_title_em", ru: "2018 года", en: "2018" },
  { key: "about_origin_year", ru: "2018", en: "2018" },
  { key: "about_origin_label", ru: "Начало пути команды", en: "The team's beginning" },
  { key: "about_origin_text", ru: "Protocol Travel Services как компания — новый игрок на рынке. Но люди, которые её создали, годами работали в индустрии частного въездного туризма задолго до основания бренда. Опыт наших основателей и сотрудников в организации путешествий по Шёлковому пути начинается с 2018 года: это годы личных знакомств с гидами-историками, реставраторами и владельцами лучших отелей региона — связи, которые невозможно купить, только выстроить.\n\nМы открыли Protocol, чтобы применить этот опыт без компромиссов массового рынка — без типовых автобусных групп, проходных ресторанов и формальных гидов. Только то, что мы сами хотели бы получить как гости.", en: "Protocol Travel Services as a company is a new player on the market. But the people who created it worked for years in private inbound tourism long before the brand was founded. Our founders' and staff's experience organising Silk Road journeys dates back to 2018: years of personal acquaintance with historian-guides, restorers and owners of the region's finest hotels — connections that cannot be bought, only built.\n\nWe opened Protocol to apply this experience without the compromises of the mass market — no cookie-cutter bus groups, no tourist-trap restaurants, no formal guides. Only what we would want to receive as guests ourselves." },
  // 03 — Standards
  { key: "about_s3_num", ru: "03 — Наши стандарты", en: "03 — Our standards" },
  { key: "about_s3_title1", ru: "Как мы", en: "How we choose" },
  { key: "about_s3_title2", ru: "отбираем ", en: "our " },
  { key: "about_s3_title_em", ru: "партнёров", en: "partners" },
  { key: "about_s3_body", ru: "Мы лично проверяем каждый отель, каждый автомобиль и каждый ресторан, прежде чем предложить их гостю. Никаких комиссионных соглашений по умолчанию и никаких компромиссов «для группы».", en: "We personally inspect every hotel, every car and every restaurant before offering them to a guest. No default commission arrangements and no compromises 'for the group'." },
  { key: "about_pillar1_title", ru: "Отели", en: "Hotels" },
  { key: "about_pillar1_text", ru: "Только бутик-резиденции в исторических кварталах и ведущие международные сети — никогда «по умолчанию» или по комиссионной схеме.", en: "Only boutique residences in historic quarters and leading international chains — never 'by default' or on a commission scheme." },
  { key: "about_pillar2_title", ru: "Транспорт", en: "Transport" },
  { key: "about_pillar2_text", ru: "Представительские автомобили и минивэны с опытными водителями. Без переполненных автобусов и многочасовых ожиданий между точками маршрута.", en: "Executive cars and minivans with experienced drivers. No overcrowded buses or hours of waiting between stops." },
  { key: "about_pillar3_title", ru: "Рестораны", en: "Restaurants" },
  { key: "about_pillar3_text", ru: "Места, где готовят аутентичную узбекскую кухню на высоком уровне — отобранные по личному опыту, а не по туристическому потоку.", en: "Places serving authentic Uzbek cuisine at a high level — chosen from personal experience, not by tourist flow." },
  // 04 — Difference
  { key: "about_s4_num", ru: "04 — Чем мы отличаемся", en: "04 — What sets us apart" },
  { key: "about_s4_title1", ru: "Не то, к чему", en: "Not what" },
  { key: "about_s4_title2", ru: "вы ", en: "you're " },
  { key: "about_s4_title_em", ru: "привыкли", en: "used to" },
  { key: "about_against_label", ru: "Массовый туризм", en: "Mass tourism" },
  { key: "about_compare1_against", ru: "Группа из 40 человек, фиксированный автобусный маршрут, ресторан «для туристов» с типовым меню на пять языков.", en: "A group of 40, a fixed bus route, a 'tourist' restaurant with a template menu in five languages." },
  { key: "about_compare1_protocol", ru: "Частный автомобиль, маршрут под ваш темп, ужин в месте, которое мы выбрали бы для себя.", en: "A private car, a route at your own pace, dinner in a place we would choose for ourselves." },
  { key: "about_compare2_against", ru: "Гид с типовым текстом, который читает один и тот же рассказ десятой группе за день.", en: "A guide with a template script reading the same story to their tenth group of the day." },
  { key: "about_compare2_protocol", ru: "Гид-историк или искусствовед, который годами работает с реставраторами и учёными Шёлкового пути.", en: "A historian or art-historian guide who has worked for years with restorers and scholars of the Silk Road." },
  { key: "about_compare3_against", ru: "Отель, выбранный по самой выгодной комиссии для оператора, а не по качеству сервиса.", en: "A hotel chosen for the operator's best commission, not for the quality of service." },
  { key: "about_compare3_protocol", ru: "Отель, который мы лично проверили и в котором готовы остановиться сами.", en: "A hotel we have personally inspected and would happily stay in ourselves." },
  // CTA
  { key: "about_cta_pre", ru: "«Каждый маршрут создаётся ", en: "“Every itinerary is built " },
  { key: "about_cta_accent", ru: "вокруг вас", en: "around you" },
  { key: "about_cta_post", ru: " — вашего темпа, ваших увлечений, ваших личных встреч с историей.»", en: " — your pace, your passions, your private encounters with history.”" },
  { key: "about_cta_button", ru: "Связаться с нами", en: "Get in touch" },
];

function seedAboutSettings(db: Database.Database) {
  const tx = db.transaction(() => {
    const keep = ABOUT_SETTINGS.map((s) => s.key);
    // Remove stale keys from the previous About design so the admin form only
    // lists fields that map to the live page (no-op once cleaned).
    const placeholders = keep.map(() => "?").join(", ");
    db.prepare(
      `DELETE FROM settings WHERE grp = 'about' AND key NOT IN (${placeholders})`
    ).run(...keep);
    const ins = db.prepare(
      "INSERT OR IGNORE INTO settings (key, lang, value, grp) VALUES (?, ?, ?, 'about')"
    );
    for (const s of ABOUT_SETTINGS) {
      ins.run(s.key, "ru", s.ru);
      ins.run(s.key, "en", s.en);
    }
  });
  tx.exclusive();
}

// --- Itinerary seed (idempotent; runs even on a pre-existing DB) ---
function seedItineraries(db: Database.Database) {
  const tx = db.transaction(() => {
    const n = db.prepare("SELECT COUNT(*) AS n FROM itineraries").get() as {
      n: number;
    };
    if (n.n > 0) return;

    const seedPath = path.join(process.cwd(), "lib", "itineraries.seed.json");
    if (!fs.existsSync(seedPath)) return;
    const items = JSON.parse(fs.readFileSync(seedPath, "utf8")) as ItinSeed[];

    const itinStmt = db.prepare(
      `INSERT INTO itineraries
        (lang, position, slug, theme, eyebrow, title_main, title_accent, subtitle,
         rule, chips, tagline, duration_label, cities_label, image,
         overview_eyebrow, overview_title, overview_meta, overview_col3,
         closing_title_main, closing_title_accent, closing_text, closing_route,
         closing_tagline, footer)
       VALUES (@lang,@position,@slug,@theme,@eyebrow,@title_main,@title_accent,@subtitle,
         @rule,@chips,@tagline,@duration_label,@cities_label,@image,
         @overview_eyebrow,@overview_title,@overview_meta,@overview_col3,
         @closing_title_main,@closing_title_accent,@closing_text,@closing_route,
         @closing_tagline,@footer)`
    );
    const dayStmt = db.prepare(
      `INSERT INTO itinerary_days
        (lang, itinerary_id, position, num, label, title_main, title_accent,
         subtitle, ov_program, ov_city, ov_gold)
       VALUES (@lang,@itinerary_id,@position,@num,@label,@title_main,@title_accent,
         @subtitle,@ov_program,@ov_city,@ov_gold)`
    );
    const blockStmt = db.prepare(
      `INSERT INTO itinerary_blocks
        (lang, day_id, position, type, opt, sunset, icon, eyebrow, title, body,
         quote, tags, tip, data)
       VALUES (@lang,@day_id,@position,@type,@opt,@sunset,@icon,@eyebrow,@title,@body,
         @quote,@tags,@tip,@data)`
    );

    items.forEach((it, ii) => {
      const info = itinStmt.run({
        lang: "ru",
        position: ii,
        slug: it.slug,
        theme: it.theme || "dark",
        eyebrow: it.cover.eyebrow,
        title_main: it.cover.title.main,
        title_accent: it.cover.title.accent,
        subtitle: it.cover.subtitle,
        rule: it.cover.rule,
        chips: it.cover.chips.join(" · "),
        tagline: it.cover.tagline,
        duration_label: it.cover.chips[0] ?? "",
        cities_label: it.cover.subtitle,
        image: "",
        overview_eyebrow: it.overview.eyebrow,
        overview_title: it.overview.title,
        overview_meta: it.overview.meta,
        overview_col3: it.overview.col3,
        closing_title_main: it.closing.title.main,
        closing_title_accent: it.closing.title.accent,
        closing_text: it.closing.text,
        closing_route: it.closing.route.join(" · "),
        closing_tagline: it.closing.tagline,
        footer: it.footer,
      });
      const itinId = Number(info.lastInsertRowid);

      it.days.forEach((d, di) => {
        const dInfo = dayStmt.run({
          lang: "ru",
          itinerary_id: itinId,
          position: di,
          num: d.num,
          label: d.label,
          title_main: d.title.main,
          title_accent: d.title.accent,
          subtitle: d.subtitle,
          ov_program: d.overview.program,
          ov_city: d.overview.city,
          ov_gold: d.overview.gold ? 1 : 0,
        });
        const dayId = Number(dInfo.lastInsertRowid);

        d.blocks.forEach((b, bi) => {
          blockStmt.run({
            lang: "ru",
            day_id: dayId,
            position: bi,
            type: b.type,
            opt: b.opt ? 1 : 0,
            sunset: b.sunset ? 1 : 0,
            icon: b.icon ?? "",
            eyebrow: b.eyebrow ?? "",
            title: b.title ?? "",
            body: (b.body ?? []).join("\n\n"),
            quote: b.quote ?? "",
            tags: (b.tags ?? []).join(", "),
            tip: b.tip ?? "",
            data: b.data ? JSON.stringify(b.data) : "",
          });
        });
      });
    });
  });
  tx.exclusive();
}

// Every content table created by initSchema. Kept here so the legacy migration
// can rebuild them.
const CONTENT_TABLES = [
  "settings", "nav_items", "featured_tours", "tours", "destinations",
  "home_features", "home_stats", "timeline", "team", "partners",
  "doc_groups", "documents", "footer_columns", "footer_links",
];

function columnExists(db: Database.Database, table: string, col: string) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  return cols.some((c) => c.name === col);
}

// --- Legacy migration ---
// The pre-i18n schema had no `lang` column. CREATE TABLE IF NOT EXISTS never
// alters an existing table, so an old DB would throw "no such column: lang" on
// every query. Since all content is reseeded from code, we detect the old
// schema (settings table without a `lang` column), snapshot the file, and drop
// the stale tables so initSchema + seedIfEmpty can rebuild them for both langs.
function migrateLegacySchema(db: Database.Database) {
  const hasSettings = db
    .prepare("SELECT 1 FROM sqlite_master WHERE type='table' AND name='settings'")
    .get();
  if (!hasSettings) return; // fresh DB — nothing to migrate
  if (columnExists(db, "settings", "lang")) return; // already current schema

  console.warn("[db] legacy pre-i18n schema detected — rebuilding tables");
  db.pragma("wal_checkpoint(TRUNCATE)");
  try {
    fs.copyFileSync(DB_PATH, `${DB_PATH}.legacy-${Date.now()}.bak`);
  } catch (err) {
    console.warn("[db] could not back up legacy DB:", err);
  }

  db.pragma("foreign_keys = OFF");
  db.transaction(() => {
    for (const t of CONTENT_TABLES) db.exec(`DROP TABLE IF EXISTS ${t}`);
  })();
  db.pragma("foreign_keys = ON");
}

// --- Schema ---
// Every content table carries a `lang` column ('ru' | 'en'). Settings are keyed
// by (key, lang) so the same wording exists once per language.
function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'ru',
      value TEXT NOT NULL,
      grp TEXT NOT NULL DEFAULT 'general',
      PRIMARY KEY (key, lang)
    );
    CREATE TABLE IF NOT EXISTS nav_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      href TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS featured_tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      idx TEXT NOT NULL,
      tagline TEXT NOT NULL,
      title TEXT NOT NULL,
      duration TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      category TEXT NOT NULL,
      place TEXT NOT NULL,
      duration TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL,
      blurb TEXT NOT NULL,
      tours_label TEXT NOT NULL,
      image TEXT NOT NULL,
      aspect TEXT NOT NULL DEFAULT 'medium'
    );
    CREATE TABLE IF NOT EXISTS home_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS home_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      value TEXT NOT NULL,
      suffix TEXT NOT NULL DEFAULT '',
      label TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS timeline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      year TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS team (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      role TEXT NOT NULL,
      name TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS doc_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL,
      intro TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      group_id INTEGER NOT NULL REFERENCES doc_groups(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      issuer TEXT NOT NULL,
      issued TEXT NOT NULL,
      status TEXT NOT NULL,
      status_type TEXT NOT NULL DEFAULT 'valid',
      file TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS footer_columns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      title TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS footer_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      column_id INTEGER NOT NULL REFERENCES footer_columns(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      label TEXT NOT NULL,
      href TEXT NOT NULL DEFAULT '#'
    );
    -- Customer tour bookings. Not content (never seeded / never language-scoped);
    -- written by the public site, read in the /admin page.
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      tour_id INTEGER,
      tour_title TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new'
    );
    -- Detailed day-by-day tour programmes (itineraries):
    -- itineraries -> itinerary_days -> itinerary_blocks.
    CREATE TABLE IF NOT EXISTS itineraries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      slug TEXT NOT NULL,
      theme TEXT NOT NULL DEFAULT 'dark',
      eyebrow TEXT NOT NULL DEFAULT '',
      title_main TEXT NOT NULL DEFAULT '',
      title_accent TEXT NOT NULL DEFAULT '',
      subtitle TEXT NOT NULL DEFAULT '',
      rule TEXT NOT NULL DEFAULT '',
      chips TEXT NOT NULL DEFAULT '',
      tagline TEXT NOT NULL DEFAULT '',
      duration_label TEXT NOT NULL DEFAULT '',
      cities_label TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      overview_eyebrow TEXT NOT NULL DEFAULT '',
      overview_title TEXT NOT NULL DEFAULT '',
      overview_meta TEXT NOT NULL DEFAULT '',
      overview_col3 TEXT NOT NULL DEFAULT '',
      closing_title_main TEXT NOT NULL DEFAULT '',
      closing_title_accent TEXT NOT NULL DEFAULT '',
      closing_text TEXT NOT NULL DEFAULT '',
      closing_route TEXT NOT NULL DEFAULT '',
      closing_tagline TEXT NOT NULL DEFAULT '',
      footer TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS itinerary_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      itinerary_id INTEGER NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      num TEXT NOT NULL DEFAULT '',
      label TEXT NOT NULL DEFAULT '',
      title_main TEXT NOT NULL DEFAULT '',
      title_accent TEXT NOT NULL DEFAULT '',
      subtitle TEXT NOT NULL DEFAULT '',
      ov_program TEXT NOT NULL DEFAULT '',
      ov_city TEXT NOT NULL DEFAULT '',
      ov_gold INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS itinerary_blocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      day_id INTEGER NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
      position INTEGER NOT NULL DEFAULT 0,
      type TEXT NOT NULL DEFAULT 'text',
      opt INTEGER NOT NULL DEFAULT 0,
      sunset INTEGER NOT NULL DEFAULT 0,
      icon TEXT NOT NULL DEFAULT '',
      eyebrow TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      quote TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '',
      tip TEXT NOT NULL DEFAULT '',
      data TEXT NOT NULL DEFAULT ''
    );
    -- VIP exclusive destinations (shown bilingually on the VIP page).
    CREATE TABLE IF NOT EXISTS vip_destinations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL DEFAULT 'ru',
      position INTEGER NOT NULL DEFAULT 0,
      eyebrow TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL DEFAULT '',
      body_ru TEXT NOT NULL DEFAULT '',
      body_en TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT ''
    );
    -- VIP service cards (numbered blocks on the VIP Services page).
    -- Bilingual columns in a single row; details are newline-separated.
    CREATE TABLE IF NOT EXISTS vip_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position INTEGER NOT NULL DEFAULT 0,
      num TEXT NOT NULL DEFAULT '',
      title_ru TEXT NOT NULL DEFAULT '',
      title_en TEXT NOT NULL DEFAULT '',
      tag_ru TEXT NOT NULL DEFAULT '',
      tag_en TEXT NOT NULL DEFAULT '',
      body_ru TEXT NOT NULL DEFAULT '',
      body_en TEXT NOT NULL DEFAULT '',
      details_ru TEXT NOT NULL DEFAULT '',
      details_en TEXT NOT NULL DEFAULT ''
    );
  `);
}

// --- Seed (only when DB is fresh) ---
function seedIfEmpty(db: Database.Database) {
  const tx = db.transaction(() => {
    // Re-check inside the exclusive lock so concurrent processes (e.g. Next.js
    // build workers) don't seed twice.
    const count = db.prepare("SELECT COUNT(*) AS n FROM settings").get() as {
      n: number;
    };
    if (count.n > 0) return;

    const setStmt = db.prepare(
      "INSERT INTO settings (key, lang, value, grp) VALUES (?, ?, ?, ?)"
    );

    const ins = (table: string, cols: string[]) =>
      db.prepare(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${cols
          .map(() => "?")
          .join(", ")})`
      );

    const navStmt = ins("nav_items", ["lang", "position", "label", "href"]);
    const ftStmt = ins("featured_tours", [
      "lang", "position", "idx", "tagline", "title", "duration", "price", "image",
    ]);
    const tourStmt = ins("tours", [
      "lang", "position", "category", "place", "duration", "title", "body", "price", "image",
    ]);
    const destStmt = ins("destinations", [
      "lang", "position", "name", "blurb", "tours_label", "image", "aspect",
    ]);
    const featStmt = ins("home_features", ["lang", "position", "title", "body"]);
    const statStmt = ins("home_stats", ["lang", "position", "value", "suffix", "label"]);
    const tlStmt = ins("timeline", ["lang", "position", "year", "title", "body"]);
    const teamStmt = ins("team", ["lang", "position", "role", "name", "bio", "image"]);
    const partStmt = ins("partners", ["lang", "position", "name"]);
    const groupStmt = ins("doc_groups", ["lang", "position", "title", "intro"]);
    const docStmt = ins("documents", [
      "lang", "group_id", "position", "type", "title", "subtitle", "issuer", "issued", "status", "status_type", "file",
    ]);
    const colStmt = ins("footer_columns", ["lang", "position", "title"]);
    const linkStmt = ins("footer_links", ["lang", "column_id", "position", "label", "href"]);

    for (const lang of LOCALES as Locale[]) {
      const c = content[lang];

      for (const [key, grp] of SETTING_KEY_GROUP) {
        setStmt.run(key, lang, c.text[key] ?? "", grp);
      }

      c.nav.forEach((n, i) => navStmt.run(lang, i, n.label, n.href));
      c.featuredTours.forEach((t, i) =>
        ftStmt.run(lang, i, t.index, t.tagline, t.title, t.duration, t.price, t.image)
      );
      c.tours.forEach((t, i) =>
        tourStmt.run(lang, i, t.category, t.place, t.duration, t.title, t.body, t.price, t.image)
      );
      c.destinations.forEach((d, i) =>
        destStmt.run(lang, i, d.name, d.blurb, d.tours, d.image, d.span)
      );
      c.homeFeatures.forEach((f, i) => featStmt.run(lang, i, f.title, f.body));
      c.homeStats.forEach((s, i) => statStmt.run(lang, i, s.value, s.suffix, s.label));
      c.timeline.forEach((t, i) => tlStmt.run(lang, i, t.year, t.title, t.body));
      c.team.forEach((m, i) => teamStmt.run(lang, i, m.role, m.name, m.bio, m.image));
      c.partners.forEach((p, i) => partStmt.run(lang, i, p));

      c.documentGroups.forEach((g, gi) => {
        const info = groupStmt.run(lang, gi, g.title, g.intro);
        const gid = Number(info.lastInsertRowid);
        g.docs.forEach((d, di) =>
          docStmt.run(lang, gid, di, d.type, d.title, d.subtitle, d.issuer, d.issued, d.status, d.statusType, d.file ?? "")
        );
      });

      c.footerColumns.forEach((col, ci) => {
        const info = colStmt.run(lang, ci, col.title);
        const cid = Number(info.lastInsertRowid);
        col.links.forEach((l, li) => linkStmt.run(lang, cid, li, l, "#"));
      });
    }
  });

  tx.exclusive();
}

// --- Connection export (after all definitions to avoid TDZ during seeding) ---
const globalForDb = globalThis as unknown as { __db?: Database.Database };
export const db: Database.Database = globalForDb.__db ?? createConnection();
if (process.env.NODE_ENV !== "production") globalForDb.__db = db;
