import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { useStyles } from './business-page-list.styles';
import { config } from '../../configs';
import {
  getAllBusinessPages,
  deleteBusinessPage
} from '../../redux/business-pages/business-pages.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';

const { REMOVE_BUSINESS_PAGE } = config.messages;
const { DELETE_TITLE, CREATE_BUSINESS_PAGE } = config.buttonTitles;

const { pathToAddBusinessPage } = config.routes;
const tableTitles = config.tableHeadRowTitles.businessPages;

const BusinessPageList = () => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading } = useSelector(({ BusinessPages }) => ({
    list: BusinessPages.list,
    loading: BusinessPages.loading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinessPages());
  }, [dispatch]);

  const pageDeleteHandler = (id) => {
    const removeBusinessPage = () => {
      dispatch(closeDialog());
      dispatch(deleteBusinessPage(id));
    };
    openSuccessSnackbar(
      removeBusinessPage,
      DELETE_TITLE,
      REMOVE_BUSINESS_PAGE,
      DELETE_TITLE
    );
  };

  const pages =
    list !== undefined
      ? list.map((page, index) => (
        <TableContainerRow
          key={page._id}
          id={page._id}
          index={index + 1}
          code={page.code}
          title={page.title[0].value}
          showAvatar={false}
          deleteHandler={() => pageDeleteHandler(page._id)}
          editHandler={() => {
            dispatch(push(`/business-pages/${page._id}`));
          }}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <Button
          id='add-business-page'
          component={Link}
          to={pathToAddBusinessPage}
          variant='contained'
          color='primary'
          data-cy='add-business-page'
        >
          {CREATE_BUSINESS_PAGE}
        </Button>
      </div>
      <div>
        <TableContainerGenerator
          id='businessPageTable'
          tableTitles={tableTitles}
          tableItems={pages}
        />
      </div>
    </div>
  );
};

export default BusinessPageList;
