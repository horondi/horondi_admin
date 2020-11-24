const buttonTitles = {
  DELETE_TITLE: 'Видалити',
  EDIT_TITLE: 'Редагувати',
  CREATE_NEWS_TITLE: 'Додати новину',
  CREATE_PATTERN_TITLE: 'Додати гобелен',
  CREATE_MODEL_TITLE: 'Додати модель',
  MODEL_SAVE_TITLE: 'Зберегти',
  CANCEL_TITLE: 'Відмінити',
  LOGOUT_TITLE: 'Вихід',
  CREATE_BUSINESS_PAGE: 'Додати бізнес сторінку',
  CREATE_CONTACT_TITLE: 'Додати контакти',
  SWITCH_USER_STATUS_TITLE: 'Змінити статус користувача',
  USER_INACTIVE_TITLE: 'Деактивувати',
  USER_ACTIVE_TITLE: 'Активувати',
  ADD_CATEGORY: 'Додати категорію',
  GO_BACK_TITLE: 'Назад',
  ADD_SUBCATEGORY: 'Додати підкатегорію',
  ADD_CATEGORY_IMAGE: 'Додати зображення',
  ADD_CATEGORY_NAME: 'Додати назву',
  CANCEL: 'Відмінити',
  SAVE_CATEGORY: 'Зберегти категорію',
  SAVE_SUBCATEGORY: 'Зберегти підкатегорію',
  CREATE_SPECIAL_USER: 'Створити спецкористувача',
  ADD_PHOTO_LABEL: '+',
  CREATE_CATEGORY: 'Створити категорію',
  CREATE_SUBCATEGORY: 'Створити підкатегорію',
  PATTERN_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей гобелен?',
  REMOVE_CONTACT_MESSAGE: 'Ви впевнені, що хочете видалити цей контакт?',
  USER_UNACTIVE_TITLE: 'Деактивувати',
  SHOW_COMMENTS_TITLE: 'Переглянути коментарі',
  HIDE_COMMENTS_TITLE: 'Приховати коментарі',
  SAVE_ORDER: 'Зберегти замовлення',
  SAVE_TITLE: 'Зберегти',
  UNDERSTAND: 'Зрозуміло',
  ANSWER: 'Відповісти',
  TO_SPAM: 'У СПАМ',
  MOVE_ALL_TO_SPAM: 'Перемістити у СПАМ',
  CREATE_MATERIAL_TITLE: 'Створити матеріал',
  CREATE_COLOR_TITLE: 'Створити колір',
  SAVE_MATERIAL: 'Зберегти матеріал',
  CREATE_HEADER_TITLE: 'Створити посилання',
  HEADER_SAVE_TITLE: 'Зберегти посилання',
  GO_TO_MATERIAL_COLOR_PALLET: 'Редагувати палітру',
  CLOSE_DIALOG_TITLE: 'Закрити вікно',
  ORDER_DETAILS: 'Деталі',
  USER_STATUS_TITLE: 'Статус',
  CLEAR_FILTERS: 'Очистити фільтри',
  CREATE_SLIDE_TITLE: 'Створити слайд',
  OPEN_SLIDE_EDIT: 'Увімкнути редагування',
  SAVE_SLIDE_ORDER: 'Зберегти зміни',
  CANCEL_SLIDE_ORDER: 'Скасувати зміни',

  titleGenerator: (editMode, isMain) => {
    const editModeMap = new Map([
      [true, 'Зберегти'],
      [false, 'Створити']
    ]);
    const isMainMap = new Map([
      [true, 'категорію'],
      [false, 'підкатегорію']
    ]);
    return `${editModeMap.get(editMode)} ${isMainMap.get(isMain)}`;
  }
};
export default buttonTitles;
