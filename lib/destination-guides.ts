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

// ---------------------------------------------------------------- САМАРКАНД / SAMARKAND
const samarkand: LocalizedGuide = {
  ru: {
    cover: {
      eyebrow: "Гид по направлению",
      title: "Самарканд",
      subtitle:
        "Город, который Тамерлан строил как столицу мира. Регистан, бирюзовые купола и две тысячи семьсот лет истории на перекрёстке всех дорог Азии.",
      rule: "Перекрёсток культур, зеркало мира",
      stats: [
        { val: "2750+", label: "лет истории" },
        { val: "Регистан", label: "главная площадь Востока" },
        { val: "ЮНЕСКО", label: "с 2001 года" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "История",
        eyebrow: "Истоки",
        title: "Столица,<br><em>задуманная как центр мира</em>",
        blocks: [
          { t: "lede", html: "Самарканд — ровесник Рима и Вавилона. Город пережил Александра Македонского, арабское завоевание и нашествие Чингисхана — и каждый раз возрождался. Но своим сегодняшним обликом он обязан одному человеку: Тимуру, который в конце XIV века сделал Самарканд столицей империи от Инда до Босфора." },
          { t: "p", html: "Тимур свозил сюда лучших мастеров из всех завоёванных земель — персидских архитекторов, индийских камнерезов, сирийских мозаичистов. Замысел был прямым и амбициозным: Самарканд должен был затмить все города мира. Так появились гигантские порталы, бирюзовые купола и масштаб, который и сегодня ошеломляет." },
          { t: "quote", html: "«Если хочешь знать о нас — посмотри на наши здания», — надпись, приписываемая Тимуру." },
          { t: "p", html: "Внук Тимура Улугбек превратил столицу завоевателя в столицу науки: его обсерватория была самой совершенной в мире XV века, а составленный в ней звёздный каталог использовался европейскими астрономами ещё двести лет спустя." },
          {
            t: "eras",
            items: [
              { period: "VIII в. до н.э.", text: "Основание городища <strong>Афросиаб</strong> — древнейшего ядра Самарканда, столицы Согдианы." },
              { period: "329 г. до н.э.", text: "Город берёт <strong>Александр Македонский</strong>. «Всё, что я слышал о Мараканде — правда. Кроме того, что она прекраснее, чем я мог вообразить.»" },
              { period: "VIII в.", text: "Арабское завоевание; через Самарканд в исламский мир приходит <strong>секрет производства бумаги</strong>, захваченный у китайских мастеров." },
              { period: "1220 г.", text: "Разрушение города войсками <strong>Чингисхана</strong> — Афросиаб опустошён и больше не заселялся." },
              { period: "1370 г.", text: "<strong>Тимур</strong> делает Самарканд столицей империи — начало самой масштабной стройки в истории Центральной Азии." },
              { period: "1420-е гг.", text: "Обсерватория <strong>Улугбека</strong> — точнейшие астрономические измерения своей эпохи." },
              { period: "2001 г.", text: "Самарканд внесён в список ЮНЕСКО как <strong>«перекрёсток культур»</strong>." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Характер",
        eyebrow: "Атмосфера",
        title: "Город, построенный<br><em>на впечатление</em>",
        blocks: [
          { t: "p", html: "Самарканд работает на масштаб. Если Бухара — город интимных переулков, то Самарканд — город грандиозных ансамблей: огромные площади, порталы высотой с десятиэтажный дом, купола, видимые за километры. Он был задуман, чтобы поражать послов и путешественников — и делает это по сей день." },
          { t: "p", html: "При этом Самарканд — живой современный город, второй по величине в стране. Между великими памятниками — университеты, виноградники, сады и махалли, где жизнь течёт своим чередом. Контраст парадного и повседневного — часть его обаяния." },
          { t: "quote", html: "«Всё, что я слышал о красоте Самарканда — правда. Кроме одного: он оказался прекраснее, чем я мог представить.» — Александр Македонский" },
          { t: "p", html: "Лучшее время у Регистана — рассвет и поздний вечер, когда площадь пустеет и подсветка гаснет. Именно тогда становится понятен замысел строителей: человек должен чувствовать себя маленьким перед этими порталами — и одновременно причастным к чему-то великому." },
          {
            t: "stats",
            items: [
              { val: "~720 м", label: "высота над уровнем моря" },
              { val: "2-й", label: "по величине город страны" },
              { val: "Зарафшан", label: "долина, кормящая город" },
              { val: "XV в.", label: "золотой век Улугбека" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Районы",
        eyebrow: "География города",
        title: "Районы и <em>ансамбли</em>",
        blocks: [
          { t: "p", html: "Главные памятники Самарканда расположены цепочкой вдоль древней оси города — от Регистана через Биби-Ханым к Афросиабу. Между ними — старые махалли и оживлённые базары." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Площадь Регистан", tag: "Сердце города", desc: "Три медресе — Улугбека, Шердор и Тилля-Кари — образуют самую знаменитую площадь Центральной Азии. Полтысячелетия здесь оглашали указы, торговали и учили астрономии." },
              { num: "02", name: "Шахи-Зинда", tag: "Некрополь", desc: "Улица-кладбище из полутора десятков мавзолеев XI–XV веков — самое насыщенное собрание изразцовой мозаики в регионе. Место паломничества и самой тонкой архитектурной работы города." },
              { num: "03", name: "Гур-Эмир", tag: "Усыпальница Тимура", desc: "Мавзолей с ребристым бирюзовым куполом, где похоронен Тимур и его внук Улугбек. Прототип Тадж-Махала — империя Великих Моголов выросла из этой архитектурной школы." },
              { num: "04", name: "Биби-Ханым и Сиабский базар", tag: "Торговая ось", desc: "Гигантская соборная мечеть, построенная после индийского похода Тимура, и главный базар города у её стен — самое оживлённое место старого Самарканда." },
              { num: "05", name: "Афросиаб", tag: "Древнее городище", desc: "Холмы на северо-востоке — всё, что осталось от домонгольского Самарканда. Музей на городище хранит согдийские фрески VII века — редчайший памятник доисламской живописи." },
              { num: "06", name: "Конигил", tag: "Ремесленная окраина", desc: "Деревня у реки Сиаб, где по средневековой технологии возродили производство знаменитой самаркандской бумаги из коры тутовника." },
            ],
          },
        ],
      },
      {
        id: "crafts",
        nav: "Ремёсла",
        eyebrow: "Наследие",
        title: "Наследие <em>мастеров Тимура</em>",
        blocks: [
          { t: "p", html: "Мастера, свезённые Тимуром со всей Азии, оставили городу не только памятники, но и школы ремёсел, живущие до сих пор — от бумаги ручного литья до глазурованной керамики цвета самаркандского неба." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-file", name: "Самаркандская бумага", desc: "В VIII веке именно через Самарканд бумага пришла из Китая в исламский мир, а затем в Европу. В Конигиле её вновь делают вручную из коры тутовника — шелковистую, кремовую, практически вечную." },
              { icon: "ti ti-brush", name: "Керамика и изразец", desc: "Школа глазурованной керамики, создавшая бирюзовые купола города. Современные мастерские продолжают традицию — от архитектурного изразца до столовой посуды." },
              { icon: "ti ti-needle", name: "Золотное шитьё", desc: "Вышивка золотой и серебряной нитью по бархату — придворное ремесло самаркандских и бухарских дворцов, сегодня — парадные халаты и тюбетейки." },
              { icon: "ti ti-star", name: "Астрономическое наследие", desc: "Обсерватория Улугбека с гигантским секстантом, вырубленным в скале — памятник эпохе, когда Самарканд был научной столицей мира." },
            ],
          },
          { t: "tags", items: ["Бумага ручного литья", "Глазурованный изразец", "Золотное шитьё", "Согдийские фрески"] },
        ],
      },
      {
        id: "food",
        nav: "Кухня",
        eyebrow: "Гастрономия",
        title: "Кухня <em>долины Зарафшана</em>",
        blocks: [
          { t: "p", html: "Самаркандская кухня — кухня щедрой долины: виноградники, сады, бахчи и старейшие винодельческие традиции региона. Здесь всё готовится основательно и подаётся широко." },
          {
            t: "food",
            items: [
              { name: "Самаркандский плов", desc: "Готовится слоями и не перемешивается при подаче — рис, морковь и мясо лежат отдельно. Считается одним из двух великих канонов узбекского плова наряду с ташкентским." },
              { name: "Самаркандская лепёшка", desc: "Плотный, тяжёлый нон, который, по легенде, невозможно испечь нигде, кроме Самарканда — эмиры пробовали увозить пекарей, тесто и даже воду, но хлеб получался другим." },
              { name: "Халва и наботы", desc: "Город славится восточными сладостями — от тающей кунжутной халвы до кристаллического сахара навот, который подают к чаю." },
              { name: "Сиабский базар", desc: "Главный рынок города у мечети Биби-Ханым: горы сухофруктов, специи, гранаты и те самые лепёшки из тандыра — обязательная остановка любого маршрута." },
            ],
          },
          { t: "p", html: "Долина Зарафшана — древнейший винодельческий район Центральной Азии: местные виноградники упоминались ещё китайскими путешественниками эпохи Тан." },
        ],
      },
      {
        id: "climate",
        nav: "Климат",
        eyebrow: "Природные условия",
        title: "Климат <em>и сезоны</em>",
        blocks: [
          { t: "p", html: "Самарканд лежит в предгорьях на высоте около 720 метров — заметно выше Бухары и Хивы. Лето здесь чуть мягче, чем в пустынных городах, а весна и осень — эталонные сезоны для путешествия." },
          {
            t: "climate",
            rows: [
              { season: "Весна (март–май)", temp: "+12…+26°C", character: "Цветение садов, зелёные предгорья — самый живописный сезон" },
              { season: "Лето (июнь–август)", temp: "+28…+38°C", character: "Жарко и сухо, но мягче пустынных регионов; вечера комфортные" },
              { season: "Осень (сентябрь–ноябрь)", temp: "+10…+27°C", character: "Сезон урожая: виноград, гранаты, дыни; стабильная погода" },
              { season: "Зима (декабрь–февраль)", temp: "−2…+9°C", character: "Прохладно, изредка снег; памятники без туристов" },
            ],
          },
        ],
      },
    ],
    closing: {
      title: "Город, который<br>обещает величие",
      text: "Самарканд не разглядывают — им любуются. Это направление для тех, кто хочет увидеть Восток в его самой парадной форме: имперский масштаб, бирюза куполов и площадь, на которой пятьсот лет решались судьбы Азии.",
      tagline: "«Всё, что вы слышали — правда.»",
    },
  },
  en: {
    cover: {
      eyebrow: "Destination Guide",
      title: "Samarkand",
      subtitle:
        "The city Tamerlane built as the capital of the world. The Registan, turquoise domes and two thousand seven hundred years of history at the crossroads of every road in Asia.",
      rule: "Crossroads of cultures, mirror of the world",
      stats: [
        { val: "2750+", label: "years of history" },
        { val: "Registan", label: "the great square of the East" },
        { val: "UNESCO", label: "since 2001" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "History",
        eyebrow: "Origins",
        title: "A capital<br><em>conceived as the centre of the world</em>",
        blocks: [
          { t: "lede", html: "Samarkand is as old as Rome and Babylon. The city survived Alexander the Great, the Arab conquest and the Mongol invasion — and rose again each time. But it owes its present face to one man: Timur, who at the end of the 14th century made Samarkand the capital of an empire stretching from the Indus to the Bosphorus." },
          { t: "p", html: "Timur brought the finest craftsmen from every conquered land — Persian architects, Indian stone-carvers, Syrian mosaicists. The intent was direct and ambitious: Samarkand was to eclipse every city on earth. Hence the colossal portals, the turquoise domes, and a scale that stuns to this day." },
          { t: "quote", html: "“If you would know of us — look upon our buildings,” an inscription attributed to Timur." },
          { t: "p", html: "Timur's grandson Ulugbek turned the conqueror's capital into a capital of science: his observatory was the most advanced of the 15th-century world, and its star catalogue was still used by European astronomers two hundred years later." },
          {
            t: "eras",
            items: [
              { period: "8th c. BC", text: "Foundation of <strong>Afrasiab</strong> — the ancient core of Samarkand and capital of Sogdiana." },
              { period: "329 BC", text: "The city falls to <strong>Alexander the Great</strong>. “Everything I have heard about Marakanda is true — except that it is more beautiful than I could imagine.”" },
              { period: "8th c.", text: "The Arab conquest; through Samarkand the <strong>secret of papermaking</strong>, captured from Chinese masters, enters the Islamic world." },
              { period: "1220", text: "The city is destroyed by the armies of <strong>Genghis Khan</strong> — Afrasiab is laid waste and never resettled." },
              { period: "1370", text: "<strong>Timur</strong> makes Samarkand his imperial capital — the greatest building campaign in Central Asian history begins." },
              { period: "1420s", text: "<strong>Ulugbek's observatory</strong> — the most precise astronomical measurements of its age." },
              { period: "2001", text: "Samarkand is inscribed by UNESCO as a <strong>“Crossroad of Cultures”</strong>." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Character",
        eyebrow: "Atmosphere",
        title: "A city built<br><em>to overwhelm</em>",
        blocks: [
          { t: "p", html: "Samarkand works through scale. Where Bukhara is a city of intimate lanes, Samarkand is a city of grand ensembles: vast squares, portals the height of a ten-storey building, domes visible for kilometres. It was designed to astonish ambassadors and travellers — and it still does." },
          { t: "p", html: "At the same time Samarkand is a living, modern city, the second largest in the country. Between the great monuments lie universities, vineyards, orchards and mahallas where life runs its own course. The contrast of the ceremonial and the everyday is part of its charm." },
          { t: "quote", html: "“Everything I have heard about the beauty of Samarkand is true — except that it is more beautiful than I could have imagined.” — Alexander the Great" },
          { t: "p", html: "The best hours at the Registan are dawn and late evening, when the square empties and the floodlights fade. That is when the builders' intent becomes clear: one is meant to feel small before these portals — and at the same time part of something great." },
          {
            t: "stats",
            items: [
              { val: "~720 m", label: "above sea level" },
              { val: "2nd", label: "largest city in the country" },
              { val: "Zarafshan", label: "the valley that feeds the city" },
              { val: "15th c.", label: "Ulugbek's golden age" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Districts",
        eyebrow: "City geography",
        title: "Districts and <em>ensembles</em>",
        blocks: [
          { t: "p", html: "Samarkand's principal monuments lie in a chain along the ancient axis of the city — from the Registan past Bibi-Khanym to Afrasiab. Between them stretch old mahallas and bustling bazaars." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Registan Square", tag: "Heart of the city", desc: "Three madrasahs — Ulugbek, Sher-Dor and Tillya-Kari — form the most famous square in Central Asia. For half a millennium decrees were proclaimed, trade conducted and astronomy taught here." },
              { num: "02", name: "Shah-i-Zinda", tag: "Necropolis", desc: "A street of mausoleums from the 11th–15th centuries — the richest concentration of glazed tilework in the region. A place of pilgrimage and of the city's finest architectural craftsmanship." },
              { num: "03", name: "Gur-i-Amir", tag: "Timur's resting place", desc: "The mausoleum with the ribbed turquoise dome where Timur and his grandson Ulugbek lie buried. The prototype of the Taj Mahal — Mughal architecture grew from this school." },
              { num: "04", name: "Bibi-Khanym and Siab Bazaar", tag: "Trading axis", desc: "The gigantic congregational mosque built after Timur's Indian campaign, and the city's main bazaar at its walls — the liveliest corner of old Samarkand." },
              { num: "05", name: "Afrasiab", tag: "Ancient site", desc: "The hills to the north-east are all that remains of pre-Mongol Samarkand. The site museum holds 7th-century Sogdian frescoes — among the rarest surviving pre-Islamic paintings." },
              { num: "06", name: "Konigil", tag: "Artisan outskirts", desc: "A village on the Siab river where the famous Samarkand paper, made from mulberry bark, has been revived using the medieval technology." },
            ],
          },
        ],
      },
      {
        id: "crafts",
        nav: "Crafts",
        eyebrow: "Heritage",
        title: "The legacy of <em>Timur's masters</em>",
        blocks: [
          { t: "p", html: "The craftsmen Timur gathered from across Asia left the city not only monuments but schools of craft that live on — from hand-cast paper to glazed ceramics the colour of the Samarkand sky." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-file", name: "Samarkand paper", desc: "In the 8th century it was through Samarkand that paper passed from China into the Islamic world and on to Europe. In Konigil it is again made by hand from mulberry bark — silky, cream-coloured, practically eternal." },
              { icon: "ti ti-brush", name: "Ceramics and tilework", desc: "The school of glazed ceramics that created the city's turquoise domes. Today's workshops carry the tradition on — from architectural tile to tableware." },
              { icon: "ti ti-needle", name: "Gold embroidery", desc: "Embroidery in gold and silver thread on velvet — the court craft of the Samarkand and Bukhara palaces, today seen in ceremonial robes and skullcaps." },
              { icon: "ti ti-star", name: "Astronomical heritage", desc: "Ulugbek's observatory with its giant sextant cut into the rock — a monument to the age when Samarkand was the scientific capital of the world." },
            ],
          },
          { t: "tags", items: ["Hand-cast paper", "Glazed tilework", "Gold embroidery", "Sogdian frescoes"] },
        ],
      },
      {
        id: "food",
        nav: "Cuisine",
        eyebrow: "Gastronomy",
        title: "Cuisine of the <em>Zarafshan valley</em>",
        blocks: [
          { t: "p", html: "Samarkand's cuisine is the cuisine of a generous valley: vineyards, orchards, melon fields and the oldest winemaking traditions in the region. Everything here is cooked thoroughly and served generously." },
          {
            t: "food",
            items: [
              { name: "Samarkand plov", desc: "Cooked in layers and never stirred at serving — rice, carrots and meat lie separately. Held to be one of the two great canons of Uzbek plov, alongside Tashkent's." },
              { name: "Samarkand bread", desc: "A dense, heavy non which, legend insists, cannot be baked anywhere but Samarkand — emirs tried carrying off the bakers, the dough, even the water, and the bread always came out different." },
              { name: "Halva and navat", desc: "The city is famous for its sweets — from melting sesame halva to navat, the crystallised sugar served with tea." },
              { name: "Siab Bazaar", desc: "The main market by the Bibi-Khanym mosque: mountains of dried fruit, spices, pomegranates and those famous tandoor loaves — an obligatory stop on any itinerary." },
            ],
          },
          { t: "p", html: "The Zarafshan valley is Central Asia's oldest winemaking district — its vineyards were noted by Chinese travellers as early as the Tang era." },
        ],
      },
      {
        id: "climate",
        nav: "Climate",
        eyebrow: "Natural conditions",
        title: "Climate <em>and seasons</em>",
        blocks: [
          { t: "p", html: "Samarkand lies in the foothills at about 720 metres — noticeably higher than Bukhara or Khiva. Summers are a touch milder than in the desert cities, and spring and autumn are textbook seasons for travel." },
          {
            t: "climate",
            rows: [
              { season: "Spring (Mar–May)", temp: "+12…+26°C", character: "Orchards in bloom, green foothills — the most picturesque season" },
              { season: "Summer (Jun–Aug)", temp: "+28…+38°C", character: "Hot and dry, yet milder than the desert regions; comfortable evenings" },
              { season: "Autumn (Sep–Nov)", temp: "+10…+27°C", character: "Harvest season: grapes, pomegranates, melons; stable weather" },
              { season: "Winter (Dec–Feb)", temp: "−2…+9°C", character: "Cool, occasional snow; the monuments without the crowds" },
            ],
          },
        ],
      },
    ],
    closing: {
      title: "A city that<br>promises grandeur",
      text: "You do not inspect Samarkand — you marvel at it. This is a destination for those who want the East in its most ceremonial form: imperial scale, turquoise domes, and a square where the fate of Asia was decided for five hundred years.",
      tagline: "“Everything you have heard is true.”",
    },
  },
};

// ---------------------------------------------------------------- ХИВА / KHIVA
const khiva: LocalizedGuide = {
  ru: {
    cover: {
      eyebrow: "Гид по направлению",
      title: "Хива",
      subtitle:
        "Последний караванный город Шёлкового пути, целиком сохранившийся внутри крепостных стен. Ичан-Кала — первый объект ЮНЕСКО в Узбекистане.",
      rule: "Город-музей под открытым небом",
      stats: [
        { val: "2500", label: "лет истории Хорезма" },
        { val: "50+", label: "памятников внутри стен" },
        { val: "ЮНЕСКО", label: "с 1990 года" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "История",
        eyebrow: "Истоки",
        title: "Наследник<br><em>древнего Хорезма</em>",
        blocks: [
          { t: "lede", html: "Хива — самый молодой из великих городов Узбекистана и одновременно наследник самой древней цивилизации региона: Хорезма, земледельческой культуры в низовьях Амударьи, чья история насчитывает более двух с половиной тысяч лет." },
          { t: "p", html: "По легенде, город вырос вокруг колодца Хейвак, выкопанного Симом, сыном Ноя. Реальная Хива веками оставалась небольшой крепостью на караванном пути через пустыню — пока в конце XVI века не стала столицей Хивинского ханства, последнего из великих ханств Средней Азии." },
          { t: "quote", html: "«Хива — это то, как выглядел бы восточный город из сказки, если бы его можно было потрогать руками.»" },
          { t: "p", html: "Большинство памятников Ичан-Калы построено удивительно поздно — в XVIII–XIX веках, когда прочие города региона уже приходили в упадок. Именно поэтому Хива так целостна: это не отдельные сохранившиеся здания, а законченный средневековый город — стены, дворцы, минареты, мечети и медресе на своих местах." },
          {
            t: "eras",
            items: [
              { period: "V в. до н.э.", text: "Расцвет <strong>древнего Хорезма</strong> — «страны тысячи крепостей» в низовьях Амударьи." },
              { period: "X в.", text: "Первые письменные упоминания <strong>Хивы</strong> как города на караванном пути." },
              { period: "1598 г.", text: "Хива становится <strong>столицей Хивинского ханства</strong> после смены русла Амударьи." },
              { period: "XVIII–XIX вв.", text: "Золотой век строительства: возводится <strong>почти вся Ичан-Кала</strong>, известная сегодня." },
              { period: "1873 г.", text: "Ханство становится <strong>протекторатом Российской империи</strong>, сохранив внутреннее самоуправление." },
              { period: "1920 г.", text: "Падение ханства — конец <strong>последней монархии</strong> Средней Азии." },
              { period: "1990 г.", text: "Ичан-Кала — <strong>первый объект ЮНЕСКО</strong> на территории Узбекистана." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Характер",
        eyebrow: "Атмосфера",
        title: "Город<br><em>за крепостной стеной</em>",
        blocks: [
          { t: "p", html: "Хиву нужно воспринимать целиком. Здесь нет «главного памятника» — памятником является весь город внутри глиняных стен высотой в десять метров. Войдя через одни из четырёх ворот Ичан-Калы, вы оказываетесь в законченном мире, где нет ни одного современного здания." },
          { t: "p", html: "Днём Хива — оживлённый музей. Но настоящая её магия начинается после заката, когда дневные посетители уезжают: пустые улицы, силуэт Кальта-Минора в подсветке, звук собственных шагов по тысячелетней глине. Остаться на ночь внутри стен — обязательная часть правильного маршрута." },
          { t: "quote", html: "«В Хиве стоит встретить рассвет на крепостной стене — за ней начинается пустыня, и понимаешь, чем этот город был для караванов: последним островом жизни перед песками.»" },
          { t: "p", html: "Компактность — ещё одно достоинство: вся Ичан-Кала проходится пешком за час, но раскрывать её деталями — резными дверями, изразцовыми михрабами, двориками медресе — можно днями." },
          {
            t: "stats",
            items: [
              { val: "10 м", label: "высота крепостных стен" },
              { val: "26 га", label: "площадь Ичан-Калы" },
              { val: "4", label: "ворот по сторонам света" },
              { val: "57 м", label: "минарет Ислам-Ходжа" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Ансамбли",
        eyebrow: "География города",
        title: "Внутри и снаружи <em>стен</em>",
        blocks: [
          { t: "p", html: "Хива делится на внутренний город Ичан-Кала — музейное ядро за стенами — и внешний город Дишан-Кала, где идёт обычная жизнь. Почти всё главное сосредоточено внутри." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Куня-Арк", tag: "Цитадель", desc: "«Старая крепость» — резиденция хивинских ханов с тронным залом, монетным двором и летней мечетью, чей айван облицован лучшей майоликой города. Со смотровой площадки — канонический вид на Ичан-Калу." },
              { num: "02", name: "Кальта-Минор", tag: "Символ города", desc: "«Короткий минарет» — гигантское основание минарета, который должен был стать самым высоким в исламском мире, но остался недостроенным после смерти хана. Целиком покрыт бирюзовым изразцом." },
              { num: "03", name: "Джума-мечеть", tag: "Лес колонн", desc: "Пятничная мечеть с 213 резными деревянными колоннами — некоторые из них старше самого города и датируются X–XII веками. Полумрак, тишина и один из самых необычных интерьеров региона." },
              { num: "04", name: "Таш-Хаули", tag: "Дворец", desc: "«Каменный двор» — дворец XIX века с гаремом, айванами и самой роскошной изразцовой отделкой Хивы. Пример того, на что было способно ханство на пике благополучия." },
              { num: "05", name: "Ислам-Ходжа", tag: "Вертикаль города", desc: "Самый высокий минарет Узбекистана (57 м) с узкой винтовой лестницей — лучшая панорама города и пустыни за стенами. Ансамбль с медресе начала XX века." },
              { num: "06", name: "Дишан-Кала", tag: "Внешний город", desc: "Жилые кварталы за стенами: базар, мастерские, повседневный Хорезм без музейного глянца — стоит выйти сюда хотя бы ради контраста." },
            ],
          },
        ],
      },
      {
        id: "crafts",
        nav: "Ремёсла",
        eyebrow: "Наследие",
        title: "Ремёсла <em>Хорезмского оазиса</em>",
        blocks: [
          { t: "p", html: "Хорезм — отдельная культурная вселенная внутри Узбекистана: собственный диалект, собственная музыка и танец, собственные ремесленные школы, отличимые с первого взгляда." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-hammer", name: "Резьба по дереву", desc: "Хивинская школа резьбы — самая узнаваемая в стране: массивные двери и колонны из карагача, покрытые плотным растительным орнаментом. Двери Джума-мечети — её тысячелетняя антология." },
              { icon: "ti ti-needle", name: "Хорезмские ковры и сюзане", desc: "Ковроткачество с геометрическими мотивами, восходящими к орнаментам древнехорезмийских крепостей, и вышивка, отличная от бухарской и самаркандской школ." },
              { icon: "ti ti-music", name: "Хорезмский маком и лазги", desc: "Лазги — стремительный хорезмский танец, включённый в список нематериального наследия ЮНЕСКО. Услышать его вживую во дворике медресе — впечатление не слабее архитектуры." },
              { icon: "ti ti-building", name: "Глиняное зодчество", desc: "Традиция строительства из пахсы и сырцового кирпича, отточенная тысячелетиями пустынной архитектуры — сами стены Ичан-Калы и есть главный её памятник." },
            ],
          },
          { t: "tags", items: ["Резьба по карагачу", "Танец лазги", "Хорезмские ковры", "Глиняная архитектура"] },
        ],
      },
      {
        id: "food",
        nav: "Кухня",
        eyebrow: "Гастрономия",
        title: "Кухня <em>Хорезма</em>",
        blocks: [
          { t: "p", html: "Хорезмская кухня заметно отличается от кухни остального Узбекистана — она легче, зеленее и хранит блюда, которых не найти больше нигде в стране." },
          {
            t: "food",
            items: [
              { name: "Шивит-оши", desc: "Фирменное блюдо Хивы: ярко-зелёная лапша, замешанная с укропом, под мясным рагу с овощами. Существует только в Хорезме — гастрономическая причина приехать сюда." },
              { name: "Тухум-барак", desc: "Квадратные вареники с начинкой из сырого яйца с молоком, которое схватывается при варке — древнее праздничное блюдо оазиса." },
              { name: "Хорезмский плов", desc: "Более лёгкий и сдержанный, чем самаркандский или ташкентский — без изюма и нута, на местном рисе, выращенном в низовьях Амударьи." },
              { name: "Дыни Хорезма", desc: "Хорезмские дыни веками считались лучшими на Востоке — их вялили и караванами отправляли в подарок багдадским халифам." },
            ],
          },
        ],
      },
      {
        id: "climate",
        nav: "Климат",
        eyebrow: "Природные условия",
        title: "Климат <em>и сезоны</em>",
        blocks: [
          { t: "p", html: "Хива — самый «пустынный» из городов классического маршрута: оазис зажат между Каракумами и Кызылкумом. Лето здесь жарче, зима холоднее, а перепады температур резче, чем где-либо в стране." },
          {
            t: "climate",
            rows: [
              { season: "Весна (март–май)", temp: "+12…+28°C", character: "Лучший сезон: тепло, сухо, город ещё не раскалён" },
              { season: "Лето (июнь–август)", temp: "+34…+44°C", character: "Самый жаркий регион страны; прогулки — только утром и вечером" },
              { season: "Осень (сентябрь–ноябрь)", temp: "+8…+28°C", character: "Комфортное тепло, сезон дынь и мягкого света" },
              { season: "Зима (декабрь–февраль)", temp: "−6…+6°C", character: "Холоднее прочих городов маршрута, зато Ичан-Кала пустует" },
            ],
          },
          { t: "p", html: "Сухой пустынный воздух смягчает жару, но летом обязательны головной убор, вода и планирование прогулок вне полуденных часов." },
        ],
      },
    ],
    closing: {
      title: "Город, где время<br>остановили нарочно",
      text: "Хива — самое концентрированное впечатление Шёлкового пути: целый средневековый город, который можно обойти за день и который не отпускает много дольше. Приезжайте с ночёвкой — вечерняя Ичан-Кала стоит всей дороги до Хорезма.",
      tagline: "«Последний караванный город Востока.»",
    },
  },
  en: {
    cover: {
      eyebrow: "Destination Guide",
      title: "Khiva",
      subtitle:
        "The last caravan city of the Silk Road, preserved whole within its fortress walls. Itchan Kala was Uzbekistan's first UNESCO World Heritage site.",
      rule: "An open-air museum city",
      stats: [
        { val: "2500", label: "years of Khorezmian history" },
        { val: "50+", label: "monuments within the walls" },
        { val: "UNESCO", label: "since 1990" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "History",
        eyebrow: "Origins",
        title: "Heir to<br><em>ancient Khorezm</em>",
        blocks: [
          { t: "lede", html: "Khiva is the youngest of Uzbekistan's great cities and at the same time heir to the region's oldest civilisation: Khorezm, the agricultural culture of the lower Amu Darya, whose history spans more than two and a half millennia." },
          { t: "p", html: "Legend says the city grew around the Kheivak well, dug by Shem, son of Noah. The real Khiva remained for centuries a modest fortress on the desert caravan route — until, at the end of the 16th century, it became the capital of the Khanate of Khiva, the last of the great khanates of Central Asia." },
          { t: "quote", html: "“Khiva is what an oriental city from a fairy tale would look like, if you could touch it with your hands.”" },
          { t: "p", html: "Most of Itchan Kala's monuments were built remarkably late — in the 18th and 19th centuries, when the region's other cities were already in decline. That is why Khiva is so complete: not scattered surviving buildings, but a finished medieval city — walls, palaces, minarets, mosques and madrasahs all in their places." },
          {
            t: "eras",
            items: [
              { period: "5th c. BC", text: "The flourishing of <strong>ancient Khorezm</strong> — the “land of a thousand fortresses” on the lower Amu Darya." },
              { period: "10th c.", text: "First written mentions of <strong>Khiva</strong> as a town on the caravan route." },
              { period: "1598", text: "Khiva becomes <strong>capital of the Khanate</strong> after the Amu Darya changes course." },
              { period: "18th–19th c.", text: "A golden age of building: <strong>almost all of Itchan Kala</strong> as known today is constructed." },
              { period: "1873", text: "The khanate becomes a <strong>protectorate of the Russian Empire</strong>, keeping internal self-rule." },
              { period: "1920", text: "The fall of the khanate — the end of <strong>Central Asia's last monarchy</strong>." },
              { period: "1990", text: "Itchan Kala becomes <strong>Uzbekistan's first UNESCO site</strong>." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Character",
        eyebrow: "Atmosphere",
        title: "A city<br><em>behind a fortress wall</em>",
        blocks: [
          { t: "p", html: "Khiva must be taken whole. There is no single “main monument” here — the monument is the entire city within ten-metre clay walls. Passing through one of Itchan Kala's four gates, you enter a finished world without a single modern building." },
          { t: "p", html: "By day Khiva is a busy museum. Its real magic begins after sunset, when the day visitors leave: empty streets, the floodlit silhouette of Kalta Minor, the sound of your own footsteps on thousand-year-old clay. Staying overnight within the walls is an essential part of doing Khiva properly." },
          { t: "quote", html: "“Meet the dawn on the fortress wall — the desert begins just beyond it, and you understand what this city meant to the caravans: the last island of life before the sands.”" },
          { t: "p", html: "Compactness is another virtue: all of Itchan Kala can be walked in an hour, yet its details — carved doors, tiled mihrabs, madrasah courtyards — can be unfolded for days." },
          {
            t: "stats",
            items: [
              { val: "10 m", label: "height of the walls" },
              { val: "26 ha", label: "area of Itchan Kala" },
              { val: "4", label: "gates at the cardinal points" },
              { val: "57 m", label: "Islam Khodja minaret" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Ensembles",
        eyebrow: "City geography",
        title: "Inside and outside <em>the walls</em>",
        blocks: [
          { t: "p", html: "Khiva divides into the inner city, Itchan Kala — the museum core behind the walls — and the outer city, Dichan Kala, where everyday life goes on. Nearly everything essential lies inside." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Kunya-Ark", tag: "Citadel", desc: "The “old fortress” — residence of the khans of Khiva, with its throne hall, mint and summer mosque, whose iwan carries the city's finest majolica. The lookout platform gives the canonical view over Itchan Kala." },
              { num: "02", name: "Kalta Minor", tag: "Symbol of the city", desc: "The “short minaret” — the colossal base of what was to be the tallest minaret in the Islamic world, left unfinished at the khan's death. Sheathed entirely in turquoise tile." },
              { num: "03", name: "Juma Mosque", tag: "A forest of columns", desc: "The Friday mosque with 213 carved wooden columns — some older than the city itself, dating to the 10th–12th centuries. Half-light, silence, and one of the region's most singular interiors." },
              { num: "04", name: "Tash-Hauli", tag: "Palace", desc: "The “stone courtyard” — a 19th-century palace with harem, iwans and the most lavish tilework in Khiva. Proof of what the khanate could do at the height of its prosperity." },
              { num: "05", name: "Islam Khodja", tag: "The city's vertical", desc: "Uzbekistan's tallest minaret (57 m) with a narrow spiral staircase — the finest panorama of the city and the desert beyond the walls. An ensemble with an early 20th-century madrasah." },
              { num: "06", name: "Dichan Kala", tag: "Outer city", desc: "The residential quarters beyond the walls: bazaar, workshops, everyday Khorezm without the museum gloss — worth stepping out for the contrast alone." },
            ],
          },
        ],
      },
      {
        id: "crafts",
        nav: "Crafts",
        eyebrow: "Heritage",
        title: "Crafts of the <em>Khorezm oasis</em>",
        blocks: [
          { t: "p", html: "Khorezm is a distinct cultural universe within Uzbekistan: its own dialect, its own music and dance, its own schools of craft recognisable at first glance." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-hammer", name: "Wood carving", desc: "The Khivan school of carving is the country's most recognisable: massive elm doors and columns covered in dense vegetal ornament. The doors of the Juma Mosque are its thousand-year anthology." },
              { icon: "ti ti-needle", name: "Khorezm carpets and suzani", desc: "Carpet-weaving with geometric motifs descending from the ornaments of ancient Khorezmian fortresses, and an embroidery tradition distinct from the Bukhara and Samarkand schools." },
              { icon: "ti ti-music", name: "Khorezm maqom and lazgi", desc: "Lazgi — the whirling Khorezmian dance inscribed on UNESCO's intangible heritage list. Hearing it live in a madrasah courtyard is an impression to rival the architecture." },
              { icon: "ti ti-building", name: "Earthen architecture", desc: "The tradition of building in pakhsa and mud brick, honed by millennia of desert architecture — the walls of Itchan Kala themselves are its greatest monument." },
            ],
          },
          { t: "tags", items: ["Elm wood carving", "Lazgi dance", "Khorezm carpets", "Earthen architecture"] },
        ],
      },
      {
        id: "food",
        nav: "Cuisine",
        eyebrow: "Gastronomy",
        title: "Cuisine of <em>Khorezm</em>",
        blocks: [
          { t: "p", html: "Khorezmian cuisine differs markedly from the rest of Uzbekistan — lighter, greener, and keeping dishes found nowhere else in the country." },
          {
            t: "food",
            items: [
              { name: "Shivit oshi", desc: "Khiva's signature dish: bright-green noodles kneaded with dill, under a meat and vegetable stew. It exists only in Khorezm — a gastronomic reason to come in itself." },
              { name: "Tukhum barak", desc: "Square dumplings filled with raw egg and milk that sets as they boil — an ancient festive dish of the oasis." },
              { name: "Khorezm plov", desc: "Lighter and more restrained than Samarkand's or Tashkent's — no raisins or chickpeas, made with local rice grown on the lower Amu Darya." },
              { name: "Khorezm melons", desc: "For centuries considered the finest in the East — dried and sent by caravan as gifts to the caliphs of Baghdad." },
            ],
          },
        ],
      },
      {
        id: "climate",
        nav: "Climate",
        eyebrow: "Natural conditions",
        title: "Climate <em>and seasons</em>",
        blocks: [
          { t: "p", html: "Khiva is the most “desert” city of the classic route: the oasis is pinched between the Karakum and Kyzylkum deserts. Summers are hotter, winters colder, and temperature swings sharper than anywhere else in the country." },
          {
            t: "climate",
            rows: [
              { season: "Spring (Mar–May)", temp: "+12…+28°C", character: "The best season: warm, dry, the city not yet scorching" },
              { season: "Summer (Jun–Aug)", temp: "+34…+44°C", character: "The hottest region of the country; walk mornings and evenings only" },
              { season: "Autumn (Sep–Nov)", temp: "+8…+28°C", character: "Comfortable warmth, the season of melons and soft light" },
              { season: "Winter (Dec–Feb)", temp: "−6…+6°C", character: "Colder than the other cities of the route — but Itchan Kala stands empty" },
            ],
          },
          { t: "p", html: "The dry desert air tempers the heat, but in summer a hat, water and avoiding the midday hours are non-negotiable." },
        ],
      },
    ],
    closing: {
      title: "A city where time<br>was stopped on purpose",
      text: "Khiva is the most concentrated impression the Silk Road offers: an entire medieval city you can walk in a day and cannot shake off for far longer. Come for the night — evening Itchan Kala is worth the whole journey to Khorezm.",
      tagline: "“The last caravan city of the East.”",
    },
  },
};

// ---------------------------------------------------------------- ТАШКЕНТ / TASHKENT
const tashkent: LocalizedGuide = {
  ru: {
    cover: {
      eyebrow: "Гид по направлению",
      title: "Ташкент",
      subtitle:
        "Столица Узбекистана и крупнейший мегаполис Центральной Азии — город, где старинные махалли соседствуют с советским модернизмом и стеклянными башнями нового века.",
      rule: "Ворота Востока, город хлеба",
      stats: [
        { val: "2200+", label: "лет истории" },
        { val: "3 млн+", label: "жителей мегаполиса" },
        { val: "№1", label: "первое метро Центральной Азии" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "История",
        eyebrow: "Истоки",
        title: "Город, переживший<br><em>три рождения</em>",
        blocks: [
          { t: "lede", html: "Ташкент старше многих великих столиц — поселению Чач на пересечении караванных дорог больше двух тысяч лет. Но нынешний город пережил несколько рождений: древний Чач, имперский Ташкент XIX века и город, отстроенный заново после землетрясения 1966 года." },
          { t: "p", html: "В отличие от Самарканда и Бухары, Ташкент никогда не был витриной одной эпохи — он наслаивал их друг на друга. Старогородские махалли с глиняными дворами, «сейсмостойкий модернизм» советских проспектов, метро-дворцы и новые деловые кварталы существуют здесь одновременно, в получасе ходьбы друг от друга." },
          { t: "quote", html: "«Ташкент — город хлебный», — определение, закрепившееся за городом ещё век назад и по сей день верное по духу: это самый щедрый и самый космополитичный город региона." },
          { t: "p", html: "Здесь хранится одна из главных реликвий исламского мира — Коран халифа Османа VII века, старейший из сохранившихся списков книги. А ташкентское метро, открытое в 1977 году, стало первым в Центральной Азии — и одним из самых красивых в мире." },
          {
            t: "eras",
            items: [
              { period: "II в. до н.э.", text: "Первые поселения оазиса <strong>Чач</strong> на пересечении дорог из Китая, Индии и степи." },
              { period: "VIII в.", text: "Арабское завоевание; город известен как <strong>Бинкат</strong>, затем возвращает имя Ташкент — «каменный город»." },
              { period: "1865 г.", text: "Город входит в состав Российской империи и становится <strong>административным центром Туркестана</strong>." },
              { period: "1930 г.", text: "Ташкент — <strong>столица Узбекской ССР</strong>, начало индустриального роста." },
              { period: "1966 г.", text: "<strong>Землетрясение</strong> разрушает центр города — и запускает крупнейшую градостроительную кампанию в истории региона." },
              { period: "1977 г.", text: "Открывается <strong>первое метро Центральной Азии</strong> — станции-дворцы, ныне открытые для фотографий." },
              { period: "1991 г.", text: "Ташкент — столица <strong>независимого Узбекистана</strong> и деловой центр региона." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Характер",
        eyebrow: "Атмосфера",
        title: "Мегаполис<br><em>с душой махалли</em>",
        blocks: [
          { t: "p", html: "Ташкент — самый недооценённый город классического маршрута. Путешественники часто отводят ему день «на пересадку» — и зря: это единственный город страны, где виден весь Узбекистан сразу — от тандыров старого города до концертных залов и ресторанов новой волны." },
          { t: "p", html: "Это очень зелёный город: чинары, платановые аллеи, арыки вдоль улиц и десятки парков — наследие оазисной культуры, перенесённой в масштаб мегаполиса. Летом жизнь течёт в тени деревьев и во внутренних дворах." },
          { t: "quote", html: "«Чтобы понять Узбекистан, начните с Ташкента: всё, что вы увидите дальше по маршруту, здесь уже живёт — просто рядом с XXI веком.»" },
          { t: "p", html: "Ташкент — гастрономическая столица страны и её главные ворота: сюда прилетают международные рейсы, отсюда скоростные поезда «Афросиаб» за два часа доставляют в Самарканд и далее в Бухару." },
          {
            t: "stats",
            items: [
              { val: "~455 м", label: "высота над уровнем моря" },
              { val: "2 ч 10 мин", label: "до Самарканда на «Афросиабе»" },
              { val: "50+", label: "станций метро" },
              { val: "VII в.", label: "Коран Османа в Хаст-Имаме" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Районы",
        eyebrow: "География города",
        title: "Четыре <em>Ташкента</em>",
        blocks: [
          { t: "p", html: "Ташкент удобно понимать как несколько городов в одном — каждый со своим веком, своим ритмом и своей архитектурой." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Старый город и Чорсу", tag: "Древний Чач", desc: "Махалли вокруг базара Чорсу — лабиринт глиняных дворов, тандырных пекарен и мастерских под гигантским бирюзовым куполом рынка. Самый восточный по духу район столицы." },
              { num: "02", name: "Хаст-Имам", tag: "Духовный центр", desc: "Ансамбль медресе и мечетей, где хранится Коран халифа Османа VII века. Место, где имперская тишина библиотеки соединяется с живой религиозной традицией." },
              { num: "03", name: "Центр и проспекты", tag: "Советский модернизм", desc: "Площадь Амира Темура, сквер, гостиница «Узбекистан», музей Ленина (ныне Музей истории) — всемирно признанный ансамбль ташкентского модернизма 1960–80-х, включая станции метро." },
              { num: "04", name: "Новый Ташкент", tag: "XXI век", desc: "Tashkent City, деловые башни, парки нового поколения и ресторанные кварталы — витрина сегодняшних амбиций страны." },
            ],
          },
        ],
      },
      {
        id: "culture",
        nav: "Культура",
        eyebrow: "Наследие",
        title: "Культура <em>трёх эпох</em>",
        blocks: [
          { t: "p", html: "Культурная программа Ташкента разнообразнее, чем где-либо в регионе — от древнейшего Корана мира до оперных премьер и музеев прикладного искусства." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-train", name: "Метро-дворцы", desc: "Каждая станция первого метро Центральной Азии — авторский проект: космическая «Космонавтлар», хлопковые своды «Пахтакора», люстры «Алишера Навои». С 2018 года съёмка разрешена — метро стало музеем." },
              { icon: "ti ti-book", name: "Коран Османа", desc: "Рукопись VII века в библиотеке Хаст-Имама — по преданию, именно её читал халиф Осман в момент гибели. Старейший сохранившийся список священной книги ислама." },
              { icon: "ti ti-palette", name: "Музеи и театры", desc: "Музей прикладного искусства в особняке Половцева, Государственный музей истории, театр оперы и балета имени Навои, построенный по проекту архитектора мавзолея Ленина." },
              { icon: "ti ti-building-arch", name: "Ташкентский модернизм", desc: "Панельные дворцы, мозаики и «восточный брутализм» 1960–80-х — архитектурная школа, переживающая мировое признание: от гостиницы «Узбекистан» до дворца «Дружбы народов»." },
            ],
          },
          { t: "tags", items: ["Метро-музей", "Коран Османа", "Опера Навои", "Советский модернизм"] },
        ],
      },
      {
        id: "food",
        nav: "Кухня",
        eyebrow: "Гастрономия",
        title: "Гастрономическая <em>столица</em>",
        blocks: [
          { t: "p", html: "В Ташкенте узбекская кухня встречается со всеми кухнями бывшей империи и новой ресторанной волной — от чайхан старого города до шеф-ресторанов международного уровня." },
          {
            t: "food",
            items: [
              { name: "Плов-центр «Беш Казан»", desc: "Плов здесь готовят в казанах на сотни порций и подают до полудня — ритуал, ради которого стоит встать пораньше. Ташкентский плов — второй великий канон наряду с самаркандским." },
              { name: "Базар Чорсу", desc: "Главный рынок столицы под бирюзовым куполом: ряды специй, казы, курта, свежих лепёшек и самс из тандыра — гастрономический музей под открытым небом." },
              { name: "Нарын и лагман", desc: "Тонко нарезанная лапша с кониной — визитная карточка ташкентских махаллей, а уйгурский лагман — наследие многонационального города." },
              { name: "Новая волна", desc: "Ресторации современной узбекской кухни, переосмысляющие классику — Ташкент сегодня единственный город региона с полноценной авторской гастросценой." },
            ],
          },
        ],
      },
      {
        id: "climate",
        nav: "Климат",
        eyebrow: "Природные условия",
        title: "Климат <em>и сезоны</em>",
        blocks: [
          { t: "p", html: "Ташкент лежит у предгорий Тянь-Шаня — климат континентальный, но мягче пустынных регионов: больше осадков, зелени и снега зимой. Горы Чимгана — в полутора часах езды." },
          {
            t: "climate",
            rows: [
              { season: "Весна (март–май)", temp: "+11…+27°C", character: "Город цветёт; лучший сезон вместе с осенью" },
              { season: "Лето (июнь–август)", temp: "+30…+40°C", character: "Жарко, но зелень и фонтаны смягчают зной; вечера долгие и тёплые" },
              { season: "Осень (сентябрь–ноябрь)", temp: "+9…+27°C", character: "Бархатный сезон и время урожая на базарах" },
              { season: "Зима (декабрь–февраль)", temp: "−3…+8°C", character: "Прохладно, бывает снег; сезон гор — Чимган и Амирсой рядом" },
            ],
          },
        ],
      },
    ],
    closing: {
      title: "Город, с которого<br>начинается Узбекистан",
      text: "Дайте Ташкенту больше, чем пересадку. Это город, где страна видна целиком — её история, её кухня, её сегодняшняя энергия. Правильный маршрут по Узбекистану начинается и заканчивается здесь.",
      tagline: "«Ворота Востока открываются в Ташкенте.»",
    },
  },
  en: {
    cover: {
      eyebrow: "Destination Guide",
      title: "Tashkent",
      subtitle:
        "The capital of Uzbekistan and the largest metropolis in Central Asia — a city where old mahallas stand beside Soviet modernism and the glass towers of a new century.",
      rule: "Gateway to the East, city of bread",
      stats: [
        { val: "2200+", label: "years of history" },
        { val: "3 mln+", label: "people in the metropolis" },
        { val: "No. 1", label: "first metro in Central Asia" },
      ],
    },
    sections: [
      {
        id: "history",
        nav: "History",
        eyebrow: "Origins",
        title: "A city born<br><em>three times over</em>",
        blocks: [
          { t: "lede", html: "Tashkent is older than many great capitals — the settlement of Chach at the crossing of caravan roads is more than two thousand years old. But today's city has lived several births: ancient Chach, the imperial Tashkent of the 19th century, and the city rebuilt after the earthquake of 1966." },
          { t: "p", html: "Unlike Samarkand or Bukhara, Tashkent was never the showcase of a single era — it layered them one upon another. Old-town mahallas with clay courtyards, the “seismic modernism” of Soviet avenues, palace-like metro stations and new business districts coexist here within half an hour's walk of each other." },
          { t: "quote", html: "“Tashkent, city of bread” — a name the city earned a century ago, and true in spirit to this day: it is the most generous and most cosmopolitan city of the region." },
          { t: "p", html: "The city keeps one of the great relics of the Islamic world — the 7th-century Quran of Caliph Uthman, the oldest surviving copy of the book. And the Tashkent metro, opened in 1977, was the first in Central Asia — and remains among the most beautiful anywhere." },
          {
            t: "eras",
            items: [
              { period: "2nd c. BC", text: "First settlements of the <strong>Chach</strong> oasis at the crossing of roads from China, India and the steppe." },
              { period: "8th c.", text: "The Arab conquest; the city is known as <strong>Binkat</strong>, later reclaiming the name Tashkent — “city of stone”." },
              { period: "1865", text: "The city joins the Russian Empire and becomes the <strong>administrative centre of Turkestan</strong>." },
              { period: "1930", text: "Tashkent becomes <strong>capital of the Uzbek SSR</strong>; industrial growth begins." },
              { period: "1966", text: "An <strong>earthquake</strong> levels the city centre — and launches the largest urban campaign in the region's history." },
              { period: "1977", text: "The <strong>first metro in Central Asia</strong> opens — palace-stations, now open to photography." },
              { period: "1991", text: "Tashkent becomes capital of <strong>independent Uzbekistan</strong> and the region's business hub." },
            ],
          },
        ],
      },
      {
        id: "character",
        nav: "Character",
        eyebrow: "Atmosphere",
        title: "A metropolis<br><em>with the soul of a mahalla</em>",
        blocks: [
          { t: "p", html: "Tashkent is the most underrated city of the classic route. Travellers often grant it a single “transit” day — a mistake: it is the only city in the country where all of Uzbekistan is visible at once, from the tandyr bakeries of the old town to concert halls and new-wave restaurants." },
          { t: "p", html: "It is a profoundly green city: plane-tree avenues, aryk channels along the streets and dozens of parks — the oasis culture carried over to the scale of a metropolis. In summer, life flows in the shade of the trees and in inner courtyards." },
          { t: "quote", html: "“To understand Uzbekistan, start with Tashkent: everything you will see further along the route already lives here — simply next door to the 21st century.”" },
          { t: "p", html: "Tashkent is the country's gastronomic capital and its main gateway: international flights land here, and from here the Afrosiyob high-speed trains reach Samarkand in two hours and continue to Bukhara." },
          {
            t: "stats",
            items: [
              { val: "~455 m", label: "above sea level" },
              { val: "2 h 10 min", label: "to Samarkand by Afrosiyob" },
              { val: "50+", label: "metro stations" },
              { val: "7th c.", label: "Uthman Quran at Hazrati Imam" },
            ],
          },
        ],
      },
      {
        id: "districts",
        nav: "Districts",
        eyebrow: "City geography",
        title: "Four <em>Tashkents</em>",
        blocks: [
          { t: "p", html: "Tashkent is best understood as several cities in one — each with its own century, its own rhythm and its own architecture." },
          {
            t: "districts",
            items: [
              { num: "01", name: "Old Town and Chorsu", tag: "Ancient Chach", desc: "The mahallas around Chorsu Bazaar — a labyrinth of clay courtyards, tandyr bakeries and workshops beneath the market's giant turquoise dome. The most Eastern-spirited district of the capital." },
              { num: "02", name: "Hazrati Imam", tag: "Spiritual centre", desc: "The ensemble of madrasahs and mosques housing the 7th-century Quran of Caliph Uthman. A place where the hush of a great library meets a living religious tradition." },
              { num: "03", name: "The centre and avenues", tag: "Soviet modernism", desc: "Amir Timur Square, the Uzbekistan Hotel, the former Lenin Museum (now the History Museum) — a world-renowned ensemble of 1960s–80s Tashkent modernism, metro stations included." },
              { num: "04", name: "New Tashkent", tag: "21st century", desc: "Tashkent City, business towers, new-generation parks and restaurant quarters — the showcase of the country's present-day ambitions." },
            ],
          },
        ],
      },
      {
        id: "culture",
        nav: "Culture",
        eyebrow: "Heritage",
        title: "Culture of <em>three eras</em>",
        blocks: [
          { t: "p", html: "Tashkent's cultural repertoire is broader than anywhere else in the region — from the world's oldest Quran to opera premieres and museums of applied art." },
          {
            t: "cards",
            items: [
              { icon: "ti ti-train", name: "Palace metro", desc: "Every station of Central Asia's first metro is an individual work: the cosmic Kosmonavtlar, the cotton-bloom vaults of Pakhtakor, the chandeliers of Alisher Navoi. Photography has been allowed since 2018 — the metro became a museum." },
              { icon: "ti ti-book", name: "The Uthman Quran", desc: "A 7th-century manuscript in the Hazrati Imam library — by tradition, the very copy Caliph Uthman was reading at the moment of his death. The oldest surviving text of Islam's holy book." },
              { icon: "ti ti-palette", name: "Museums and theatres", desc: "The Museum of Applied Arts in the Polovtsev mansion, the State History Museum, and the Navoi Opera and Ballet Theatre, designed by the architect of Lenin's mausoleum." },
              { icon: "ti ti-building-arch", name: "Tashkent modernism", desc: "Mosaic-clad palaces and the “oriental brutalism” of the 1960s–80s — an architectural school now enjoying worldwide recognition, from the Hotel Uzbekistan to the Palace of Friendship of Peoples." },
            ],
          },
          { t: "tags", items: ["Metro as museum", "Uthman Quran", "Navoi Opera", "Soviet modernism"] },
        ],
      },
      {
        id: "food",
        nav: "Cuisine",
        eyebrow: "Gastronomy",
        title: "The gastronomic <em>capital</em>",
        blocks: [
          { t: "p", html: "In Tashkent, Uzbek cuisine meets every cuisine of the former empire and a new restaurant wave — from old-town teahouses to chef-driven restaurants of international standing." },
          {
            t: "food",
            items: [
              { name: "Besh Qozon plov centre", desc: "Plov is cooked here in cauldrons of hundreds of portions and served until noon — a ritual worth rising early for. Tashkent plov is the second great canon, alongside Samarkand's." },
              { name: "Chorsu Bazaar", desc: "The capital's main market under a turquoise dome: rows of spices, kazy, kurt, fresh non and tandyr samsa — an open-air museum of gastronomy." },
              { name: "Naryn and lagman", desc: "Finely cut noodles with horsemeat — the calling card of Tashkent's mahallas; Uyghur lagman is the legacy of a multi-ethnic city." },
              { name: "The new wave", desc: "Contemporary Uzbek restaurants rethinking the classics — Tashkent is today the region's only city with a fully-fledged author-driven dining scene." },
            ],
          },
        ],
      },
      {
        id: "climate",
        nav: "Climate",
        eyebrow: "Natural conditions",
        title: "Climate <em>and seasons</em>",
        blocks: [
          { t: "p", html: "Tashkent lies at the foothills of the Tien Shan — the climate is continental yet gentler than in the desert regions: more rainfall, more greenery, snow in winter. The Chimgan mountains are a ninety-minute drive away." },
          {
            t: "climate",
            rows: [
              { season: "Spring (Mar–May)", temp: "+11…+27°C", character: "The city in bloom; with autumn, the best season" },
              { season: "Summer (Jun–Aug)", temp: "+30…+40°C", character: "Hot, but greenery and fountains soften the heat; long warm evenings" },
              { season: "Autumn (Sep–Nov)", temp: "+9…+27°C", character: "Velvet season and harvest time in the bazaars" },
              { season: "Winter (Dec–Feb)", temp: "−3…+8°C", character: "Cool with occasional snow; mountain season — Chimgan and Amirsoy nearby" },
            ],
          },
        ],
      },
    ],
    closing: {
      title: "The city where<br>Uzbekistan begins",
      text: "Give Tashkent more than a stopover. This is the city where the whole country is visible at once — its history, its cuisine, its present-day energy. The right Uzbekistan itinerary begins and ends here.",
      tagline: "“The gates of the East open in Tashkent.”",
    },
  },
};

// All guides keyed by slug.
export const GUIDES: Record<string, LocalizedGuide> = {
  bukhara,
  samarkand,
  khiva,
  tashkent,
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
