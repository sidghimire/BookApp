import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput,KeyboardAvoidingView, Pressable } from 'react-native';
import React,{useState} from 'react';
import BackgroundImage from '../../assets/signInImage.png';
import { firebaseConfig } from '../../../firebase';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const Signin = ({navigation}) => {
  const app=initializeApp(firebaseConfig);
  const auth=getAuth(app);

  const [email,setEmail] = useState('siddharthaghimire@gmail.com');
  const [password,setPassword] = useState('Password');
  const signIn=()=>{
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      setEmail('');
      setPassword('');
      navigation.navigate('HomeContainerSecondary');
    })

  }
  return (
    <KeyboardAvoidingView behavior='position' style={styles.container}>
      <Image source={BackgroundImage} style={styles.backgroundImage}/>
      <View style={{marginVertical:20}}>
        <Text style={styles.titleText}>Enter Your Credentials</Text>
        <Text style={styles.titleText}>Login to Book App</Text>
      </View>


      <View style={{display:'flex',flexDirection:'column'}}>
        <View style={styles.textInputUnit}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={text=>setEmail(text)} placeholderTextColor="#bbb" />
        </View>
        <View style={styles.textInputUnit}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput style={styles.textInput} placeholder="Password" value={password} onChangeText={text=>setPassword(text)} placeholderTextColor="#999" />
        </View>
        <View style={{paddingHorizontal:20,paddingVertical:10}}>
          <Text style={{fontSize:12,textAlign:'center',color:"#999"}}>By continuing you agree to the terms and conditions of this app</Text>
        </View>
        <TouchableOpacity style={styles.loginWithGoogle} onPress={signIn} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Pressable style={{marginTop:50}} onPress={()=>navigation.navigate("Signup")}>
        <Text style={{color:"#777",textAlign:'center',margin:15}}>
          Dont have an account?
        </Text>
      </Pressable>

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
        width: '100%',
        height:200,
        marginTop:30,
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
        width:'90%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:30,
        marginVertical:10
    },
    buttonText:{
        color:'#fff',
        alignSelf:'center',
        fontSize:15,
    }
});

export default Signin;
