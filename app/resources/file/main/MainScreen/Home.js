import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image, Touchable } from 'react-native';
import React,{useState} from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Book from "../../../assets/json/bookList.json"
import Tts from 'react-native-tts';

const Home = ({navigation}) => {
  const [isEbook,setIsEbook]=useState(true);
  Tts.setDefaultLanguage('en-IE');

  Tts.setDefaultRate(0.6);
  Tts.setDefaultPitch(1.5);


  const saySomething=()=>{
    Tts.stop();
    Tts.speak('Hello, world!');
  }

  const renderBook=({item})=>{
    return(
      <TouchableOpacity style={styles.bookCardView} onPress={()=>navigation.navigate("OpenBook",{isbn:item['isbn']})} activeOpacity={0.7}>
          <Image
          style={styles.bookImage}
          source={{uri:item['thumbnailUrl']}}
          />      
      </TouchableOpacity>
    )
  }
  const renderAudioBook=({item})=>{
    return(
      <TouchableOpacity style={styles.bookCardView} onPress={()=>navigation.navigate("OpenBook",{isbn:item['isbn']})} activeOpacity={0.7}>
          <Image
          style={styles.bookImage}
          source={{uri:item['thumbnailUrl']}}
          />      
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          All Books
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Current')}>
          <Icon name="magnify" size={30} color="#000" solid  />
        </TouchableOpacity>

      </View>
      <View style={styles.secondaryHeader}>
        <TouchableOpacity style={[styles.secondaryHeaderButton,{backgroundColor:isEbook?"#f9f9f9":"#fff"}]} activeOpacity={0.8} onPress={()=>setIsEbook(true)}>
          <Text style={styles.text1}>Ebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.secondaryHeaderButton,{backgroundColor:isEbook?"#fff":"#f9f9f9"}]} activeOpacity={0.8} onPress={()=>setIsEbook(false)}>
          <Text style={styles.text1}>AudioBooks</Text>
        </TouchableOpacity>
      </View>
          
      {isEbook?

      <View style={{flex:1,padding:20,paddingBottom:10,paddingTop:10,backgroundColor:"#f7f7f7"}}>
        <FlatList
        key={'_'}
        data={Book}
        renderItem={renderBook}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        />
        
      </View>
      :
      <View style={{flex:1,padding:20,paddingBottom:10,paddingTop:10,backgroundColor:"#f7f7f7"}}>
        <FlatList
        key={'#'}
        data={Book}
        renderItem={renderAudioBook}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={1}
        />
        
      </View>
      }
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
        borderRadius:10,
        margin:10
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
  
    },
    bookCardView:{
      width:"50%",
      padding:10,
      borderRadius:10,
      alignSelf:"center",
      justifyContent:"center",
      
    },
    bookImage:{
      width: "100%", 
      height: 220,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:20,
      borderColor:"#e8e8e8",
      borderWidth:2
    }
})  

export default Home;
