import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Home = () => {
  const [isEbook,setIsEbook]=useState(true);
  const [isAudio,setIsAudio]=useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          All Books
        </Text>
        <Icon name="magnify" size={30} color="#000" solid  />

      </View>
      <View style={styles.secondaryHeader}>
        <TouchableOpacity style={[styles.secondaryHeaderButton,{backgroundColor:isEbook?"#f9f9f9":"#fff"}]} activeOpacity={0.8} onPress={()=>setIsEbook(true)}>
          <Text style={styles.text1}>Ebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.secondaryHeaderButton,{backgroundColor:isEbook?"#fff":"#f9f9f9"}]} activeOpacity={0.8} onPress={()=>setIsEbook(false)}>
          <Text style={styles.text1}>AudioBooks</Text>
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
    secondaryHeader:{
        flexDirection:'row',
        marginHorizontal:15,
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:10
    },
    text1:{
        color:'#000',
        textAlign:'center',
        letterSpacing:1
    },
    secondaryHeaderButton:{
      flex:1,
      padding:15,
      borderRadius:10,
    }
})  

export default Home;
