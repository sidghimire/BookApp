import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React,{useState,useEffect} from 'react';
import Book from "../../../assets/json/bookList.json"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { getAuth } from 'firebase/auth';
import {doc,setDoc,deleteDoc,getDocs,query,where,getFirestore, collection,onSnapShot} from 'firebase/firestore/lite';
import AppLoader from "../../../assets/animations/AppLoader.js";
import Tts from 'react-native-tts';
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const OpenBook = ({route,navigation}) => {
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
  


    useEffect(() => {
 
        // Set the count variable value to Zero.
     
          getLikeOrNot();
          setIsLoading(false);
      }, [] );
    const [isLoading,setIsLoading]=useState(null)
    const auth=getAuth();
    const {isbn} = route.params;
    let book={}
    for(var i=0;i<Book.length;i++){
        if(Book[i]['isbn']==isbn){
            book=Book[i];
            break;
        }
    }
    const [bookmark,setBookmark]=useState(false);
    
    const db=getFirestore();

    const likeBook=async()=>{
        setBookmark(!bookmark);
        const likeRef=collection(db,"likeBooks");
        let data={}
        const likeUID=generateString(16)
        data={
            user:auth.currentUser.uid,
            isbn:isbn,
            likeUID:generateString(16)
        }
        const q=query(likeRef,where("isbn","==",isbn),where("user","==",auth.currentUser.uid));
        await getDocs(q).then(async(docSnap)=>{
            let count=0;
            let id=null
            docSnap.forEach((doc)=>{
                count++;
                id=doc.id;
            })
            if(count==0){
                await setDoc(doc(likeRef,likeUID),data)
                .then(()=>{
                }).catch(error=>{
                    console.log(error);
                },{merge:true});        
            }else{
                await deleteDoc(doc(likeRef,id))
                .then(()=>{
                })
            }
        })
        
    }

    const getLikeOrNot=async()=>{

        const likeRef=collection(db,"likeBooks");
        const q=query(likeRef,where("isbn","==",isbn),where("user","==",auth.currentUser.uid));
        setIsLoading(true);
        await getDocs(q).then((docSnap)=>{
            let count=0;
            docSnap.forEach((doc)=>{
                count++
            })
            if(count>0){
                setBookmark(true);
            }
        })
        setIsLoading(false);
    }
    
    let publishedDate="";
    if('publishedDate' in book){
    publishedDate=(book.publishedDate['$date']).split('T')[0];
    }
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={{padding:20,paddingBottom:0}} >
        <Text style={styles.bookTitle}>{book['title']}</Text>
            <View>
            <FlatList
                data={book['authors']}
                horizontal={true}
                renderItem={
                    ({item}) => 
                    <Text style={styles.bookAuthor}>{item}</Text>
                }/>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>
                <Text style={{textAlign:'left',flex:1}}>
                    <Text style={{color:'#000'}}>Date:</Text> {publishedDate}
                </Text>
                <Icon name='bullhorn-outline' size={30} onPress={()=>saySomething(book['title'],book['shortDescription'],book['longDescription'])} color='#000' style={{paddingHorizontal:20,marginHorizontal:20,borderRadius:10,backgroundColor:"#c8c8c8"}}/>
                <TouchableOpacity activeOpacity={0.8} style={{textAlign:'right',flex:1,paddingRight:20}} onPress={likeBook}>
                    {
                        (isLoading==null)?null:<Icon name={bookmark?'heart':'heart-outline'} size={30} color='#a83f39'/>
                    }
                    
                    
                </TouchableOpacity>
            </View>
            
            <Image
            style={styles.bookImage}
            source={{uri:book['thumbnailUrl']}}
            />   
            <Text style={styles.shortDescription}>
                {book['shortDescription']}
            </Text>
            <Text style={styles.shortDescription}>
                {book['longDescription']}
            </Text>
            
        </ScrollView>
        {
            !isLoading?
        null
        :<AppLoader/>
}
    </View>

  );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    bookTitle:{
        fontSize:35,
        fontWeight:'bold',
        fontFamily:'serif',
        color:'#000'
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
    bookImage:{
        width:"90%",
        height:400,
        alignSelf:"center",
        borderRadius:10,
        borderWidth:2,
        borderColor:'#999',
        margin:20
    },
    shortDescription:{
        color:'#444',
        fontSize:20,
        textAlign:'justify',
        lineHeight:30
    }
});

export default OpenBook;
