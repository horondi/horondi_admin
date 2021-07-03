import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './pattern-add.styles';
import PatternForm from '../../../components/forms/pattern-form';
import { patternSelector } from '../../../redux/selectors/pattern.selectors';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const PatternAdd = () => {
  const styles = useStyles();
  const { loading } = useSelector(patternSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.patternTitle}>
        {config.titles.patternTitles.createPageTitle}
      </span>
      <PatternForm />
    </div>
  );
};

export default PatternAdd;
