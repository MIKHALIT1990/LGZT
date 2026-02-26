export const MACHINES = [
  {
    id: 'lg918-deluxe',
    name: 'LGZT LG918 Deluxe',
    price: 1850000,
    image: 'https://picsum.photos/seed/lg918/800/600',
    description: 'Универсальный помощник для клининга, коммунальных и строительных работ.',
    specs: {
      engine: 'YN25 / 44.88 л.с.',
      power: '33 кВт / 45 л.с.',
      fuel: 'Дизель',
      transmission: 'Автоматическая',
      drive: 'Полный привод 4WD',
      liftHeight: '3500 мм',
      dischargeHeight: '3000 мм',
      weight: '3050 кг',
      payload: '1000 кг',
      bucket: '0.5 м³',
    },
    features: [
      'Камера заднего вида',
      'Кондиционер',
      'Быстросъемное устройство',
      'Джойстиковое управление',
    ]
  },
  {
    id: 'lg928-deluxe',
    name: 'LGZT LG928 Deluxe',
    price: 2050000,
    image: 'https://picsum.photos/seed/lg928/800/600',
    description: 'Повышенная мощность и грузоподъемность для сложных задач.',
    specs: {
      engine: 'YN27 / 47.6 л.с.',
      power: '35 кВт / 48 л.с.',
      fuel: 'Дизель',
      transmission: 'Автоматическая',
      drive: 'Полный привод 4WD',
      liftHeight: '4000 мм',
      dischargeHeight: '3500 мм',
      weight: '4350 кг',
      payload: '1500 кг',
      bucket: '0.7 м³',
    },
    features: [
      'Камера заднего вида',
      'Кондиционер',
      'Быстросъемное устройство',
      'Джойстиковое управление',
      'Усиленные мосты LGZT',
    ]
  }
];

export const DEALERS = [
  {
    city: 'Тюмень',
    name: 'ТС Ресурс',
    address: 'Камчатская ул, д. 194 стр. 5, офис 304а',
    website: 'https://ts-resurs.ru/',
  },
  {
    city: 'Петрозаводск',
    name: 'Технова',
    address: 'ул. Энгельса 15',
    website: 'https://technova10.ru/',
  }
];

export const COMPARISON_POINTS = [
  {
    title: 'Передвижение по дорогам',
    lgzt: '22-35 км/ч, свободное перемещение на длинные дистанции',
    skidSteer: '11-18 км/ч, не рекомендуется своим ходом (износ гидромоторов)',
  },
  {
    title: 'Обзорность',
    lgzt: 'На 40% выше обзорность из кабины',
    skidSteer: 'Ограниченная обзорность из-за конструкции стрелы',
  },
  {
    title: 'Расход шин',
    lgzt: 'В 6-8 раз ниже расход резины',
    skidSteer: 'Высокий износ из-за бортового поворота',
  },
  {
    title: 'Проходимость (Клиренс)',
    lgzt: '390 мм',
    skidSteer: '185 мм',
  },
  {
    title: 'Воздействие на грунт',
    lgzt: 'Не разрушает газон при развороте',
    skidSteer: 'Делает яму/колею при развороте на месте',
  }
];
