import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { errorStyles as styles } from '../../styles/ErrorStateStyles';
import { ErrorStateProps } from '../../types';

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorState;
