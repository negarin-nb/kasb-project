const Orders = [
  {
    id: '01032201',
    customer: "آقای محمد نایب",
    entryDate: "۱۴۰۱/۲/۵",
    deliveryDate: "۱۴۰۱/۲/۹",
    deliveryMethod: "پیک",
    orderItems: [
      {
        orderName: "کاسه آش‌خوری",
        number: '6',
        unitPrice: '20000',
        totalPrice: '120000',
      },
      {
        orderName: "سینی مزه",
        number: '1',
        unitPrice: '150000',
        totalPrice: '150000',
      },
    ],
    orderStatus: "نقد",
  },
  {
    id: '01032202',
    customer: "آقای محمد نایب",
    entryDate: "۱۴۰۱/۲/۵",
    deliveryDate: "۱۴۰۱/۲/۹",
    deliveryMethod: "پست",
    orderItems: [
      {
        orderName: "سینی مزه",
        number: '1',
        unitPrice: '150000',
        totalPrice: '150000',
      },
    ],
    orderStatus: "نقد",
  },
  {
    id: '01032203',
    customer: "آقای محمد نایب",
    entryDate: "۱۴۰۱/۲/۵",
    deliveryDate: "۱۴۰۱/۲/۹",
    deliveryMethod: "پست",
    orderItems: [
      {
        orderName: "سینی مزه",
        number: '1',
        unitPrice: '150000',
        totalPrice: '150000',
      },
      {
        orderName: "سینی مزه",
        number: '1',
        unitPrice: '150000',
        totalPrice: '150000',
      },
    ],
    orderStatus: "نقد",
  },
];

export function getOrders() {
  return Orders;
};
