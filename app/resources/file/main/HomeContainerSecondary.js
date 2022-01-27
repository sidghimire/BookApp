import { View, Text } from 'react-native';
import React,{useEffect,useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from './HomeContainer';
import CreateProfile from './MainScreen/CreateProfile';
import {getAuth} from 'firebase/auth'
import {getFirestore,doc,setDoc,getDoc} from 'firebase/firestore/lite'
import AppLoader from '../../assets/animations/AppLoader';

const Stack=createStackNavigator();

const HomeContainerSecondary = () => {
  const db=getFirestore();
  const [isLoading,setIsLoading]=useState(true);
  const [route,setRoute]=useState("HomeContainer");
  const auth=getAuth();
  const [isProfileCreated,setIsProfileCreated]=useState(true);
  useEffect(() => {

    // Set the count variable value to Zero.
 
    getUserName();
 
  }, [] );

  const getUserName=async()=>{
    const userUid=auth.currentUser.uid;
    const docRef=doc(db,"profile",userUid);
    await getDoc(docRef).then((docSnap)=>{
      if(docSnap.exists()){
        if(docSnap.data()['email']==null || docSnap.data()['name']==null || docSnap.data()['phone']==null ){
          setIsProfileCreated(false)
        }else{
          setIsProfileCreated(true)
        }
        setIsLoading(false);
      }else{
        setIsProfileCreated(false)
        setIsLoading(false);

      }
    })
    
  }
  if(isLoading){
    return(<AppLoader/>)
  }else{
    if(isProfileCreated){
      return (
        <Stack.Navigator initialRouteName="HomeContainer" screenOptions={{headerShown:false}}>

            <Stack.Screen name="CreateProfile" component={CreateProfile} options={{headerShown:false}} />
            <Stack.Screen name="HomeContainer" component={HomeContainer} options={{headerShown:false}} />
            
        </Stack.Navigator>
    );
  
    }else{
      return (
        <Stack.Navigator initialRouteName="CreateProfile" screenOptions={{headerShown:false}}>

            <Stack.Screen name="CreateProfile" component={CreateProfile} options={{headerShown:false}} />
            <Stack.Screen name="HomeContainer" component={HomeContainer} options={{headerShown:false}} />
            
        </Stack.Navigator>
    );
    }
  
  }

};

export default HomeContainerSecondary;
