import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LoadingStateProps } from '../../types';
import { loadingStyles as styles } from '../../styles/LoadingStateStyles';


const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default LoadingState;
