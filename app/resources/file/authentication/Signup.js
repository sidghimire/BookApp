import { View, Text, StatusBar, Button,TouchableOpacity ,StyleSheet} from 'react-native';
import React from 'react';

const Signin = () => {
  return (
    <View style={styles.container}>
      <StatusBar/>
      <TouchableOpacity>
        <Text style={{color:"#000"}}>SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1,
  }
});

export default Signin;
