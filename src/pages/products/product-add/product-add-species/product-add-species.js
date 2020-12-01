import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import useProductValidation from '../../../../hooks/product/use-product-validation';

import { useStyles } from './product-add-species.styles';

import {
  getModelsByCategory,
  setProductToSend
} from '../../../../redux/products/products.actions';
import StepperControlButtons from '../../../../components/stepper-control-buttons/stepper-control-buttons';
import ProductSpeciesContainer from '../../../../containers/product-species-container';

const ProductAddSpecies = ({
  colors,
  patterns,
  models,
  activeStep,
  handleNext,
  handleBack,
  getColorsToSend,
  getPatternToSend,
  getModelToSend
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { productToSend, modelsForSelectedCategory } = useSelector(
    ({ Products }) => ({
      productToSend: Products.productToSend,
      modelsForSelectedCategory:
        Products.productSpecies.modelsForSelectedCategory
    })
  );

  const onSubmit = (value) => {
    dispatch(
      setProductToSend({
        ...value,
        colors: getColorsToSend(value.colors),
        pattern: getPatternToSend(value.pattern),
        model: getModelToSend(value.model)._id
      })
    );
    handleNext();
  };

  const selectedModel = useMemo(
    () =>
      productToSend.model
        ? modelsForSelectedCategory.find(
          ({ _id }) => _id === productToSend.model
        )
        : '',
    [productToSend.model, modelsForSelectedCategory]
  );

  const formikSpeciesValues = {
    category: productToSend.category,
    pattern: productToSend.pattern.length ? productToSend.pattern[0].value : '',
    colors: productToSend.colors.length
      ? productToSend.colors[0].simpleName[0].value
      : '',
    subcategory: productToSend.subcategory,
    model: selectedModel ? selectedModel.name[0].value : ''
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    handleValuesSubmit
  } = useProductValidation('', onSubmit, formikSpeciesValues, 'productToSend');

  useEffect(() => {
    if (values.category) dispatch(getModelsByCategory(values.category));
  }, [values.category, dispatch]);

  return (
    <div className={styles.container}>
      <ProductSpeciesContainer
        models={models}
        patterns={patterns}
        colors={colors}
        values={values}
        errors={errors}
        touched={touched}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        setFieldValue={setFieldValue}
      />
      <div className={styles.buttons}>
        <StepperControlButtons
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleValuesSubmit}
        />
      </div>
    </div>
  );
};

ProductAddSpecies.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.array).isRequired,
  patterns: PropTypes.arrayOf(PropTypes.array).isRequired,
  models: PropTypes.arrayOf(PropTypes.array).isRequired,
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  getColorsToSend: PropTypes.func.isRequired,
  getPatternToSend: PropTypes.func.isRequired,
  getModelToSend: PropTypes.func.isRequired
};

export default ProductAddSpecies;
