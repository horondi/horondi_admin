import React from 'react';

import { TextField, Grid, Tabs, Tab, AppBar, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import TabPanel from '../tab-panel';
import { BackButton, SaveButton } from '../buttons';
import LoadingBar from '../loading-bar';
import ColorsBar from '../colors-bar';
import useMaterialHandlers from '../../utils/use-material-handlers';
import { useStyles } from './material-form.styles';
import {
  addMaterial,
  updateMaterial
} from '../../redux/material/material.actions';
import { config } from '../../configs';
import CheckboxOptions from '../checkbox-options';

const { languages } = config;
const {
  VALIDATION_ERROR,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  PRICE_VALIDATION_ERROR
} = config.materialErrorMessages;
function MaterialForm({ material, id }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ Material }) => ({
    loading: Material.materialLoading
  }));

  const { createMaterial, tabsValue, handleTabsChange } = useMaterialHandlers();

  const formSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    uaDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    enDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    purpose: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    additionalPrice: Yup.string()
      .matches(config.formRegExp.onlyPositiveDigits, PRICE_VALIDATION_ERROR)
      .required(VALIDATION_ERROR),

    color: Yup.string().required(VALIDATION_ERROR)
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      uaName: material.name[0].value || '',
      enName: material.name[1].value || '',
      uaDescription: material.description[0].value || '',
      enDescription: material.description[1].value || '',
      purpose: material.purpose || '',
      available: material.available || false,
      additionalPrice: +material.additionalPrice[1].value / 100 || 0,
      color: material.color._id || ''
    },
    onSubmit: (data) => {
      const newMaterial = createMaterial(data);
      if (id) {
        dispatch(
          updateMaterial({
            id,
            material: { ...newMaterial }
          })
        );
        return;
      }
      dispatch(
        addMaterial({
          material: { ...newMaterial }
        })
      );
    }
  });

  const tabPanels = languages.map((lang, index) => (
    <TabPanel key={lang} value={tabsValue} index={index}>
      <Paper className={styles.materialItemAdd}>
        <TextField
          data-cy={`${lang}Name`}
          id={`${lang}Name`}
          className={styles.textField}
          variant='outlined'
          label={config.labels.material.name[tabsValue].value}
          error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
          multiline
          value={values[`${lang}Name`]}
          onChange={handleChange}
        />
        {touched[`${lang}Name`] && errors[`${lang}Name`] && (
          <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
        )}
        <TextField
          data-cy={`${lang}Description`}
          id={`${lang}Description`}
          className={styles.textField}
          variant='outlined'
          label={config.labels.material.description[tabsValue].value}
          multiline
          error={
            touched[`${lang}Description`] && !!errors[`${lang}Description`]
          }
          value={values[`${lang}Description`]}
          onChange={handleChange}
        />
        {touched[`${lang}Description`] && errors[`${lang}Description`] && (
          <div className={styles.inputError}>
            {errors[`${lang}Description`]}
          </div>
        )}
      </Paper>
    </TabPanel>
  ));

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.material.available[0].value,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const languageTabs = languages.map((lang) => (
    <Tab
      className={
        (touched[`${lang}Description`] && errors[`${lang}Description`]) ||
        (touched[`${lang}Name`] && errors[`${lang}Name`])
          ? styles.errorTab
          : styles.tabs
      }
      label={lang}
      key={lang}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.materialForm} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <CheckboxOptions options={checkboxes} />
          <ColorsBar
            onColorChange={(color) => {
              setFieldValue('color', color ? color._id : '');
            }}
            color={material.color._id ? material.color : null}
          />
          {errors.color && (
            <div className={styles.inputError}>{errors.color}</div>
          )}
          <Paper className={styles.materialItemAdd}>
            <TextField
              data-cy='purpose'
              id='purpose'
              className={styles.textField}
              variant='outlined'
              label={config.labels.material.purpose[0].value}
              value={values.purpose}
              onChange={handleChange}
              error={touched.purpose && !!errors.purpose}
            />
            {touched.purpose && errors.purpose && (
              <div className={styles.inputError}>{errors.purpose}</div>
            )}
            <TextField
              data-cy='additionalPrice'
              id='additionalPrice'
              className={styles.textField}
              variant='outlined'
              label={config.labels.material.additionalPrice[0].value}
              value={values.additionalPrice}
              onChange={handleChange}
              error={touched.additionalPrice && !!errors.additionalPrice}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div className={styles.inputError}>{errors.additionalPrice}</div>
            )}
          </Paper>
        </Grid>
        {languages.length > 0 ? (
          <div>
            <AppBar position='static'>
              <Tabs
                indicatorColor='primary'
                textColor='primary'
                className={styles.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='tabs'
              >
                {languageTabs}
              </Tabs>
            </AppBar>
            {tabPanels}
          </div>
        ) : null}
        <div className={styles.controlsBlock}>
          <div>
            <BackButton />
            <SaveButton
              className={styles.saveButton}
              data-cy='save'
              type='submit'
              title={config.buttonTitles.SAVE_MATERIAL}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
const valueShape = PropTypes.shape({
  value: PropTypes.string
});

MaterialForm.propTypes = {
  id: PropTypes.string,
  material: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.arrayOf(valueShape),
    description: PropTypes.arrayOf(valueShape),
    simpleName: PropTypes.arrayOf(valueShape),
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
    color: PropTypes.shape({
      _id: PropTypes.string,
      colorHex: PropTypes.string,
      name: PropTypes.arrayOf(valueShape),
      simpleName: PropTypes.arrayOf(valueShape)
    }),
    purpose: PropTypes.string,
    available: PropTypes.bool
  }),
  values: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    color: PropTypes.string
  }),
  errors: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    color: PropTypes.string
  }),
  touched: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

MaterialForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  material: {
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
    available: false,
    purpose: '',
    additionalPrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ],
    color: {
      _id: ''
    }
  }
};

export default MaterialForm;
