import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  detailsTitle: ({ darkMode }) => ({
    fontSize: '26px',
    fontWeight: '700',
    color: !darkMode ? '#828282' : '#ffffff',
    marginLeft: 5,
    marginBottom: 35,
    marginTop: 60,
    '@media (max-width: 450px)': {
      fontSize: '18px',
      lineHeight: '25px'
    }
  }),
  userInfoTitle: ({ darkMode }) => ({
    fontSize: '20px',
    fontWeight: '700',
    color: !darkMode ? '#828282' : '#ffffff',
    padding: '10px 0 10px 10px'
  }),
  userInfoItem: ({ darkMode }) => ({
    fontSize: '17px',
    fontWeight: '500',
    color: !darkMode ? '#828282' : '#ffffff',
    marginRight: 20,
    '@media (max-width: 450px)': {
      fontSize: '11px',
      marginRight: '10px'
    }
  }),
  userInfoData: {
    marginLeft: 10,
    display: 'flex'
  },
  fixedButtons: {
    position: 'fixed',
    height: 60,
    zIndex: 1001,
    backgroundColor: theme.palette.bodyColor
  },
  button: {
    marginTop: theme.spacing(0.5)
  },
  // container: {
  //   width: `100%`,
  //   marginTop: 65,
  //   position: 'static',
  //   padding: 20,
  //   textAlign: 'left',
  //   '@media (max-width: 450px)': {
  //     '& .MuiGrid-grid-xs-3': {
  //       flexBasis: '50%',
  //       maxWidth: '50%'
  //     }
  //   }
  // },
  container: {
    padding: theme.spacing(2.5),
    position: 'relative',
    width: '100%',
    marginTop: 50,
    '@media (max-width: 900px)': {
      padding: '0px',
      marginLeft: '0px'
    }
  },
  table: {
    overflow: 'scroll',
    '& table': {
      backgroundColor: 'white'
    }
  },
  tableCell: ({ darkMode }) => ({
    textAlign: 'center',
    width: '30,333%',
    color: !darkMode ? '#444444' : '#ffffff',
    fontSize: 15,
    fontWeight: 500
  })
}));
