import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput,KeyboardAvoidingView, Pressable } from 'react-native';
import React,{useState} from 'react';
import BackgroundImage from '../../assets/signUpImage.png';
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from "../../../firebase.js";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';


const Signup =  ({navigation}) => {
  const app = initializeApp(firebaseConfig);
  const auth=getAuth(app);
  

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const createUser=()=>{
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
          setEmail('');
          setPassword('');
          navigation.navigate('Signin');
      }).catch((error)=>{
        console.log(error);
      });
    
}
  return (
    <KeyboardAvoidingView behavior='position' style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage}/>
      <View style={{marginVertical:20}}>
        <Text style={styles.titleText}>Enter Your Credentials</Text>
        <Text style={styles.titleText}>to continue with Book App</Text>
      </View>


      <View style={{display:'flex',flexDirection:'column'}}>
        
        <View style={styles.textInputUnit}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.textInput} placeholder="Email" placeholderTextColor="#bbb" value={email} onChangeText={text=>setEmail(text)} />
        </View>
        <View style={styles.textInputUnit}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput style={styles.textInput} placeholder="Password" placeholderTextColor="#999" value={password} onChangeText={text=>setPassword(text)} />
        </View>
        <View style={{paddingHorizontal:20,paddingVertical:10}}>
          <Text style={{fontSize:12,textAlign:'center',color:"#999"}}>By continuing you agree to the terms and conditions of this app</Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} activeOpacity={0.8} onPress={createUser}>
            <Text style={styles.buttonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={()=>navigation.navigate("Signin")}>
        <Text style={{color:"#777",textAlign:'center',margin:15}}>
          Already have an account?
        </Text>
      </Pressable>
      <View style={{display:'flex',flexDirection:'row',marginTop:30}}>
        <TouchableOpacity style={styles.loginWithFacebook} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Continue With Facebook</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.loginWithGoogle} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>


    </KeyboardAvoidingView>
  );
};

const styles=StyleSheet.create({
    textInputUnit:{
      paddingHorizontal:20,
      paddingVertical:10,
    },
    inputLabel:{
      color:'#481449',
      marginBottom:5,
    },
    textInput:{
      padding:10,
      borderRadius:5,
      backgroundColor:'#eee',
      color:"#000"
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    backgroundImage:{
        width: '50%',
        height:200,

        alignSelf:'center'
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
    
    buttonText:{
        color:'#fff',
        alignSelf:'center',
        fontSize:15,
    },
    loginWithFacebook:{
      flex:1,
      backgroundColor:'#4064AC',
      padding:10,
      paddingVertical:20,
      width:'80%',
      alignSelf:'center',
      justifyContent:'center',
      borderRadius:30,
      margin:10
    },
    signUpButton:{
      backgroundColor:'#32A350',
      padding:20,
      width:'80%',
      alignSelf:'center',
      justifyContent:'center',
      borderRadius:30,
  },
    loginWithGoogle:{
        flex:1,
        backgroundColor:'#E34133',
        padding:10,
      paddingVertical:20,
      width:'80%',
      alignSelf:'center',
      justifyContent:'center',
      borderRadius:30,
      margin:10
    },
    buttonText:{
        color:'#fff',
        alignSelf:'center',
        fontSize:15,
    }

});

export default Signup;
