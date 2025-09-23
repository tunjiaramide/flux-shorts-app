import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUp, signIn, getCurrentUser } from '@/config/supabase'; // import helpers

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    try {
      if (isLogin) {
        // LOGIN
        await signIn(email, password);
      } else {
        // REGISTER
        await signUp(email, password, name);
      }

      // ✅ check current user
      const user = await getCurrentUser();
      if (user) {
        router.replace('/(tabs)'); // go into app
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGuest = () => {
    router.replace('/(tabs)');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1A0A05" />
      <LinearGradient colors={['#1A0A05', '#3B1E17']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.appTitle}>FluXshorts</Text>

            <View style={styles.form}>
              {!isLogin && (
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              )}
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                <Text style={styles.authButtonText}>
                  {isLogin ? 'Login' : 'Register'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleText}>
                  {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.guestContainer}>
              <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
                <Text style={styles.guestText}>Login as Guest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  form: { gap: 12, paddingHorizontal: 20 },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  error: { color: 'red', textAlign: 'center', marginVertical: 8 },
  authButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  authButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  toggleText: {
    color: '#FF8C00',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
  guestContainer: { marginTop: 30, alignItems: 'center' },
  guestButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF8C00',
  },
  guestText: { color: '#fff', fontSize: 16 },
});
