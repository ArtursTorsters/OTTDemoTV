import React from 'react';
import {
  View,
  Text,
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
import { FocusableButton } from '../components/comon/FocusableButton';

type Props = NativeStackScreenProps<NavigationScreens, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;

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

  const getFocusedButtonStyle = () => ({
    ...(Platform.isTV && {
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
              <FocusableButton
                style={styles.playButton}
                focusedStyle={getFocusedButtonStyle()}
                onPress={handlePlayPress}
              >
                <Text style={styles.playButtonText}>▶ Play</Text>
              </FocusableButton>

              <FocusableButton
                style={styles.backButton}
                focusedStyle={getFocusedButtonStyle()}
                onPress={handleBackPress}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </FocusableButton>
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
