import React from 'react';
import { useSelector } from 'react-redux';
import NewsForm from '../../../components/forms/news-form';
import LoadingBar from '../../../components/loading-bar';
import { useCommonStyles } from '../../common.styles';

const NewsAdd = () => {
  const common = useCommonStyles();
  const { loading } = useSelector(({ News }) => ({
    loading: News.newsLoading
  }));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <NewsForm />
    </div>
  );
};

export default NewsAdd;
