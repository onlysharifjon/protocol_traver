// Editorial "Гид по направлению" (destination guide) content. Rendered by
// app/(site)/destinations/[slug]/page.tsx with the scoped guide.css styles.
//
// String fields ending in titles/era text may contain trusted inline HTML
// (<em>, <br>, <strong>) — they are authored here, not user input.

export type Stat = { val: string; label: string };
export type Era = { period: string; text: string };
export type District = { num: string; name: string; tag: string; desc: string };
export type Card = { icon?: string; name: string; desc: string };
export type Contrast = { accent: "gold" | "dim"; label: string; title: string; desc: string };
export type Food = { name: string; desc: string };
export type ClimateRow = { season: string; temp: string; character: string };

export type Block =
  | { t: "lede"; html: string }
  | { t: "p"; html: string }
  | { t: "quote"; html: string }
  | { t: "eras"; items: Era[] }
  | { t: "stats"; items: Stat[] }
  | { t: "feature"; title: string; desc: string }
  | { t: "districts"; items: District[] }
  | { t: "cards"; items: Card[] }
  | { t: "contrast"; items: Contrast[] }
  | { t: "food"; items: Food[] }
  | { t: "climate"; rows: ClimateRow[] }
  | { t: "tags"; items: string[] };

export type Section = {
  id: string;
  nav: string;
  eyebrow: string;
  title: string;
  blocks: Block[];
};

export type Guide = {
  cover: { eyebrow: string; title: string; subtitle: string; rule: string; stats: Stat[] };
  sections: Section[];
  closing: { title: string; text: string; tagline: string };
};

export type LocalizedGuide = { ru: Guide; en: Guide };

// ---------------------------------------------------------------- БУХАРА / BUKHARA
const bukhara: LocalizedGuide = {
  ru: {
    cover: {
      eyebrow: "Гид по направлению",
      title: "Бухара",
      subtitle:
        "Город, который не нужно реконструировать — он никогда не перестраивался. Единственный исторический центр Узбекистана, сохранившийся практически целиком.",
      rule: "Купол ислама, благородная Бухара",
      stats: [
        { val: "2500+", label: "лет истории" },
        { val: "140+", label: "памятников архитектуры" },
        { val: "ЮНЕСКО", label: "с 1993 года" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "История",
        eyebrow: "Истоки",
        title: "Город, который<br><em>забыли разрушить</em>",
        blocks: [
          { t: "lede", html: "У Бухары есть редкое для Центральной Азии свойство: её исторический центр никогда не перестраивался заново. Не потому, что город избежал бурной истории — просто после каждого потрясения здесь восстанавливали то, что было, а не строили заново на расчищенном месте." },
          { t: "p", html: "Бухаре больше двух с половиной тысяч лет. Город упоминается в зороастрийских текстах и был важным центром Согдианы задолго до прихода ислама. Но подлинное величие пришло позже — в IX–X веках, когда Бухара стала столицей государства Саманидов и одним из главных интеллектуальных центров всего исламского мира." },
          { t: "quote", html: "«В X веке говорили: свет знания исходит из Багдада, но распространяется по миру из Бухары.»" },
          { t: "p", html: "Именно здесь работал Ибн Сина (Авиценна), здесь располагалась одна из крупнейших библиотек средневекового мира, здесь формировалась суфийская традиция, повлиявшая на весь исламский мир. Бухару называли «куполом ислама» — почётный титул, которым не наделяли ни один другой город региона." },
          {
            t: "eras",
            items: [
              { period: "VI–IV вв. до н.э.", text: "Первые упоминания о поселении в составе <strong>Согдианы</strong>, важного региона на пути будущего Шёлкового пути." },
              { period: "VIII в.", text: "Арабское завоевание, начало <strong>исламизации</strong> и постепенная интеграция в исламский культурный мир." },
              { period: "875–999 гг.", text: "Бухара — столица государства <strong>Саманидов</strong>, золотой век науки, литературы и архитектуры." },
              { period: "1220 г.", text: "Разрушение войсками <strong>Чингисхана</strong> — но мавзолей Саманидов чудом пережил нашествие, занесённый песком." },
              { period: "XVI–XVII вв.", text: "Расцвет при <strong>Бухарском ханстве</strong> — строительство большинства памятников, известных сегодня." },
              { period: "1920 г.", text: "Падение <strong>Бухарского эмирата</strong> — последней независимой монархии региона." },
              { period: "1993 г.", text: "Исторический центр включён в список <strong>Всемирного наследия ЮНЕСКО</strong>." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Характер",
        eyebrow: "Атмосфера",
        title: "Город, в который <em>не приходят смотреть</em><br>— в него приходят жить",
        blocks: [
          { t: "p", html: "Если Самарканд работает на масштаб и впечатление, то Бухара устроена ровно наоборот — она интимна. Здесь нет огромных площадей, рассчитанных на тысячи людей: переулки узкие, дворы тихие, а главные памятники соседствуют с обычными жилыми домами, в которых до сих пор живут люди." },
          { t: "p", html: "Это единственный город Узбекистана, где можно физически почувствовать, как выглядела средневековая исламская столица — не отдельные памятники, а весь городской организм целиком: переплетение улиц, внутренние дворики, торговые купола, перетекающие один в другой, мечети на каждом углу." },
          { t: "quote", html: "«В Бухаре легко заблудиться — и это единственный город региона, где это считается комплиментом, а не проблемой.»" },
          { t: "p", html: "Бухара живёт в своём темпе. Закат над площадью Ляби-Хауз, неспешные разговоры в чайхане, торговцы, которые знают историю своей лавки на пять поколений назад — здесь время ощутимо замедляется, и многие путешественники признаются, что именно в Бухаре они наконец перестают спешить." },
          {
            t: "stats",
            items: [
              { val: "~225 м", label: "высота над уровнем моря" },
              { val: "Зарафшан", label: "оазис, питающий город" },
              { val: "«Купол ислама»", label: "историческое прозвище" },
              { val: "X в.", label: "золотой век Саманидов" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Районы",
        eyebrow: "География города",
        title: "Районы и <em>кварталы</em>",
        blocks: [
          { t: "p", html: "Историческая Бухара компактна — большую часть памятников можно обойти пешком за несколько дней. Город удобно делится на зоны вокруг своих главных архитектурных доминант." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Цитадель Арк и окрестности", tag: "Историческая власть", desc: "Древнейшая часть города — крепость, где располагалась резиденция правителей на протяжении полутора тысяч лет. Вокруг — мечеть Боло-Хауз и открытые пространства, использовавшиеся для парадов и казней в разные эпохи." },
              { num: "02", name: "Квартал Пои-Калян", tag: "Религиозный центр", desc: "Ансамбль минарета и мечети Калян вместе с медресе Мир-Араб — духовное сердце города на протяжении почти тысячи лет. Один из самых узнаваемых архитектурных силуэтов Центральной Азии." },
              { num: "03", name: "Торговые купола", tag: "Коммерческое сердце", desc: "Система крытых базаров и куполов — Таки Заргарон, Таки Тильпак Фурушон, Таки Саррофон — исторически разделённых по специализации: ювелиры, шапочники, менялы. Живая торговая традиция, не прерывавшаяся столетиями." },
              { num: "04", name: "Ляби-Хауз", tag: "Общественное пространство", desc: "Площадь вокруг старинного пруда XVII века, окружённая медресе и чайханами — главное место городской жизни, отдыха и вечерних встреч и сегодня, и пятьсот лет назад." },
              { num: "05", name: "Еврейский квартал", tag: "Многонациональное наследие", desc: "Исторический квартал бухарских евреев — одной из старейших еврейских общин мира, жившей здесь более двух тысячелетий. Сохранившиеся синагоги и характерная жилая архитектура." },
            ],
          },
        ],
      },
      {
        id: "crafts",
        nav: "Ремёсла",
        eyebrow: "Наследие",
        title: "Город <em>живых ремёсел</em>",
        blocks: [
          { t: "p", html: "В отличие от многих исторических центров, где ремесленные традиции существуют лишь как музейная реконструкция, в Бухаре прикладное искусство по-прежнему живая, работающая практика — навыки передаются от мастера к ученику, как и века назад." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-cut", name: "Шёлкоткачество и икат", desc: "Техника окрашивания нитей перед тканьём, дающая характерный размытый узор. Бухарские мастерские — одни из немногих, где процесс ведётся полностью вручную от начала до конца." },
              { icon: "ti ti-needle", name: "Сюзане", desc: "Вышитые панно, традиционно входившие в приданое невесты. Каждый региональный стиль узбекистанской вышивки имеет собственный орнаментальный язык, который мастерицы передают устно." },
              { icon: "ti ti-hammer", name: "Чеканка по металлу", desc: "Традиция художественной обработки меди и серебра, восходящая к средневековым гильдиям ремесленников, работавшим в кварталах вокруг торговых куполов." },
              { icon: "ti ti-book", name: "Миниатюра и каллиграфия", desc: "Бухарская школа книжной миниатюры — одна из влиятельных в исламском искусстве, повлиявшая на персидскую и могольскую традиции живописи." },
            ],
          },
          { t: "p", html: "Многие из этих ремёсел можно увидеть не в музейных витринах, а напрямую в мастерских квартала ремесленников — где мастер за работой готов рассказать о технике, унаследованной от своего учителя." },
          { t: "tags", items: ["Икат и абровый шёлк", "Вышивка сюзане", "Чеканка по металлу", "Книжная миниатюра"] },
        ],
      },
      {
        id: "food",
        nav: "Кухня",
        eyebrow: "Гастрономия",
        title: "Кухня <em>оазиса</em>",
        blocks: [
          { t: "p", html: "Бухарская кухня формировалась в условиях оазисного земледелия — обилие свежих овощей, бахчевых культур и трав определило её характер, который заметно отличается от кухни степных регионов страны." },
          {
            t: "food",
            items: [
              { name: "Бухарский плов", desc: "Готовится с изюмом и барбарисом, добавляющими лёгкую кислинку — фирменное отличие от плова других регионов Узбекистана." },
              { name: "Манты с тыквой", desc: "Паровые пельмени с начинкой из тыквы, лука и специй — сезонное блюдо, особенно популярное в осенние месяцы." },
              { name: "Бухарская лепёшка «оби-нон»", desc: "Хлеб особой формы, с глубоким узором по центру — традиционно выпекается на хлопковом масле, что придаёт характерный аромат." },
              { name: "Чайхана у Ляби-Хауза", desc: "Формат отдыха, а не просто еды — зелёный чай, шашлык и неспешные разговоры под старыми карагачами у пруда." },
            ],
          },
          { t: "p", html: "Город славится и бахчевыми культурами — бухарские дыни считаются одними из лучших в Центральной Азии, особенно сорта, созревающие в конце лета." },
        ],
      },
      {
        id: "climate",
        nav: "Климат",
        eyebrow: "Природные условия",
        title: "Климат <em>и сезоны</em>",
        blocks: [
          { t: "p", html: "Бухара расположена в зоне резко континентального климата на границе пустыни Кызылкум — это один из самых сухих и жарких регионов страны, исторически смягчаемый только близостью реки Зарафшан и системой оазисного земледелия." },
          {
            t: "climate",
            rows: [
              { season: "Весна (март–май)", temp: "+13…+27°C", character: "Комфортный сезон, минимум осадков, мягкие вечера" },
              { season: "Лето (июнь–август)", temp: "+32…+42°C", character: "Один из самых жарких регионов страны, прогулки лучше планировать на утро и вечер" },
              { season: "Осень (сентябрь–ноябрь)", temp: "+11…+28°C", character: "Стабильная сухая погода, многие считают этот сезон оптимальным" },
              { season: "Зима (декабрь–февраль)", temp: "−1…+11°C", character: "Мягкая по сравнению с северными регионами, изредка лёгкий снег" },
            ],
          },
          { t: "p", html: "Из-за соседства с пустыней Кызылкум воздух здесь очень сухой в течение всего года — летняя жара переносится иначе, чем во влажном климате, но требует обязательной защиты от солнца в дневные часы." },
        ],
      },
    ],
    closing: {
      title: "Город, в котором<br>хочется задержаться",
      text: "Бухара — направление не для беглого знакомства. Это город, который раскрывается медленно: в переулках без указателей, в разговорах с мастерами, в вечернем свете над Ляби-Хаузом. Многие, кто планировал один день, остаются на три.",
      tagline: "«Шёлковый путь таким, каким он должен быть.»",
    },
  },
  en: {
    cover: {
      eyebrow: "Destination Guide",
      title: "Bukhara",
      subtitle:
        "A city that needs no reconstruction — it was never rebuilt. The only historic centre in Uzbekistan preserved almost in its entirety.",
      rule: "The Dome of Islam, noble Bukhara",
      stats: [
        { val: "2500+", label: "years of history" },
        { val: "140+", label: "architectural monuments" },
        { val: "UNESCO", label: "since 1993" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "History",
        eyebrow: "Origins",
        title: "The city they<br><em>forgot to destroy</em>",
        blocks: [
          { t: "lede", html: "Bukhara has a quality rare for Central Asia: its historic centre was never built anew. Not because the city escaped a turbulent history — simply because after every upheaval people restored what had stood here, rather than building from scratch on cleared ground." },
          { t: "p", html: "Bukhara is more than two and a half thousand years old. The city is mentioned in Zoroastrian texts and was an important centre of Sogdiana long before the arrival of Islam. But its true greatness came later — in the 9th–10th centuries, when Bukhara became the capital of the Samanid state and one of the foremost intellectual centres of the entire Islamic world." },
          { t: "quote", html: "“In the 10th century they said: the light of knowledge rises in Baghdad, but spreads across the world from Bukhara.”" },
          { t: "p", html: "It was here that Ibn Sina (Avicenna) worked, here stood one of the largest libraries of the medieval world, here the Sufi tradition took shape that would influence the whole Islamic world. Bukhara was called the “Dome of Islam” — an honorary title granted to no other city in the region." },
          {
            t: "eras",
            items: [
              { period: "6th–4th c. BC", text: "First references to a settlement within <strong>Sogdiana</strong>, an important region on the path of the future Silk Road." },
              { period: "8th c.", text: "The Arab conquest, the beginning of <strong>Islamisation</strong> and gradual integration into the Islamic cultural world." },
              { period: "875–999", text: "Bukhara is the capital of the <strong>Samanid</strong> state — a golden age of science, literature and architecture." },
              { period: "1220", text: "Destruction by the armies of <strong>Genghis Khan</strong> — yet the Samanid Mausoleum miraculously survived, buried under sand." },
              { period: "16th–17th c.", text: "Flourishing under the <strong>Bukhara Khanate</strong> — the construction of most monuments known today." },
              { period: "1920", text: "The fall of the <strong>Emirate of Bukhara</strong> — the last independent monarchy of the region." },
              { period: "1993", text: "The historic centre is inscribed on the <strong>UNESCO World Heritage</strong> list." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Character",
        eyebrow: "Atmosphere",
        title: "A city you don't <em>come to look at</em><br>— you come to live in it",
        blocks: [
          { t: "p", html: "Where Samarkand works through scale and grandeur, Bukhara is built the opposite way — it is intimate. There are no vast squares meant for thousands: the lanes are narrow, the courtyards quiet, and the great monuments stand side by side with ordinary homes where people still live." },
          { t: "p", html: "It is the only city in Uzbekistan where you can physically feel what a medieval Islamic capital looked like — not isolated monuments, but the whole urban organism intact: the interlacing of streets, inner courtyards, trading domes flowing one into another, mosques at every corner." },
          { t: "quote", html: "“In Bukhara it is easy to get lost — and it is the only city in the region where that counts as a compliment rather than a problem.”" },
          { t: "p", html: "Bukhara lives at its own pace. Sunset over the Lyab-i-Hauz square, unhurried conversations in the teahouse, traders who know the history of their shop five generations back — time slows perceptibly here, and many travellers admit it is in Bukhara that they finally stop rushing." },
          {
            t: "stats",
            items: [
              { val: "~225 m", label: "above sea level" },
              { val: "Zarafshan", label: "the oasis that feeds the city" },
              { val: "“Dome of Islam”", label: "historic epithet" },
              { val: "10th c.", label: "Samanid golden age" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Districts",
        eyebrow: "City geography",
        title: "Districts and <em>quarters</em>",
        blocks: [
          { t: "p", html: "Historic Bukhara is compact — most of its monuments can be covered on foot over a few days. The city divides naturally into zones around its principal architectural landmarks." },
          {
            t: "districts",
            items: [
              { num: "01", name: "The Ark Citadel and surroundings", tag: "Historic power", desc: "The oldest part of the city — the fortress that housed the rulers' residence for a millennium and a half. Around it stand the Bolo-Hauz Mosque and the open spaces used for parades and executions in different eras." },
              { num: "02", name: "The Po-i-Kalyan quarter", tag: "Religious centre", desc: "The ensemble of the Kalyan minaret and mosque together with the Mir-i-Arab madrasah — the spiritual heart of the city for almost a thousand years. One of the most recognisable architectural silhouettes in Central Asia." },
              { num: "03", name: "The trading domes", tag: "Commercial heart", desc: "A system of covered bazaars and domes — Taki Zargaron, Taki Telpak Furushon, Taki Sarrafon — historically divided by trade: jewellers, cap-makers, money-changers. A living commercial tradition unbroken for centuries." },
              { num: "04", name: "Lyab-i-Hauz", tag: "Public space", desc: "The square around a 17th-century pool, ringed by madrasahs and teahouses — the main place of city life, leisure and evening gatherings, today as it was five hundred years ago." },
              { num: "05", name: "The Jewish quarter", tag: "Multi-ethnic heritage", desc: "The historic quarter of the Bukharan Jews — one of the oldest Jewish communities in the world, living here for more than two millennia. Surviving synagogues and a distinctive residential architecture." },
            ],
          },
        ],
      },
      {
        id: "crafts",
        nav: "Crafts",
        eyebrow: "Heritage",
        title: "A city of <em>living crafts</em>",
        blocks: [
          { t: "p", html: "Unlike many historic centres where craft traditions survive only as museum reconstruction, in Bukhara the applied arts remain a living, working practice — skills passed from master to apprentice, just as they were centuries ago." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-cut", name: "Silk weaving and ikat", desc: "The technique of dyeing threads before weaving, producing the characteristic blurred pattern. Bukhara's workshops are among the few where the process is carried out entirely by hand from start to finish." },
              { icon: "ti ti-needle", name: "Suzani", desc: "Embroidered panels traditionally part of a bride's dowry. Each regional style of Uzbek embroidery has its own ornamental language, passed down orally by the embroiderers." },
              { icon: "ti ti-hammer", name: "Metal chasing", desc: "A tradition of artistic work in copper and silver, going back to the medieval craft guilds that worked in the quarters around the trading domes." },
              { icon: "ti ti-book", name: "Miniature and calligraphy", desc: "The Bukhara school of book miniature — one of the most influential in Islamic art, shaping the Persian and Mughal traditions of painting." },
            ],
          },
          { t: "p", html: "Many of these crafts can be seen not in museum cases but directly in the workshops of the artisans' quarter — where a master at work is ready to explain the technique inherited from their own teacher." },
          { t: "tags", items: ["Ikat and abr silk", "Suzani embroidery", "Metal chasing", "Book miniature"] },
        ],
      },
      {
        id: "food",
        nav: "Cuisine",
        eyebrow: "Gastronomy",
        title: "Cuisine of the <em>oasis</em>",
        blocks: [
          { t: "p", html: "Bukharan cuisine took shape in the conditions of oasis agriculture — an abundance of fresh vegetables, melons and herbs defined its character, noticeably different from the cuisine of the country's steppe regions." },
          {
            t: "food",
            items: [
              { name: "Bukharan plov", desc: "Made with raisins and barberries that add a light sourness — the signature difference from the plov of other regions of Uzbekistan." },
              { name: "Pumpkin manti", desc: "Steamed dumplings filled with pumpkin, onion and spices — a seasonal dish especially popular in the autumn months." },
              { name: "Obi-non flatbread", desc: "Bread of a distinctive shape with a deep pattern at its centre — traditionally baked with cottonseed oil, which gives its characteristic aroma." },
              { name: "Teahouse at Lyab-i-Hauz", desc: "A form of leisure rather than just a meal — green tea, kebab and unhurried conversation under the old elms by the pool." },
            ],
          },
          { t: "p", html: "The city is also famous for its melons — Bukharan melons are considered among the best in Central Asia, especially the varieties ripening in late summer." },
        ],
      },
      {
        id: "climate",
        nav: "Climate",
        eyebrow: "Natural conditions",
        title: "Climate <em>and seasons</em>",
        blocks: [
          { t: "p", html: "Bukhara lies in a sharply continental climate zone on the edge of the Kyzylkum Desert — one of the driest and hottest regions of the country, historically tempered only by the nearby Zarafshan River and the oasis irrigation system." },
          {
            t: "climate",
            rows: [
              { season: "Spring (Mar–May)", temp: "+13…+27°C", character: "A comfortable season, minimal rainfall, mild evenings" },
              { season: "Summer (Jun–Aug)", temp: "+32…+42°C", character: "One of the hottest regions of the country; plan walks for morning and evening" },
              { season: "Autumn (Sep–Nov)", temp: "+11…+28°C", character: "Stable dry weather; many consider this the optimal season" },
              { season: "Winter (Dec–Feb)", temp: "−1…+11°C", character: "Mild compared with northern regions, with occasional light snow" },
            ],
          },
          { t: "p", html: "Because of the neighbouring Kyzylkum Desert the air here is very dry all year round — the summer heat is felt differently than in a humid climate, but requires firm sun protection during daytime hours." },
        ],
      },
    ],
    closing: {
      title: "A city where you<br>want to linger",
      text: "Bukhara is not a destination for a fleeting acquaintance. It is a city that unfolds slowly: in lanes without signposts, in conversations with craftsmen, in the evening light over Lyab-i-Hauz. Many who planned one day stay for three.",
      tagline: "“The Silk Road as it was meant to be.”",
    },
  },
};

// All guides keyed by slug. (Samarkand, Khiva, Tashkent added next.)
export const GUIDES: Record<string, LocalizedGuide> = {
  bukhara,
};

// Map a destination display name (RU or EN, from the DB) to a guide slug.
const NAME_TO_SLUG: Record<string, string> = {
  бухара: "bukhara",
  bukhara: "bukhara",
  самарканд: "samarkand",
  samarkand: "samarkand",
  хива: "khiva",
  khiva: "khiva",
  ташкент: "tashkent",
  tashkent: "tashkent",
};

export function slugForName(name: string): string | null {
  const slug = NAME_TO_SLUG[name.trim().toLowerCase()] ?? null;
  // Only link to a guide that actually exists yet; otherwise the caller
  // falls back to the filtered tours list (no broken links).
  return slug && GUIDES[slug] ? slug : null;
}

export function getGuide(slug: string, lang: "ru" | "en"): Guide | null {
  const g = GUIDES[slug];
  return g ? g[lang] : null;
}

export const guideSlugs = Object.keys(GUIDES);
