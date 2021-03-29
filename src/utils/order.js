import PropTypes from 'prop-types';
import config from '../configs/orders';

export const recipientPropTypes = {
  data: PropTypes.shape({
    user: PropTypes.objectOf(PropTypes.string),
    userComment: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
};

export const productsPropTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object)
  }),
  setFieldValue: PropTypes.func.isRequired
};

export const generalPropTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
    isPaid: PropTypes.bool,
    courierOffice: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentStatus: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
};

export const deliveryPropTypes = {
  data: PropTypes.shape({
    delivery: PropTypes.shape({
      courier: PropTypes.objectOf(PropTypes.string),
      novaPost: PropTypes.objectOf(PropTypes.string),
      ukrPost: PropTypes.objectOf(PropTypes.string),
      sentBy: PropTypes.string
    })
  }),
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

const itemPropType = PropTypes.shape({
  options: PropTypes.shape({
    size: PropTypes.objectOf(PropTypes.string)
  }),
  quantity: PropTypes.number,
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    basePrice: PropTypes.arrayOf(
      PropTypes.shape({
        currency: PropTypes.string,
        value: PropTypes.number
      })
    )
  })
});

export const addProductFormPropTypes = {
  items: PropTypes.arrayOf(itemPropType),
  setFieldValue: PropTypes.func.isRequired
};

export const editProductFormPropTypes = {
  ...addProductFormPropTypes,
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  selectedItem: itemPropType
};

export const courierPropTypes = {
  deliveryType: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired
};

export const postPropTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    city: PropTypes.string,
    courierOffice: PropTypes.string
  }).isRequired
};

const { deliveryTypes } = config;
const items = (order) =>
  order.items?.map((item) => ({
    product: item?.product._id,
    quantity: item.quantity,
    isFromConstructor: !item.product._id,
    options: {
      size: item.options.size._id,
      sidePocket: item.options.sidePocket
    }
  }));

export const newOrder = (order) => ({
  status: order.status,
  user: order.user,
  delivery: address(order.delivery),
  items: items(order),
  paymentMethod: order.paymentMethod,
  userComment: order.userComment,
  isPaid: order.isPaid
});

export const submitStatus = ['CREATED', 'CONFIRMED'];

export const address = (delivery) => {
  const { sentBy } = delivery;
  if (
    sentBy === deliveryTypes.ukrPostCourier ||
    sentBy === deliveryTypes.novaPostCourier
  ) {
    delivery.ukrPost = {};
    delivery.novaPost = {};
  } else if (sentBy === deliveryTypes.novaPost) {
    delivery.courier = {};
    delivery.ukrPost = {};
  } else {
    delivery.novaPost = {};
    delivery.courier = {};
  }
  return {
    sentBy,
    courierOffice:
      delivery.novaPost.courierOffice || delivery.ukrPost.courierOffice || '',
    region: delivery.ukrPost.region || '',
    district: delivery.ukrPost.district || '',
    city:
      delivery.novaPost.city ||
      delivery.ukrPost.city ||
      delivery.courier.city ||
      '',
    street: delivery.courier.street || '',
    house: delivery.courier.house || '',
    flat: delivery.courier.flat || '',
    byCourier: delivery.sentBy.includes(COURIER)
  };
};

export const inputName = {
  sentByInput: 'delivery.sentBy',
  courier: {
    city: 'delivery.courier.city',
    street: 'delivery.courier.street',
    house: 'delivery.courier.house',
    flat: 'delivery.courier.flat'
  },
  novaPost: {
    city: 'delivery.novaPost.city',
    courierOffice: 'delivery.novaPost.courierOffice'
  },
  ukrPost: {
    region: 'delivery.ukrPost.region',
    district: 'delivery.ukrPost.district',
    city: 'delivery.ukrPost.city',
    courierOffice: 'delivery.ukrPost.courierOffice'
  },
  isPaidInput: 'isPaid',
  itemsName: 'items',
  status: 'status',
  userComment: 'userComment',
  paymentMethod: 'paymentMethod',
  sentBy: 'sentBy'
};

export const initialValues = {
  status: '',
  paymentMethod: '',
  isPaid: false,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  },
  delivery: {
    sentBy: deliveryTypes.selfPickUp,
    courier: {
      city: '',
      street: '',
      house: '',
      flat: ''
    },
    novaPost: {
      city: '',
      courierOffice: ''
    },
    ukrPost: {
      region: '',
      district: '',
      city: '',
      courierOffice: ''
    }
  },
  userComment: '',
  items: []
};

export const courierInputLabels = () => {
  const { city, street, house, flat } = inputName.courier;
  return [
    {
      name: city,
      label: 'Місто',
      value: 'city'
    },
    {
      name: street,
      label: 'Вулиця',
      value: 'street'
    },
    {
      name: house,
      label: 'Будинок',
      value: 'house'
    },
    {
      name: flat,
      label: 'Квартира',
      value: 'flat'
    }
  ];
};

export const POSTOMAT = 'Поштомат';
export const POST_OFFICE_NUMBER = 'Відділення № ';

const COURIER = 'COURIER';
export const setFormValues = (selectedOrder) => {
  const {
    sentBy,
    city,
    flat,
    house,
    street,
    courierOffice,
    district,
    region
  } = selectedOrder.delivery;
  return {
    status: selectedOrder.status,
    paymentMethod: selectedOrder.paymentMethod,
    isPaid: selectedOrder.isPaid,
    user: selectedOrder.user,
    delivery: {
      sentBy,
      courier: {
        city: sentBy.includes(COURIER) ? city : '',
        street: sentBy.includes(COURIER) ? street : '',
        house: sentBy.includes(COURIER) ? house : '',
        flat: sentBy.includes(COURIER) ? flat : ''
      },
      novaPost: {
        city: sentBy === deliveryTypes.novaPost ? city : '',
        courierOffice: sentBy === deliveryTypes.novaPost ? courierOffice : ''
      },
      ukrPost: {
        region: sentBy === deliveryTypes.ukrPost ? region : '',
        district: sentBy === deliveryTypes.ukrPost ? district : '',
        city: sentBy === deliveryTypes.ukrPost ? city : '',
        courierOffice: sentBy === deliveryTypes.ukrPost ? courierOffice : ''
      }
    },
    userComment: selectedOrder.userComment,
    items: selectedOrder.items.map((item) => ({
      options: { size: { _id: item.options.size._id } },
      product: {
        _id: item.product._id,
        name: item.product.name,
        basePrice: item.product.basePrice
      },
      quantity: item.quantity
    }))
  };
};

export const mergeProducts = (selectedProduct, size, quantity, orderItems) => {
  const index = orderItems.findIndex(
    (item) =>
      item.product._id === selectedProduct._id && item.options.size._id === size
  );
  if (index !== -1) {
    const newItem = { ...orderItems[index] };
    newItem.quantity += quantity;
    return [
      ...orderItems.slice(0, index),
      newItem,
      ...orderItems.slice(index + 1)
    ];
  }
  return [
    ...orderItems,
    {
      options: {
        size: { _id: size }
      },
      product: {
        basePrice: selectedProduct.basePrice,
        name: selectedProduct.name,
        _id: selectedProduct._id
      },
      quantity
    }
  ];
};
