import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => {
  const sizeButton = {
    fontSize: '1rem',
    width: '45px',
    height: '45px'
  };

  return {
    sizeButtons: {
      position: 'relative',
      display: 'flex',
      width: '50px',
      paddingBottom: '0.55rem',
      '@media (max-width: 600px)': {
        justifyContent: 'center'
      }
    },
    label: {
      fontWeight: '700',
      alignSelf: 'center',
      '@media (max-width: 600px)': {
        justifyContent: 'center'
      },
      marginRight: '10px'
    },
    error: {
      fontSize: '0.75rem',
      textAlign: 'left',
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontWeight: '400',
      lineHeight: '1.66',
      letterSpacing: '0.03333em',
      color: 'tomato',
      position: 'absolute',
      width: '160px',
      bottom: '0'
    },
    sizeButton: {
      ...sizeButton,
      backgroundColor: 'white'
    },
    selectedSize: {
      ...sizeButton,
      backgroundColor: 'lightgray',
      color: 'black',
      '&:hover': {
        backgroundColor: 'darkgray'
      }
    },
    container: {
      display: 'flex',
      marginBottom: '1.35rem',
      '@media (max-width: 600px)': {
        justifyContent: 'center'
      }
    },
    quantity: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: '12px 0px'
    },
    addBtn: {
      margin: '12px 0px'
    }
  };
});
