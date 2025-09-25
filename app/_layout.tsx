// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { PaystackProvider } from 'react-native-paystack-webview';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

const PAYSTACK_PUBLIC_KEY = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light').catch(() => {});
    }
  }, []);

  useFrameworkReady();

  return (
    <PaystackProvider publicKey={PAYSTACK_PUBLIC_KEY}>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#1a1a1a' },
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="video/[id]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        {Platform.OS === 'android' && <View style={styles.fakeNavBar} />}
        <StatusBar style="light" />
      </View>
    </PaystackProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  fakeNavBar: { height: 18, backgroundColor: '#1a1a1a' },
});
