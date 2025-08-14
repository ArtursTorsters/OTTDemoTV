import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { CatalogTileProps } from '../../types';
import { CatalogService } from '../../services/catalogService';
import { catalagoStyle } from '../../styles/CatalogTileStyles';
import { colors } from '../../styles/theme';

const CatalogTile: React.FC<CatalogTileProps> = ({ item, onPress }) => {
  const [focused, setFocused] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current
  const handleImageLoad = () => setImageLoading(false);
  const handlePress = () => onPress && onPress(item);

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        transform: [{ scale: scaleAnim }],
        margin: focused ? 8 : 4,
      }}
    >
      <TouchableOpacity
        style={[
          catalagoStyle.container,

          {
            ...(focused && Platform.isTV && {
              elevation: 6,
            }),
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        focusable={true}
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
          <Text style={[
            catalagoStyle.title,
          ]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[
            catalagoStyle.description,
          ]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CatalogTile;
