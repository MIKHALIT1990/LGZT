import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  LayoutDashboard, 
  FileText, 
  Truck, 
  LogOut,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../firebase';

interface Machine {
  id: string;
  slug: string;
  name: string;
  price: number;
  status: string;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  specs: any;
  features: string[];
}

interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  desc: string;
  content: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'machines' | 'articles'>('machines');
  const [machines, setMachines] = useState<Machine[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    console.log('Admin component mounted');
    if (isAuthenticated) {
      const unsubMachines = onSnapshot(collection(db, 'machines'), (snapshot) => {
        setMachines(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Machine));
      });
      const unsubArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
        setArticles(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as Article));
      });
      return () => {
        unsubMachines();
        unsubArticles();
      };
    }
  }, [isAuthenticated]);

  const handleMigrate = async () => {
    if (!confirm('Это перенесет данные из временного файла в постоянную базу данных. Продолжить?')) return;
    try {
      const [mRes, aRes] = await Promise.all([
        fetch('/api/machines'),
        fetch('/api/articles')
      ]);
      const mData = await mRes.json();
      const aData = await aRes.json();

      const batch = writeBatch(db);
      mData.forEach((m: any) => {
        const ref = doc(db, 'machines', m.id || m.slug);
        batch.set(ref, m);
      });
      aData.forEach((a: any) => {
        const ref = doc(db, 'articles', a.id || a.slug);
        batch.set(ref, a);
      });
      await batch.commit();
      setStatus({ type: 'success', msg: 'Миграция завершена!' });
    } catch (error) {
      setStatus({ type: 'error', msg: 'Ошибка миграции' });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple demo password
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editingItem.id;
    const collectionName = activeTab === 'machines' ? 'machines' : 'articles';
    const id = isNew ? (editingItem.slug || Date.now().toString()) : editingItem.id;

    try {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, { ...editingItem, id });

      setStatus({ type: 'success', msg: 'Сохранено успешно!' });
      setIsModalOpen(false);
      setEditingItem(null);
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ type: 'error', msg: 'Ошибка при сохранении' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return;
    const collectionName = activeTab === 'machines' ? 'machines' : 'articles';

    try {
      await deleteDoc(doc(db, collectionName, id));
      setStatus({ type: 'success', msg: 'Удалено!' });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ type: 'error', msg: 'Ошибка при удалении' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[40px] p-12 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" stroke="#E31E24" strokeWidth="6" fill="none" />
              <path d="M50 15 L85 75 L15 75 Z" fill="none" stroke="#E31E24" strokeWidth="8" strokeLinejoin="round" />
              <path d="M50 30 L70 65 L30 65 Z" fill="#E31E24" />
              <rect x="44" y="65" width="12" height="15" fill="#E31E24" />
            </svg>
            <h1 className="text-2xl font-black uppercase tracking-tighter">Admin Panel</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Пароль</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-50 border-0 rounded-2xl p-5 focus:ring-2 focus:ring-brand-orange transition-all"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-orange transition-all">
              ВОЙТИ
            </button>
            <div className="text-center mt-6">
              <a href="/" className="text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-brand-orange transition-colors">
                ← На главную
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-brand-dark text-white p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-brand-orange p-2 rounded-lg text-white font-black">LGZT</div>
          <h1 className="text-xl font-black uppercase tracking-tighter">Admin</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('machines')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'machines' ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-stone-400'}`}
          >
            <Truck size={20} /> Техника
          </button>
          <button 
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'articles' ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-stone-400'}`}
          >
            <FileText size={20} /> Статьи
          </button>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-4 p-4 rounded-2xl font-bold text-stone-500 hover:text-white transition-all mt-auto"
        >
          <LogOut size={20} /> Выйти
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              {activeTab === 'machines' ? 'Управление техникой' : 'Управление статьями'}
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-green-600 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 size={14} /> Данные синхронизированы с Firebase
              </p>
              <button 
                onClick={handleMigrate}
                className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-brand-orange transition-colors"
              >
                Перенести из JSON
              </button>
            </div>
          </div>
          <button 
            onClick={() => {
              setEditingItem(activeTab === 'machines' ? { name: '', slug: '', price: 0, status: 'in-stock', images: ['', '', '', ''], specs: {}, features: [] } : { title: '', slug: '', date: '', desc: '', content: '' });
              setIsModalOpen(true);
            }}
            className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-brand-dark transition-all shadow-lg shadow-brand-orange/20"
          >
            <Plus size={20} /> ДОБАВИТЬ
          </button>
        </div>

        {status && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-2xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold">{status.msg}</span>
          </motion.div>
        )}

        <div className="grid gap-6">
          {activeTab === 'machines' ? (
            machines.map(m => (
              <div key={m.id} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center gap-8 group hover:shadow-md transition-all">
                <img src={m.image} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{m.name}</h4>
                  <p className="text-stone-400 text-sm">{m.price.toLocaleString()} ₽ • {m.status}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(m); setIsModalOpen(true); }} className="p-3 bg-stone-50 text-stone-400 hover:bg-brand-dark hover:text-white rounded-xl transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="p-3 bg-stone-50 text-stone-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            articles.map(a => (
              <div key={a.id} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-center gap-8 group hover:shadow-md transition-all">
                <img src={a.image} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{a.title}</h4>
                  <p className="text-stone-400 text-sm">{a.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(a); setIsModalOpen(true); }} className="p-3 bg-stone-50 text-stone-400 hover:bg-brand-dark hover:text-white rounded-xl transition-all">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-3 bg-stone-50 text-stone-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-stone-100 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  {editingItem.id ? 'Редактировать' : 'Добавить'} {activeTab === 'machines' ? 'технику' : 'статью'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-8">
                {activeTab === 'machines' ? (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Название</label>
                          <input required value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Slug (URL)</label>
                          <input required value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Цена (₽)</label>
                          <input type="number" required value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Статус</label>
                          <select value={editingItem.status} onChange={e => setEditingItem({...editingItem, status: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4">
                            <option value="in-stock">В наличии</option>
                            <option value="on-order">Под заказ</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Главное фото (URL)</label>
                          <input required value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Доп. фото (через запятую)</label>
                          <textarea 
                            value={editingItem.images?.join(', ')} 
                            onChange={e => setEditingItem({...editingItem, images: e.target.value.split(',').map(s => s.trim())})} 
                            className="w-full bg-stone-50 border-0 rounded-2xl p-4 h-32" 
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Краткое описание</label>
                      <textarea required value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4 h-24" />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Полное описание</label>
                      <textarea required value={editingItem.longDescription} onChange={e => setEditingItem({...editingItem, longDescription: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4 h-48" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Характеристики</label>
                          <button 
                            type="button"
                            onClick={() => setEditingItem({...editingItem, specs: {...editingItem.specs, '': ''}})}
                            className="text-brand-orange text-[10px] font-black uppercase tracking-widest hover:underline"
                          >
                            + Добавить
                          </button>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(editingItem.specs || {}).map(([key, val], i) => (
                            <div key={i} className="flex gap-2">
                              <input 
                                placeholder="Ключ" 
                                value={key} 
                                onChange={e => {
                                  const newSpecs = {...editingItem.specs};
                                  delete newSpecs[key];
                                  newSpecs[e.target.value] = val;
                                  setEditingItem({...editingItem, specs: newSpecs});
                                }}
                                className="flex-1 bg-stone-50 border-0 rounded-xl p-2 text-xs" 
                              />
                              <input 
                                placeholder="Значение" 
                                value={val as string} 
                                onChange={e => setEditingItem({...editingItem, specs: {...editingItem.specs, [key]: e.target.value}})}
                                className="flex-1 bg-stone-50 border-0 rounded-xl p-2 text-xs" 
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const newSpecs = {...editingItem.specs};
                                  delete newSpecs[key];
                                  setEditingItem({...editingItem, specs: newSpecs});
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Особенности</label>
                          <button 
                            type="button"
                            onClick={() => setEditingItem({...editingItem, features: [...(editingItem.features || []), '']})}
                            className="text-brand-orange text-[10px] font-black uppercase tracking-widest hover:underline"
                          >
                            + Добавить
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(editingItem.features || []).map((f: string, i: number) => (
                            <div key={i} className="flex gap-2">
                              <input 
                                value={f} 
                                onChange={e => {
                                  const newFeatures = [...editingItem.features];
                                  newFeatures[i] = e.target.value;
                                  setEditingItem({...editingItem, features: newFeatures});
                                }}
                                className="flex-1 bg-stone-50 border-0 rounded-xl p-2 text-xs" 
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const newFeatures = editingItem.features.filter((_: any, idx: number) => idx !== i);
                                  setEditingItem({...editingItem, features: newFeatures});
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Заголовок</label>
                        <input required value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Slug (URL)</label>
                        <input required value={editingItem.slug} onChange={e => setEditingItem({...editingItem, slug: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Дата</label>
                      <input required value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Фото (URL)</label>
                      <input required value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Краткое описание</label>
                      <textarea required value={editingItem.desc} onChange={e => setEditingItem({...editingItem, desc: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4 h-24" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Контент</label>
                      <textarea required value={editingItem.content} onChange={e => setEditingItem({...editingItem, content: e.target.value})} className="w-full bg-stone-50 border-0 rounded-2xl p-4 h-48" />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-brand-orange text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-dark transition-all flex items-center justify-center gap-3">
                    <Save size={20} /> СОХРАНИТЬ
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-12 bg-stone-100 text-stone-500 py-5 rounded-2xl font-black text-lg hover:bg-stone-200 transition-all">
                    ОТМЕНА
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
