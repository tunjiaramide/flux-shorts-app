import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { ArrowLeft, Play, Maximize } from 'lucide-react-native';
import CustomFooter from '@/components/CustomFooter';

const recentVideos = [
  { id: '4', title: 'Lockdown', duration: '14:59', thumbnail: 'https://images.pexels.com/photos/3844464/pexels-photo-3844464.jpeg' },
  { id: '5', title: 'Academy Award Night', duration: '18:24', thumbnail: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg' },
  { id: '6', title: 'Another Dimension', duration: '21:15', thumbnail: 'https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg' },
  { id: '7', title: 'Silent Film', duration: '10:05', thumbnail: 'https://images.pexels.com/photos/3844464/pexels-photo-3844464.jpeg' },
];

export default function VideoScreen() {
  const { id, title } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const player = useVideoPlayer('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', player => {
    player.loop = true;
    player.muted = false;
  });

  const handleFullscreenPress = async () => {
    if (player) {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setIsFullscreen(true);
        await player.enterFullscreen();
      } catch (error) {
        console.log('Fullscreen error:', error);
      }
    }
  };

  // Stop video when navigating away or component unmounts
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // This runs when the screen loses focus
        if (player) {
          player.pause();
        }
        setIsPlaying(false);
      };
    }, [player])
  );

  // Also stop video when component unmounts
  useEffect(() => {
    return () => {
      if (player) {
        player.release();
      }
    };
  }, [player]);

  const navigateToVideo = (videoId: string, videoTitle: string) => {
    // Stop current video before navigating
    if (player) {
      player.pause();
    }
    setIsPlaying(false);
    
    router.push({
      pathname: '/video/[id]',
      params: { id: videoId, title: videoTitle }
    });
  };

  const handlePlayPress = () => {
    player.play();
    setIsPlaying(true);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7c2d12" />
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
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <ArrowLeft size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{title || 'Video'}</Text>
            </View>

            <View style={styles.videoPlayer}>
              {!isPlaying ? (
                <TouchableOpacity style={styles.thumbnailContainer} onPress={handlePlayPress}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg' }} 
                    style={styles.thumbnail} 
                  />
                  <View style={styles.playButtonContainer}>
                    <View style={styles.playButton}>
                      <Play size={32} color="#ffffff" fill="#ffffff" />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.fullscreenButton}>
                    <Maximize size={20} color="#ffffff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ) : (
                <View style={styles.videoContainer}>
                  <VideoView
                    style={isFullscreen ? styles.fullscreenVideo : styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                    contentFit="contain"
                    showsTimecodes
                  />
                </View>
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
          <CustomFooter />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
    backgroundColor: '#000000',
  },
  thumbnailContainer: {
    flex: 1,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4, // Slight offset for play icon visual balance
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  video: {
    flex: 1,
  },
  fullscreenVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
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