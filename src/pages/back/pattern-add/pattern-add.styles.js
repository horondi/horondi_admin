import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  patternItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  textField: {
    margin: '10px 5px'
  },
  patternAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  container: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  tabs: {
    backgroundColor: 'white',
    color: 'black'
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  },
  patternImage: {
    width: '5rem',
    height: '5rem',
    margin: '5px',
    fontSize: '.7rem',
    padding: '.2rem'
  },
  patternInputFile: { display: 'none' },
  patternTitle: {
    marginBottom: '10px',
    fontSize: 24,
    color: theme.palette.text.disabled,
    fontWeight: 'bold'
  }
}));
