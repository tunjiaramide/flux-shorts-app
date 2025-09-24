// app/(tabs)/subscribe.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFooter from '@/components/CustomFooter';
import { router } from 'expo-router';
import { usePaystack } from 'react-native-paystack-webview';
import { supabase } from '@/config/supabase';

const PRICE_NAIRA = 10000; // displayed price

export default function Subscribe() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { popup } = usePaystack();

  useEffect(() => {
    // fetch current user from Supabase
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        if (user) {
          setUserEmail(user.email ?? '');
          setUserName(user.user_metadata?.name ?? '');
        }
      } catch (err) {
        console.warn('Failed to get user from Supabase', err);
      }
    })();
  }, []);

  const handleSubscribe = async () => {
    if (!userEmail) {
      Alert.alert('Missing email', 'Please add an email to your profile before subscribing.');
      return;
    }

    // Paystack expects amount in kobo (1 Naira = 100 kobo).
    // If you find the library expects Naira instead, change to `PRICE_NAIRA`.
    const amount = PRICE_NAIRA;

    setLoading(true);

    try {
      await popup.checkout({
        email: userEmail,
        amount, // in kobo
        reference: `flux_${Date.now()}`, // unique reference
        metadata: {
          name: userName,
        },
        onSuccess: (res: any) => {
          setLoading(false);
          // res contains the transaction details from Paystack
          console.log('Paystack success:', res);

          // TODO: later persist subscription info to Supabase

          // Redirect to your main movies/tabs page
          // Adjust the path if your all-movies route is different
          router.replace('/(tabs)');
        },
        onCancel: () => {
          setLoading(false);
          Alert.alert('Payment cancelled');
        },
        onError: (err: any) => {
          setLoading(false);
          console.error('Paystack error:', err);
          Alert.alert('Payment error', err?.message || 'An error occurred during payment.');
        },
        onLoad: () => {
          // optional: the paystack webview loaded
          console.log('Paystack loaded');
        },
      });
    } catch (err: any) {
      setLoading(false);
      console.error('popup.checkout threw:', err);
      Alert.alert('Payment error', err?.message || 'Something went wrong starting payment.');
    }
  };

  return (
    <LinearGradient colors={['#7c2d12', '#1a1a1a']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.content}>
          <Text style={styles.appTitle}>FluxShorts</Text>

          <View style={styles.pricingCard}>
            <Text style={styles.planTitle}>Monthly Plan</Text>
            <Text style={styles.planPrice}>₦{PRICE_NAIRA.toLocaleString()}</Text>
            <Text style={styles.planDuration}>per month</Text>

            <TouchableOpacity
              style={[styles.subscribeButton, loading && { opacity: 0.7 }]}
              onPress={handleSubscribe}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.subscribeButtonText}>
                  Subscribe with ₦{PRICE_NAIRA.toLocaleString()}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <CustomFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
    marginBottom: 32,
  },
  pricingCard: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  planTitle: { fontSize: 20, fontWeight: '600', color: '#fff', marginBottom: 12 },
  planPrice: { fontSize: 32, fontWeight: 'bold', color: '#fbbf24' },
  planDuration: { fontSize: 16, color: '#d1d5db', marginBottom: 20 },
  subscribeButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  subscribeButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
