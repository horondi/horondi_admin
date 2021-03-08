import { makeStyles } from '@material-ui/core/styles';

export const useCommonStyles = makeStyles((theme) => ({
  container: {
    width: `100%`,
    marginTop: 65,
    position: 'static',
    padding: 20,
    textAlign: 'left'
  },
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '45px'
  },
  materialTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 375px)': {
      fontSize: theme.spacing(2)
    }
  },
  sizeTitle: {
    marginBottom: '10px',
    marginLeft: '25px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold',
    '@media (max-width: 375px)': {
      fontSize: theme.spacing(2)
    }
  },
  tabs: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#f5f5fa',
    '& button': {
      '& span:before': {
        backgroundColor: 'red !important'
      }
    },
    '& span.MuiTab-wrapper': {
      color: '#3F51B5'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#3F51B5'
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  table: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));
