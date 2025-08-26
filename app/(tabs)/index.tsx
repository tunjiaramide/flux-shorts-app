import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomFooter from '@/components/CustomFooter';

const featuredVideo = {
  id: '1',
  title: 'Old Windows',
  duration: '06:00',
  thumbnail: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg',
};

const videos = [
  { id: '2', title: 'Knight of Fortune', duration: '24:00', views: '8.5k views', thumbnail: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg' },
  { id: '3', title: 'The Red Suitcase', duration: '13:38', views: '12.3k views', thumbnail: 'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg' },
  { id: '4', title: 'Lockdown', duration: '14:59', views: '5.2k views', thumbnail: 'https://images.pexels.com/photos/3844464/pexels-photo-3844464.jpeg' },
  { id: '5', title: 'Academy Award Night', duration: '18:24', views: '9.8k views', thumbnail: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg' },
  { id: '6', title: 'Another Dimension', duration: '21:15', views: '7.3k views', thumbnail: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg' },
  { id: '7', title: 'Silent Film', duration: '10:05', views: '4.1k views', thumbnail: 'https://images.pexels.com/photos/3844464/pexels-photo-3844464.jpeg' },
  { id: '8', title: 'Frame by Frame', duration: '17:30', views: '11.2k views', thumbnail: 'https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg' },
  { id: '9', title: 'The Set Life', duration: '22:00', views: '6.7k views', thumbnail: 'https://images.pexels.com/photos/3844764/pexels-photo-3844764.jpeg' },
];

export default function HomeScreen() {
  const navigateToVideo = (videoId: string, videoTitle: string) => {
    router.push({
      pathname: '/video/[id]',
      params: { id: videoId, title: videoTitle }
    });
  };

  return (
    <LinearGradient
      colors={['#7c2d12', '#1a1a1a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.appTitle}>FluxShorts</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Videos</Text>
            <TouchableOpacity 
              style={styles.featuredVideo}
              onPress={() => navigateToVideo(featuredVideo.id, featuredVideo.title)}
            >
              <Image source={{ uri: featuredVideo.thumbnail }} style={styles.featuredImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.featuredOverlay}
              >
                <Text style={styles.featuredTitle}>{featuredVideo.title}</Text>
                <Text style={styles.featuredDuration}>{featuredVideo.duration}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.videoGrid}>
              {videos.slice(0, 2).map((video) => (
                <TouchableOpacity
                  key={video.id}
                  style={styles.gridItem}
                  onPress={() => navigateToVideo(video.id, video.title)}
                >
                  <Image source={{ uri: video.thumbnail }} style={styles.gridImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.gridOverlay}
                  >
                    <Text style={styles.gridTitle}>{video.title}</Text>
                    <Text style={styles.gridDuration}>{video.duration}</Text>
                    <Text style={styles.gridViews}>👁 {video.views}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Just added</Text>
            <View style={styles.videoGrid}>
              {videos.slice(2).map((video) => (
                <TouchableOpacity
                  key={video.id}
                  style={styles.gridItem}
                  onPress={() => navigateToVideo(video.id, video.title)}
                >
                  <Image source={{ uri: video.thumbnail }} style={styles.gridImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.gridOverlay}
                  >
                    <Text style={styles.gridTitle}>{video.title}</Text>
                    <Text style={styles.gridDuration}>{video.duration}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <CustomFooter />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Reduced since tab bar is no longer absolute
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  featuredVideo: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  featuredTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredDuration: {
    color: '#d1d5db',
    fontSize: 14,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  gridTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  gridDuration: {
    color: '#d1d5db',
    fontSize: 12,
    marginBottom: 2,
  },
  gridViews: {
    color: '#d1d5db',
    fontSize: 12,
  },
});