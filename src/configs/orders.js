const orders = {
  statusOptions: [
    { label: 'Статус замовлення', value: '' },
    { label: 'Замовлення створено', value: 'CREATED' },
    { label: 'Замовлення підтвердженно', value: 'CONFIRMED' },
    { label: 'Замовлення виготовлено', value: 'PRODUCED' },
    { label: 'Замовлення скасовано', value: 'CANCELLED' },
    { label: 'Повернення коштів', value: 'REFUNDED' },
    { label: 'Замовлення відправлено', value: 'SENT' },
    { label: 'Замовлення доставлено', value: 'DELIVERED' }
  ],
  paymentOptions: [
    { label: 'Спосіб оплати', value: '' },
    { label: 'Картка', value: 'CARD' },
    { label: 'Готівка', value: 'CASH' }
  ],
  paymentSatatusOptions: [
    { label: 'Стан оплати', value: '' },
    { label: 'Створено', value: 'CREATED' },
    { label: 'Протерміновано', value: 'EXPIRED' },
    { label: 'Підтверджено', value: 'APPROVED' },
    { label: 'Відхилено', value: 'DECLINED' },
    { label: 'Перенаправлено', value: 'REVERSED' },
    { label: 'В обробці', value: 'PROCESSING' }
  ],
  dialogTitle: 'Замовлення',
  dialogContent:
    'Зміна статусу "Замовлення створено" чи "Замовлення підтверджено" на інші унеможливить подальше редагування деталей замовлення. Ви дійсно хочете продовжити?',
  buttonTitle: 'Продовжити'
};

export default orders;
