import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useParams,
  useNavigate
} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Menu, 
  X,
  ShieldCheck,
  Settings,
  Truck,
  Wrench,
  Calculator,
  FileText,
  Info,
  Eye,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MACHINES, ARTICLES, DEALERS, COMPARISON_POINTS, LEASING_PARTNERS } from './constants';
import ChatWidget from './components/ChatWidget';
import FeedbackModal from './components/FeedbackModal';
import LeasingCalculator from './components/LeasingCalculator';
import Admin from './pages/Admin';

// --- Shared Components ---

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="46" stroke="#E31E24" strokeWidth="6" fill="none" />
          <path 
            d="M50 15 L85 75 L15 75 Z" 
            fill="none" 
            stroke="#E31E24" 
            strokeWidth="8" 
            strokeLinejoin="round"
          />
          <path 
            d="M50 30 L70 65 L30 65 Z" 
            fill="#E31E24"
          />
          <rect x="44" y="65" width="12" height="15" fill="#E31E24" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-black text-2xl tracking-tighter text-brand-dark">LGZT</span>
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-brand-red">Russia</span>
      </div>
    </div>
  );
}

const SPECS_TRANSLATIONS: Record<string, string> = {
  engine: 'Двигатель',
  power: 'Мощность',
  fuel: 'Топливо',
  transmission: 'Трансмиссия',
  drive: 'Привод',
  liftHeight: 'Высота подъема',
  dischargeHeight: 'Высота выгрузки',
  weight: 'Собственный вес',
  payload: 'Грузоподъемность',
  bucket: 'Объем ковша',
  dimensions: 'Габариты'
};

function Header({ onOpenFeedback }: { onOpenFeedback: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-wider">
          <Link to="/catalog" className="hover:text-brand-orange transition-colors">Каталог</Link>
          <Link to="/leasing" className="hover:text-brand-orange transition-colors">Лизинг</Link>
          <Link to="/articles" className="hover:text-brand-orange transition-colors">Статьи</Link>
          <Link to="/contacts" className="hover:text-brand-orange transition-colors">Контакты</Link>
          <button 
            onClick={() => onOpenFeedback()}
            className="bg-brand-dark text-white px-6 py-2.5 rounded-full hover:bg-brand-orange transition-all duration-300"
          >
            Заказать звонок
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 p-6 flex flex-col gap-4 shadow-xl"
          >
            <Link to="/catalog" className="text-lg font-medium">Каталог</Link>
            <Link to="/leasing" className="text-lg font-medium">Лизинг</Link>
            <Link to="/articles" className="text-lg font-medium">Статьи</Link>
            <Link to="/contacts" className="text-lg font-medium">Контакты</Link>
            <button 
              onClick={onOpenFeedback}
              className="bg-yellow-400 text-stone-900 font-bold py-3 rounded-xl mt-4"
            >
              Связаться с нами
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer({ machines }: { machines: any[] }) {
  return (
    <footer className="bg-stone-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="46" stroke="#E31E24" strokeWidth="6" fill="none" />
                <path d="M50 15 L85 75 L15 75 Z" fill="none" stroke="#E31E24" strokeWidth="8" strokeLinejoin="round" />
                <path d="M50 30 L70 65 L30 65 Z" fill="#E31E24" />
                <rect x="44" y="65" width="12" height="15" fill="#E31E24" />
              </svg>
              <span className="font-black text-xl tracking-tighter">LGZT <span className="text-brand-red">RUSSIA</span></span>
            </div>
          </Link>
          <p className="text-stone-500 text-sm leading-relaxed">
            Официальный импортер и дистрибьютор мини-фронтальных погрузчиков LGZT на территории Российской Федерации.
          </p>
        </div>
        
        <div>
          <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-brand-orange">Техника</h6>
          <ul className="space-y-4 text-sm text-stone-400">
            {machines.slice(0, 5).map(m => (
              <li key={m.id}><Link to={`/catalog/${m.slug}`} className="hover:text-white transition-colors">{m.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-brand-orange">Компания</h6>
          <ul className="space-y-4 text-sm text-stone-400">
            <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
            <li><Link to="/leasing" className="hover:text-white transition-colors">Лизинг</Link></li>
            <li><Link to="/articles" className="hover:text-white transition-colors">Статьи</Link></li>
            <li><Link to="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors opacity-20">Панель управления</Link></li>
          </ul>
        </div>

        <div>
          <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-yellow-500">Поддержка</h6>
          <div className="space-y-4">
            <a href="tel:88005553535" className="block text-lg font-bold hover:text-yellow-400 transition-colors">8 800 555 35 35</a>
            <p className="text-xs text-stone-500">Пн-Пт: 09:00 — 18:00 (МСК)</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-600 uppercase tracking-widest">
        <div>© 2026 LGZT RUSSIA. Все права защищены.</div>
        <div className="flex gap-8">
          <Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
          <Link to="/offer" className="hover:text-white transition-colors">Публичная оферта</Link>
        </div>
      </div>
    </footer>
  );
}

// --- Page Components ---

function LeasingTicker() {
  return (
    <div className="bg-stone-50 py-10 overflow-hidden border-y border-stone-100">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...LEASING_PARTNERS, ...LEASING_PARTNERS].map((partner, i) => (
          <div key={i} className="flex items-center mx-16 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 cursor-default">
            <img src={partner.logo} alt={partner.name} className="h-10 object-contain" referrerPolicy="no-referrer" />
            <span className="ml-4 font-black text-stone-300 uppercase tracking-[0.2em] text-[10px]">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home({ machines, onOpenFeedback }: { machines: any[], onOpenFeedback: (title?: string) => void }) {
  const [selectedMachine, setSelectedMachine] = useState(machines[0] || MACHINES[0]);

  useEffect(() => {
    if (machines.length > 0 && !selectedMachine.id) {
      setSelectedMachine(machines[0]);
    }
  }, [machines]);

  if (!selectedMachine) return null;

  return (
    <>
      <Helmet>
        <title>LGZT Russia — Официальный импортер мини-погрузчиков LGZT</title>
        <meta name="description" content="Купить мини-погрузчики LGZT в России. Официальный дилер, сервис, запчасти. Лизинг от 0% аванса. Тест-драйв в вашем городе." />
        <meta name="keywords" content="LGZT, мини-погрузчик, фронтальный погрузчик, купить погрузчик, спецтехника, LGZT Russia" />
        <link rel="canonical" href="https://lgzt-russia.ru/" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/loader-hero/1920/1080" 
            alt="LGZT Loader" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl sm:text-9xl font-black text-white uppercase leading-[0.8] tracking-tighter mb-10">
              Сила <br /> <span className="text-brand-orange">в Маневре</span>
            </h1>
            <p className="text-stone-400 text-lg sm:text-xl mb-12 max-w-lg leading-relaxed">
              Мини-фронтальные погрузчики LGZT. Надежная техника для решения Ваших задач.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link to="/catalog" className="bg-brand-orange text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-white hover:text-brand-dark transition-all shadow-2xl shadow-brand-orange/20">
                В КАТАЛОГ
              </Link>
              <button 
                onClick={() => onOpenFeedback("Консультация по технике")}
                className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-lg hover:bg-white hover:text-brand-dark transition-all"
              >
                ЗАКАЗАТЬ ЗВОНОК
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <LeasingTicker />

      {/* Technical Advantages */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-12">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
                    Техническое <br /> <span className="text-brand-orange">Превосходство</span>
                  </h2>
                  <p className="text-stone-500 text-lg leading-relaxed">
                    Погрузчики LGZT спроектированы для работы в ограниченных пространствах, где обычная техника бессильна.
                  </p>
                </div>

                <div className="grid gap-8">
                  <div className="flex gap-6 items-start p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-brand-orange/30 transition-all group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                      <Eye size={28} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-tight mb-2">Обзорность +40%</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Конструкция кабины и стрелы обеспечивает панорамный обзор, исключая "слепые зоны".</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-brand-orange/30 transition-all group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                      <Settings size={28} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-tight mb-2">Технологии Volvo</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">В производстве применяются технологии, внедряемые совместно с холдингом VOLVO CE с 2007 года.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-brand-orange/30 transition-all group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                      <Zap size={28} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-tight mb-2">Комплектация Deluxe</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Самая богатая стандартная комплектация: камера, кондиционер, джойстик, быстросъем и 4-контурная гидролиния.</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-brand-orange/30 transition-all group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-tight mb-2">Гарантия 1 год</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Официальная поддержка 12 месяцев или 1500 моточасов. Склад запчастей всегда в наличии.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl rotate-3 scale-95 hover:rotate-0 hover:scale-100 transition-all duration-700">
                <img src="https://picsum.photos/seed/tech/1000/1000" alt="Tech" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-brand-dark text-white p-10 rounded-[40px] shadow-2xl border border-white/10 max-w-xs">
                <div className="text-5xl font-black text-brand-orange mb-2">8X</div>
                <div className="text-sm font-bold uppercase tracking-widest leading-tight">Меньше износ шин <br /> <span className="opacity-40 font-medium">чем у Bobcat</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deluxe Configuration Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-20">
            <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              Стандарт оборудования
            </div>
            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-8">
              Комплектация <span className="text-brand-orange">Deluxe</span>
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              У фронтальных погрузчиков LGZT самая богатая стандартная комплектация на рынке. Вы получаете всё необходимое для работы без доплат.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Камера заднего вида', desc: 'Безопасность при маневрировании' },
              { title: 'Кондиционер', desc: 'Комфорт в любую жару' },
              { title: 'Джойстиковое управление', desc: 'Точность и легкость работы' },
              { title: 'Быстросъем (квик-каплер)', desc: 'Смена оборудования за 1 минуту' },
              { title: '4-контурная гидролиния', desc: 'Работа с любым навесным' },
              { title: 'Подогрев двигателя 220В', desc: 'Легкий запуск в морозы' },
              { title: 'LED ФАРЫ', desc: 'Яркое освещение рабочей зоны' },
              { title: 'Усиленный ковш', desc: 'Долговечность в тяжелых условиях' },
              { title: 'MP3/USB система', desc: 'Рабочая атмосфера в кабине' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:shadow-xl transition-all">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange mb-6">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="font-black uppercase text-sm tracking-tight mb-2">{item.title}</h4>
                <p className="text-stone-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand History Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                История бренда
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Наследие <br /> <span className="text-brand-orange">Lingong Group</span>
              </h2>
              <div className="space-y-6 text-stone-500 text-lg leading-relaxed">
                <p>
                  Компания <span className="font-bold text-brand-dark">LGZT</span> (Shandong Huawei Zot Machinery Co., Ltd) является ключевым членом <span className="font-bold text-brand-dark">Lingong Group (SDLG/LGCE)</span> и входит в глобальный холдинг <span className="font-bold text-brand-dark">Volvo</span>.
                </p>
                <p>
                  Опираясь на 50-летний опыт Lingong Group в производстве строительной техники, LGZT специализируется на разработке экономичной малой спецтехники повышенного качества.
                </p>
                <p>
                  Сегодня продукция бренда экспортируется в более чем 20 стран мира, включая Россию, Австралию и Южную Америку, предлагая надежность мирового уровня по доступной цене.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl font-black text-brand-dark">50+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Лет опыта</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-brand-dark">100+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Патентов</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-brand-dark">20+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Стран мира</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/factory1/600/800" alt="Factory" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
              <div className="space-y-4 mt-12">
                <img src="https://picsum.photos/seed/factory2/600/400" alt="Production" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/factory3/600/400" alt="Quality" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Гарантия качества', desc: 'Заводской контроль' },
            { icon: Settings, title: 'Запчасти в наличии', desc: 'Собственные склады' },
            { icon: Truck, title: 'Доставка по РФ', desc: 'Любым транспортом' },
            { icon: Wrench, title: 'Сервис 24/7', desc: 'Выездные бригады' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="bg-stone-100 p-3 rounded-xl text-yellow-600">
                <item.icon size={24} />
              </div>
              <div>
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-xs opacity-60">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catalog Preview - Mirrored Layout */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Модельный ряд <span className="text-brand-orange">в наличии</span></h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Техника, готовая к отгрузке сегодня. Проверенные модели в максимальной комплектации для Вашего бизнеса.
          </p>
        </div>

        <div className="space-y-32">
          {machines.filter(m => m.status === 'in-stock').map((m, i) => (
            <div key={m.id} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-brand-orange text-white px-8 py-4 rounded-2xl font-black text-2xl shadow-xl">
                    ОТ {m.price.toLocaleString()} ₽
                  </div>
                </motion.div>
              </div>
              
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="text-brand-orange font-black uppercase tracking-widest text-xs">В наличии на складе</div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">{m.name}</h3>
                  <p className="text-stone-500 text-lg leading-relaxed">{m.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(m.specs).slice(0, 4).map(([key, value], idx) => (
                    <div key={idx} className="border-b border-stone-100 pb-2">
                      <div className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">{SPECS_TRANSLATIONS[key] || key}</div>
                      <div className="font-bold text-sm">{value as string}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to={`/catalog/${m.slug}`} className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-orange transition-all">
                    ПОДРОБНЕЕ
                  </Link>
                  <button 
                    onClick={() => onOpenFeedback(`Заявка на ${m.name}`)}
                    className="border border-stone-200 px-8 py-4 rounded-xl font-bold hover:bg-stone-50 transition-all"
                  >
                    ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">
              LGZT vs <span className="text-yellow-500">Мини-погрузчик</span>
            </h2>
          </div>
          <div className="grid gap-4">
            {COMPARISON_POINTS.map((point, i) => (
              <div key={i} className="grid md:grid-cols-[1fr,2fr,2fr] items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="font-bold text-yellow-500 uppercase text-xs tracking-widest">{point.title}</div>
                <div className="text-sm font-medium">{point.lgzt}</div>
                <div className="text-sm opacity-60">{point.skidSteer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Leasing Section */}
      <section className="py-24 bg-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-brand-dark rounded-[40px] p-8 sm:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Финансовые инструменты
              </div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                Лизинг с выгодой <br /> <span className="text-brand-orange">до 1 000 000 ₽</span>
              </h2>
              <p className="text-stone-400 mb-8">
                Получите технику в работу уже завтра. Аванс от 0%, решение за 1 день. 
                Работаем со всеми ведущими лизинговыми компаниями РФ.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/leasing" className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-brand-dark transition-colors text-center">
                  Подробнее о лизинге
                </Link>
                <button onClick={() => onOpenFeedback("Расчет лизинга")} className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-colors text-center">
                  Рассчитать платеж
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {[
                { label: 'Аванс', val: 'от 0%' },
                { label: 'Срок', val: 'до 5 лет' },
                { label: 'НДС', val: 'Возврат 20%' },
                { label: 'Решение', val: '1 день' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                  <div className="text-brand-orange text-2xl font-black">{stat.val}</div>
                  <div className="text-[10px] uppercase font-bold text-stone-500 tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const MachineCard: React.FC<{ m: any }> = ({ m }) => (
  <Link to={`/catalog/${m.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all relative">
    {m.status === 'in-stock' && (
      <div className="absolute top-4 left-4 z-10 bg-green-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
        В наличии
      </div>
    )}
    <div className="aspect-[4/3] overflow-hidden">
      <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold mb-2">{m.name}</h3>
      <div className="flex gap-2 mb-4">
        <span className="text-[10px] bg-stone-100 px-2 py-1 rounded font-bold uppercase tracking-wider text-stone-500">
          {m.specs.payload}
        </span>
        <span className="text-[10px] bg-stone-100 px-2 py-1 rounded font-bold uppercase tracking-wider text-stone-500">
          {m.specs.dischargeHeight}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-black text-brand-orange">
          {m.status === 'on-order' ? 'По запросу' : `${m.price.toLocaleString()} ₽`}
        </div>
        <div className="bg-stone-100 p-2 rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  </Link>
);

function Catalog({ machines }: { machines: any[] }) {
  const [filters, setFilters] = useState({
    series: 'all',
    payload: 'all',
    height: 'all'
  });

  const filteredMachines = machines.filter(m => {
    const seriesMatch = filters.series === 'all' || 
      (filters.series === 'deluxe' ? m.id?.includes('deluxe') : m.id?.includes('standart'));
    
    const payloadMatch = filters.payload === 'all' || 
      String(m.specs?.payload || '').includes(filters.payload);

    const heightMatch = filters.height === 'all' || 
      String(m.specs?.dischargeHeight || '').includes(filters.height);

    return seriesMatch && payloadMatch && heightMatch;
  });

  const inStock = filteredMachines.filter(m => m.status === 'in-stock');
  const onOrder = filteredMachines.filter(m => m.status === 'on-order');

  const filterOptions = {
    series: [
      { id: 'all', label: 'Все серии' },
      { id: 'deluxe', label: 'Deluxe' },
      { id: 'standart', label: 'Standart' }
    ],
    payload: [
      { id: 'all', label: 'Любая г/п' },
      { id: '1000', label: '1000 кг' },
      { id: '1500', label: '1500 кг' },
      { id: '2000', label: '2000 кг' }
    ],
    height: [
      { id: 'all', label: 'Любая высота' },
      { id: '2.4', label: '2.4 м' },
      { id: '3', label: '3.0 м' },
      { id: '3.5', label: '3.5 м' },
      { id: '3.7', label: '3.7 м' }
    ]
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Каталог мини-погрузчиков LGZT | Модельный ряд 2026</title>
        <meta name="description" content="Полный каталог мини-фронтальных погрузчиков LGZT. Технические характеристики, цены, комплектации Deluxe и Standart. Выберите свой погрузчик." />
        <meta name="keywords" content="каталог LGZT, модели погрузчиков, характеристики погрузчиков, LG918, LG928, LG938" />
        <link rel="canonical" href="https://lgzt-russia.ru/catalog" />
      </Helmet>
      <div className="mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Каталог <span className="text-brand-orange">Техники</span></h1>
        
        {/* Enhanced Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 grid md:grid-cols-3 gap-6">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">
                {key === 'series' ? 'Серия' : key === 'payload' ? 'Грузоподъемность' : 'Высота выгрузки'}
              </label>
              <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFilters({ ...filters, [key]: opt.id })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      filters[key as keyof typeof filters] === opt.id 
                        ? 'bg-brand-dark text-white border-brand-dark shadow-lg' 
                        : 'bg-stone-50 text-stone-500 border-stone-100 hover:border-stone-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredMachines.length > 0 ? (
        <div className="space-y-20">
          {inStock.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight">Техника в наличии</h2>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {inStock.map(m => <MachineCard key={m.id} m={m} />)}
              </div>
            </div>
          )}

          {onOrder.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight text-stone-400">Под заказ</h2>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {onOrder.map(m => <MachineCard key={m.id} m={m} />)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-24 text-center bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200">
          <Info className="mx-auto text-stone-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-stone-500">Техника не найдена</h3>
          <p className="text-stone-400 mt-2">Попробуйте изменить параметры фильтрации</p>
          <button 
            onClick={() => setFilters({ series: 'all', payload: 'all', height: 'all' })}
            className="mt-6 text-brand-dark font-bold underline underline-offset-4"
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
}

function MachineDetail({ machines, onOpenFeedback }: { machines: any[], onOpenFeedback: (title: string) => void }) {
  const { slug } = useParams();
  const machine = machines.find(m => m.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!machine) return <div className="py-24 text-center">Модель не найдена</div>;

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>{machine.name} — Купить мини-погрузчик LGZT</title>
        <meta name="description" content={machine.description} />
        <meta name="keywords" content={`${machine.name}, купить ${machine.name}, характеристики ${machine.name}, погрузчик LGZT`} />
        <link rel="canonical" href={`https://lgzt-russia.ru/catalog/${machine.slug}`} />
      </Helmet>
      <Link to="/catalog" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-12 transition-colors">
        <ArrowRight className="rotate-180" size={20} /> Назад в каталог
      </Link>
      
      <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl bg-stone-100">
            <img 
              src={machine.images?.[activeImage] || machine.image} 
              alt={machine.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          {machine.images && machine.images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {machine.images.map((img: string, i: number) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-brand-orange shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 pt-6">
            {machine.features.map((f: string, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-stone-100">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-12">
          <div>
            <div className="inline-block bg-brand-orange/10 text-brand-orange px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              {machine.status === 'in-stock' ? 'В наличии' : 'Под заказ'}
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{machine.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-black text-brand-orange">
              {machine.status === 'on-order' ? 'Цена по запросу' : `${machine.price.toLocaleString()} ₽`}
            </div>
          </div>
            <p className="text-stone-500 text-lg leading-relaxed">{machine.longDescription}</p>
          </div>
          
          <div className="bg-stone-50 rounded-[32px] p-8 border border-stone-100">
            <h3 className="text-xl font-bold mb-6">Технические характеристики</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {Object.entries(machine.specs).map(([key, value], i) => (
                <div key={i} className="flex flex-col border-b border-stone-200 pb-3">
                  <span className="text-[10px] uppercase font-black text-stone-400 tracking-widest mb-1">{SPECS_TRANSLATIONS[key] || key}</span>
                  <span className="text-sm font-bold">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onOpenFeedback(`Запрос по модели: ${machine.name}`)}
              className="flex-1 bg-brand-dark text-white py-6 rounded-2xl font-black text-xl hover:bg-brand-orange transition-all shadow-xl shadow-brand-dark/10"
            >
              ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
            </button>
            <button 
              onClick={() => {
                const calc = document.getElementById('leasing-calc');
                calc?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 bg-white border-2 border-stone-100 text-stone-900 py-6 rounded-2xl font-black text-xl hover:border-brand-orange transition-all"
            >
              В ЛИЗИНГ
            </button>
          </div>
        </div>
      </div>

      <div id="leasing-calc" className="scroll-mt-32">
        <LeasingCalculator initialPrice={machine.price} onOpenFeedback={onOpenFeedback} />
      </div>
    </div>
  );
}

function Leasing({ onOpenFeedback }: { onOpenFeedback: (title: string) => void }) {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Лизинг спецтехники LGZT | Аванс от 0%</title>
        <meta name="description" content="Выгодные условия лизинга на погрузчики LGZT. Решение за 1 день, аванс от 0%, срок до 5 лет. Рассчитайте платеж на онлайн-калькуляторе." />
        <meta name="keywords" content="лизинг спецтехники, лизинг погрузчиков, купить в лизинг, LGZT лизинг" />
        <link rel="canonical" href="https://lgzt-russia.ru/leasing" />
      </Helmet>
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <div className="inline-block bg-brand-orange text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Финансовые программы
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">Лизинг <br /> <span className="text-brand-orange">Спецтехники</span></h1>
          <p className="text-stone-500 text-lg mb-12 leading-relaxed max-w-lg">
            Мы сотрудничаем с ведущими лизинговыми компаниями России, чтобы предложить вам максимально выгодные условия приобретения техники LGZT.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              'Аванс от 0%',
              'Срок до 60 мес.',
              'Решение за 1 день',
              'Возврат НДС 20%'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
                <div className="bg-brand-orange/10 p-1.5 rounded-full text-brand-orange"><CheckCircle2 size={18} /></div>
                <span className="font-bold text-sm">{item}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => onOpenFeedback("Консультация по лизингу")}
            className="bg-brand-dark text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-brand-orange transition-all shadow-xl shadow-brand-dark/10"
          >
            ОСТАВИТЬ ЗАЯВКУ
          </button>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-brand-orange/5 blur-3xl rounded-full" />
          <div className="relative bg-white rounded-[40px] p-12 border border-stone-100 shadow-2xl">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Наши партнеры</h3>
            <div className="mb-8 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-6">
              <img src="https://vtb-leasing.ru/local/templates/vtb/img/logo.svg" alt="VTB Leasing" className="h-12 object-contain" referrerPolicy="no-referrer" />
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Генеральный партнер</div>
                <div className="text-sm font-bold text-blue-900 leading-tight">Спецпрограммы лизинга от ВТБ для клиентов LGZT</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {LEASING_PARTNERS.map((p, i) => (
                <div key={i} className="h-16 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <LeasingCalculator onOpenFeedback={onOpenFeedback} />
      </div>
    </div>
  );
}

function ArticleDetail({ articles }: { articles: any[] }) {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) return <div className="py-24 text-center">Статья не найдена</div>;

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>{article.title} | LGZT Russia</title>
        <meta name="description" content={article.desc} />
        <link rel="canonical" href={`https://lgzt-russia.ru/articles/${article.slug}`} />
      </Helmet>
      <Link to="/articles" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-12 transition-colors">
        <ArrowRight className="rotate-180" size={20} /> Назад к списку
      </Link>
      <div className="text-xs font-bold text-brand-orange uppercase mb-4 tracking-widest">{article.date}</div>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover rounded-[40px] mb-12 shadow-xl" referrerPolicy="no-referrer" />
      <div className="prose prose-stone max-w-none">
        <p className="text-xl text-stone-600 mb-8 leading-relaxed font-medium">{article.desc}</p>
        <div className="text-stone-800 leading-relaxed space-y-6">
          {article.content.split('\n').map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Articles({ articles }: { articles: any[] }) {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Новости и статьи LGZT Russia | Спецтехника в России</title>
        <meta name="description" content="Полезные статьи о выборе и эксплуатации мини-погрузчиков, новости компании LGZT Russia, обзоры новых моделей." />
        <meta name="keywords" content="новости LGZT, статьи о погрузчиках, обзоры спецтехники" />
        <link rel="canonical" href="https://lgzt-russia.ru/articles" />
      </Helmet>
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-16">Статьи и <span className="text-brand-orange">Новости</span></h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <Link to={`/articles/${article.slug}`} key={article.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all">
            <img src={article.image} alt={article.title} className="w-full h-56 object-cover" referrerPolicy="no-referrer" />
            <div className="p-8">
              <div className="text-xs font-bold text-stone-400 uppercase mb-2">{article.date}</div>
              <h3 className="text-xl font-bold mb-4 leading-tight">{article.title}</h3>
              <p className="text-stone-500 text-sm mb-6 line-clamp-3">{article.desc}</p>
              <div className="text-stone-900 font-bold flex items-center gap-2 hover:text-brand-orange transition-colors">
                Читать статью <ChevronRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Contacts({ onOpenFeedback }: { onOpenFeedback: () => void }) {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Контакты LGZT Russia — Официальный дилер</title>
        <meta name="description" content="Свяжитесь с нами для консультации по выбору погрузчика LGZT. Адреса дилерских центров, телефоны, форма обратной связи." />
        <link rel="canonical" href="https://lgzt-russia.ru/contacts" />
      </Helmet>
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-16">Наши <span className="text-yellow-500">Контакты</span></h1>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-stone-100 w-12 h-12 rounded-2xl flex items-center justify-center text-yellow-600"><Phone /></div>
              <h4 className="font-bold">Телефон</h4>
              <p className="text-stone-500">8 800 555 35 35<br />Бесплатно по РФ</p>
            </div>
            <div className="space-y-4">
              <div className="bg-stone-100 w-12 h-12 rounded-2xl flex items-center justify-center text-yellow-600"><Mail /></div>
              <h4 className="font-bold">Email</h4>
              <p className="text-stone-500">info@lgztrussia.ru<br />sales@lgztrussia.ru</p>
            </div>
          </div>
          <div className="bg-stone-900 text-white p-12 rounded-[40px]">
            <h3 className="text-2xl font-bold mb-6">Стать дилером</h3>
            <p className="text-stone-400 mb-8">Мы расширяем дилерскую сеть и приглашаем к сотрудничеству надежных партнеров в регионах.</p>
            <button 
              onClick={onOpenFeedback}
              className="bg-yellow-400 text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors"
            >
              ОТПРАВИТЬ ЗАЯВКУ
            </button>
          </div>
        </div>
        <div className="bg-stone-100 rounded-[40px] p-12 border border-stone-200 flex flex-col justify-center items-center text-center">
          <MapPin size={64} className="text-yellow-500 mb-6" />
          <h3 className="text-2xl font-bold mb-4">Центральный офис</h3>
          <p className="text-stone-500 max-w-xs">
            г. Москва, ул. Большая Дорогомиловская, д. 11, офис 402
          </p>
          <div className="mt-12 w-full h-64 bg-stone-300 rounded-2xl overflow-hidden">
             <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.508542749454!2d37.55163131593043!3d55.7497189805511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bd06a777777%3A0x7777777777777777!2z0JHQvtC70YzRiNCw0Y8g0JTQvtGA0L7Qs9C-0LzQuNC70L7QstGB0LrQsNGPINGD0LsuLCAxMSwg0JzQvtGB0LrQstCwLCAxMjEwNTk!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sru!2sru" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Политика конфиденциальности | LGZT Russia</title>
      </Helmet>
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Политика <span className="text-brand-orange">конфиденциальности</span></h1>
      <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
        <p>Настоящая Политика конфиденциальности описывает, как ваша личная информация собирается, используется и передается при посещении или совершении покупки на сайте lgztrussia.ru.</p>
        <h3 className="text-xl font-bold text-stone-900">1. Сбор персональных данных</h3>
        <p>Мы собираем информацию, которую вы предоставляете нам напрямую, например, когда вы заполняете форму обратной связи, подписываетесь на рассылку или запрашиваете обратный звонок. Это может включать ваше имя, адрес электронной почты, номер телефона.</p>
        <h3 className="text-xl font-bold text-stone-900">2. Использование информации</h3>
        <p>Мы используем собранную информацию для связи с вами, предоставления консультаций по технике LGZT, обработки ваших запросов и улучшения качества нашего сервиса.</p>
        <h3 className="text-xl font-bold text-stone-900">3. Защита данных</h3>
        <p>Мы принимаем все необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или удаления.</p>
      </div>
    </div>
  );
}

function PublicOffer() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Публичная оферта | LGZT Russia</title>
      </Helmet>
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Публичная <span className="text-brand-orange">оферта</span></h1>
      <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
        <p>Данный документ является официальным предложением (публичной офертой) компании LGZT Russia и содержит все существенные условия договора купли-продажи спецтехники.</p>
        <h3 className="text-xl font-bold text-stone-900">1. Предмет договора</h3>
        <p>Продавец обязуется передать в собственность Покупателя спецтехнику LGZT, а Покупатель обязуется принять и оплатить товар на условиях, изложенных в настоящем договоре и спецификациях к нему.</p>
        <h3 className="text-xl font-bold text-stone-900">2. Цена и порядок оплаты</h3>
        <p>Цены на технику указаны в каталоге на сайте и могут быть изменены Продавцом в одностороннем порядке до момента заключения договора. Оплата производится в рублях РФ по безналичному расчету.</p>
        <h3 className="text-xl font-bold text-stone-900">3. Гарантийные обязательства</h3>
        <p>На всю технику LGZT предоставляется официальная гарантия. Условия гарантийного обслуживания прописываются в сервисной книжке изделия.</p>
      </div>
    </div>
  );
}

function ContactSection({ onOpenFeedback }: { onOpenFeedback: () => void }) {
  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Map Container */}
          <div className="rounded-[40px] overflow-hidden shadow-2xl min-h-[400px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.508542749454!2d37.55163131593043!3d55.7497189805511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bd06a777777%3A0x7777777777777777!2z0JHQvtC70YzRiNCw0Y8g0JTQvtGA0L7Qs9C-0LzQuNC70L7QstGB0LrQsNGPINGD0LsuLCAxMSwg0JzQvtGB0LrQstCwLCAxMjEwNTk!5e0!3m2!1sru!2sru!4v1620000000000!5m2!1sru!2sru" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>

          {/* Form Container */}
          <div className="bg-stone-900 rounded-[40px] p-8 sm:p-12 text-white">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Связаться с <span className="text-yellow-400">Нами</span></h2>
            <p className="text-stone-400 mb-8">Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут для консультации.</p>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              onOpenFeedback();
            }}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 transition-all outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Телефон" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 transition-all outline-none"
                />
              </div>
              <textarea 
                placeholder="Ваш вопрос" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 transition-all outline-none h-32"
              ></textarea>
              <button className="w-full bg-yellow-400 text-stone-900 py-5 rounded-xl font-black text-lg hover:bg-white transition-all shadow-lg">
                ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Main App ---

export default function App() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("Оставить заявку");
  const [machines, setMachines] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mRes, aRes] = await Promise.all([
          fetch('/api/machines'),
          fetch('/api/articles')
        ]);
        setMachines(await mRes.json());
        setArticles(await aRes.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const openFeedback = (title?: string) => {
    if (title) setFeedbackTitle(title);
    setIsFeedbackOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
          <Header onOpenFeedback={() => openFeedback("Заказать звонок")} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home machines={machines} onOpenFeedback={openFeedback} />} />
              <Route path="/catalog" element={<Catalog machines={machines} />} />
              <Route path="/catalog/:slug" element={<MachineDetail machines={machines} onOpenFeedback={openFeedback} />} />
              <Route path="/leasing" element={<Leasing onOpenFeedback={openFeedback} />} />
              <Route path="/articles" element={<Articles articles={articles} />} />
              <Route path="/articles/:slug" element={<ArticleDetail articles={articles} />} />
              <Route path="/contacts" element={<Contacts onOpenFeedback={() => openFeedback("Стать дилером")} />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/offer" element={<PublicOffer />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <ContactSection onOpenFeedback={() => openFeedback("Заявка с карты")} />
          <Footer machines={machines} />
          
          <ChatWidget />
          <FeedbackModal 
            isOpen={isFeedbackOpen} 
            onClose={() => setIsFeedbackOpen(false)} 
            title={feedbackTitle}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}
