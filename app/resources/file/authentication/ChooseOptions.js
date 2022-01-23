import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import BackgroundImage from '../../assets/wing.png';

const ChooseOptions = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage}/>
      <View style={{marginVertical:20}}>
        <Text style={styles.titleText}>Get your reading</Text>
        <Text style={styles.titleText}>started with Book App</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row'}}>
          <View style={{flex:1}}>
            <TouchableOpacity style={styles.signInButton} onPress={()=>navigation.navigate("Signin")} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        
          <View style={{flex:1}}>
            <TouchableOpacity style={styles.getStartedButton} onPress={()=>navigation.navigate("Signup")} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
      </View>
      <View style={{padding:30}}>
          <Text style={{color:'#bbb',textAlign:'center'}}>Continue using app using social media</Text>
      </View>
      


      <View style={{display:'flex',flexDirection:'column'}}>
        <TouchableOpacity style={styles.loginWithFacebook} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Continue With Facebook</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.loginWithGoogle} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    backgroundImage:{
        width: '100%',
        height:300,
        marginTop:30,
        marginBottom:10
    },
    titleText:{
        fontSize:30,
        fontWeight:'bold',
        color:'#000',
        letterSpacing:1,
        marginHorizontal:20,
    },
    getStartedButton:{
        backgroundColor:'#00ab66',
        padding:20,
        width:'80%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:30,
    },
    signInButton:{
        backgroundColor:'#080937',
        padding:20,
        width:'80%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:30,
    },
    loginWithFacebook:{
        backgroundColor:'#4064AC',
        padding:20,
        width:'80%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:30,
        marginVertical:10
    },
    loginWithGoogle:{
        backgroundColor:'#E34133',
        padding:20,
        width:'80%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:30,
    },
    buttonText:{
        color:'#fff',
        alignSelf:'center',
        fontSize:15,
    }
});

export default ChooseOptions;
