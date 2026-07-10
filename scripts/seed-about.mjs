// Seed the About page settings (grp='about') with complete ru/en content.
// Replaces the old key set entirely so the dashboard form shows exactly
// the fields the page uses. Run: node scripts/seed-about.mjs
import Database from "better-sqlite3";

const db = new Database(new URL("../data/protocol.db", import.meta.url).pathname);

const ru = {
  about_hero_eyebrow: "О компании",
  about_hero_title_1: "Новый взгляд",
  about_hero_title_2: "на",
  about_hero_title_em: "привычное путешествие",
  about_hero_lead:
    "Protocol Travel Services — одна из первых компаний в Узбекистане, посвятившая себя исключительно VIP-путешествиям.",
  about_hero_image: "/images/dest-bukhara.jpg",
  about_hero_caption: "Бухара — минарет Калян, XII век",

  about_s1_num: "01 — Кто мы",
  about_s1_title_1: "Молодая компания",
  about_s1_title_2: "со",
  about_s1_title_em: "зрелым опытом",
  about_s1_lead:
    "Мы не несём на себе груз устаревших процессов индустрии. Каждое решение мы принимаем заново — руководствуясь одним вопросом: достаточно ли это хорошо для нашего гостя.",
  about_s1_b1_label: "Позиция",
  about_s1_b1_text:
    "Мы — новая компания, и в этом наша сила: мы свободны смотреть на индустрию въездного туризма по-новому, не повторяя чужих шаблонов.",
  about_s1_b2_label: "Опыт",
  about_s1_b2_text:
    "За нами стоит команда, чей практический опыт в организации путешествий по Шёлковому пути начинается с 2018 года — годы выстраивания отношений с лучшими гидами и экспертами региона.",
  about_s1_b3_label: "Фокус",
  about_s1_b3_text:
    "Ультра-премиальный въездной туроператор. Не массовый турбизнес — частный сервис для тех, кто воспринимает безупречность как стандарт, а не привилегию.",
  about_s1_b4_label: "Подход",
  about_s1_b4_text:
    "Каждый маршрут создаётся вокруг вас: вашего темпа, ваших увлечений, ваших личных встреч с памятниками, что некогда стояли в центре мира.",

  about_s2_num: "02 — Наша история",
  about_s2_title_1: "Опыт начинается",
  about_s2_title_2: "с",
  about_s2_title_em: "2018 года",
  about_s2_year: "2018",
  about_s2_year_label: "Начало пути команды",
  about_s2_p1:
    "Protocol Travel Services как компания — новый игрок на рынке. Но люди, которые её создали, годами работали в индустрии частного въездного туризма задолго до основания бренда. Опыт наших основателей и сотрудников в организации путешествий по Шёлковому пути начинается с 2018 года: это годы личных знакомств с гидами-историками, реставраторами и владельцами лучших отелей региона — связи, которые невозможно купить, только выстроить.",
  about_s2_p2:
    "Мы открыли Protocol, чтобы применить этот опыт без компромиссов массового рынка — без типовых автобусных групп, проходных ресторанов и формальных гидов. Только то, что мы сами хотели бы получить как гости.",

  about_s3_num: "03 — Наши стандарты",
  about_s3_title_1: "Как мы",
  about_s3_title_2: "отбираем",
  about_s3_title_em: "партнёров",
  about_s3_body:
    "Мы лично проверяем каждый отель, каждый автомобиль и каждый ресторан, прежде чем предложить их гостю. Никаких комиссионных соглашений по умолчанию и никаких компромиссов «для группы».",
  about_s3_p1_title: "Отели",
  about_s3_p1_text:
    "Только бутик-резиденции в исторических кварталах и ведущие международные сети — никогда «по умолчанию» или по комиссионной схеме.",
  about_s3_p2_title: "Транспорт",
  about_s3_p2_text:
    "Представительские автомобили и минивэны с опытными водителями. Без переполненных автобусов и многочасовых ожиданий между точками маршрута.",
  about_s3_p3_title: "Рестораны",
  about_s3_p3_text:
    "Места, где готовят аутентичную узбекскую кухню на высоком уровне — отобранные по личному опыту, а не по туристическому потоку.",

  about_s4_num: "04 — Чем мы отличаемся",
  about_s4_title_1: "Не то, к чему",
  about_s4_title_2: "вы",
  about_s4_title_em: "привыкли",
  about_s4_against_label: "Массовый туризм",
  about_s4_c1_against:
    "Группа из 40 человек, фиксированный автобусный маршрут, ресторан «для туристов» с типовым меню на пять языков.",
  about_s4_c1_protocol:
    "Частный автомобиль, маршрут под ваш темп, ужин в месте, которое мы выбрали бы для себя.",
  about_s4_c2_against:
    "Гид с типовым текстом, который читает один и тот же рассказ десятой группе за день.",
  about_s4_c2_protocol:
    "Гид-историк или искусствовед, который годами работает с реставраторами и учёными Шёлкового пути.",
  about_s4_c3_against:
    "Отель, выбранный по самой выгодной комиссии для оператора, а не по качеству сервиса.",
  about_s4_c3_protocol:
    "Отель, который мы лично проверили и в котором готовы остановиться сами.",

  about_team_eyebrow: "Наша команда",
  about_team_heading: "Люди, которые создают ваше путешествие",
  about_team_intro:
    "За каждым маршрутом стоят люди — гиды-историки, координаторы и эксперты, которые знают Шёлковый путь не по книгам, а по годам работы на месте.",

  about_partners_heading: "Мы сотрудничаем",

  about_cta_pre: "«Каждый маршрут создаётся ",
  about_cta_accent: "вокруг вас",
  about_cta_post: " — вашего темпа, ваших увлечений, ваших личных встреч с историей.»",
  about_cta_button: "Связаться с нами",
};

const en = {
  about_hero_eyebrow: "About Us",
  about_hero_title_1: "A new perspective",
  about_hero_title_2: "on",
  about_hero_title_em: "familiar travel",
  about_hero_lead:
    "Protocol Travel Services is one of the first companies in Uzbekistan dedicated exclusively to VIP travel.",
  about_hero_image: "/images/dest-bukhara.jpg",
  about_hero_caption: "Bukhara — Kalon minaret, 12th century",

  about_s1_num: "01 — Who we are",
  about_s1_title_1: "A young company",
  about_s1_title_2: "with",
  about_s1_title_em: "seasoned experience",
  about_s1_lead:
    "We don't carry the weight of the industry's outdated processes. Every decision we make anew — guided by a single question: is this good enough for our guest?",
  about_s1_b1_label: "Position",
  about_s1_b1_text:
    "We are a new company, and therein lies our strength: we are free to look at the inbound tourism industry afresh, without repeating anyone else's templates.",
  about_s1_b2_label: "Experience",
  about_s1_b2_text:
    "Behind us stands a team whose hands-on experience organising Silk Road journeys dates back to 2018 — years of building relationships with the region's finest guides and experts.",
  about_s1_b3_label: "Focus",
  about_s1_b3_text:
    "An ultra-premium inbound tour operator. Not mass tourism — a private service for those who see flawlessness as a standard, not a privilege.",
  about_s1_b4_label: "Approach",
  about_s1_b4_text:
    "Every itinerary is built around you: your pace, your passions, your private encounters with monuments that once stood at the centre of the world.",

  about_s2_num: "02 — Our story",
  about_s2_title_1: "Experience that begins",
  about_s2_title_2: "in",
  about_s2_title_em: "2018",
  about_s2_year: "2018",
  about_s2_year_label: "The team's beginning",
  about_s2_p1:
    "Protocol Travel Services as a company is a new player on the market. But the people who created it worked for years in private inbound tourism long before the brand was founded. Our founders' and staff's experience organising Silk Road journeys dates back to 2018: years of personal acquaintance with historian-guides, restorers and owners of the region's finest hotels — connections that cannot be bought, only built.",
  about_s2_p2:
    "We opened Protocol to apply this experience without the compromises of the mass market — no cookie-cutter bus groups, no tourist-trap restaurants, no formal guides. Only what we would want to receive as guests ourselves.",

  about_s3_num: "03 — Our standards",
  about_s3_title_1: "How we choose",
  about_s3_title_2: "our",
  about_s3_title_em: "partners",
  about_s3_body:
    "We personally inspect every hotel, every car and every restaurant before offering them to a guest. No default commission arrangements and no compromises 'for the group'.",
  about_s3_p1_title: "Hotels",
  about_s3_p1_text:
    "Only boutique residences in historic quarters and leading international chains — never 'by default' or on a commission scheme.",
  about_s3_p2_title: "Transport",
  about_s3_p2_text:
    "Executive cars and minivans with experienced drivers. No overcrowded buses or hours of waiting between stops.",
  about_s3_p3_title: "Restaurants",
  about_s3_p3_text:
    "Places serving authentic Uzbek cuisine at a high level — chosen from personal experience, not by tourist flow.",

  about_s4_num: "04 — What sets us apart",
  about_s4_title_1: "Not what",
  about_s4_title_2: "you're",
  about_s4_title_em: "used to",
  about_s4_against_label: "Mass tourism",
  about_s4_c1_against:
    "A group of 40, a fixed bus route, a 'tourist' restaurant with a template menu in five languages.",
  about_s4_c1_protocol:
    "A private car, a route at your own pace, dinner in a place we would choose for ourselves.",
  about_s4_c2_against:
    "A guide with a template script reading the same story to their tenth group of the day.",
  about_s4_c2_protocol:
    "A historian or art-historian guide who has worked for years with restorers and scholars of the Silk Road.",
  about_s4_c3_against:
    "A hotel chosen for the operator's best commission, not for the quality of service.",
  about_s4_c3_protocol:
    "A hotel we have personally inspected and would happily stay in ourselves.",

  about_team_eyebrow: "Our team",
  about_team_heading: "The people behind your journey",
  about_team_intro:
    "Behind every itinerary stand people — historian-guides, coordinators and experts who know the Silk Road not from books, but from years of work on the ground.",

  about_partners_heading: "We work with",

  about_cta_pre: "“Every itinerary is built ",
  about_cta_accent: "around you",
  about_cta_post: " — your pace, your passions, your private encounters with history.”",
  about_cta_button: "Get in touch",
};

const upsert = db.prepare(
  "INSERT INTO settings (key, lang, value, grp) VALUES (?, ?, ?, 'about') " +
    "ON CONFLICT(key, lang) DO UPDATE SET value = excluded.value, grp = excluded.grp"
);

db.transaction(() => {
  // Drop the old About key set (many were empty and no longer match the page).
  db.prepare("DELETE FROM settings WHERE grp = 'about'").run();
  for (const [key, value] of Object.entries(ru)) upsert.run(key, "ru", value);
  for (const [key, value] of Object.entries(en)) upsert.run(key, "en", value);
  // Remove the broken empty timeline row left over from the old design.
  db.prepare("DELETE FROM timeline WHERE year = '' AND title = ''").run();
})();

const n = db.prepare("SELECT COUNT(*) AS n FROM settings WHERE grp = 'about'").get().n;
console.log(`about settings rows: ${n}`);
