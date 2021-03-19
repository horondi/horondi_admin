import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  ukrPostContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: '5%'
  },
  formControl: {
    width: '100%'
  },
  error: {
    color: '#e60000',
    marginTop: 15
  },
  ukrPostTitle: {
    fontWeight: 400,
    fontSize: 18,
    color: '#1D1C1C'
  },
  dataInput: {
    width: '87%'
  },
  selectorInfo: {
    width: '87%',
    marginBottom: 15
  }
}));
