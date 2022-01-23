import { View, Text, Image,StyleSheet,TouchableOpacity} from 'react-native';
import React from 'react';
import backgroundImage from '../../assets/welcomeBackground.png';

const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage}/>
      <Text style={styles.titleText}>Book App</Text>
      <TouchableOpacity style={styles.getStartedButton} onPress={()=>navigation.navigate('ChooseOptions')} activeOpacity={0.8  }>
          <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
    },
    backgroundImage:{
        width: '100%',
        height: '100%',
        alignSelf:'center',
        position:'absolute',
    },
    titleText:{
        fontSize:50,
        fontWeight:'bold',
        color:'#fff',
        marginTop:200,
        textAlign:'center',
        letterSpacing:2,
    },
    buttonText:{
        color:"#fff",
        textAlign:'center',
        fontSize:20
    },
    getStartedButton:{
        width:250,
        alignSelf:'center',
        padding:20,
        backgroundColor:"#E34133",
        borderRadius:30,
        position:'absolute',
        bottom:50,
    }
});

export default Welcome;
