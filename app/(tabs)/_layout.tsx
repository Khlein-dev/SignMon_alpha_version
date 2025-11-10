import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="(pets)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="index" options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ title: "Welcome to your Pet!", headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="lesson" options={{ headerShown: false }} />
        <Stack.Screen name="passed" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
