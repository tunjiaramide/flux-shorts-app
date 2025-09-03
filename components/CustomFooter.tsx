import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { House, User } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';

export default function CustomFooter() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  const isHomeActive = pathname === '/' || pathname === '/(tabs)';
  const isProfileActive = pathname === '/(tabs)/profile' || pathname === '/profile';

  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
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
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
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