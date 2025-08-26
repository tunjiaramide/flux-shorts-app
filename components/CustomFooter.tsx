import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, User } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';

export default function CustomFooter() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  const isHomeActive = pathname === '/' || pathname === '/(tabs)';
  const isProfileActive = pathname === '/(tabs)/profile' || pathname === '/profile';

  return (
    <View style={[
      styles.footer, 
      { 
        paddingBottom: Math.max(insets.bottom, 12),
        marginBottom: Platform.OS === 'android' ? 0 : 0,
      }
    ]}>
      <TouchableOpacity 
        style={styles.footerTab}
        onPress={() => router.push('/(tabs)')}
      >
        <House 
          size={22} 
          color={isHomeActive ? '#ff6b35' : '#666666'} 
          strokeWidth={2} 
        />
        <Text style={[
          styles.footerTabText, 
          { color: isHomeActive ? '#ff6b35' : '#666666' }
        ]}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.footerTab}
        onPress={() => router.push('/(tabs)/profile')}
      >
        <User 
          size={22} 
          color={isProfileActive ? '#ff6b35' : '#666666'} 
          strokeWidth={2} 
        />
        <Text style={[
          styles.footerTabText, 
          { color: isProfileActive ? '#ff6b35' : '#666666' }
        ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
    paddingTop: 12,
    paddingHorizontal: 20,
    minHeight: 70,
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  footerTabText: {
    fontSize: 11,
    fontWeight: '600',
  },
});