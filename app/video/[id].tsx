import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { ArrowLeft, Play, Maximize } from 'lucide-react-native';
import CustomFooter from '@/components/CustomFooter';
import { movieService } from '@/services/movieService';
import { Movie } from '@/types/movie';

export default function VideoScreen() {
  const { id, title, videoUrl, thumbnailUrl, genre, year } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  const player = useVideoPlayer(videoUrl as string, player => {
    player.loop = true;
    player.muted = false;
    player.addListener('statusChange', (status) => {
      if (status.error) {
        console.log('Video error:', status.error);
        setVideoError(true);
        setIsPlaying(false);
      }
    });
  });

  useEffect(() => {
    loadRecentMovies();
  }, []);

  const loadRecentMovies = async () => {
    try {
      const movies = await movieService.getMoviesByGenre(genre as string, id as string);
      setRecentMovies(movies);
    } catch (error) {
      console.error('Error loading recent movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFullscreenPress = async () => {
    if (player) {
      try {
        setIsFullscreen(true);
        await player.enterFullscreen();
      } catch (error) {
        console.log('Fullscreen error:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (player) {
          try {
            player.pause();
          } catch (error) {
            // Ignore errors if player is already released
          }
        }
        setIsPlaying(false);
      };
    }, [player])
  );

  useEffect(() => {
    return () => {
      if (player) {
        try {
          player.pause();
        } catch (error) {
          // Ignore errors if player is already released
        }
      }
    };
  }, [player]);

  const handleBackPress = () => {
    if (player) {
      try {
        player.pause();
      } catch (error) {
        // Ignore errors if player is already released
      }
    }
    setIsPlaying(false);
    router.back();
  };

  const navigateToVideo = (movie: Movie) => {
    if (player) {
      try {
        player.pause();
      } catch (error) {
        // Ignore errors if player is already released
      }
    }
    setIsPlaying(false);
    
    router.push({
      pathname: '/video/[id]',
      params: { 
        id: movie.id, 
        title: movie.title,
        videoUrl: movie.videoUrl,
        thumbnailUrl: movie.thumbnailUrl,
        genre: movie.metadata.genre,
        year: movie.metadata.year.toString()
      }
    });
  };

  const handlePlayPress = () => {
    try {
      setVideoError(false);
      player.play();
      setIsPlaying(true);
    } catch (error) {
      console.log('Play error:', error);
      setVideoError(true);
      setIsPlaying(false);
    }
  };

  const handleRetryVideo = () => {
    try {
      setVideoError(false);
      setIsPlaying(false);
      player.replay();
    } catch (error) {
      console.log('Retry error:', error);
      setVideoError(true);
    }
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
              <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <ArrowLeft size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{title || 'Video'}</Text>
            </View>

            <View style={styles.videoPlayer}>
              {videoError ? (
                <View style={styles.errorContainer}>
                  <Image 
                    source={{ uri: thumbnailUrl as string }} 
                    style={styles.thumbnail} 
                  />
                  <View style={styles.errorOverlay}>
                    <Text style={styles.errorText}>Video playback error</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={handleRetryVideo}>
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : !isPlaying ? (
                <TouchableOpacity style={styles.thumbnailContainer} onPress={handlePlayPress}>
                  <Image 
                    source={{ uri: thumbnailUrl as string }} 
                    style={styles.thumbnail} 
                  />
                  <View style={styles.playButtonContainer}>
                    <View style={styles.playButton}>
                      <Play size={32} color="#ffffff" fill="#ffffff" />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.fullscreenButton} onPress={handleFullscreenPress}>
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
                    contentFit="cover"
                    showsTimecodes
                    nativeControls={true}
                  />
                </View>
              )}
            </View>

            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{title}</Text>
              <Text style={styles.movieMeta}>
                {genre} • {year}
              </Text>
            </View>

            {loading ? (
              <View style={styles.loadingSection}>
                <ActivityIndicator size="small" color="#fbbf24" />
                <Text style={styles.loadingText}>Loading more videos...</Text>
              </View>
            ) : (
              recentMovies.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>More Videos</Text>
                  <View style={styles.videoGrid}>
                    {recentMovies.slice(0, 6).map((movie) => (
                      <TouchableOpacity
                        key={movie.id}
                        style={styles.gridItem}
                        onPress={() => navigateToVideo(movie)}
                      >
                        <Image source={{ uri: movie.thumbnailUrl }} style={styles.gridImage} />
                        <LinearGradient
                          colors={['transparent', 'rgba(0,0,0,0.9)']}
                          style={styles.gridOverlay}
                        >
                          <Text style={styles.gridTitle}>{movie.title}</Text>
                          <Text style={styles.gridMeta}>
                            {movie.metadata.genre} • {movie.metadata.year}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )
            )}
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
    paddingHorizontal: 16,
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
    marginHorizontal: 16,
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
    paddingLeft: 4,
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
  movieInfo: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  movieMeta: {
    fontSize: 16,
    color: '#d1d5db',
  },
  loadingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 16,
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
  gridMeta: {
    color: '#d1d5db',
    fontSize: 12,
  },
  errorContainer: {
    flex: 1,
    position: 'relative',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    gap: 12,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});