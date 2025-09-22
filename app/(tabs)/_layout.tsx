import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none', // Hide the default tab bar since we're using custom footer
          },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="subscribe" />
      </Tabs>
    </View>
  );
}