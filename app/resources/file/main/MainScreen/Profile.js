import { View, Text, Image, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import React,{useEffect,useState} from 'react';
import blankProfile from "../../../assets/blank-profile.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AppLoader from '../../../assets/animations/AppLoader';
import {getAuth} from 'firebase/auth'
import Book from "../../../assets/json/bookList.json"

import {doc,setDoc,getDoc,getDocs,query,where,getFirestore, collection,onSnapShot} from 'firebase/firestore/lite';

const Profile = ({navigation}) => {
  const db=getFirestore();
  const [isLoading,setIsLoading]=useState(false);
  const [isOwn,setIsOwn]=useState(true);
  const [name,setName]=useState("");
  const [likedData,setLikedData]=useState(null)
  const [bookmark,setBookmark]=useState(false);
  const auth=getAuth();
  useEffect(() => {
    getUserName();
    getLikeOrNot();
  }, [] );

  const getUserName=()=>{
    const userUid=auth.currentUser.uid;
    const docRef=doc(db,"profile",userUid);
    setIsLoading(true);
    getDoc(docRef).then((docSnap)=>{
      setIsLoading(false);
      if(docSnap.exists()){
        setName(docSnap.data()['name']);
        if(docSnap.data()['email']!=null && docSnap.data()['name']!=null && docSnap.data()['phone']!=null ){
        }else{
        }
      }else{
      }
    })
  }
  

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
          Your Profile
        </Text>
        <Icon name="cog-outline" size={30} color="#000" solid  />

      </View>
      <View>
        <Image source={blankProfile} style={styles.profileImage}/>
        <Text style={styles.profileName}>{name}</Text>
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
      <View style={styles.toggleHeader}>
        <TouchableOpacity activeOpacity={0.8} style={[styles.toggleButton,{flex:1,padding:10},isOwn?{backgroundColor:"#ccc"}:null]} onPress={()=>setIsOwn(true)}>
          <Icon name="billboard" size={30} style={{alignSelf:'center'}} color="#000" solid  />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={[styles.toggleButton,{flex:1,padding:10,borderLeftWidth:1,borderColor:"#e9e9e9"},!isOwn?{backgroundColor:"#ccc"}:null]} onPress={()=>setIsOwn(false)}>
          <Icon name="heart-multiple-outline" style={{alignSelf:'center'}} size={30} color="#000" solid  />
        </TouchableOpacity>
        
      </View>
      {!isOwn?
      <View style={styles.feedBody}>
        {
        bookmark? 
        <FlatList
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
      :
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"#000"}}>You Havent Uploaded Any Books</Text>
        </View>
      }
      {
        isLoading?<AppLoader/>:null
      }
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Profile;
