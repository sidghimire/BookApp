import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image, Touchable } from 'react-native';
import React,{useState} from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Book from "../../../assets/json/bookList.json"
import Tts from 'react-native-tts';

const Home = ({navigation}) => {
  const [isEbook,setIsEbook]=useState(true);
  const [speaking,setSpeaking]=useState(false);

  Tts.setDefaultLanguage('en-IE');

  Tts.setDefaultRate(0.52);
  Tts.setDefaultPitch(1.5);


  const saySomething=(a,b,c)=>{
      Tts.stop();
      if(speaking==false){
          setSpeaking(true);
          Tts.speak(a+" "+b+" "+c);
      }else{
          setSpeaking(false);
          Tts.stop();
      }
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
      <TouchableOpacity style={styles.audioCardView} onPress={()=>navigation.navigate("OpenBook",{isbn:item['isbn']})} activeOpacity={0.7}>
          <View>
            <Image
            style={styles.audioBookImage}
            source={{uri:item['thumbnailUrl']}}
            />      
          </View>
          <View style={{paddingHorizontal:10,flexDirection:'column',flex:3}}>
            <Text style={styles.audioTitleText}>{item['title']}</Text>
            <FlatList
                data={item['authors']}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={
                    ({item}) => 
                    <Text style={styles.bookAuthor}>{item}</Text>
                }/>
          </View>
          <View style={{flex:1}}>
            <Icon name='bullhorn-outline' size={25} onPress={()=>saySomething(item['title'],item['shortDescription'],item['longDescription'])} color='#fff' style={{padding:8,marginVertical:5,width:40,height:50,borderRadius:10,backgroundColor:"#4285F4",alignSelf:'flex-end'}}/>

          </View>
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
    audioCardView:{
      width:"100%",
      alignSelf:'center',
      padding:10,
      backgroundColor:'#d9d9d9',
      marginVertical:5,
      borderRadius:10,
      flexDirection:'row',
    },
    audioBookImage:{
      height:70,
      width:50,
    },
    bookImage:{
      width: "100%", 
      height: 220,
      alignSelf:"center",
      justifyContent:"center",
      borderRadius:20,
      borderColor:"#e8e8e8",
      borderWidth:2
    },
    audioTitleText:{
      fontSize:15,
      color:'#000',
    },
    bookAuthor:{
      fontSize:14,
      marginTop:10,
      margin:15,
      backgroundColor:'#ccc',
      padding:5,
      marginLeft:0,
      color:'#000',
      borderRadius:5,
      paddingHorizontal:10
  },
})  

export default Home;
