import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


import Home from './MainScreen/Home';
import Profile from './MainScreen/Profile';
import Bookmark from './MainScreen/Bookmark';
import AddBook from './MainScreen/AddBook';
import Current from './MainScreen/Current';
import CreateProfile from './MainScreen/CreateProfile';
const BottomTab=createBottomTabNavigator();


const HomeContainer = () => {
  return (
        <BottomTab.Navigator screenOptions={{
            tabBarShowLabel:false,
          }}>
            <BottomTab.Screen name="Home" component={Home} options={{title:"Home",headerShown:false,tabBarIcon:()=>{return(<Icon name="home-outline" size={25} color="#000" solid  />)}}} />
            <BottomTab.Screen name="Bookmark" component={Bookmark} options={{headerShown:false,tabBarIcon:()=>{return(<Icon name="bookmark-outline" size={25} color="#000" solid  />)}}} />
            <BottomTab.Screen name="AddBook" component={AddBook} options={{headerShown:false,tabBarIcon:()=>{return(<Icon name="plus-circle" size={70} style={{position:'absolute',bottom:5,backgroundColor:'#fff',borderRadius:50}} color="#000" solid  />)}}} />
            <BottomTab.Screen name="Current" component={Current} options={{headerShown:false,tabBarIcon:()=>{return(<Icon name="magnify" size={25} color="#000" solid  />)}}} />
            <BottomTab.Screen name="Profile" component={Profile} options={{headerShown:false,tabBarIcon:()=>{return(<Icon name="account-circle-outline" size={25} color="#000" solid  />)}}} />

        </BottomTab.Navigator>  );
};


export default HomeContainer;
