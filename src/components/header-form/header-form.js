import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  AppBar,
  Tabs,
  Button
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useHeaderHandlers from '../../utils/use-header-handlers';
import { useStyles } from './header-form.styles';
import { SaveButton } from '../buttons';
import TabPanel from '../tab-panel';
import { config } from '../../configs';
import { addHeader, updateHeader } from '../../redux/header/header.actions';

const {
  HEADER_VALIDATION_ERROR,
  HEADER_ERROR_MESSAGE
} = config.headerErrorMessages;

const { routes } = config;

const { languages } = config;

const HeaderForm = ({ header, id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { tabsValue, handleTabsChange, createHeader } = useHeaderHandlers();
  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => <Tab label={lang} key={lang} />)
      : null;

  const headerValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, HEADER_VALIDATION_ERROR)
      .required(HEADER_ERROR_MESSAGE),
    uaName: Yup.string()
      .min(2, HEADER_VALIDATION_ERROR)
      .required(HEADER_ERROR_MESSAGE),
    priority: Yup.number(),
    link: Yup.string()
      .min(1, HEADER_VALIDATION_ERROR)
      .required(HEADER_ERROR_MESSAGE)
  });

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    validationSchema: headerValidationSchema,
    initialValues: {
      uaName: header.title ? header.title[0].value : '',
      enName: header.title ? header.title[1].value : '',
      priority: header.priority || 1,
      link: header.link || ''
    },
    onSubmit: () => {
      const newHeader = createHeader(values);
      if (header._id) {
        dispatch(updateHeader({ id, header: newHeader }));
        return;
      }
      dispatch(addHeader({ header: newHeader }));
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Paper className={styles.headerItemUpdate}>
            <TextField
              id='link'
              data-cy='link'
              className={styles.textField}
              variant='outlined'
              label={config.labels.header.link}
              value={values.link}
              onChange={handleChange}
              error={touched.link && !!errors.link}
            />
            {touched.link && errors.link && (
              <div className={styles.inputError}>{errors.link}</div>
            )}

            <TextField
              id='priority'
              type='number'
              data-cy='priority'
              className={styles.textField}
              variant='outlined'
              label={config.labels.header.priority}
              value={values.priority}
              onChange={handleChange}
              error={touched.priority && !!errors.priority}
              helperText={
                touched.priority && errors.priority ? errors.priority : ''
              }
            />
          </Paper>
        </Grid>
        <AppBar position='static'>
          <Tabs
            className={styles.tabs}
            value={tabsValue}
            onChange={handleTabsChange}
            aria-label='simple tabs example'
          >
            {languageTabs}
          </Tabs>
        </AppBar>
        {languages.map((lang, index) => (
          <TabPanel key={lang} value={tabsValue} index={index}>
            <Paper className={styles.headerItemUpdate}>
              <TextField
                data-cy='Name'
                id={`${lang}Name`}
                className={styles.textField}
                variant='outlined'
                label={config.labels.header.name}
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
              />
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
              )}
            </Paper>
          </TabPanel>
        ))}

        <Button
          id='contactsBack'
          component={Link}
          to={routes.pathToHeaders}
          variant='outlined'
          color='primary'
          className={styles.returnButton}
          data-cy='goBackButton'
        >
          {config.buttonTitles.GO_BACK_TITLE}
        </Button>
        <SaveButton
          className={styles.saveButton}
          data-cy='save'
          type='submit'
          title={config.buttonTitles.HEADER_SAVE_TITLE}
        />
      </form>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
HeaderForm.propTypes = {
  id: PropTypes.string,
  header: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.arrayOf(valueShape),
    priority: PropTypes.number,
    link: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    link: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    priority: PropTypes.number
  }),
  errors: PropTypes.shape({
    link: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    priority: PropTypes.number
  }),
  touched: PropTypes.shape({
    link: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    priority: PropTypes.number
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
HeaderForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  header: {
    _id: '',
    title: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    link: '',
    priority: 1
  }
};

export default HeaderForm;
