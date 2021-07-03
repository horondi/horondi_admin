import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './header-add.styles';
import HeaderForm from '../../../components/forms/header-form';
import LoadingBar from '../../../components/loading-bar';

const HeaderAdd = () => {
  const loading = useSelector(({ Header }) => Header.headerLoading);
  const styles = useStyles();

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <HeaderForm />
    </div>
  );
};

export default HeaderAdd;
