import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function useFrameworkReady() {
  useEffect(() => {
    // Keep splash screen visible initially
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000); // Show custom splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);
}