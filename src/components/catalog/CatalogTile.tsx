/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { CatalogTileProps } from '../../types';
import { CatalogService } from '../../services/catalogService';
import { catalagoStyle } from '../../styles/CatalogTileStyles';
import { colors } from '../../styles/theme';
import { FocusableButton } from '../comon/FocusableButton';

const CatalogTile: React.FC<CatalogTileProps> = ({ item, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleImageLoad = () => setImageLoading(false);
  const handlePress = () => onPress && onPress(item);

  const handleFocus = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        margin: 4,
      }}
    >
      <FocusableButton
        style={[
          catalagoStyle.container,
          {
            ...(Platform.isTV && {
              elevation: 6,
            }),
          },
        ]}
        onPress={handlePress}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <View style={catalagoStyle.thumbnailContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={catalagoStyle.thumbnail}
            resizeMode="cover"
            onLoad={handleImageLoad}
          />

          {imageLoading && (
            <View style={catalagoStyle.loadingOverlay}>
              <View style={catalagoStyle.loadingSpinner}>
                <Text style={catalagoStyle.loadingText}>⟳</Text>
              </View>
              <Text style={catalagoStyle.loadingSubtext}>Loading...</Text>
            </View>
          )}

          <View style={catalagoStyle.durationBadge}>
            <Text style={catalagoStyle.durationText}>
              {CatalogService.formatDuration(item.duration)}
            </Text>
          </View>

          <View
            style={[
              catalagoStyle.formatBadge,
              {
                backgroundColor: item.streamUrl.includes('.m3u8')
                  ? colors.hlsBadge
                  : colors.mp4Badge,
              },
            ]}
          >
            <Text style={catalagoStyle.formatText}>
              {item.streamUrl.includes('.m3u8') ? 'HLS' : 'MP4'}
            </Text>
          </View>
        </View>

        <View style={catalagoStyle.textContainer}>
          <Text style={catalagoStyle.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={catalagoStyle.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </FocusableButton>
    </Animated.View>
  );
};

export default CatalogTile;
