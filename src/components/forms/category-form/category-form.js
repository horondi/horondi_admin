import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Avatar } from '@material-ui/core';
import * as Yup from 'yup';
import { Image } from '@material-ui/icons';
import useCategoryHandlers from '../../../utils/use-category-handlers';
import { useStyles } from './category-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addCategory,
  updateCategory
} from '../../../redux/categories/categories.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { categoryTranslations } from '../../../translations/category.translations';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import { onSubmitCategoryHandler } from '../../../utils/category-form';

const {
  CATEGORY_VALIDATION_ERROR,
  CATEGORY_ERROR_MESSAGE,
  CATEGORY_UA_NAME_MESSAGE,
  CATEGORY_EN_NAME_MESSAGE,
  CATEGORY_CODE_MESSAGE
} = config.categoryErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { CATEGORY_ERROR } = categoryTranslations;
const { IMG_URL } = config;
const { enNameCreation, uaNameCreation, categoryCode } = config.formRegExp;

const CategoryForm = ({ category, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    createCategory,
    setUpload,
    upload,
    categoryImage,
    setCategoryImage
  } = useCategoryHandlers();

  const categoryValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .required(CATEGORY_ERROR_MESSAGE)
      .matches(enNameCreation, CATEGORY_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .required(CATEGORY_ERROR_MESSAGE)
      .matches(uaNameCreation, CATEGORY_UA_NAME_MESSAGE),
    code: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .required(CATEGORY_ERROR_MESSAGE)
      .matches(categoryCode, CATEGORY_CODE_MESSAGE)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: categoryValidationSchema,
    initialValues: {
      categoryImage: edit ? IMG_URL + category.images.thumbnail : '',
      uaName: category.name[0].value || '',
      enName: category.name[1].value || '',
      code: category.code || ''
    },
    onSubmit: (data) => {
      const newCategory = createCategory(data);
      const uploadCondition = upload instanceof File;
      onSubmitCategoryHandler(edit, dispatch, updateCategory, {
        id,
        category: newCategory,
        upload
      });
      onSubmitCategoryHandler(uploadCondition, dispatch, addCategory, {
        category: newCategory,
        upload
      });

      dispatch(setSnackBarSeverity('error'));
      dispatch(setSnackBarMessage(CATEGORY_ERROR));
      dispatch(setSnackBarStatus(true));
    }
  });

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('categoryImage', event.target.result);
        setCategoryImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };
  const inputs = [
    { label: config.labels.categories.categoryName, name: 'name' }
  ];
  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Paper className={styles.categoryItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.avatarText}
            </span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer handler={handleImageLoad} />
              {(categoryImage || edit) && (
                <Avatar src={edit ? values.categoryImage : categoryImage}>
                  <Image />
                </Avatar>
              )}
            </div>
            <TextField
              data-cy='code'
              name='code'
              className={styles.textField}
              variant='outlined'
              label={config.labels.categories.categoryCode}
              value={values.code}
              onChange={handleChange}
              error={touched.code && !!errors.code}
            />
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <BackButton />
        <SaveButton
          className={styles.saveCategoryButton}
          data-cy='save'
          type='submit'
          title={SAVE_TITLE}
          errors={errors}
          values={values}
        />
      </form>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
CategoryForm.propTypes = {
  id: PropTypes.string,
  category: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    name: PropTypes.arrayOf(valueShape),
    code: PropTypes.string
  }),
  values: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  edit: PropTypes.bool
};
CategoryForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  category: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    code: '',
    images: {
      thumbnail: ''
    },
    available: false
  },
  edit: false
};

export default CategoryForm;
