import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import blankProfile from "../../../assets/blank-profile.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


const Profile = () => {
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
        <Text style={styles.profileName}>Billy Gomez</Text>
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
