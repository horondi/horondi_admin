const mockDefaultProps = {
  id: '',
  newsArticle: {
    author: {
      image: '',
      name: [
        {
          lang: '',
          value: ''
        },
        {
          lang: '',
          value: ''
        }
      ]
    },
    title: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    text: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    languages: [],
    date: '',
    image: ''
  },
  editMode: true
};

const mockId = '';
const mockNewsArticle = {
  author: {
    image: 'image.jpg',
    name: [
      {
        lang: 'ua',
        value: 'Сумка'
      },
      {
        lang: 'ua',
        value: 'Рюкзак'
      }
    ]
  },
  title: [
    {
      lang: 'ua',
      value: 'сумка'
    },
    {
      lang: 'ua',
      value: 'сумка'
    }
  ],
  text: [
    {
      lang: 'ua',
      value: 'сумка'
    },
    {
      lang: 'ua',
      value: 'сумка'
    }
  ],
  languages: ['Ukrainian', 'English'],
  date: '22/06/21',
  image: 'image.jpg'
};

const mockEditMode = true;

module.exports = {
  mockId,
  mockNewsArticle,
  mockEditMode,
  mockDefaultProps
};
