import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  BackHandler,
  Platform
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationScreens } from '../types';
import { useFocusEffect } from '@react-navigation/native';
import { detailStyle as styles } from '../styles/DetailScreenStyles';
import { CatalogService } from '../services/catalogService';
import { colors } from '../styles/theme';

type Props = NativeStackScreenProps<NavigationScreens, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;
  const [playButtonFocused, setPlayButtonFocused] = useState(false);
  const [backButtonFocused, setBackButtonFocused] = useState(false);

  const handlePlayPress = () => {
    navigation.navigate('Player', { item });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [navigation])
  );

  const getFocusedButtonStyle = (focused: boolean) => ({
    ...(focused && Platform.isTV && {
      backgroundColor: colors.primary,
    }),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.posterContainer}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.poster}
              resizeMode="cover"
            />

            <View style={[
              styles.formatBadge,
              { backgroundColor: item.streamUrl.includes('.m3u8') ? colors.hlsBadge : colors.mp4Badge }
            ]}>
              <Text style={styles.formatText}>
                {item.streamUrl.includes('.m3u8') ? 'HLS' : 'MP4'}
              </Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.metaContainer}>
              <Text style={styles.duration}>
                {CatalogService.formatDuration(item.duration)}
              </Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.quality}>HD</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.type}>
                {item.streamUrl.includes('.m3u8') ? 'Streaming' : 'Download'}
              </Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.playButton,
                  getFocusedButtonStyle(playButtonFocused)
                ]}
                focusable={true}
                onPress={handlePlayPress}
                activeOpacity={1}
                onFocus={() => setPlayButtonFocused(true)}
                onBlur={() => setPlayButtonFocused(false)}
              >
                <Text style={styles.playButtonText}>
                  ▶ Play
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.backButton,
                  getFocusedButtonStyle(backButtonFocused)
                ]}
                onPress={handleBackPress}
                activeOpacity={1}
                focusable={true}
                onFocus={() => setBackButtonFocused(true)}
                onBlur={() => setBackButtonFocused(false)}
              >
                <Text style={styles.backButtonText}>
                  ← Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>Movie Information</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>
                {Math.floor(item.duration / 60)} minutes
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Format</Text>
              <Text style={styles.infoValue}>
                {item.streamUrl.includes('.m3u8') ? 'HLS Stream' : 'MP4 Video'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Quality</Text>
              <Text style={styles.infoValue}>High Definition</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
