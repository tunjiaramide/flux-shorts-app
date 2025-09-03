import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Force light icons on Android navigation bar
      NavigationBar.setButtonStyleAsync('light').catch(() => {
        // Some devices may ignore this; we have fallback
      });
    }
  }, []);

  useFrameworkReady();

  return (
    <View style={styles.container}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' } // screen background
        }}
        initialRouteName="login"
      >
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="video/[id]" 
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Fake dark footer to ensure icons are visible */}
      {Platform.OS === 'android' && <View style={styles.fakeNavBar} />}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // default background
  },
  fakeNavBar: {
    height: 18, // approximate Android nav bar height
    backgroundColor: '#1a1a1a',
  },
});
