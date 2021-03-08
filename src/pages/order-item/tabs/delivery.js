import React from 'react';
import { TextField, Checkbox } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';

import DeliveryDetails from './delivery-details';
import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';
import { address, inputName } from '../../../utils/order';
import materialUiConstants from '../../../configs/material-ui-constants';
import { dateFormat } from '../../../configs';

const Delivery = ({ data, handleChange }) => {
  const classes = useStyles();
  const { deliveryLabels } = labels;
  const { sentByInput, officeInput, costInput, courierInput } = inputName;

  const {
    deliveryMethodLabel,
    byCourierLabel,
    deliveryCostLabel,
    sentAtLabel,
    courierOfficeNameLabel
  } = deliveryLabels;
  const { delivery } = data;
  const { sentOn, sentBy, byCourier, courierOffice, cost } = delivery;

  return (
    <div className={classes.delivery}>
      <TextField
        label={deliveryMethodLabel}
        name={sentByInput}
        value={sentBy}
        onChange={handleChange}
        variant={materialUiConstants.outlined}
      />
      <TextField
        label={courierOfficeNameLabel}
        name={officeInput}
        value={courierOffice}
        onChange={handleChange}
        variant={materialUiConstants.outlined}
      />
      <div className={classes.dateContainer}>
        {sentOn ? (
          <p>
            {sentAtLabel} {moment.unix(sentOn / 1000).format(dateFormat)}
          </p>
        ) : null}
      </div>
      {delivery?.cost[0]?.value ? (
        <TextField
          label={deliveryCostLabel}
          name={costInput}
          value={cost[0].value}
          onChange={handleChange}
          variant={materialUiConstants.outlined}
        />
      ) : null}
      <div className={classes.idContainer}>
        <label htmlFor='byCourier'>{byCourierLabel}</label>
        <Checkbox
          id='byCourier'
          checked={byCourier}
          name={courierInput}
          onChange={handleChange}
        />
      </div>
      {byCourier && (
        <DeliveryDetails
          address={address(delivery)}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

Delivery.defaultProps = {
  data: {}
};

Delivery.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      sentOn: PropTypes.string,
      sentBy: PropTypes.string,
      byCourier: PropTypes.bool,
      courierOffice: PropTypes.string,
      cost: PropTypes.arrayOf(PropTypes.string),
      city: PropTypes.string,
      street: PropTypes.string,
      house: PropTypes.string,
      flat: PropTypes.string
    })
  ),
  handleChange: PropTypes.func.isRequired
};

export default Delivery;
