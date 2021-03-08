export const errorMessages = {
  USER_NOT_FOUND: 'Користувач не знайдений!',
  USER_NOT_AUTHORIZED: 'Користувач не отримав прав доступу',
  INVALID_PERMISSIONS: 'Недостатньо прав користувача',
  WRONG_CREDENTIALS: 'Неправильно вказані вхідні дані',
  INPUT_NOT_VALID: 'Неправильні ввідні дані',
  USER_ALREADY_EXIST: 'Користувач з такими даними вже існує',
  INVALID_ADMIN_INVITATIONAL_TOKEN:
    'Неправильне посилання на створення користувача',
  NO_COLORS: 'Створіть колір'
};

export const loginErrorMessages = {
  INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
  ENTER_EMAIL_MESSAGE: 'Введіть email',
  PASSWORD_MIN_LENGTH_MESSAGE: 'Пароль повинен містити не менше 8 символів',
  PASSWORD_MAX_LENGTH_MESSAGE: 'Пароль повинен містити не більше 20 символів',
  PASSWORD_LANG_MESSAGE: 'Використовуйте латиницю різних регістрів та цифри',
  ENTER_FIRSTNAME_MESSAGE: "Введіть ім'я",
  ENTER_LASTNAME_MESSAGE: 'Введіть прізвище',
  ENTER_PASSWORD_MESSAGE: 'Введіть пароль',
  FIRSTNAME_MIN_LENGTH_MESSAGE: "Ім'я повинно містити не менше 2 символів",
  LASTNAME_MIN_LENGTH_MESSAGE: 'Прізвище повинно містити не менше 2 символів',
  FIRSTNAME_MAX_LENGTH_MESSAGE: "Ім'я повинно містити не більше 30 символів",
  LASTNAME_MAX_LENGTH_MESSAGE: 'Прізвище повинно містити не більше 30 символів',
  SELECT_ROLE_MESSAGE: 'Оберіть роль'
};
export const patternErrorMessages = {
  PATTERN_VALIDATION_ERROR: 'Мінімум 2 символи',
  PATTERN_ERROR_MESSAGE: 'Поле не може бути порожнім',
  PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри',
  PHOTO_NOT_PROVIDED: "Фото гобелена є обов'язковим",
  CONSTRUCTOR_PHOTO_NOT_PROVIDED: "Фото для конструктора є обов'язковим",
  PATTERN_UA_NAME_MESSAGE:
    'Поле може містити тільки українські літери та цифри',
  PATTERN_EN_NAME_MESSAGE: 'Поле може містити тільки англійські літери та цифри'
};
export const categoryErrorMessages = {
  CATEGORY_VALIDATION_ERROR: 'Мінімум 2 символи',
  CATEGORY_ERROR_MESSAGE: 'Поле не може бути порожнім',
  CATEGORY_UA_NAME_MESSAGE:
    'Поле може містити тільки українські літери та цифри',
  CATEGORY_EN_NAME_MESSAGE:
    'Поле може містити тільки англійські літери та цифри',
  CATEGORY_CODE_MESSAGE: 'Поле не може містити спеціальні символи'
};
export const headerErrorMessages = {
  HEADER_VALIDATION_ERROR: 'Мінімум 2 символи',
  HEADER_ERROR_MESSAGE: 'Поле не може бути порожнім',
  HEADER_ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри'
};
export const newsErrorMessages = {
  NAME_MIN_LENGTH_MESSAGE: `Ім'я автора повинне містити не менше 2 символів`,
  TITLE_MIN_LENGTH_MESSAGE: 'Заголовок повинен містити не менше 10 символів',
  TEXT_MIN_LENGTH_MESSAGE: 'Текстове поле повино містити не менше 10 символів'
};
export const modelErrorMessages = {
  MODEL_VALIDATION_ERROR: 'Мінімум 2 символи',
  MODEL_ERROR_MESSAGE: 'Поле не може бути порожнім',
  MODEL_ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри',
  PHOTO_NOT_PROVIDED: 'Додайте фото для моделі'
};
export const contactErrorMessages = {
  INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
  ENTER_EMAIL_MESSAGE: 'Введіть email',
  PHONE_NUMBER_LENGTH_MESSAGE:
    'Довжина номеру телефону повинна містити 12 символів',
  PHONE_NUMBER_TYPE_MESSAGE: 'Номер повинен містити лише числа',
  ENTER_PHONE_NUMBER_MESSAGE: 'Введіть номер',
  INPUT_LENGTH_MESSAGE: 'Довжина повинна містити не менше 10 символів',
  ENTER_UA_SCHEDULE_MESSAGE: 'Введіть розклад українською',
  ENTER_EN_SCHEDULE_MESSAGE: 'Введіть розклад англійською',
  ENTER_UA_ADDRESS_MESSAGE: 'Введіть адресу українською',
  ENTER_EN_ADDRESS_MESSAGE: 'Введіть адресу англійською',
  IMAGE_FORMAT_MESSAGE:
    'Введіть коректний формат, наприклад: https://example.com/',
  ENTER_LINK_MESSAGE: 'Введіть посилання',
  SELECT_IMAGES_MESSAGE: 'Завантажте зображення для карт'
};

export const emailQuestionsErrorMessages = {
  ANSWER_INPUT_MESSAGE: 'Введіть текст для відповіді'
};

export const materialErrorMessages = {
  MAX_LENGTH_MESSAGE: `Не більше 300 символів`,
  MIN_LENGTH_MESSAGE: `Не менше 2 символів`,
  VALIDATION_ERROR: 'Поле обовязкове',
  PRICE_VALIDATION_ERROR: 'Тільки цифри'
};
export const sizeErrorMessages = {
  MAX_LENGTH_MESSAGE: `Не більше 20 символів`,
  MIN_LENGTH_MESSAGE: `Не менше 1см`,
  MAX_LENGTH_MESSAGE_SIZE: `Не більше 35см`,
  MIN_LENGTH_MESSAGE_SIZE: `Не менше 1 символу`,
  MAX_WEIGHT_MESSAGE_SIZE: `Не більше 5 кг`,
  MIN_WEIGHT_MESSAGE_SIZE: `Не менше 0.1 кг`,
  VALIDATION_ERROR: `Поле обовязкове`,
  PRICE_VALIDATION_ERROR: `Тільки цифри`,
  NOT_UA_INPUT_MESSAGE: `Введіть ім'я розміру українською`,
  NOT_EN_INPUT_MESSAGE: `Введіть ім'я розміру англійською`,
  NO_NUMBER_TYPE_MESSAGE: `Повинно містити число`,
  NO_STRING_TYPE_MESSAGE: `Повинно містити букви`
};

export const colorErrorMessages = {
  MAX_LENGTH_MESSAGE: `Не більше 100 символів`,
  MIN_LENGTH_MESSAGE: `Не менше 2 символів`,
  COLOR_VALIDATION_ERROR: 'Неправильний формат кольору',
  VALIDATION_ERROR: 'Поле обовязкове'
};
export const statsErrorMessages = {
  NO_STATS: 'Статистика для вибраного значення відсутня'
};
export const homePageSlideErrorMessages = {
  SLIDE_VALIDATION_ERROR: 'Мінімум 2 символи',
  SLIDE_ERROR_MESSAGE: 'Поле не може бути порожнім',
  SLIDE_ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри'
};

export const constructorErrorMessages = {
  CONSTRUCTOR_VALIDATION_ERROR: 'Мінімум 2 символи',
  CONSTRUCTOR_ERROR_MESSAGE: 'Поле не може бути порожнім',
  CONSTRUCTOR_ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри',
  PRICE_VALIDATION_ERROR: 'Тільки цифри',
  PHOTO_NOT_PROVIDED: 'Додайте фото для конструктора'
};
export const paginationInputErrorMessages = {
  MUST_BE_NUMBER: 'Тільки цифри',
  MUST_BE_POSITIVE: 'Тільки більше нуля',
  PAGE_NOT_FOUND: 'Сторінку не знайдено'
};

export const commentErrorMessages = {
  COMMENT_VALIDATION_ERROR: 'Мінімум 2 символи',
  COMMENT_ERROR_MESSAGE: 'Поле не може бути порожнім',
  MAX_LENGTH_MESSAGE: 'Не більше 300 символів'
};
