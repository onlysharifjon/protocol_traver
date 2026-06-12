// All site content, available in two languages (Russian + English).
// Content lives here and is seeded into SQLite (see lib/db.ts). The admin
// dashboard edits the DB copy per language.

export type Locale = "ru" | "en";
export const LOCALES: Locale[] = ["ru", "en"];
export const DEFAULT_LOCALE: Locale = "ru";

export type DocStatus = "valid" | "expired" | "ongoing";

export type SiteContent = {
  nav: { label: string; href: string }[];
  contact: { email: string; phone: string; address: string; whatsapp: string };
  featuredTours: {
    index: string;
    tagline: string;
    title: string;
    duration: string;
    price: string;
    image: string;
  }[];
  homeFeatures: { title: string; body: string }[];
  homeStats: { value: string; suffix: string; label: string }[];
  testimonial: { quote: string; name: string; place: string };
  tours: {
    category: string;
    place: string;
    duration: string;
    title: string;
    body: string;
    price: string;
    image: string;
  }[];
  destinations: {
    name: string;
    blurb: string;
    tours: string;
    image: string;
    span: string;
  }[];
  timeline: { year: string; title: string; body: string }[];
  team: { role: string; name: string; bio: string; image: string }[];
  partners: string[];
  documentGroups: {
    title: string;
    intro: string;
    docs: {
      type: string;
      title: string;
      subtitle: string;
      issuer: string;
      issued: string;
      status: string;
      statusType: DocStatus;
    }[];
  }[];
  footerColumns: { title: string; links: string[] }[];
  // Singleton page text, keyed by setting key (see SETTING_KEY_GROUP).
  text: Record<string, string>;
};

// key -> settings group (language-independent)
export const SETTING_KEY_GROUP: [string, string][] = [
  ["brand_name", "brand"],
  ["brand_tagline", "brand"],
  ["contact_email", "contact"],
  ["contact_phone", "contact"],
  ["contact_address", "contact"],
  ["contact_whatsapp", "contact"],
  ["home_hero_eyebrow", "home"],
  ["home_hero_title_1", "home"],
  ["home_hero_title_2", "home"],
  ["home_hero_subtitle", "home"],
  ["home_hero_button", "home"],
  ["home_about_eyebrow", "home"],
  ["home_about_heading", "home"],
  ["home_about_p1", "home"],
  ["home_about_p2", "home"],
  ["home_about_link", "home"],
  ["home_featured_eyebrow", "home"],
  ["home_featured_heading", "home"],
  ["home_featured_link", "home"],
  ["testimonial_quote", "home"],
  ["testimonial_name", "home"],
  ["testimonial_place", "home"],
  ["home_cta_eyebrow", "home"],
  ["home_cta_title_1", "home"],
  ["home_cta_title_2", "home"],
  ["home_cta_button", "home"],
  ["tours_eyebrow", "tours"],
  ["tours_title_1", "tours"],
  ["tours_title_2", "tours"],
  ["tours_intro", "tours"],
  ["dest_eyebrow", "destinations"],
  ["dest_title", "destinations"],
  ["dest_intro", "destinations"],
  ["dest_quote", "destinations"],
  ["dest_cta_link", "destinations"],
  ["about_eyebrow", "about"],
  ["about_title_1", "about"],
  ["about_title_2", "about"],
  ["about_hero_caption", "about"],
  ["about_mission_eyebrow", "about"],
  ["about_mission_heading", "about"],
  ["about_mission_highlight", "about"],
  ["about_founder_p1", "about"],
  ["about_founder_p2", "about"],
  ["about_founder_signature", "about"],
  ["about_milestones_eyebrow", "about"],
  ["about_milestones_title_1", "about"],
  ["about_milestones_title_2", "about"],
  ["about_milestones_intro", "about"],
  ["about_team_eyebrow", "about"],
  ["about_team_heading", "about"],
  ["about_team_intro", "about"],
  ["about_partners_heading", "about"],
  ["docs_eyebrow", "documents"],
  ["docs_title_1", "documents"],
  ["docs_title_2", "documents"],
  ["docs_intro", "documents"],
  ["docs_footnote", "documents"],
];

// ============================ RUSSIAN ============================
const ru: SiteContent = {
  nav: [
    { label: "Туры", href: "/tours" },
    { label: "Направления", href: "/destinations" },
    { label: "О нас", href: "/about" },
    { label: "Документы", href: "/documents" },
    { label: "Контакты", href: "#contact" },
  ],
  contact: {
    email: "travel@protocoluz.com",
    phone: "+998 71 200 00 00",
    address: "Площадь Амира Темура, 1, Ташкент",
    whatsapp: "998712000000",
  },
  featuredTours: [
    { index: "01", tagline: "Вечная столица Тимура", title: "Императорский Самарканд", duration: "5 дней", price: "от $4,900", image: "/images/prev-samarkand.jpg" },
    { index: "02", tagline: "Живой средневековый город", title: "Бухарская хроника", duration: "4 дня", price: "от $3,800", image: "/images/prev-bukhara.jpg" },
    { index: "03", tagline: "Музей под открытым небом", title: "Хива: застывший город", duration: "3 дня", price: "от $3,200", image: "/images/prev-khiva.jpg" },
  ],
  homeFeatures: [
    { title: "Приватно и индивидуально", body: "Каждое путешествие принадлежит только вам. Никаких сборных групп, никаких компромиссов. Ваш график, ваши интересы, ваш темп — в сопровождении персонального гида от прибытия до отъезда." },
    { title: "Безупречность в каждой детали", body: "Мы сотрудничаем исключительно с авторскими риадами, отреставрированными караван-сараями и камерными бутик-отелями. Каждая трапеза, каждый трансфер, каждое мгновение выбраны так, чтобы превзойти ожидания." },
    { title: "Мастерство местных знатоков", body: "Наши гиды — историки, архитекторы и рассказчики, рождённые этой землёй. Они открывают частные коллекции, скрытые дворики и научные беседы, недоступные обычным посетителям." },
  ],
  homeStats: [
    { value: "16", suffix: "", label: "Лет опыта" },
    { value: "1,240", suffix: "+", label: "Проведённых частных туров" },
    { value: "38", suffix: "", label: "Представленных стран" },
    { value: "4.97", suffix: "/ 5", label: "Средняя оценка отзывов" },
  ],
  testimonial: {
    quote: "Protocol не привезли нас в Узбекистан. Они привели нас внутрь него. Наш гид тридцать лет изучал тимуридские рукописи — он читал нам надписи в оригинале, под арками Шахи-Зинды на рассвете. Ничто не было таким, как мы ожидали. Всё оказалось большим.",
    name: "Маргарет и Дэвид Эшворт",
    place: "Лондон, Великобритания",
  },
  tours: [
    { category: "Культурный", place: "Самарканд", duration: "5 дней", title: "Императорский Самарканд", body: "Войдите в столицу Тимура такой, какой её следует увидеть, — после закрытия, за затворёнными воротами, в сопровождении учёного, десятилетиями расшифровывающего геометрию её надписей.", price: "от $4,900", image: "/images/tour-samarkand.jpg" },
    { category: "Культурный", place: "Бухара", duration: "4 дня", title: "Бухарская хроника", body: "Пройдите сквозь два тысячелетия непрерывной жизни. Средневековые базары Бухары, караван-сараи и мавзолеи остаются живой тканью города — наши гиды знают каждый его порог.", price: "от $3,800", image: "/images/tour-bukhara.jpg" },
    { category: "Культурный", place: "Хива", duration: "3 дня", title: "Хива: застывший город", body: "Ичан-Кала — самый сохранившийся древний город Центральной Азии. Ночью, когда толпы расходятся, а глинобитные стены подсвечены янтарным светом, он принадлежит только вам.", price: "от $3,200", image: "/images/tour-khiva.jpg" },
    { category: "Гранд-тур", place: "Несколько городов", duration: "12 дней", title: "Великий Шёлковый путь", body: "Эталонное частное путешествие: Ташкент, Самарканд, Шахрисабз, Бухара и Хива в одном безупречном маршруте — каждый город раскрывается во всей глубине, без спешки.", price: "от $11,500", image: "/images/tour-silkroad.jpg" },
    { category: "Гастрономия", place: "Ташкент", duration: "3 дня", title: "Ташкент и базары", body: "Город контрастов между советскими проспектами и древними базарами. Частные кулинарные мастер-классы, утра на рынке с историком кухни и ужин с мастером-керамистом.", price: "от $2,900", image: "/images/tour-tashkent.jpg" },
    { category: "Приключение", place: "Несколько городов", duration: "8 дней", title: "Степь и звёзды", body: "За пределами памятников лежит пейзаж необыкновенной тишины. Юртовые лагеря в Кызылкуме, верховые прогулки на рассвете и небо такое ясное, что Млечный Путь отбрасывает тени.", price: "от $7,200", image: "/images/tour-steppe.jpg" },
  ],
  destinations: [
    { name: "Самарканд", blurb: "Голубой город, заставивший весь мир затаить дыхание.", tours: "8 туров", image: "/images/dest-samarkand.jpg", span: "tall" },
    { name: "Бухара", blurb: "Две тысячи лет непрерывной жизни — и город по-прежнему дышит.", tours: "5 туров", image: "/images/dest-bukhara.jpg", span: "short" },
    { name: "Хива", blurb: "Музей под открытым небом, столь нетронутый, что кажется пережившим само время.", tours: "4 тура", image: "/images/dest-khiva.jpg", span: "short" },
    { name: "Ташкент", blurb: "Столица, вмещающая три столетия в один день.", tours: "6 туров", image: "/images/dest-tashkent.jpg", span: "tall" },
    { name: "Ферганская долина", blurb: "Здесь родился шёлк, а горы хранят живое древнее ремесло.", tours: "3 тура", image: "/images/dest-fergana.jpg", span: "medium" },
    { name: "Нурата", blurb: "На краю пустыни — крепость старше самого Шёлкового пути.", tours: "2 тура", image: "/images/dest-nurata.jpg", span: "medium" },
  ],
  timeline: [
    { year: "2008", title: "Основание в Ташкенте", body: "Акбар Рахимов основывает Protocol Travel Services в единственном офисе на площади Амира Темура, приняв двенадцать гостей в первый сезон. Каждый тур он ведёт лично." },
    { year: "2011", title: "Первое международное признание", body: "Condé Nast Traveller называет Protocol одним из самых перспективных бутик-операторов Центральной Азии. Команда расширяется в Самарканд с постоянным культурным координатором и учёным-архивистом." },
    { year: "2015", title: "Заключены эксклюзивные партнёрства", body: "Подписаны долгосрочные соглашения с Самаркандским государственным музеем культуры и Бухарским институтом архитектурного наследия, дающие частный доступ к ключевым памятникам после закрытия." },
    { year: "2018", title: "Десятилетие в пути", body: "Protocol отмечает десять лет и 800 завершённых частных путешествий. Команда из восемнадцати гидов охватывает шесть городов и четыре языковые группы. Запущено собственное подразделение авиачартеров." },
    { year: "2022", title: "Расширение в Фергану и Хиву", body: "К команде присоединяются два новых местных специалиста по маршрутам Ферганской долины и Хивы. Protocol становится единственным оператором, предлагающим эксклюзивные ночи в юртовом лагере внутри заповедника Кызылкум." },
    { year: "2024", title: "Наши дни", body: "Более 1240 частных туров для гостей из 38 стран. Protocol остаётся частной, намеренно небольшой компанией, всецело преданной глубине, а не объёму." },
  ],
  team: [
    { role: "Основатель и директор", name: "Акбар Рахимов", bio: "Историк искусства, свободно владеет шестью языками, двадцать лет на Шёлковом пути.", image: "/images/team-akbar.jpg" },
    { role: "Руководитель гостевого сервиса", name: "Нилуфар Юсупова", bio: "Бывший старший консьерж курортов Aman. Продумывает каждую деталь до вашего прибытия.", image: "/images/team-nilufar.jpg" },
    { role: "Ведущий культурный гид, Самарканд", name: "Джеймс Хартвелл", bio: "Археолог с оксфордским образованием. Пятнадцать сезонов расшифровки тимуридских надписей.", image: "/images/team-james.jpg" },
    { role: "Специалист по Бухаре и Хиве", name: "Мадина Каримова", bio: "Потомок бухарского купеческого рода. Её знание старого города не имеет равных.", image: "/images/team-madina.jpg" },
  ],
  partners: [
    "Aman Resorts",
    "Orient Express Hotels",
    "Abercrombie & Kent",
    "Condé Nast Traveller",
    "National Geographic Expeditions",
    "Сертифицировано IATA",
  ],
  documentGroups: [
    {
      title: "Лицензии туроператора",
      intro: "Государственные лицензии, дающие Protocol Travel Services право осуществлять въездную туристическую деятельность на территории Республики Узбекистан.",
      docs: [
        { type: "PDF", title: "Государственная лицензия туроператора", subtitle: "Въездной туризм — Республика Узбекистан", issuer: "Министерство туризма и культурного наследия Узбекистана", issued: "Выдано 12 марта 2009", status: "Действует до 12 марта 2027", statusType: "valid" },
        { type: "PDF", title: "Сертификация частного туроператора", subtitle: "Классификация услуг люкс и VIP", issuer: "Национальная компания «Узбектуризм»", issued: "Выдано 8 января 2020", status: "Истекло 8 января 2026", statusType: "expired" },
        { type: "DOC", title: "Разрешение на обслуживание иностранных туристов", subtitle: "Разрешение на работу с международными клиентами", issuer: "Государственный комитет по развитию туризма", issued: "Выдано 3 июня 2022", status: "Истекло 3 июня 2025", statusType: "expired" },
      ],
    },
    {
      title: "Сертификаты качества",
      intro: "Международные сертификаты обеспечения качества, подтверждающие приверженность Protocol стандартам обслуживания, ответственному туризму и безопасности гостей.",
      docs: [
        { type: "CERT", title: "ISO 9001:2015 Управление качеством", subtitle: "Туристические услуги — сертифицированная область", issuer: "Bureau Veritas Certification", issued: "Выдано 14 сентября 2021", status: "Истекло 14 сентября 2024", statusType: "expired" },
        { type: "CERT", title: "Сертификация Travelife Gold", subtitle: "Устойчивый туризм — высшая награда", issuer: "Travelife Ltd., Амстердам", issued: "Выдано 27 апреля 2023", status: "Истекло 27 апреля 2026", statusType: "expired" },
        { type: "PDF", title: "Знак SafeTravels", subtitle: "Соответствие протоколам здоровья и безопасности COVID-19", issuer: "World Travel & Tourism Council (WTTC)", issued: "Выдано 1 октября 2021", status: "Действующее членство", statusType: "ongoing" },
      ],
    },
    {
      title: "Членство в ассоциациях",
      intro: "Активное членство в ведущих международных и региональных туристических организациях, подтверждающее положение Protocol в мировом туристическом сообществе.",
      docs: [
        { type: "CERT", title: "Активный член ASTA", subtitle: "Американское общество туристических консультантов", issuer: "ASTA — Вашингтон, США", issued: "Выдано 1 января 2016", status: "Действующее членство", statusType: "ongoing" },
        { type: "CERT", title: "Ассоциированный член ECTAA", subtitle: "Европейские ассоциации турагентов и туроператоров", issuer: "ECTAA — Брюссель, Бельгия", issued: "Выдано 15 марта 2018", status: "Действующее членство", statusType: "ongoing" },
        { type: "CERT", title: "Аффилированный член UNWTO", subtitle: "Всемирная туристская организация ООН", issuer: "UNWTO — Мадрид, Испания", issued: "Выдано 22 июля 2019", status: "Действующее членство", statusType: "ongoing" },
      ],
    },
  ],
  footerColumns: [
    { title: "Путешествия", links: ["Частные туры", "Групповые выезды", "Индивидуальные маршруты", "Однодневные экскурсии"] },
    { title: "Направления", links: ["Самарканд", "Бухара", "Хива", "Ташкент", "Ферганская долина"] },
    { title: "Компания", links: ["О Protocol", "Наши гиды", "Пресса", "Устойчивое развитие"] },
    { title: "Ресурсы", links: ["Документы и визы", "Памятки путешественникам", "Частые вопросы", "Условия"] },
  ],
  text: {
    brand_name: "PROTOCOL",
    brand_tagline: "Туристические услуги",
    contact_email: "travel@protocoluz.com",
    contact_phone: "+998 71 200 00 00",
    contact_address: "Площадь Амира Темура, 1, Ташкент",
    contact_whatsapp: "998712000000",
    home_hero_eyebrow: "Узбекистан · Частные туры · С 2008 года",
    home_hero_title_1: "Шёлковый путь,",
    home_hero_title_2: "каким он и должен быть",
    home_hero_subtitle: "Индивидуальные частные путешествия по Самарканду, Бухаре, Хиве и Ташкенту",
    home_hero_button: "Смотреть туры",
    home_about_eyebrow: "О Protocol",
    home_about_heading: "Мы не просто организуем путешествия. Мы создаём впечатления, которые остаются с вами надолго после возвращения.",
    home_about_p1: "Protocol Travel Services — ведущий въездной туроператор Узбекистана для взыскательных частных путешественников. Основанная в Ташкенте в 2008 году, компания более пятнадцати лет выстраивает отношения с лучшими гидами, реставраторами и учёными Шёлкового пути — людьми, которые открывают двери, закрытые для обычных гостей.",
    home_about_p2: "Каждый маршрут создаётся вокруг вас: вашего темпа, ваших увлечений, ваших личных встреч с памятниками, что некогда стояли в центре мира.",
    home_about_link: "Наша история",
    home_featured_eyebrow: "Избранные путешествия",
    home_featured_heading: "Авторские частные туры",
    home_featured_link: "Все туры →",
    testimonial_quote: "Protocol не привезли нас в Узбекистан. Они привели нас внутрь него. Наш гид тридцать лет изучал тимуридские рукописи — он читал нам надписи в оригинале, под арками Шахи-Зинды на рассвете. Ничто не было таким, как мы ожидали. Всё оказалось большим.",
    testimonial_name: "Маргарет и Дэвид Эшворт",
    testimonial_place: "Лондон, Великобритания",
    home_cta_eyebrow: "Начните здесь",
    home_cta_title_1: "Ваше путешествие по Шёлковому пути",
    home_cta_title_2: "ждёт своего автора",
    home_cta_button: "Спланировать путешествие",
    tours_eyebrow: "Частные путешествия",
    tours_title_1: "Наши туры и",
    tours_title_2: "экспедиции",
    tours_intro: "Каждый маршрут — лишь отправная точка. Мы дорабатываем каждое путешествие под ваш темп, ваши увлечения, ваши личные мгновения наедине с древним миром.",
    dest_eyebrow: "Куда мы вас отвезём",
    dest_title: "Направления",
    dest_intro: "Шесть городов. Тридцать веков. Одна непрерывная цивилизация, что некогда связывала мир — и связывает до сих пор для тех, кто смотрит внимательно.",
    dest_quote: "Каждое направление мы знаем своими ногами — не по брошюре.",
    dest_cta_link: "Спланировать индивидуальное путешествие →",
    about_eyebrow: "Protocol Travel Services",
    about_title_1: "Наша",
    about_title_2: "история",
    about_hero_caption: "Бухара, Узбекистан",
    about_mission_eyebrow: "Наша миссия",
    about_mission_heading: "Показать Шёлковый путь так, как его ещё не видел внешний мир, — изнутри, с",
    about_mission_highlight: "глубиной и деликатностью.",
    about_founder_p1: "Я основал Protocol, потому что устал смотреть, как мою страну видят лишь мельком — фотография купола, сувенир с рыночного прилавка, торопливое утро на Регистане. Узбекистан заслуживает большего. Как и те, кто сюда приезжает.",
    about_founder_p2: "Наши гости проводят вечера с каллиграфами в их мастерских, утра — с археологами в разгар раскопок, а дни — в частных библиотеках с рукописями старше книгопечатания. Это не туризм. Это наука, сделанная комфортной.",
    about_founder_signature: "Акбар Рахимов",
    about_milestones_eyebrow: "Вехи",
    about_milestones_title_1: "Шестнадцать лет",
    about_milestones_title_2: "созидания",
    about_milestones_intro: "Мы росли медленно и осознанно — добавляя по одному новому специалисту, по одному памятнику, по одному партнёрству за раз.",
    about_team_eyebrow: "Команда",
    about_team_heading: "Знакомьтесь с командой",
    about_team_intro: "Небольшая, тщательно подобранная группа. Каждый специалист — эксперт в определённом городе, эпохе или ремесле, а не гид-универсал.",
    about_partners_heading: "Доверенные партнёры и аккредитации",
    docs_eyebrow: "Доверие и прозрачность",
    docs_title_1: "Лицензии и",
    docs_title_2: "сертификаты",
    docs_intro: "Protocol Travel Services работает с полной прозрачностью. Каждая лицензия, сертификат и членство, которыми мы обладаем, перечислены здесь — доступны для ознакомления и загрузки. Мы убеждены: доверие не заявляют — его доказывают.",
    docs_footnote: "Все документы хранятся на языке оригинала и при необходимости сопровождаются заверенными переводами. По вопросам проверки, нотариальных копий или due-diligence обращайтесь напрямую: legal@protocoluz.com. Документы обновляются в течение 30 дней после продления или изменения.",
  },
};

// ============================ ENGLISH ============================
const en: SiteContent = {
  nav: [
    { label: "Tours", href: "/tours" },
    { label: "Destinations", href: "/destinations" },
    { label: "About", href: "/about" },
    { label: "Documents", href: "/documents" },
    { label: "Contact", href: "#contact" },
  ],
  contact: {
    email: "travel@protocoluz.com",
    phone: "+998 71 200 00 00",
    address: "1 Amir Temur Square, Tashkent",
    whatsapp: "998712000000",
  },
  featuredTours: [
    { index: "01", tagline: "Timur's Eternal Capital", title: "The Imperial Samarkand", duration: "5 days", price: "from $4,900", image: "/images/prev-samarkand.jpg" },
    { index: "02", tagline: "A Living Medieval City", title: "The Bukhara Chronicle", duration: "4 days", price: "from $3,800", image: "/images/prev-bukhara.jpg" },
    { index: "03", tagline: "An Open-Air Museum", title: "Khiva: The Frozen City", duration: "3 days", price: "from $3,200", image: "/images/prev-khiva.jpg" },
  ],
  homeFeatures: [
    { title: "Private & Personal", body: "Every journey is yours alone. No shared groups, no compromises. Your schedule, your interests, your pace — attended by a dedicated guide from arrival to departure." },
    { title: "Curated Excellence", body: "We partner exclusively with artisan riads, restored caravanserais, and intimate boutique hotels. Every meal, every transfer, every moment is selected to exceed expectation." },
    { title: "Local Mastery", body: "Our guides are historians, architects, and storytellers born of this land. They open private collections, hidden courtyards, and scholarly conversations unavailable to the public." },
  ],
  homeStats: [
    { value: "16", suffix: "", label: "Years of Expertise" },
    { value: "1,240", suffix: "+", label: "Private Tours Completed" },
    { value: "38", suffix: "", label: "Countries Represented" },
    { value: "4.97", suffix: "/ 5", label: "Average Review Score" },
  ],
  testimonial: {
    quote: "Protocol did not take us to Uzbekistan. They took us inside it. Our guide spent thirty years studying Timurid manuscripts — he read the inscriptions to us in the original, beneath the arches of the Shah-i-Zinda at dawn. Nothing was what we expected. Everything was more.",
    name: "Margaret & David Ashworth",
    place: "London, United Kingdom",
  },
  tours: [
    { category: "Cultural", place: "Samarkand", duration: "5 days", title: "The Imperial Samarkand", body: "Enter Timur's capital as it was meant to be experienced — after hours, behind closed gates, guided by a scholar who has spent decades decoding the geometry of its inscriptions.", price: "from $4,900", image: "/images/tour-samarkand.jpg" },
    { category: "Cultural", place: "Bukhara", duration: "4 days", title: "The Bukhara Chronicle", body: "Wander two millennia of continuous habitation. Bukhara's medieval bazaars, caravanserais, and mausoleums remain living tissue — our guides know every threshold.", price: "from $3,800", image: "/images/tour-bukhara.jpg" },
    { category: "Cultural", place: "Khiva", duration: "3 days", title: "Khiva: The Frozen City", body: "Ichan Kala is the world's most intact ancient Central Asian city. At night, with the crowds gone and the mud-brick walls lit amber, it belongs entirely to you.", price: "from $3,200", image: "/images/tour-khiva.jpg" },
    { category: "Grand Tour", place: "Multi-City", duration: "12 days", title: "Grand Silk Road", body: "The definitive private journey: Tashkent, Samarkand, Shahrisabz, Bukhara, and Khiva in one seamless arc — each city revealed in depth, never in haste.", price: "from $11,500", image: "/images/tour-silkroad.jpg" },
    { category: "Gastronomy", place: "Tashkent", duration: "3 days", title: "Tashkent & The Bazaars", body: "A city of contrasts between Soviet boulevards and ancient bazaars. Private cooking sessions, market mornings with a culinary historian, and dinner with a master ceramicist.", price: "from $2,900", image: "/images/tour-tashkent.jpg" },
    { category: "Adventure", place: "Multi-City", duration: "8 days", title: "The Steppe & The Stars", body: "Beyond the monuments lies a landscape of extraordinary silence. Yurt camps on the Kyzylkum, rides at dawn, and skies so clear the Milky Way casts shadows.", price: "from $7,200", image: "/images/tour-steppe.jpg" },
  ],
  destinations: [
    { name: "Samarkand", blurb: "The blue city that made the world hold its breath.", tours: "8 tours", image: "/images/dest-samarkand.jpg", span: "tall" },
    { name: "Bukhara", blurb: "Two thousand years of continuous human habitation, still breathing.", tours: "5 tours", image: "/images/dest-bukhara.jpg", span: "short" },
    { name: "Khiva", blurb: "An open-air museum so intact it seems to have outlasted time itself.", tours: "4 tours", image: "/images/dest-khiva.jpg", span: "short" },
    { name: "Tashkent", blurb: "A capital city that wears three centuries in a single afternoon.", tours: "6 tours", image: "/images/dest-tashkent.jpg", span: "tall" },
    { name: "Fergana Valley", blurb: "Where silk was born and the mountains guard ancient craft alive.", tours: "3 tours", image: "/images/dest-fergana.jpg", span: "medium" },
    { name: "Nurata", blurb: "At the desert's edge, a fortress older than the Silk Road itself.", tours: "2 tours", image: "/images/dest-nurata.jpg", span: "medium" },
  ],
  timeline: [
    { year: "2008", title: "Founded in Tashkent", body: "Akbar Rakhimov establishes Protocol Travel Services from a single office on Amir Temur Square, hosting twelve guests in the inaugural season. Every tour is led personally." },
    { year: "2011", title: "First International Recognition", body: "Condé Nast Traveller names Protocol one of Central Asia's most promising boutique operators. The team expands to Samarkand with a permanent cultural liaison and archive scholar." },
    { year: "2015", title: "Exclusive Partnerships Established", body: "Long-term agreements signed with the Samarkand State Museum of Culture and the Bukhara Architectural Heritage Institute, granting private after-hours access to key monuments." },
    { year: "2018", title: "A Decade on the Road", body: "Protocol marks ten years and 800 completed private journeys. The team of eighteen guides spans six cities and four language groups. A dedicated air charter division is launched." },
    { year: "2022", title: "Expansion to Fergana & Khiva", body: "Two new resident specialists join for the Fergana Valley and Khiva circuits. Protocol becomes the only operator offering exclusive yurt-camp nights inside the Kyzylkum reserve." },
    { year: "2024", title: "Present Day", body: "Over 1,240 private tours completed across 38 countries of origin. Protocol remains privately held, deliberately small, and wholly dedicated to depth over volume." },
  ],
  team: [
    { role: "Founder & Director", name: "Akbar Rakhimov", bio: "Art historian, fluent in six languages, twenty years on the Silk Road.", image: "/images/team-akbar.jpg" },
    { role: "Head of Guest Experience", name: "Nilufar Yusupova", bio: "Former senior concierge at Aman resorts. Orchestrates every detail before you arrive.", image: "/images/team-nilufar.jpg" },
    { role: "Lead Cultural Guide, Samarkand", name: "James Hartwell", bio: "Oxford-trained archaeologist. Fifteen seasons decoding Timurid inscriptions.", image: "/images/team-james.jpg" },
    { role: "Bukhara & Khiva Specialist", name: "Madina Karimova", bio: "Descendant of a Bukharan merchant family. Her knowledge of the old city is unmatched.", image: "/images/team-madina.jpg" },
  ],
  partners: [
    "Aman Resorts",
    "Orient Express Hotels",
    "Abercrombie & Kent",
    "Condé Nast Traveller",
    "National Geographic Expeditions",
    "IATA Certified",
  ],
  documentGroups: [
    {
      title: "Tour Operator Licenses",
      intro: "State-issued operating licenses authorising Protocol Travel Services to conduct inbound tourism activities within the Republic of Uzbekistan.",
      docs: [
        { type: "PDF", title: "State Tour Operator License", subtitle: "Inbound Tourism — Republic of Uzbekistan", issuer: "Ministry of Tourism and Cultural Heritage, Uzbekistan", issued: "Issued 12 March 2009", status: "Valid until 12 March 2027", statusType: "valid" },
        { type: "PDF", title: "Private Tour Operator Certification", subtitle: "Luxury & VIP Services Classification", issuer: "Uzbektourism National Company", issued: "Issued 8 January 2020", status: "Expired 8 January 2026", statusType: "expired" },
        { type: "DOC", title: "Foreign Tourist Services Permit", subtitle: "Authorisation for International Client Operations", issuer: "State Committee for Tourism Development", issued: "Issued 3 June 2022", status: "Expired 3 June 2025", statusType: "expired" },
      ],
    },
    {
      title: "Quality Certificates",
      intro: "International quality assurance certifications recognising Protocol's commitment to service standards, responsible tourism, and guest safety.",
      docs: [
        { type: "CERT", title: "ISO 9001:2015 Quality Management", subtitle: "Tourism Services — Certified Scope", issuer: "Bureau Veritas Certification", issued: "Issued 14 September 2021", status: "Expired 14 September 2024", statusType: "expired" },
        { type: "CERT", title: "Travelife Gold Certification", subtitle: "Sustainability in Tourism — Highest Award", issuer: "Travelife Ltd., Amsterdam", issued: "Issued 27 April 2023", status: "Expired 27 April 2026", statusType: "expired" },
        { type: "PDF", title: "SafeTravels Stamp", subtitle: "COVID-19 Health & Safety Protocols Compliant", issuer: "World Travel & Tourism Council (WTTC)", issued: "Issued 1 October 2021", status: "Ongoing membership", statusType: "ongoing" },
      ],
    },
    {
      title: "Association Memberships",
      intro: "Active memberships in leading international and regional tourism industry bodies, affirming Protocol's standing within the global travel community.",
      docs: [
        { type: "CERT", title: "ASTA Active Member", subtitle: "American Society of Travel Advisors", issuer: "ASTA — Washington D.C., USA", issued: "Issued 1 January 2016", status: "Ongoing membership", statusType: "ongoing" },
        { type: "CERT", title: "ECTAA Associate Member", subtitle: "European Travel Agents' & Tour Operators' Associations", issuer: "ECTAA — Brussels, Belgium", issued: "Issued 15 March 2018", status: "Ongoing membership", statusType: "ongoing" },
        { type: "CERT", title: "UNWTO Affiliate Member", subtitle: "United Nations World Tourism Organization", issuer: "UNWTO — Madrid, Spain", issued: "Issued 22 July 2019", status: "Ongoing membership", statusType: "ongoing" },
      ],
    },
  ],
  footerColumns: [
    { title: "Journeys", links: ["Private Tours", "Group Departures", "Custom Itineraries", "Day Excursions"] },
    { title: "Destinations", links: ["Samarkand", "Bukhara", "Khiva", "Tashkent", "Fergana Valley"] },
    { title: "Company", links: ["About Protocol", "Our Guides", "Press", "Sustainability"] },
    { title: "Resources", links: ["Documents & Visas", "Travel Advisories", "FAQ", "Terms"] },
  ],
  text: {
    brand_name: "PROTOCOL",
    brand_tagline: "Travel Services",
    contact_email: "travel@protocoluz.com",
    contact_phone: "+998 71 200 00 00",
    contact_address: "1 Amir Temur Square, Tashkent",
    contact_whatsapp: "998712000000",
    home_hero_eyebrow: "Uzbekistan · Private Tours · Since 2008",
    home_hero_title_1: "The Silk Road,",
    home_hero_title_2: "As It Was Meant To Be",
    home_hero_subtitle: "Bespoke private journeys through Samarkand, Bukhara, Khiva & Tashkent",
    home_hero_button: "Explore Our Tours",
    home_about_eyebrow: "About Protocol",
    home_about_heading: "We do not simply arrange travel. We compose experiences that endure long after the journey ends.",
    home_about_p1: "Protocol Travel Services is Uzbekistan's premier inbound tour operator for discerning private travellers. Founded in Tashkent in 2008, we have spent over fifteen years cultivating relationships with the finest guides, restorers, and scholars of the Silk Road — people who unlock doors that remain closed to ordinary visitors.",
    home_about_p2: "Every itinerary is designed around you: your pace, your passions, your private moments with monuments that once stood at the centre of the world.",
    home_about_link: "Our Story",
    home_featured_eyebrow: "Featured Journeys",
    home_featured_heading: "Curated Private Tours",
    home_featured_link: "View All Tours →",
    testimonial_quote: "Protocol did not take us to Uzbekistan. They took us inside it. Our guide spent thirty years studying Timurid manuscripts — he read the inscriptions to us in the original, beneath the arches of the Shah-i-Zinda at dawn. Nothing was what we expected. Everything was more.",
    testimonial_name: "Margaret & David Ashworth",
    testimonial_place: "London, United Kingdom",
    home_cta_eyebrow: "Begin Here",
    home_cta_title_1: "Your Silk Road Journey",
    home_cta_title_2: "Awaits Its Author",
    home_cta_button: "Plan Your Journey",
    tours_eyebrow: "Private Journeys",
    tours_title_1: "Our Tours &",
    tours_title_2: "Expeditions",
    tours_intro: "Every itinerary is designed as a starting point. We refine each journey around your pace, your passions, your private moments with the ancient world.",
    dest_eyebrow: "Where We Take You",
    dest_title: "Destinations",
    dest_intro: "Six cities. Thirty centuries. One continuous civilisation that once connected the world — and still does, for those who look closely enough.",
    dest_quote: "Every destination we offer, we know by foot — not by brochure.",
    dest_cta_link: "Plan a Custom Journey →",
    about_eyebrow: "Protocol Travel Services",
    about_title_1: "Our",
    about_title_2: "Story",
    about_hero_caption: "Bukhara, Uzbekistan",
    about_mission_eyebrow: "Our Mission",
    about_mission_heading: "To reveal the Silk Road as it has never been shown to the outside world — from the inside, with",
    about_mission_highlight: "depth and discretion.",
    about_founder_p1: "I founded Protocol because I was tired of watching my country be seen only in glimpses — a photograph of a dome, a souvenir from a market stall, a rushed morning at the Registan. Uzbekistan deserves more than that. So do the people who travel here.",
    about_founder_p2: "Our guests spend evenings with calligraphers in their workshops, mornings with archaeologists mid-excavation, and afternoons in private libraries holding manuscripts that predate print. This is not tourism. This is scholarship made comfortable.",
    about_founder_signature: "Akbar Rakhimov",
    about_milestones_eyebrow: "Milestones",
    about_milestones_title_1: "Sixteen Years",
    about_milestones_title_2: "in the Making",
    about_milestones_intro: "We have grown slowly and on purpose — adding one new specialist at a time, one new monument at a time, one new relationship at a time.",
    about_team_eyebrow: "The People",
    about_team_heading: "Meet the Team",
    about_team_intro: "A small, deliberately chosen group. Every specialist is an expert in a particular city, era, or craft — not a generalist guide.",
    about_partners_heading: "Trusted Partners & Accreditations",
    docs_eyebrow: "Trust & Transparency",
    docs_title_1: "Licenses &",
    docs_title_2: "Certifications",
    docs_intro: "Protocol Travel Services operates with full transparency. Every license, certificate, and membership we hold is listed here — available for your review and download. We believe that trust is not claimed; it is demonstrated.",
    docs_footnote: "All documents are maintained in their original language and accompanied by certified English translations where required. For verification requests, notarised copies, or due-diligence inquiries, please contact us directly at legal@protocoluz.com. Documents are updated within 30 days of renewal or amendment.",
  },
};

export const content: Record<Locale, SiteContent> = { ru, en };
