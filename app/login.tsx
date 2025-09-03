import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const handleGoogleLogin = () => {
    // Handle Google login logic here
    router.replace('/(tabs)');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1A0A05" />
      <LinearGradient
        colors={['#1A0A05', '#3B1E17']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.appTitle}>FluXshorts</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                <View style={styles.googleIconContainer}>
                  <View style={styles.googleIcon}>
                    <Text style={styles.googleIconText}>G</Text>
                  </View>
                </View>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FF8C00',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 300,
    justifyContent: 'center',
    gap: 12,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconText: {
    color: '#4285F4',
    fontSize: 14,
    fontWeight: 'bold',
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});