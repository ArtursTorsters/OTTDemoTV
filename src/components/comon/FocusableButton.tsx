import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';

interface FocusableButtonProps {
  onPress: () => void;
  style?: any;
  focusedStyle?: any;
  children: React.ReactNode;
  focusable?: boolean;
  isPrimary?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const FocusableButton: React.FC<FocusableButtonProps> = ({
  onPress,
  style,
  focusedStyle,
  children,
  focusable = true,
  onFocus: customOnFocus,
  onBlur: customOnBlur,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
    customOnFocus?.();
  };

  const handleBlur = () => {
    setFocused(false);
    customOnBlur?.();
  };

  return (
    <TouchableOpacity
      style={[
        style,
        focused && Platform.isTV && focusedStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      focusable={focusable}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </TouchableOpacity>
  );
};
