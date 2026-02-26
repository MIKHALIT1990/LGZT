import { useState } from 'react';
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
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MACHINES, DEALERS, COMPARISON_POINTS } from './constants';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(MACHINES[0]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Top Bar */}
      <div className="bg-stone-900 text-white py-2 px-4 sm:px-8 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex gap-4 sm:gap-6">
          <a href="tel:88005553535" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
            <Phone size={14} />
            <span>8 800 555 35 35</span>
          </a>
          <a href="mailto:info@lgztrussia.ru" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
            <Mail size={14} />
            <span>info@lgztrussia.ru</span>
          </a>
        </div>
        <div className="hidden md:block opacity-70">
          Официальный импортер LGZT в России
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-lg font-black text-2xl tracking-tighter">LGZT</div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg">RUSSIA</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Official Importer</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm uppercase tracking-wider">
            <a href="#catalog" className="hover:text-yellow-600 transition-colors">Каталог</a>
            <a href="#specs" className="hover:text-yellow-600 transition-colors">Характеристики</a>
            <a href="#comparison" className="hover:text-yellow-600 transition-colors">Преимущества</a>
            <a href="#dealers" className="hover:text-yellow-600 transition-colors">Дилеры</a>
            <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-yellow-500 hover:text-stone-900 transition-all duration-300">
              Заказать звонок
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 p-6 flex flex-col gap-4 shadow-xl"
            >
              <a href="#catalog" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Каталог</a>
              <a href="#specs" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Характеристики</a>
              <a href="#comparison" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Преимущества</a>
              <a href="#dealers" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Дилеры</a>
              <button className="bg-yellow-400 text-stone-900 font-bold py-3 rounded-xl mt-4">
                Связаться с нами
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
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
                <button className="bg-yellow-400 text-stone-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors flex items-center gap-2">
                  Узнать подробнее <ArrowRight size={20} />
                </button>
                <button className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-colors">
                  Смотреть каталог
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-full" />
              <img 
                src="https://picsum.photos/seed/lgzt-side/800/600" 
                alt="LGZT Loader" 
                className="relative rounded-2xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-stone-900 p-6 rounded-2xl shadow-xl max-w-[240px]">
                <div className="text-3xl font-black text-yellow-500">1 ГОД</div>
                <div className="text-sm font-bold uppercase tracking-wider">Гарантия или 1500 м/ч</div>
                <div className="mt-2 text-xs opacity-60">Полная сервисная поддержка на всей территории РФ</div>
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

        {/* Catalog Section */}
        <section id="catalog" className="py-24 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Модельный ряд <span className="text-yellow-500">Deluxe</span></h2>
              <p className="text-stone-500 max-w-xl">
                Максимальная комплектация для комфортной и эффективной работы. 
                В подарок при покупке: оригинальные паллетные вилы!
              </p>
            </div>
            <div className="flex bg-stone-100 p-1 rounded-full">
              {MACHINES.map((m) => (
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
              
              <div className="grid grid-cols-2 gap-4">
                {selectedMachine.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-100">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Технические данные
                <span className="text-xs font-normal bg-stone-100 px-3 py-1 rounded-full opacity-60">Full Specs</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(selectedMachine.specs).map(([key, value], i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-stone-50 last:border-0">
                    <span className="text-stone-500 text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-bold text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <ShieldCheck size={24} className="text-stone-900" />
                  </div>
                  <div>
                    <div className="font-bold">Выгода 140 000 ₽</div>
                    <div className="text-xs opacity-70">При покупке комплектации Deluxe</div>
                  </div>
                </div>
                <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-stone-900 transition-all">
                  Получить коммерческое предложение
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section id="comparison" className="py-24 bg-stone-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">
                LGZT vs <span className="text-yellow-500">Мини-погрузчик</span>
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Почему фронтальный погрузчик LGZT эффективнее и выгоднее в эксплуатации, 
                чем техника с бортовым поворотом.
              </p>
            </div>

            <div className="grid gap-4">
              {COMPARISON_POINTS.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-[1fr,2fr,2fr] items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="font-bold text-yellow-500 uppercase text-xs tracking-widest">{point.title}</div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 p-1 rounded text-green-500 mt-1">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-40 mb-1">LGZT Loader</div>
                      <div className="text-sm font-medium">{point.lgzt}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="bg-red-500/20 p-1 rounded text-red-500 mt-1">
                      <X size={14} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase opacity-40 mb-1">Skid Steer</div>
                      <div className="text-sm">{point.skidSteer}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dealers Section */}
        <section id="dealers" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Наши <span className="text-yellow-500">Дилеры</span></h2>
                <p className="text-stone-500">Официальные представители в регионах с полным циклом обслуживания.</p>
              </div>
              <button className="text-stone-900 font-bold flex items-center gap-2 hover:text-yellow-600 transition-colors">
                Стать дилером <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {DEALERS.map((dealer, i) => (
                <div key={i} className="group bg-stone-50 rounded-3xl p-8 border border-stone-100 hover:border-yellow-200 transition-all hover:shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-2">{dealer.city}</div>
                      <h4 className="text-2xl font-black">{dealer.name}</h4>
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:bg-yellow-400 transition-colors">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <p className="text-stone-500 mb-8 flex items-center gap-2">
                    <MapPin size={16} className="shrink-0" />
                    {dealer.address}
                  </p>
                  <div className="flex gap-4">
                    <a 
                      href={dealer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-white border border-stone-200 py-3 rounded-xl font-bold text-center hover:bg-stone-900 hover:text-white transition-all"
                    >
                      Перейти на сайт
                    </a>
                    <button className="flex-1 bg-yellow-400 text-stone-900 py-3 rounded-xl font-bold hover:bg-stone-800 hover:text-white transition-all">
                      Связаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News/Articles Section */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">Новости и <span className="text-yellow-500">Статьи</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Погрузчик LG928 готов к зимней работе',
                  date: '15 Октября 2025',
                  image: 'https://picsum.photos/seed/news1/600/400',
                  desc: 'Подготовка спецтехники к суровым российским морозам: советы экспертов ТС Ресурс.'
                },
                {
                  title: 'Преимущества шарнирно-сочлененной рамы',
                  date: '02 Ноября 2025',
                  image: 'https://picsum.photos/seed/news2/600/400',
                  desc: 'Почему маневренность LGZT делает его идеальным для узких городских улиц.'
                },
                {
                  title: 'Новое поступление техники в Петрозаводске',
                  date: '10 Декабря 2025',
                  image: 'https://picsum.photos/seed/news3/600/400',
                  desc: 'Технова объявляет о расширении склада и специальных условиях лизинга.'
                }
              ].map((news, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <img src={news.image} alt={news.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <div className="p-6">
                    <div className="text-[10px] font-bold text-stone-400 uppercase mb-2">{news.date}</div>
                    <h5 className="font-bold text-lg mb-3 leading-tight hover:text-yellow-600 cursor-pointer transition-colors">{news.title}</h5>
                    <p className="text-sm text-stone-500 mb-4">{news.desc}</p>
                    <button className="text-stone-900 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Читать далее <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-stone-900 rounded-[40px] overflow-hidden grid lg:grid-cols-2">
              <div className="p-12 sm:p-20 text-white flex flex-col justify-center">
                <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight">
                  Остались вопросы? <br />
                  <span className="text-yellow-400">Мы на связи.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <Phone className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xs opacity-50 uppercase tracking-widest">Бесплатно по РФ</div>
                      <div className="text-xl font-bold">8 800 555 35 35</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl">
                      <Mail className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xs opacity-50 uppercase tracking-widest">Для заявок</div>
                      <div className="text-xl font-bold">sales@lgztrussia.ru</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-400 p-12 sm:p-20">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-stone-900/60">Ваше имя</label>
                    <input type="text" className="w-full bg-white/50 border-0 rounded-xl p-4 placeholder:text-stone-600 focus:ring-2 focus:ring-stone-900 transition-all" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-stone-900/60">Телефон</label>
                    <input type="tel" className="w-full bg-white/50 border-0 rounded-xl p-4 placeholder:text-stone-600 focus:ring-2 focus:ring-stone-900 transition-all" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-stone-900/60">Сообщение</label>
                    <textarea className="w-full bg-white/50 border-0 rounded-xl p-4 placeholder:text-stone-600 focus:ring-2 focus:ring-stone-900 transition-all h-32" placeholder="Меня интересует модель LG918..."></textarea>
                  </div>
                  <button className="w-full bg-stone-900 text-white py-5 rounded-xl font-black text-lg hover:bg-stone-800 transition-all shadow-lg">
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                  <p className="text-[10px] text-center text-stone-900/40 px-8">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
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
              <li><a href="#" className="hover:text-white transition-colors">LGZT 918 Deluxe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LGZT 928 Deluxe</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LGZT 918 Standart</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Навесное оборудование</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-yellow-500">Компания</h6>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">О бренде</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Сервис и гарантия</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Стать дилером</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold uppercase text-xs tracking-widest mb-6 text-yellow-500">Поддержка</h6>
            <div className="space-y-4">
              <a href="tel:88005553535" className="block text-lg font-bold hover:text-yellow-400 transition-colors">8 800 555 35 35</a>
              <p className="text-xs text-stone-500">Пн-Пт: 09:00 — 18:00 (МСК)</p>
              <div className="flex gap-4 pt-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-400 hover:text-stone-900 transition-all cursor-pointer">
                  <span className="font-bold text-xs">TG</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-400 hover:text-stone-900 transition-all cursor-pointer">
                  <span className="font-bold text-xs">WA</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-400 hover:text-stone-900 transition-all cursor-pointer">
                  <span className="font-bold text-xs">VK</span>
                </div>
              </div>
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
    </div>
  );
}
