import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { StatusBar  } from 'react-native';
import { Loading } from '@components/Loading'

import theme from './src/theme';

import { Teams } from '@screens/Teams';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent // Transparent status bar
      />
      { fontsLoaded ? <Teams /> : <Loading />}
    </ThemeProvider>

  );
}
