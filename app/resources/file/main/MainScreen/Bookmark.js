import { View,RefreshControl, Text, Image, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import React,{useEffect,useState} from 'react';
import blankProfile from "../../../assets/blank-profile.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AppLoader from '../../../assets/animations/AppLoader';
import {getAuth} from 'firebase/auth'
import Book from "../../../assets/json/bookList.json"

import {doc,setDoc,getDoc,getDocs,query,where,getFirestore, collection,onSnapShot} from 'firebase/firestore/lite';

const Bookmark = ({navigation}) => {
  const db=getFirestore();
  const [isLoading,setIsLoading]=useState(false);
  const [isOwn,setIsOwn]=useState(true);
  const [name,setName]=useState("");
  const [likedData,setLikedData]=useState(null)
  const [bookmark,setBookmark]=useState(false);
  const auth=getAuth();
  const [isEbook,setIsEbook]=useState(true);

  useEffect(() => {
    getLikeOrNot();
  }, [] );

  

  const renderBook=({item})=>{
    let book={}
    for(var i=0;i<Book.length;i++){
        if(Book[i]['isbn']==item['isbn']){
            book=Book[i];
            break;
        }
    }
    return(
      <TouchableOpacity style={styles.bookCardView} onPress={()=>navigation.navigate("OpenBook",{isbn:item['isbn']})} activeOpacity={0.7}>
          <Image
          style={styles.bookImage}
          source={{uri:book['thumbnailUrl']}}
          />      
      </TouchableOpacity>
    )
  }

  const getLikeOrNot=async()=>{

    const likeRef=collection(db,"likeBooks");
    const q=query(likeRef,where("user","==",auth.currentUser.uid));
    setIsLoading(true);
    await getDocs(q).then((docSnap)=>{
        let count=0;
        let data=[]
        docSnap.forEach((doc)=>{
            data.push(doc.data());
            count++;
        })
        console.log(data);
        if(count>0){
            setLikedData(data);
            setBookmark(true);
        }
    })
    setIsLoading(false);
}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Bookmark
        </Text>
        <Icon name="magnify" size={30} color="#000" solid  />

      </View>
     
          
      
      <View style={styles.feedBody}>
        {
        bookmark? 
        <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getLikeOrNot}/>
        }
          data={likedData}
          renderItem={renderBook}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
        />
        :
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"#000"}}>No Bookmark</Text>
        </View>
        }
      </View>
      
      
      {
        isLoading?<AppLoader/>:null
      }
    </View>
  );
};

const styles = StyleSheet.create({
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
    width:"33%",
    padding:5,
    borderRadius:10,
    alignSelf:"center",
    justifyContent:"center",
    marginVertical:10
    
  },
  bookImage:{
    width: "100%", 
    height: 180,
    alignSelf:"center",
    justifyContent:"center",
    borderRadius:20,
    borderColor:"#e8e8e8",
    borderWidth:2
  },
  feedBody:{
    flex:1,
  },
  toggleHeader:{
    flexDirection:'row',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:"#e9e9e9"
  },
  toggleButton:{
    alignSelf:'center'
  },
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

export default Bookmark;
