import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Play, Maximize } from 'lucide-react-native';
import { useState } from 'react';

const recentVideos = [
  { id: '4', title: 'Lockdown', duration: '14:59', thumbnail: 'https://images.pexels.com/photos/3844464/pexels-photo-3844464.jpeg' },
  { id: '5', title: 'Academy Award Night', duration: '18:24', thumbnail: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg' },
  { id: '6', title: 'Another Dimension', duration: '21:15', thumbnail: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg' },
  { id: '7', title: 'Silent Film', duration: '10:05', thumbnail: 'https://images.pexels.com/photos/3844464/pexels-photo-3844464.jpeg' },
];

export default function VideoPlayerScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayPress = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

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
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title || 'Video Player'}</Text>
          </View>

          <View style={styles.videoPlayer}>
            {showVideo ? (
              <Video
                source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay={isPlaying}
              />
            ) : (
              <>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg' }} 
                  style={styles.videoBackground}
                />
                <View style={styles.playerControls}>
                  <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                    <Play size={40} color="#ffffff" fill="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.fullscreenButton}>
                    <Maximize size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Latest Videos</Text>
            <View style={styles.videoGrid}>
              {recentVideos.map((video) => (
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    flex: 1,
  },
  videoPlayer: {
    height: 240,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  videoBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playerControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 50,
    padding: 16,
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    padding: 8,
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
  },
});