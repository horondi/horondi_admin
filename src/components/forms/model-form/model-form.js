import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Button
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Image } from '@material-ui/icons';
import { push } from 'connected-react-router';

import useModelHandlers from '../../../utils/use-model-handlers';
import { useStyles } from './model-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addModel, updateModel } from '../../../redux/model/model.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadContainer from '../../../containers/image-upload-container';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import { getCategories } from '../../../redux/categories/categories.actions';
import LanguagePanel from '../language-panel';
import { modelValidationSchema } from '../../../validations/models/model-form-validation';
import { getSizes } from '../../../redux/sizes/sizes.actions';
import { sizesSelectorWithPagination } from '../../../redux/selectors/sizes.selector';
import labels from '../../../configs/labels';

const { languages } = config;
const { materialUiConstants } = config;
const { PHOTO_NOT_PROVIDED } = config.modelErrorMessages;
const {
  availableForConstructor,
  show,
  name,
  availableCategory,
  description,
  avatarText,
  priority,
  labelsEn,
  chooseSizes
} = config.labels.model;
const { IMG_URL } = config;
const { MODEL_SAVE_TITLE, MODEL_CONSTRUCTOR } = config.buttonTitles;

const ModelForm = ({ model, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const inputLabel = React.useRef(null);
  const {
    createModel,
    setUpload,
    upload,
    modelImage,
    setModelImage
  } = useModelHandlers();

  useEffect(() => {
    dispatch(getSizes());
    dispatch(getCategories({}));
  }, [dispatch]);

  const { sizesList } = useSelector(sizesSelectorWithPagination);

  const { categories } = useSelector(({ Categories }) => ({
    categories: Categories.categories
  }));

  const [sizes, setSizes] = useState(model.sizes || []);
  const [category, setCategory] = useState(model.category._id || '');

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: modelValidationSchema,
    initialValues: {
      modelImage: model.images.thumbnail || '',
      uaName: model.name[0].value || '',
      enName: model.name[1].value || '',
      uaDescription: model.description[0].value || '',
      enDescription: model.description[1].value || '',
      priority: model.priority || 1,
      category: category || '',
      sizes: sizes || [],
      show: model.show || false,
      availableForConstructor: model.availableForConstructor || false
    },
    onSubmit: () => {
      const newModel = createModel(values);
      if (upload instanceof File || model.images.thumbnail) {
        if (isEdit && upload instanceof File) {
          dispatch(updateModel({ id, model: newModel, image: upload }));
          return;
        }
        if (isEdit) {
          dispatch(updateModel({ id, model: newModel }));
          return;
        }
        dispatch(addModel({ model: newModel, image: upload }));
        return;
      }
      dispatch(setSnackBarSeverity(materialUiConstants.codeError));
      dispatch(setSnackBarMessage(PHOTO_NOT_PROVIDED));
      dispatch(setSnackBarStatus(true));
    }
  });

  const handleCategory = (event) => {
    setFieldValue('category', event.target.value);
    setCategory(event.target.value);
  };

  const onTagsChange = (event, value) => {
    setFieldValue(
      'sizes',
      value.map((size) => size._id)
    );
    setSizes(value);
  };

  const checkboxes = (checkBoxName, label) => [
    {
      id: `${checkBoxName}`,
      dataCy: `${checkBoxName}`,
      value: values[`${checkBoxName}`],
      checked: values[`${checkBoxName}`],
      color: materialUiConstants.primary,
      label,
      handler: () =>
        setFieldValue(`${checkBoxName}`, !values[`${checkBoxName}`])
    }
  ];

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue(labelsEn.modelImage, event.target.result);
        setModelImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };
  const handleConstructor = () => {
    dispatch(push(config.routes.pathToConstructor.replace(':id', id)));
  };

  const inputs = [
    { label: name, name: labelsEn.name },
    { label: description, name: labelsEn.description, isEditor: true }
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
      <form onSubmit={handleSubmit} autoComplete={materialUiConstants.off}>
        <CheckboxOptions options={checkboxes(materialUiConstants.show, show)} />
        <CheckboxOptions
          options={checkboxes(
            labelsEn.availableForConstructor,
            availableForConstructor
          )}
        />

        <Grid item xs={12}>
          <Paper className={styles.modelItemUpdate}>
            <span className={styles.imageUpload}>{avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer handler={handleImageLoad} />
              <Avatar src={modelImage || `${IMG_URL}${model.images.thumbnail}`}>
                <Image />
              </Avatar>
            </div>
            <FormControl
              variant={materialUiConstants.outlined}
              className={styles.textField}
            >
              <InputLabel ref={inputLabel} htmlFor={labelsEn.categorySelect}>
                {availableCategory}
              </InputLabel>
              <Select
                id={labelsEn.category}
                data-cy={labelsEn.category}
                native
                value={category}
                onChange={handleCategory}
                label={availableCategory}
                inputProps={{
                  name: labelsEn.category,
                  id: labels.categorySelect
                }}
              >
                <option value='' />
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.code}
                  </option>
                ))}
              </Select>
              {touched.category && errors.category && (
                <div className={styles.inputError}>{errors.category}</div>
              )}
            </FormControl>
            <TextField
              id={labelsEn.priority}
              type={materialUiConstants.types.string}
              data-cy={labelsEn.priority}
              className={styles.textField}
              variant={materialUiConstants.outlined}
              label={priority}
              value={values.priority}
              onChange={handleChange}
              error={touched.priority && !!errors.priority}
            />
            {touched.priority && errors.priority && (
              <div className={styles.inputError}>{errors.priority}</div>
            )}
          </Paper>
          <Autocomplete
            id={labelsEn.tagsFilled}
            className={styles.autoComplete}
            multiple
            freeSolo
            options={sizesList}
            getOptionLabel={(option) =>
              `${option.simpleName[0].value} | ${option.name}`
            }
            defaultValue={sizes}
            onChange={onTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={materialUiConstants.outlined}
                label={chooseSizes.title}
                placeholder={chooseSizes.inputTitle}
                margin={labelsEn.normal}
                fullWidth
              />
            )}
          />
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <BackButton />
        <SaveButton
          className={styles.saveButton}
          data-cy={materialUiConstants.save}
          type={materialUiConstants.types.submit}
          title={MODEL_SAVE_TITLE}
          values={values}
          errors={errors}
        />
        {isEdit ? (
          <Button
            data-cy={labelsEn.constructor}
            className={styles.saveButton}
            onClick={handleConstructor}
            color={materialUiConstants.secondary}
            variant={materialUiConstants.contained}
          >
            {MODEL_CONSTRUCTOR}
          </Button>
        ) : null}
      </form>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
ModelForm.propTypes = {
  id: PropTypes.string,
  model: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.arrayOf(valueShape),
    show: PropTypes.bool,
    priority: PropTypes.number,
    availableForConstructor: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    category: PropTypes.string,
    sizes: PropTypes.arrayOf(valueShape),
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    modelImage: PropTypes.string,
    category: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    priority: PropTypes.number
  }),
  errors: PropTypes.shape({
    modelImage: PropTypes.string,
    category: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    priority: PropTypes.number
  }),
  touched: PropTypes.shape({
    modelImage: PropTypes.string,
    category: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    priority: PropTypes.number
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  isEdit: PropTypes.bool
};
ModelForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  model: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    category: '',
    sizes: [],
    show: false,
    availableForConstructor: false,
    priority: 1
  },
  isEdit: false
};

export default ModelForm;
