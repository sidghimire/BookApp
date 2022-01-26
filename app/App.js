import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from './resources/file/authentication/Signin';
import Signup from './resources/file/authentication/Signup';
import Welcome from './resources/file/authentication/Welcome';
import ChooseOptions from './resources/file/authentication/ChooseOptions';
import HomeContainerSecondary from './resources/file/main/HomeContainerSecondary';
import {getAuth,setPersistence,browserSessionPersistence} from 'firebase/auth' 
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

const Stack=createStackNavigator();

const App = () => {

  const app=initializeApp(firebaseConfig);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={getAuth(app)?"Welcome":"HomeContainer"}>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
        <Stack.Screen name='ChooseOptions' component={ChooseOptions} options={{headerTitle:""}}/>
        <Stack.Screen name='Signup' component={Signup}  options={{headerTitle:""}}/>
        <Stack.Screen name='Signin' component={Signin} options={{headerTitle:""}}/>
        <Stack.Screen name='HomeContainerSecondary' component={HomeContainerSecondary} options={{headerTitle:"",headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
