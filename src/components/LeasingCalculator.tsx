import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, Info, Clock, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface LeasingCalculatorProps {
  initialPrice?: number;
  onOpenFeedback?: (title: string) => void;
}

export default function LeasingCalculator({ initialPrice = 1850000, onOpenFeedback }: LeasingCalculatorProps) {
  // Leasing Calculator State
  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [term, setTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(8);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    setPrice(initialPrice);
  }, [initialPrice]);

  // Payback Calculator State
  const [workHours, setWorkHours] = useState(8);
  const [hourlyRate, setHourlyRate] = useState(1800);
  const [workDays, setWorkDays] = useState(21);
  const [paybackMonths, setPaybackMonths] = useState(6);

  useEffect(() => {
    // Annuity payment formula: P = L * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyRate = interestRate / 100 / 12;
    const downPaymentAmount = price * (downPaymentPercent / 100);
    const loanAmount = price - downPaymentAmount;
    
    let payment = 0;
    if (monthlyRate === 0) {
      payment = loanAmount / term;
    } else {
      payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    }
    
    setMonthlyPayment(Math.round(payment));
  }, [price, downPaymentPercent, term, interestRate]);

  // Payback Calculations
  const rentPerMonth = workHours * hourlyRate * workDays;
  const totalRent = rentPerMonth * paybackMonths;
  const totalLeasing = monthlyPayment * paybackMonths;
  const economy = totalRent - totalLeasing;
  const overpaymentPercent = totalLeasing > 0 ? Math.round((totalRent - totalLeasing) / totalLeasing * 100) : 0;

  return (
    <div className="space-y-24">
      {/* Main Leasing Calculator */}
      <section className="bg-stone-100/50 rounded-[40px] p-8 sm:p-16 border border-stone-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-16">Пользуйтесь сейчас!</h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              {/* Price Input */}
              <div className="bg-stone-200/50 p-8 rounded-2xl space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Стоимость предмета лизинга</label>
                  <div className="text-2xl font-black">{price.toLocaleString()} ₽</div>
                </div>
                <input 
                  type="range" 
                  min="1000000" 
                  max="5000000" 
                  step="50000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-stone-400">
                  <span>1.85 млн</span>
                  <span>2.125 млн</span>
                  <span>2.4 млн</span>
                </div>
              </div>

              {/* Down Payment Input */}
              <div className="bg-stone-200/50 p-8 rounded-2xl space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Первоначальный взнос</label>
                  <div className="text-right">
                    <div className="text-2xl font-black">{(price * (downPaymentPercent / 100)).toLocaleString()} ₽</div>
                    <div className="text-sm font-bold text-stone-500">{downPaymentPercent}%</div>
                  </div>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-stone-400">
                  <span>10 %</span>
                  <span>20 %</span>
                  <span>30 %</span>
                </div>
              </div>

              {/* Term Input */}
              <div className="bg-stone-200/50 p-8 rounded-2xl space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Срок лизинга</label>
                  <div className="text-2xl font-black">{term} месяцев</div>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="60" 
                  step="12"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-stone-400">
                  <span>12 мес</span>
                  <span>36 мес</span>
                  <span>60 мес</span>
                </div>
              </div>

              {/* Interest Rate Input */}
              <div className="bg-stone-200/50 p-8 rounded-2xl space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Процентная ставка лизинга</label>
                  <div className="text-2xl font-black">{interestRate}%</div>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="40" 
                  step="1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-stone-400">
                  <span>8 %</span>
                  <span>24 %</span>
                  <span>40 %</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-red-600/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white rounded-[40px] p-12 sm:p-16 shadow-2xl border border-stone-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-12">Наше предложение</h3>
                  
                  <div className="space-y-2 mb-12">
                    <div className="text-xs font-black uppercase tracking-widest text-stone-400">Стоимость в лизинг</div>
                    <div className="text-7xl sm:text-8xl font-black text-stone-900">
                      {monthlyPayment.toLocaleString()} <span className="text-4xl sm:text-5xl">₽</span>
                    </div>
                  </div>

                  <p className="text-stone-500 font-medium mb-12 max-w-sm">
                    Пока вы читаете это — ваш сосед уже разгружает и убирает территорию в 5 раз быстрее.
                  </p>

                  <button 
                    onClick={() => onOpenFeedback?.(`Заявка на лизинг: ${price.toLocaleString()} руб, аванс ${downPaymentPercent}%, срок ${term} мес, ставка ${interestRate}%`)}
                    className="w-full bg-red-600 text-white py-6 rounded-full font-black text-lg hover:bg-stone-900 transition-all shadow-xl shadow-red-600/20"
                  >
                    Получите спецпредложение
                  </button>

                  <div className="mt-12 flex items-start gap-3 text-[10px] text-stone-400 leading-relaxed italic">
                    <span className="text-red-600 font-black">*</span>
                    <p>Информация является ознакомительной итоговый расчёт стоимости будет зависеть от лизингодателя</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payback Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-16">Окупаемость за 6 месяцев – посчитайте сами!</h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {/* Work Hours Input */}
            <div className="bg-stone-100 p-8 rounded-2xl space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Длительность рабочего дня</label>
                <div className="text-right">
                  <div className="text-2xl font-black">{workHours} ч.</div>
                  <div className="text-sm font-bold text-stone-500">{hourlyRate.toLocaleString()} ₽ / час</div>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="24" 
                step="1"
                value={workHours}
                onChange={(e) => setWorkHours(Number(e.target.value))}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-stone-400">
                <span>1 ч.</span>
                <span>12 ч.</span>
                <span>24 ч.</span>
              </div>
            </div>

            {/* Work Days Input */}
            <div className="bg-stone-100 p-8 rounded-2xl space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Количество рабочих дней</label>
                <div className="text-2xl font-black">{workDays} день</div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="31" 
                step="1"
                value={workDays}
                onChange={(e) => setWorkDays(Number(e.target.value))}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-stone-400">
                <span>1 день</span>
                <span>15 день</span>
                <span>31 день</span>
              </div>
            </div>

            {/* Months Input */}
            <div className="bg-stone-100 p-8 rounded-2xl space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-500">Количество месяцев</label>
                <div className="text-2xl font-black">{paybackMonths} месяцев</div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="24" 
                step="1"
                value={paybackMonths}
                onChange={(e) => setPaybackMonths(Number(e.target.value))}
                className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] font-bold text-stone-400">
                <span>1 месяц</span>
                <span>12 месяцев</span>
                <span>24 месяца</span>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-[40px] p-12 sm:p-16 border border-stone-200">
            <div className="grid gap-12">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8">Ваша выгода</h3>
                <p className="text-stone-500 text-sm mb-12">Экономический пример окупаемости нашего предложения</p>
                
                <div className="space-y-8">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Стоимость в аренду</div>
                    <div className="text-5xl font-black text-stone-900">{totalRent.toLocaleString()} ₽</div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Стоимость в аренду в месяц</div>
                    <div className="text-3xl font-black text-stone-900">{rentPerMonth.toLocaleString()} ₽</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Переплата за аренду</div>
                    <div className="text-4xl font-black text-red-600">{overpaymentPercent}%</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-green-200 shadow-sm">
                <div className="text-xs font-black uppercase tracking-widest text-green-600 mb-6">Выгода покупки в лизинг</div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Окупаемость {paybackMonths} месяцев</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Аренда за полгода:</span>
                    <span className="font-bold">{totalRent.toLocaleString()} ₽ <span className="text-stone-400 font-normal">({rentPerMonth.toLocaleString()} ₽/мес × {paybackMonths})</span></span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Лизинг за тот же срок:</span>
                    <span className="font-bold">{totalLeasing.toLocaleString()} ₽ <span className="text-stone-400 font-normal">({monthlyPayment.toLocaleString()} ₽/мес × {paybackMonths})</span></span>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="font-black text-stone-900">→ Экономия:</span>
                    <span className="text-2xl font-black text-green-600">{economy.toLocaleString()} ₽</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="text-xs font-black text-stone-900 uppercase">Итог:</div>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Не переплачивайте за б/у! <span className="font-bold text-stone-900">Покупайте новое – дешевле</span>
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    При аренде вы потратите <span className="font-bold text-stone-900">в 3 раза больше</span> чем при лизинге.
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    С лизингом – быстрая окупаемость + собственность = прибыль с первого дня.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => onOpenFeedback?.(`Запрос на расчет окупаемости: ${workHours}ч/день, ${hourlyRate}р/час, ${workDays}дней/мес`)}
                className="w-full bg-red-600 text-white py-6 rounded-full font-black text-lg hover:bg-stone-900 transition-all shadow-xl shadow-red-600/20"
              >
                Перестаньте переплачивать
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
