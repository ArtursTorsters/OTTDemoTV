import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationScreens } from '../types';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createNativeStackNavigator<NavigationScreens>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#000' },
        }}>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />

        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            gestureEnabled: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
