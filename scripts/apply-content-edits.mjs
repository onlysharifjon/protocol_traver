// One-off content edits applied directly to the live SQLite DB.
// Mirrors the corresponding changes made to lib/data.ts (the seed source).
// Run: node scripts/apply-content-edits.mjs
import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "data", "protocol.db"));
db.pragma("journal_mode = WAL");

const setHome = db.prepare(
  "UPDATE settings SET value = ? WHERE grp = 'home' AND lang = ? AND key = ?"
);

// ---- Item 1a: Home "About Protocol" copy (RU + EN) ----
const about = {
  ru: {
    home_about_heading:
      "Protocol Travel Services — одна из первых компаний в Узбекистане, посвятившая себя исключительно VIP-путешествиям.",
    home_about_p1:
      "Мы — новая компания, и в этом наша сила: мы свободны смотреть на индустрию въездного туризма по-новому, без груза устаревших шаблонов. При этом за нами стоит команда, чей практический опыт в организации путешествий по Шёлковому пути начинается с 2018 года — годы выстраивания отношений с лучшими гидами, людьми, которые открывают двери, закрытые для обычных гостей.",
    home_about_p2:
      "Каждый маршрут создаётся вокруг вас: вашего темпа, ваших увлечений, ваших личных встреч с памятниками, что некогда стояли в центре мира.",
  },
  en: {
    home_about_heading:
      "Protocol Travel Services is one of the first companies in Uzbekistan devoted exclusively to VIP travel.",
    home_about_p1:
      "We are a new company — and therein lies our strength: we are free to look at inbound tourism anew, unburdened by outdated conventions. Behind us stands a team whose hands-on experience in crafting journeys along the Silk Road dates back to 2018 — years of building relationships with the finest guides, people who open doors that remain closed to ordinary visitors.",
    home_about_p2:
      "Every itinerary is designed around you: your pace, your passions, your private moments with monuments that once stood at the centre of the world.",
  },
};
for (const lang of ["ru", "en"]) {
  for (const [key, value] of Object.entries(about[lang])) setHome.run(value, lang, key);
}

// ---- Item 8: hero eyebrow — drop "Since 2008" (conflicts with "new company") ----
setHome.run("Узбекистан · VIP-путешествия · Частные туры", "ru", "home_hero_eyebrow");
setHome.run("Uzbekistan · VIP Journeys · Private Tours", "en", "home_hero_eyebrow");

// ---- Item 1c: anonymise testimonial (drop name + place) ----
for (const lang of ["ru", "en"]) {
  setHome.run("", lang, "testimonial_name");
  setHome.run("", lang, "testimonial_place");
}

// ---- Item 1b: remove home stats block entirely ----
const stats = db.prepare("DELETE FROM home_stats").run();

// ---- Item 6: delete all sample documents (real ones uploaded later) ----
const docs = db.prepare("DELETE FROM documents").run();

// ---- Item 8/Footer: trim Company links + remove Resources column ----
db.prepare(
  `DELETE FROM footer_links WHERE label IN ('Наши гиды','Пресса','Устойчивое развитие','Our Guides','Press','Sustainability')`
).run();
db.prepare(
  `DELETE FROM footer_links WHERE column_id IN (SELECT id FROM footer_columns WHERE title IN ('Ресурсы','Resources'))`
).run();
db.prepare(`DELETE FROM footer_columns WHERE title IN ('Ресурсы','Resources')`).run();

// ---- Item 4: fuller destination descriptions (RU + EN) ----
const destBlurbs = {
  ru: {
    "Самарканд":
      "Сердце империи Тимура и перекрёсток Шёлкового пути. Сверкающие изразцы Регистана, обсерватория Улугбека и некрополь Шахи-Зинда — город, где бирюзовые купола веками заставляли путешественников замирать. Мы открываем его после закрытия, в сопровождении учёных, читающих надписи в оригинале.",
    "Бухара":
      "Священная Бухара — две тысячи лет непрерывной жизни в лабиринте медресе, торговых куполов и караван-сараев. Минарет Калян, что пощадил даже Чингисхан, и тихие дворики, где ремёсла передаются из поколения в поколение. Живой средневековый город, который дышит до сих пор.",
    "Хива":
      "Ичан-Кала — самый цельный укреплённый город Центральной Азии, заключённый в глинобитные стены. Минареты, медресе и дворцы хивинских ханов стоят нетронутыми. Когда дневные толпы расходятся, а стены загораются янтарём заката, древняя столица принадлежит только вам.",
    "Ташкент":
      "Столица, где советские проспекты встречаются с древним базаром Чорсу, а музеи мирового уровня — с тихими чайханами. Ворота в Узбекистан и город контрастов, вмещающий три столетия в один день — от тимуридских реликвий до современных галерей и кухни, ради которой стоит приехать.",
    "Ферганская долина":
      "Зелёное сердце Узбекистана и колыбель шёлка. Маргилан с его живым ремеслом икат, риштанская керамика цвета неба и сады, что тянутся до самых гор. Здесь традиции остаются повседневностью, а мастерские открывают двери тем, кого приводит Protocol.",
    "Нурата":
      "На краю пустыни Кызылкум — крепость, заложенная, по преданию, ещё Александром Македонским, и священный источник с рыбами. Отсюда рукой подать до юртовых лагерей у озера Айдаркуль, где небо так чисто, что Млечный Путь отбрасывает тени.",
  },
  en: {
    "Samarkand":
      "The heart of Timur's empire and the crossroads of the Silk Road. The glittering tilework of the Registan, Ulugh Beg's observatory, and the Shah-i-Zinda necropolis — a city whose turquoise domes have stopped travellers in their tracks for centuries. We open it after hours, alongside scholars who read its inscriptions in the original.",
    "Bukhara":
      "Sacred Bukhara — two thousand years of unbroken life within a maze of madrasas, trading domes, and caravanserais. The Kalyan minaret that even Genghis Khan spared, and quiet courtyards where crafts pass from one generation to the next. A living medieval city that still breathes.",
    "Khiva":
      "Ichan Kala is Central Asia's most complete walled city, sealed within mud-brick ramparts. The minarets, madrasas, and palaces of the Khivan khans stand untouched. When the daytime crowds disperse and the walls glow amber at dusk, the ancient capital belongs to you alone.",
    "Tashkent":
      "A capital where Soviet boulevards meet the ancient Chorsu bazaar, and world-class museums sit beside quiet teahouses. The gateway to Uzbekistan and a city of contrasts that wears three centuries in a single day — from Timurid relics to contemporary galleries and a cuisine worth the journey.",
    "Fergana Valley":
      "The green heart of Uzbekistan and the cradle of silk. Margilan with its living ikat craft, Rishton ceramics the colour of sky, and orchards that run to the mountains. Here tradition remains everyday life, and workshops open their doors to those Protocol brings.",
    "Nurata":
      "At the edge of the Kyzylkum desert stands a fortress said to be founded by Alexander the Great, and a sacred spring of fish. From here it is a short reach to the yurt camps by Lake Aydarkul, where the sky is so clear the Milky Way casts shadows.",
  },
};
const setBlurb = db.prepare(
  "UPDATE destinations SET blurb = ? WHERE lang = ? AND name = ?"
);
for (const lang of ["ru", "en"]) {
  for (const [name, blurb] of Object.entries(destBlurbs[lang])) {
    const r = setBlurb.run(blurb, lang, name);
    if (r.changes !== 1) console.warn(`! destination not matched: ${lang}/${name}`);
  }
}

console.log(
  `Done. home_stats deleted: ${stats.changes}, documents deleted: ${docs.changes}.`
);
console.log("Remaining footer columns:");
for (const c of db.prepare("SELECT lang,title FROM footer_columns ORDER BY lang,position").all())
  console.log(`  ${c.lang}: ${c.title}`);
db.close();
