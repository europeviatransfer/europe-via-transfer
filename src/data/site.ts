  export const siteConfig = {
    phone: '+359 88 000 0000',
    phoneHref: 'tel:+359880000000',
    email: 'europeviatransfer@gmail.com',
    whatsapp: 'https://wa.me/359880000000',
    instagram: 'https://www.instagram.com/europeviatransfer',
    facebook: 'https://www.facebook.com/europeviatransfer',
    linkedin: 'https://www.linkedin.com/company/europe-via-transfer',
    google: 'https://g.page/europeviatransfer',
  }
  
  export const heroImage = '/hero.jpg'
  export const aboutImage = '/2025-Hyundai-Tucson.jpg?auto=compress&cs=tinysrgb&w=1400'
  
  export const navLinks = [
    { id: 'services', key: 'nav.services' },
    { id: 'routes', key: 'nav.routes' },
    { id: 'about', key: 'nav.about' },
    { id: 'contact', key: 'nav.contact' },
  ]
  
  export const routeKeys = [
    'sofiaBansko', 'sofiaPlovdiv', 'sofiaBorovets', 'sofiaThessaloniki',
    'sofiaKavala', 'sofiaAlexandroupoli', 'sofiaIstanbul', 'sofiaSkopje', 'custom',
  ] as const
  
  export const transferTypes = ['airport', 'hotel', 'business', 'vip', 'custom'] as const
  
  export interface RouteItem {
    id: string
    destKey: string
    noteKey: string
    durationLabelBg: string
    durationLabelEn: string
    image: string
    priceFrom: string
  }
  
  export const routes: RouteItem[] = [
    { id: 'bansko', destKey: 'routes.destinations.bansko', noteKey: 'routes.notes.bansko', durationLabelBg: '2 ч. 30 мин.', durationLabelEn: '2h 30m', image: '/images/bansko.jpg', priceFrom: '€120' },
    { id: 'plovdiv', destKey: 'routes.destinations.plovdiv', noteKey: 'routes.notes.plovdiv', durationLabelBg: '1 ч. 45 мин.', durationLabelEn: '1h 45m', image: '/images/plovdiv.jpg', priceFrom: '€85' },
    { id: 'borovets', destKey: 'routes.destinations.borovets', noteKey: 'routes.notes.borovets', durationLabelBg: '1 ч. 15 мин.', durationLabelEn: '1h 15m', image: '/images/borovetz.jpg', priceFrom: '€70' },
    { id: 'thessaloniki', destKey: 'routes.destinations.thessaloniki', noteKey: 'routes.notes.thessaloniki', durationLabelBg: '4 ч. 30 мин.', durationLabelEn: '4h 30m', image: '/images/thessaloniki.jpg', priceFrom: '€280' },
    { id: 'kavala', destKey: 'routes.destinations.kavala', noteKey: 'routes.notes.kavala', durationLabelBg: '5 ч. 15 мин.', durationLabelEn: '5h 15m', image: '/images/kavala.jpg', priceFrom: '€320' },
    { id: 'alexandroupoli', destKey: 'routes.destinations.alexandroupoli', noteKey: 'routes.notes.alexandroupoli', durationLabelBg: '6 ч.', durationLabelEn: '6h', image: '/images/aleaxandoupoli.jpg', priceFrom: '€360' },
    { id: 'istanbul', destKey: 'routes.destinations.istanbul', noteKey: 'routes.notes.istanbul', durationLabelBg: '7 ч. 30 мин.', durationLabelEn: '7h 30m', image: '/images/istanbul.jpg', priceFrom: '€520' },
    { id: 'skopje', destKey: 'routes.destinations.skopje', noteKey: 'routes.notes.skopje', durationLabelBg: '3 ч. 30 мин.', durationLabelEn: '3h 30m', image: '/images/skopie.jpg', priceFrom: '€210' },
  ]
  
  export interface ServiceItem {
    id: string
    icon: string
    nameKey: string
    descKey: string
  }
  
  export const services: ServiceItem[] = [
    { id: 'airport', icon: 'Plane', nameKey: 'services.items.airport.name', descKey: 'services.items.airport.desc' },
    { id: 'hotel', icon: 'Building2', nameKey: 'services.items.hotel.name', descKey: 'services.items.hotel.desc' },
    { id: 'vip', icon: 'Crown', nameKey: 'services.items.vip.name', descKey: 'services.items.vip.desc' },
    { id: 'crossBorder', icon: 'Globe', nameKey: 'services.items.crossBorder.name', descKey: 'services.items.crossBorder.desc' },
    { id: 'intercity', icon: 'Route', nameKey: 'services.items.intercity.name', descKey: 'services.items.intercity.desc' },
    { id: 'custom', icon: 'Sparkles', nameKey: 'services.items.custom.name', descKey: 'services.items.custom.desc' },
  ]
  
  export interface WhyItem {
    id: string
    icon: string
    titleKey: string
    descKey: string
  }
  
  export const whyItems: WhyItem[] = [
    { id: 'punctuality', icon: 'Clock', titleKey: 'why.items.punctuality', descKey: 'why.items.punctualityD' },
    { id: 'drivers', icon: 'UserCheck', titleKey: 'why.items.drivers', descKey: 'why.items.driversD' },
    { id: 'vehicles', icon: 'Car', titleKey: 'why.items.vehicles', descKey: 'why.items.vehiclesD' },
    { id: 'waiting', icon: 'Hourglass', titleKey: 'why.items.waiting', descKey: 'why.items.waitingD' },
    { id: 'flight', icon: 'Plane', titleKey: 'why.items.flight', descKey: 'why.items.flightD' },
    { id: 'water', icon: 'Droplets', titleKey: 'why.items.water', descKey: 'why.items.waterD' },
    { id: 'wifi', icon: 'Wifi', titleKey: 'why.items.wifi', descKey: 'why.items.wifiD' },
    { id: 'child', icon: 'Baby', titleKey: 'why.items.child', descKey: 'why.items.childD' },
    { id: 'luggage', icon: 'Briefcase', titleKey: 'why.items.luggage', descKey: 'why.items.luggageD' },
    { id: 'privacy', icon: 'Lock', titleKey: 'why.items.privacy', descKey: 'why.items.privacyD' },
    { id: 'availability', icon: 'CalendarClock', titleKey: 'why.items.availability', descKey: 'why.items.availabilityD' },
  ]
  
  export interface Testimonial {
    id: string
    name: string
    roleBg: string
    roleEn: string
    location: string
    rating: number
    textBg: string
    textEn: string
  }
  
  export const testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Alexander Petrov',
      roleBg: 'Управител, инвестиционна фирма',
      roleEn: 'Managing Partner, investment firm',
      location: 'Sofia',
      rating: 5,
      textBg: 'Използвам услугите на Europe Via Transfer за бизнес пътувания вече повече от три години. Винаги мога да разчитам на точност, професионално отношение и дискретност. Автомобилите са отлично поддържани, а обслужването е на постоянно високо ниво. Това е компания, на която се доверявам без колебание.',
      textEn: 'I have been using Europe Via Transfer for my business travel for over three years now, and they have never let me down. The drivers are always punctual and professional, the vehicles are clean and comfortable, and the whole experience is smooth from start to finish. I highly recommend them.',
    },
    {
      id: 't2',
      name: 'Elena Markova',
      roleBg: 'Арт директор, модна агенция',
      roleEn: 'Art Director, fashion agency',
      location: 'Plovdiv',
      rating: 4.5,
      textBg: 'Резервирах трансфер за нашето събитие в Банско. Шофьорът ни чакаше в залата, пое багажа и цялото пътуване мина в пълна тишина и комфорт. Услуги на ниво, което не съм срещала в България досега.',
      textEn: 'I booked a transfer for our event in Bansko. The chauffeur was waiting in the hall, took the luggage and the whole journey passed in complete silence and comfort. Service at a level I have not experienced in Bulgaria before.',
    },
    {
      id: 't3',
      name: 'Jonathan Reeves',
      roleBg: 'Гост от Великобритания',
      roleEn: 'Guest from the United Kingdom',
      location: 'London',
      rating: 5,
      textBg: 'Трансфер от летище София до Боровец в студена зимна вечер. Шофьорът професионалист, автомобилът безупречен. Точно това, което търсиш, когато пътуваш заради почивка и искаш да започне още от летището.',
      textEn: 'A transfer from Sofia airport to Borovets on a cold winter evening. Professional chauffeur, immaculate vehicle. Exactly what you look for when travelling for a holiday and want it to begin right at the airport.',
    },
    {
      id: 't4',
      name: 'Maria Stoyanova',
      roleBg: 'Семейно пътуване',
      roleEn: 'Family travel',
      location: 'Sofia',
      rating: 5,
      textBg: 'Пътувахме до Солун с две деца. Детски столчета, вода, Wi-Fi — всичко беше подготвено. Шофьорът спря за кратка почивка, когато поискахме. Професионализъм и човещина в едно.',
      textEn: 'We travelled to Thessaloniki with two children. Child seats, water, Wi-Fi — everything was prepared. The chauffeur stopped for a short break when we asked. Professionalism and humanity in one.',
    },
  ]
  
  export const aboutStats = [
    { key: 'years', valueKey: 'about.statValues.years', labelKey: 'about.stats.years' },
    { key: 'clients', valueKey: 'about.statValues.clients', labelKey: 'about.stats.clients' },
    { key: 'cities', valueKey: 'about.statValues.cities', labelKey: 'about.stats.cities' },
    { key: 'rating', valueKey: 'about.statValues.rating', labelKey: 'about.stats.rating' },
  ]
  
  export const footerQuickLinks = [
    { id: 'home', key: 'nav.home' },
    { id: 'services', key: 'nav.services' },
    { id: 'routes', key: 'nav.routes' },
    { id: 'about', key: 'nav.about' },
    { id: 'contact', key: 'nav.contact' },
    { id: 'booking', key: 'nav.booking' },
  ]
  
  export const footerServiceLinks = [
    { id: 'services', key: 'services.items.airport.name' },
    { id: 'services', key: 'services.items.hotel.name' },
    { id: 'services', key: 'services.items.business.name' },
    { id: 'services', key: 'services.items.vip.name' },
    { id: 'services', key: 'services.items.crossBorder.name' },
  ]
  
  export const faqCount = 9
