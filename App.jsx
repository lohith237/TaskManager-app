import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login, SignUp, Home } from './src/Pages';
import { darkColors, lightColors } from './Theme/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const Colors = isDarkMode ? darkColors : lightColors;
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        setInitialRoute('Login');
      } finally {
        await BootSplash.hide({ fade: true });
      }
    };

    init();
  }, []);

  const Stack = createNativeStackNavigator();

  if (!initialRoute) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
            initialParams={{ Colors }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
            initialParams={{ Colors }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
            initialParams={{ Colors }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
