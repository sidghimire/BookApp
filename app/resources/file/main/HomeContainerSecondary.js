import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from './HomeContainer';
import CreateProfile from './MainScreen/CreateProfile';

const Stack=createStackNavigator();

const HomeContainerSecondary = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="CreateProfile" component={CreateProfile} options={{headerShown:false}} />
        <Stack.Screen name="HomeContainer" component={HomeContainer} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default HomeContainerSecondary;
