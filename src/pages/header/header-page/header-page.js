import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from './header-page.styles';
import { config } from '../../../configs';
import { getHeaders, deleteHeader } from '../../../redux/header/header.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';

const { routes } = config;
const { HEADER_REMOVE_MESSAGE } = config.messages;
const { DELETE_TITLE } = config.buttonTitles;

const { CREATE_HEADER_TITLE } = config.buttonTitles;
const pathToHeaderAddPage = routes.pathToAddHeader;
const tableTitles = config.tableHeadRowTitles.headers;

const HeaderPage = () => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading } = useSelector(({ Header }) => ({
    list: Header.list,
    loading: Header.newsLoading
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeaders());
  }, [dispatch]);

  const headerDeleteHandler = (id) => {
    const removeHeader = () => {
      dispatch(closeDialog());
      dispatch(deleteHeader(id));
    };
    openSuccessSnackbar(
      removeHeader,
      DELETE_TITLE,
      HEADER_REMOVE_MESSAGE,
      DELETE_TITLE
    );
  };

  const headerItems =
    list !== undefined
      ? list.map((headerItem) => (
        <TableContainerRow
          key={headerItem._id}
          id={headerItem._id}
          title={headerItem.title[0].value}
          priority={headerItem.priority}
          link={headerItem.link}
          showAvatar={false}
          deleteHandler={() => headerDeleteHandler(headerItem._id)}
          editHandler={() => {
            dispatch(push(`/headers/${headerItem._id}`));
          }}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableNav}>
        <Button
          data-cy='add-header'
          component={Link}
          to={pathToHeaderAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_HEADER_TITLE}
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <TableContainerGenerator
          data-cy='headerTable'
          tableTitles={tableTitles}
          tableItems={headerItems}
        />
      </div>
    </div>
  );
};

export default HeaderPage;
