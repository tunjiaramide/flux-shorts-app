import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomFooter from '@/components/CustomFooter';
import { useRouter } from 'expo-router';

const Subscribe = () => {
  const router = useRouter();

  const handleSubscribe = () => {
    // 🔹 For now, just redirect to Paystack page placeholder
    // Later we’ll integrate Paystack SDK / WebView here
    //router.push('/paystack');
  };

  return (
    <LinearGradient
      colors={['#7c2d12', '#1a1a1a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.content}>
          <Text style={styles.appTitle}>FluxShorts</Text>

          <View style={styles.pricingCard}>
            <Text style={styles.planTitle}>Monthly Plan</Text>
            <Text style={styles.planPrice}>₦10,000</Text>
            <Text style={styles.planDuration}>per month</Text>

            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={handleSubscribe}
            >
              <Text style={styles.subscribeButtonText}>
                Subscribe with ₦10,000
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomFooter />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Subscribe;

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
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  planDuration: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
