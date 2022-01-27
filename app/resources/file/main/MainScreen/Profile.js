import { View, Text, Image, StyleSheet } from 'react-native';
import React,{useEffect,useState} from 'react';
import blankProfile from "../../../assets/blank-profile.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AppLoader from '../../../assets/animations/AppLoader';
import {getAuth} from 'firebase/auth'
import {getFirestore,doc,setDoc,getDoc} from 'firebase/firestore/lite'

const Profile = () => {
  const db=getFirestore();
  const [isLoading,setIsLoading]=useState(false);
  
  const [name,setName]=useState("");

  const auth=getAuth();
  useEffect(() => {
    getUserName();
  }, [] );

  const getUserName=()=>{
    const userUid=auth.currentUser.uid;
    const docRef=doc(db,"profile",userUid);
    setIsLoading(true);
    getDoc(docRef).then((docSnap)=>{
      setIsLoading(false);
      if(docSnap.exists()){
        setName(docSnap.data()['name']);
        if(docSnap.data()['email']!=null && docSnap.data()['name']!=null && docSnap.data()['phone']!=null ){
        }else{
        }
      }else{
      }
    })
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Your Profile
        </Text>
        <Icon name="cog-outline" size={30} color="#000" solid  />

      </View>
      <View>
        <Image source={blankProfile} style={styles.profileImage}/>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileBio}>Bio: Hey How You Doing</Text>
      </View>
      <View style={{flexDirection:'row',marginTop:20}}>
        <View style={styles.profileStats}>
          <Text style={styles.profileStatsNumber}>120</Text>
          <Text style={styles.profileStatsLabel}>Viewed</Text>
        </View>
        <View style={[styles.profileStats]}>
          <Text style={styles.profileStatsNumber}>120</Text>
          <Text style={styles.profileStatsLabel}>Finished </Text>
        </View>
        <View style={[styles.profileStats]}>
          <Text style={styles.profileStatsNumber}>120</Text>
          <Text style={styles.profileStatsLabel}>Books Viewed</Text>
        </View>
      </View>
      {
        isLoading?<AppLoader/>:null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  profileImage:{
    width:150,
    height:150,
    borderRadius:50,
    alignSelf:"center",
    marginTop:10,
  },
  profileName:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    letterSpacing:1,
    color:'#000',
    margin:10,
  },
  profileBio:{
    fontSize:12,
    color:"#888",
    textAlign:'center',
  },
  profileStats:{
    padding:5,
    padding:10,
    borderRadius:10,
    marginHorizontal:10,
    flex:1
  },
  profileStatsNumber:{
    fontSize:20,
    color:"#000", 
    textAlign:'center',
    fontWeight:'bold'
  },
  profileStatsLabel:{
    fontSize:12,
    color:"#010101",
    textAlign:'center',
  },
  header:{
    flexDirection:'row',
    padding:20
  },  
  headerText:{
      flex:1,
      fontSize:23,
      color:'#000',
      textAlign:'center',
      letterSpacing:1
  },
});

export default Profile;
