import type { Locale } from "./data";

// UI strings that are hardcoded in components/pages (not editable content).
type UIStrings = {
  scroll: string;
  filterDestination: string;
  filterDuration: string;
  filterTourType: string;
  allDestinations: string;
  anyDuration: string;
  allTypes: string;
  journeys: string; // shown after a count, e.g. "12 journeys"
  viewTour: string;
  discover: string;
  countryLabel: string; // small label on destination cards
  founderDirector: string;
  docView: string;
  docDownload: string;
  footerTagline: string;
  footerRights: string;
  // Tour booking
  book: string;
  bookHeading: string;
  bookSubheading: string;
  firstName: string;
  lastName: string;
  phone: string;
  submitBooking: string;
  sending: string;
  bookingSuccess: string;
  bookingError: string;
  close: string;
};

const dict: Record<Locale, UIStrings> = {
  ru: {
    scroll: "Листайте",
    filterDestination: "Направление",
    filterDuration: "Длительность",
    filterTourType: "Тип тура",
    allDestinations: "Все направления",
    anyDuration: "Любая длительность",
    allTypes: "Все типы",
    journeys: "маршрутов",
    viewTour: "Подробнее →",
    discover: "Открыть →",
    countryLabel: "Узбекистан",
    founderDirector: "Основатель и директор",
    docView: "Просмотр",
    docDownload: "Скачать",
    footerTagline:
      "Ведущий частный туроператор Узбекистана. Ташкент, основан в 2008 году.",
    footerRights: "Все права защищены.",
    book: "Забронировать",
    bookHeading: "Бронирование тура",
    bookSubheading: "Оставьте контакты — мы перезвоним и подтвердим детали.",
    firstName: "Имя",
    lastName: "Фамилия",
    phone: "Номер телефона",
    submitBooking: "Отправить заявку",
    sending: "Отправка…",
    bookingSuccess: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    bookingError: "Пожалуйста, заполните все поля.",
    close: "Закрыть",
  },
  en: {
    scroll: "Scroll",
    filterDestination: "Destination",
    filterDuration: "Duration",
    filterTourType: "Tour Type",
    allDestinations: "All Destinations",
    anyDuration: "Any Duration",
    allTypes: "All Types",
    journeys: "journeys",
    viewTour: "View Tour →",
    discover: "Discover →",
    countryLabel: "Uzbekistan",
    founderDirector: "Founder & Director",
    docView: "View",
    docDownload: "Download",
    footerTagline:
      "Uzbekistan's premier private tour operator. Tashkent, established 2008.",
    footerRights: "All rights reserved.",
    book: "Book This Tour",
    bookHeading: "Book Your Tour",
    bookSubheading: "Leave your details — we'll call you back to confirm.",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone number",
    submitBooking: "Send Request",
    sending: "Sending…",
    bookingSuccess: "Thank you! We'll be in touch shortly.",
    bookingError: "Please fill in all fields.",
    close: "Close",
  },
};

export function t(lang: Locale): UIStrings {
  return dict[lang];
}
