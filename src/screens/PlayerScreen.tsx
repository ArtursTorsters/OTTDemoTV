import React from 'react';
import { View, StatusBar, BackHandler } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationScreens } from '../types';
import { useFocusEffect } from '@react-navigation/native';
import VideoPlayer from '../components/player/VideoPlayer';
import {playScreenstyle as styles} from '../styles/PlayScreenStyles'


type Props = NativeStackScreenProps<NavigationScreens, 'Player'>

const PlayerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleVideoError = (error: string) => {
    console.error(error)

  }
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [navigation])
  )
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <VideoPlayer
        streamUrl={item.streamUrl}
        onError={handleVideoError}
        onBack={handleBackPress}
      />
    </View>
  );
}
export default PlayerScreen;
