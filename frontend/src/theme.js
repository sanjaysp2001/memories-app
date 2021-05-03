import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
   fontFamily: ['"Fira Sans"', 'Open Sans'].join(',')
  }
})

export default theme;