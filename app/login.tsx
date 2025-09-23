import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/config/supabase';

export default function LoginScreen() {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const resetMessages = () => {
    setErrorMsg(null);
    setInfoMsg(null);
  };

  const handleAuth = async () => {
    resetMessages();
    setLoading(true);

    if (!email || !password || (mode === 'register' && !name)) {
      setErrorMsg('Please fill all required fields.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        // sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        // successful sign in -> navigate into app
        router.replace('/(tabs)');
      } else {
        // register
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setLoading(false);
          return;
        }

        // Try to set user metadata (full name) if session available
        try {
          // updateUser will work if session exists; some Supabase projects require email confirmation first.
          await supabase.auth.updateUser({
            data: { full_name: name },
          });
        } catch (err) {
          // not critical — continue
          console.log('updateUser error (non-fatal):', err);
        }

        // If signup requires email confirmation, inform the user
        if (!data?.user) {
          setInfoMsg('Registration successful. Please check your email to confirm your account.');
          // still you might want to route them to an "awaiting confirmation" screen,
          // but we'll keep them on this page with info message.
          setLoading(false);
          return;
        }

        // If user created and session exists, route into the app:
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      console.log('Auth error', err);
      setErrorMsg(err?.message ?? 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    // fallback: allow guest navigation if you want
    router.replace('/(tabs)');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1A0A05" />
      <LinearGradient colors={['#1A0A05', '#3B1E17']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.content}
          >
            <Text style={styles.appTitle}>FluXshorts</Text>

            {/* Tab switch */}
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[styles.tabButton, mode === 'login' && styles.tabActive]}
                onPress={() => { setMode('login'); resetMessages(); }}
              >
                <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabButton, mode === 'register' && styles.tabActive]}
                onPress={() => { setMode('register'); resetMessages(); }}
              >
                <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>Register</Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {mode === 'register' && (
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor="#c7c7c7"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              )}

              <TextInput
                placeholder="Email"
                placeholderTextColor="#c7c7c7"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />

              <TextInput
                placeholder="Password"
                placeholderTextColor="#c7c7c7"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
              />

              {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
              {infoMsg ? <Text style={styles.infoText}>{infoMsg}</Text> : null}

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleAuth}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {mode === 'login' ? 'Login' : 'Create account'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
                <Text style={styles.guestText}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  appTitle: { fontSize: 28, fontWeight: 'bold', color: '#FF8C00', textAlign: 'center', marginBottom: 28 },
  tabRow: { flexDirection: 'row', alignSelf: 'center', marginBottom: 20 },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  tabActive: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  form: {
    marginTop: 8,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  guestButton: {
    marginTop: 12,
  },
  guestText: { color: '#c7c7c7' },
  errorText: { color: '#ff6b6b', marginTop: 6 },
  infoText: { color: '#ffd27a', marginTop: 6 },
});
