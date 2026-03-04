import { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useParams,
  useNavigate
} from 'react-router-dom';
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
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MACHINES, DEALERS, COMPARISON_POINTS, ARTICLES } from './constants';
import ChatWidget from './components/ChatWidget';
import FeedbackModal from './components/FeedbackModal';

// --- Shared Components ---

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
          <div className="bg-yellow-400 p-2 rounded-lg font-black text-2xl tracking-tighter">LGZT</div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg">RUSSIA</span>
            <span className="text-[10px] uppercase tracking-widest opacity-60">Official Importer</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-wider">
          <Link to="/catalog" className="hover:text-yellow-600 transition-colors">Каталог</Link>
          <Link to="/leasing" className="hover:text-yellow-600 transition-colors">Лизинг</Link>
          <Link to="/articles" className="hover:text-yellow-600 transition-colors">Статьи</Link>
          <Link to="/contacts" className="hover:text-yellow-600 transition-colors">Контакты</Link>
          <button 
            onClick={onOpenFeedback}
            className="bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-yellow-500 hover:text-stone-900 transition-all duration-300"
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

function Footer() {
  return (
    <footer className="bg-stone-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-yellow-400 p-1.5 rounded font-black text-xl text-stone-900">LGZT</div>
            <span className="font-bold text-lg">RUSSIA</span>
          </div>
          <p className="text-stone-500 text-sm leading-relaxed">
            Официальный импортер и дистрибьютор мини-фронтальных погрузчиков LGZT на территории Российской Федерации.
          </p>
        </div>
        
        <div>
          <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-yellow-500">Техника</h6>
          <ul className="space-y-4 text-sm text-stone-400">
            {MACHINES.map(m => (
              <li key={m.id}><Link to={`/catalog/${m.slug}`} className="hover:text-white transition-colors">{m.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-yellow-500">Компания</h6>
          <ul className="space-y-4 text-sm text-stone-400">
            <li><Link to="/articles" className="hover:text-white transition-colors">О бренде</Link></li>
            <li><Link to="/contacts" className="hover:text-white transition-colors">Сервис и гарантия</Link></li>
            <li><Link to="/contacts" className="hover:text-white transition-colors">Стать дилером</Link></li>
            <li><Link to="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
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
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
        </div>
      </div>
    </footer>
  );
}

// --- Page Components ---

function Home({ onOpenFeedback }: { onOpenFeedback: () => void }) {
  const [selectedMachine, setSelectedMachine] = useState(MACHINES[0]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/loader-hero/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-40"
            alt="LGZT Machinery"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-yellow-400 text-stone-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Специальное предложение
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-[0.9] mb-6">
              LGZT 918 <br />
              <span className="text-yellow-400">ОТ 1 500 000 ₽</span>
            </h1>
            <p className="text-lg text-stone-300 mb-8 max-w-lg">
              Базовая комплектация Standart: надежность и простота. 
              Идеально для частного использования и малого бизнеса.
              <span className="block mt-2 text-sm italic opacity-70">* Без гидравлики, кондиционера и отопителя. Высота подъема 2.4м.</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onOpenFeedback}
                className="bg-yellow-400 text-stone-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors flex items-center gap-2"
              >
                Узнать подробнее <ArrowRight size={20} />
              </button>
              <Link to="/catalog" className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                Смотреть каталог
              </Link>
            </div>
          </motion.div>
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

      {/* Catalog Preview with Filter */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Модельный ряд <span className="text-yellow-500">Deluxe</span></h2>
            <p className="text-stone-500 max-w-xl">
              Максимальная комплектация для комфортной и эффективной работы. 
              В подарок при покупке: оригинальные паллетные вилы!
            </p>
          </div>
          <div className="flex bg-stone-100 p-1 rounded-full">
            {MACHINES.filter(m => m.id !== 'lg918-standart').map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMachine(m)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedMachine.id === m.id ? 'bg-white shadow-md text-stone-900' : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {m.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            key={selectedMachine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
              <img 
                src={selectedMachine.image} 
                alt={selectedMachine.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-yellow-400 text-stone-900 px-4 py-2 rounded-lg font-black text-xl">
                ОТ {selectedMachine.price.toLocaleString()} ₽
              </div>
            </div>
            <Link to={`/catalog/${selectedMachine.slug}`} className="inline-flex items-center gap-2 text-stone-900 font-bold hover:text-yellow-600 transition-colors">
              Подробнее о модели <ArrowRight size={20} />
            </Link>
          </motion.div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-100">
            <h3 className="text-2xl font-bold mb-8">Технические данные</h3>
            <div className="space-y-4">
              {Object.entries(selectedMachine.specs).slice(0, 6).map(([key, value], i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-stone-50 last:border-0">
                  <span className="text-stone-500 text-sm capitalize">{key}</span>
                  <span className="font-bold text-sm">{value}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={onOpenFeedback}
              className="w-full mt-8 bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-stone-900 transition-all"
            >
              Получить предложение
            </button>
          </div>
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
      <section className="py-24 bg-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-stone-900 rounded-[40px] p-8 sm:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="inline-block bg-yellow-400 text-stone-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Финансовые инструменты
              </div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">
                Лизинг с выгодой <br /> <span className="text-yellow-400">до 1 000 000 ₽</span>
              </h2>
              <p className="text-stone-400 mb-8">
                Получите технику в работу уже завтра. Аванс от 0%, решение за 1 день. 
                Работаем со всеми ведущими лизинговыми компаниями РФ.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/leasing" className="bg-yellow-400 text-stone-900 px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">
                  Подробнее о лизинге
                </Link>
                <button onClick={onOpenFeedback} className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-colors">
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
                  <div className="text-yellow-400 text-2xl font-black">{stat.val}</div>
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

function Catalog() {
  const [filters, setFilters] = useState({
    series: 'all',
    payload: 'all',
    height: 'all'
  });
  
  const filteredMachines = MACHINES.filter(m => {
    const seriesMatch = filters.series === 'all' || 
      (filters.series === 'deluxe' ? m.id.includes('deluxe') : m.id.includes('standart'));
    
    const payloadMatch = filters.payload === 'all' || 
      m.specs.payload.includes(filters.payload);

    const heightMatch = filters.height === 'all' || 
      m.specs.dischargeHeight.includes(filters.height);

    return seriesMatch && payloadMatch && heightMatch;
  });

  const filterOptions = {
    series: [
      { id: 'all', label: 'Все серии' },
      { id: 'deluxe', label: 'Deluxe' },
      { id: 'standart', label: 'Standart' }
    ],
    payload: [
      { id: 'all', label: 'Любая г/п' },
      { id: '1000', label: '1000 кг' },
      { id: '1500', label: '1500 кг' }
    ],
    height: [
      { id: 'all', label: 'Любая высота' },
      { id: '2.4', label: '2.4 м' },
      { id: '3', label: '3.0 м' },
      { id: '3.5', label: '3.5 м' }
    ]
  };

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Каталог <span className="text-yellow-500">Техники</span></h1>
        
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
                        ? 'bg-stone-900 text-white border-stone-900 shadow-lg' 
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map(m => (
            <Link to={`/catalog/${m.slug}`} key={m.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                  <div className="text-lg font-black text-yellow-600">{m.price.toLocaleString()} ₽</div>
                  <div className="bg-stone-100 p-2 rounded-full group-hover:bg-yellow-400 transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200">
          <Info className="mx-auto text-stone-300 mb-4" size={48} />
          <h3 className="text-xl font-bold text-stone-500">Техника не найдена</h3>
          <p className="text-stone-400 mt-2">Попробуйте изменить параметры фильтрации</p>
          <button 
            onClick={() => setFilters({ series: 'all', payload: 'all', height: 'all' })}
            className="mt-6 text-stone-900 font-bold underline underline-offset-4"
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
}

function MachineDetail({ onOpenFeedback }: { onOpenFeedback: () => void }) {
  const { slug } = useParams();
  const machine = MACHINES.find(m => m.slug === slug);

  if (!machine) return <div className="py-24 text-center">Модель не найдена</div>;

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <img src={machine.image} alt={machine.name} className="w-full rounded-[40px] shadow-2xl" />
          <div className="grid grid-cols-2 gap-4">
            {machine.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-stone-100">
                <CheckCircle2 className="text-green-500" size={20} />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{machine.name}</h1>
            <div className="text-3xl font-black text-yellow-600 mb-6">{machine.price.toLocaleString()} ₽</div>
            <p className="text-stone-500 leading-relaxed">{machine.longDescription}</p>
          </div>
          
          <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
            <h3 className="text-xl font-bold mb-6">Характеристики</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(machine.specs).map(([key, value], i) => (
                <div key={i} className="flex flex-col border-b border-stone-200 pb-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400">{key}</span>
                  <span className="text-sm font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onOpenFeedback}
            className="w-full bg-stone-900 text-white py-6 rounded-2xl font-black text-xl hover:bg-yellow-400 hover:text-stone-900 transition-all shadow-xl"
          >
            ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
          </button>
        </div>
      </div>
    </div>
  );
}

function Leasing({ onOpenFeedback }: { onOpenFeedback: () => void }) {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-8">Лизинг <span className="text-yellow-500">Спецтехники</span></h1>
          <p className="text-stone-500 text-lg mb-12 leading-relaxed">
            Мы сотрудничаем с ведущими лизинговыми компаниями России, чтобы предложить вам максимально выгодные условия приобретения техники LGZT.
          </p>
          <div className="space-y-6 mb-12">
            {[
              'Аванс от 0%',
              'Срок лизинга до 60 месяцев',
              'Минимальный пакет документов',
              'Решение за 1 день',
              'Налоговые льготы (возврат НДС)'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-yellow-400 p-1 rounded-full"><CheckCircle2 size={20} /></div>
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={onOpenFeedback}
            className="bg-stone-900 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 hover:text-stone-900 transition-all"
          >
            РАССЧИТАТЬ ЛИЗИНГ
          </button>
        </div>
        <div className="bg-stone-100 rounded-[40px] p-12 border border-stone-200">
          <Calculator size={64} className="text-yellow-500 mb-8" />
          <h3 className="text-2xl font-bold mb-4">Наши партнеры</h3>
          <div className="grid grid-cols-2 gap-8 opacity-50">
            <div className="h-12 bg-stone-300 rounded-lg"></div>
            <div className="h-12 bg-stone-300 rounded-lg"></div>
            <div className="h-12 bg-stone-300 rounded-lg"></div>
            <div className="h-12 bg-stone-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleDetail() {
  const { slug } = useParams();
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) return <div className="py-24 text-center">Статья не найдена</div>;

  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-8">
      <Link to="/articles" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-12 transition-colors">
        <ArrowRight className="rotate-180" size={20} /> Назад к списку
      </Link>
      <div className="text-xs font-bold text-yellow-600 uppercase mb-4 tracking-widest">{article.date}</div>
      <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover rounded-[40px] mb-12 shadow-xl" />
      <div className="prose prose-stone max-w-none">
        <p className="text-xl text-stone-600 mb-8 leading-relaxed font-medium">{article.desc}</p>
        <div className="text-stone-800 leading-relaxed space-y-6">
          {article.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Articles() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-16">Статьи и <span className="text-yellow-500">Новости</span></h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map(article => (
          <Link to={`/articles/${article.slug}`} key={article.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all">
            <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
            <div className="p-8">
              <div className="text-xs font-bold text-stone-400 uppercase mb-2">{article.date}</div>
              <h3 className="text-xl font-bold mb-4 leading-tight">{article.title}</h3>
              <p className="text-stone-500 text-sm mb-6 line-clamp-3">{article.desc}</p>
              <div className="text-stone-900 font-bold flex items-center gap-2 hover:text-yellow-600 transition-colors">
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

  const openFeedback = (title?: string) => {
    if (title) setFeedbackTitle(title);
    setIsFeedbackOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
        <Header onOpenFeedback={() => openFeedback("Заказать звонок")} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenFeedback={() => openFeedback("Консультация")} />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:slug" element={<MachineDetail onOpenFeedback={() => openFeedback("Заявка на модель")} />} />
            <Route path="/leasing" element={<Leasing onOpenFeedback={() => openFeedback("Расчет лизинга")} />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/contacts" element={<Contacts onOpenFeedback={() => openFeedback("Стать дилером")} />} />
          </Routes>
        </main>

        <ChatWidget />
        <FeedbackModal 
          isOpen={isFeedbackOpen} 
          onClose={() => setIsFeedbackOpen(false)} 
          title={feedbackTitle}
        />
        <ContactSection onOpenFeedback={() => openFeedback("Заявка с карты")} />
        <Footer />
      </div>
    </Router>
  );
}
