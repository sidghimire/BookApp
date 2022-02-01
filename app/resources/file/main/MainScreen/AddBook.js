import { View,Image ,Text,StyleSheet,TextInput,KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React,{useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

import {getStorage,ref,uploadBytes} from 'firebase/storage'
import {doc,setDoc,getDoc,query,getFirestore,where, collection} from 'firebase/firestore/lite'
import AppLoader from "../../../assets/animations/AppLoader.js";
import { getAuth } from 'firebase/auth';

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}



const AddBook = ({navigation}) => {
  const [isLoading,setIsLoading]=useState(null)

  const [bookName,setBookName]=useState('');
  const [shortDescription,setShortDescription]=useState('');
  const [longDescription,setLongDescription]=useState('');
  const [image, setImage] = useState(null);


  const db=getFirestore();
  const auth=getAuth();



  const uploadBook=async()=>{
    const likeUID=generateString(16)
    const collectionDB=collection(db,'books');
    const docDB=doc(collectionDB,likeUID);
    let data={
        title:bookName,
        shortDescription:shortDescription,
        longDescription:longDescription,
        isbn:likeUID,
        publishedDate:new Date().toString(),
        uid:auth.currentUser.uid,
    }
    setIsLoading(true);
    await setDoc(docDB,data)
    .then(async(result)=>{
      let imageUrl='bookImage/'+likeUID+".jpg";
      const storage=getStorage();
      const storageRef=ref(storage,imageUrl);
      
      const img=await fetch(image.uri);
      const bytes=await img.blob();
      await uploadBytes(storageRef,bytes).then((snapshot)=>{
        setImage(null)
      })
      setIsLoading(false);
      navigation.navigate('Home');
    })

    setBookName('');
    setLongDescription('');
    setShortDescription('');
    setImage(null);
  }
  const selectFile=()=>{
    var options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'images',
      },
      includeBase64: false
    };
    launchImageLibrary(options, response=>{
      const res=response['assets'][0];
      const source = { uri: res.uri };
      setImage(source);
    
    })

  }




  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Add Book 
        </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>
          Book Name
        </Text>
        <TextInput style={styles.input} value={bookName} placeholder="Book Name" onChangeText={text=>setBookName(text)} />
      </View>  
      <View style={styles.inputView}>
        <Text style={styles.inputText}>
          Short Description
        </Text>
        <TextInput style={styles.input} value={shortDescription} numberOfLines={5} textAlignVertical='top' placeholder="Short Description" onChangeText={text=>setShortDescription(text)} />
      </View> 
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>
            Long Description
          </Text>
          <TextInput style={styles.input} value={longDescription} numberOfLines={18} textAlignVertical='top' placeholder="Long Description" onChangeText={text=>setLongDescription(text)} />
        </View>
      </KeyboardAvoidingView>
      {(image==null)?
      null
      :
      <Image source={image} style={{width:200,height:200,alignSelf:'center'}}/>
    }
      <TouchableOpacity style={[styles.submitButton,{backgroundColor:"#4081EC"}]} onPress={selectFile}>
        <Text style={styles.submitButtonText}>
          Upload Cover Image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadBook} style={[styles.submitButton,{marginBottom:50}]}>
        <Text style={styles.submitButtonText}>
          Submit
        </Text>
      </TouchableOpacity>
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
    backgroundColor:"#fff",
  },
  header:{
    flexDirection:'row',
    padding:20,
    marginTop:10
  },  
  headerText:{
      flex:1,
      fontSize:23,
      color:'#000',
      textAlign:'center',
      letterSpacing:1
  },
  inputView:{
    flexDirection:'column',
    padding:10,
  },
  inputText:{
    fontSize:14,
    paddingLeft:10,
    marginLeft:5,
    color:'#696969',
  },
  input:{
    padding:10,
    borderRadius:5,
    borderColor:"#e9e9e9",
    borderWidth:1,
    marginHorizontal:10,
  },
  submitButton:{
    backgroundColor:"#EA4335",
    margin:10,
    padding:15,
    borderRadius:10,

  },
  submitButtonText:{
    color:"#fff",
    textAlign:'center',
    
  }
});

export default AddBook;
