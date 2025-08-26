import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7c2d12" />
      <Stack.Screen options={{ title: 'Oops!' }} />
      <LinearGradient
        colors={['#7c2d12', '#1a1a1a']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>FluxShorts</Text>
            <Text style={styles.text}>This screen doesn't exist.</Text>
            <Link href="/" style={styles.link}>
              <Text style={styles.linkText}>Go to home screen!</Text>
            </Link>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  linkText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
