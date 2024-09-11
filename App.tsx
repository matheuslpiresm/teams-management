import { ThemeProvider } from 'styled-components';

import theme from './src/theme';
import { Teams } from '@screens/Teams';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
     <Teams />
    </ThemeProvider>

  );
}
