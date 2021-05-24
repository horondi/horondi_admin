import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { createBrowserHistory } from 'history';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import messages from '../../../configs/messages';

const SaveButton = ({
  title,
  type,
  onClickHandler,
  color,
  errors,
  values,
  ...props
}) => {
  const error = !!Object.keys(errors).length;
  const disable = Object.values(values).every((el) => {
    if (typeof el === 'boolean' && !error) {
      return true;
    }
    if ((el || el === 0) && !error) {
      return true;
    }
    return false;
  });

  const [disabled, setDisabled] = useState(!disable);
  useEffect(() => {
    setDisabled(!disable);
  }, [disable, values, error]);

  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { SAVE_MESSAGE, SAVE_CHANGES } = messages;

  const saveButtonHandler = () => {
    const backAction = () => {
      dispatch(closeDialog());
      history.goBack();
    };
    openSuccessSnackbar(backAction, SAVE_MESSAGE, SAVE_CHANGES);
  };

  return (
    <Button
      variant='contained'
      color={color}
      type={type}
      onClick={() => {
        saveButtonHandler();
        setTimeout(() => {
          if (!error) {
            setDisabled(true);
          }
        }, 10);
      }}
      disabled={disabled}
      {...props}
    >
      {title}
    </Button>
  );
};

SaveButton.propTypes = {
  onClickHandler: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.object),
  errors: PropTypes.objectOf(PropTypes.object)
};

SaveButton.defaultProps = {
  color: 'primary',
  errors: {},
  values: {},
  onClickHandler: noop
};

export default SaveButton;
