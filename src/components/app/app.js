import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import Routes from '../../routes';
import { theme } from './app-theme/app.theme';
import { useStyles } from './app.styles';
import { config } from '../../configs';
import { checkUserByToken } from '../../redux/auth/auth.actions';
import { getEmailQuestionsPendingCount } from '../../redux/email-questions/email-questions.actions';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { history } from '../../store/store';

const { DARK_THEME, LIGHT_THEME } = config.theme;
const token = getFromLocalStorage('HORONDI_AUTH_TOKEN');

const App = () => {
  const darkMode = useSelector(({ Theme }) => Theme.darkMode);
  const themeMode = darkMode ? DARK_THEME : LIGHT_THEME;
  const themeValue = theme(themeMode);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserByToken(token));
    dispatch(getEmailQuestionsPendingCount());
  }, [dispatch]);

  return (
    <ThemeProvider theme={themeValue}>
      <CssBaseline>
        <div className={classes.root}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
