import { View, Text, StyleSheet,TextInput,Button,TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import {getAuth} from 'firebase/auth'
import DatePicker from 'react-native-date-picker'
import { firebaseConfig } from '../../../../firebase';
import {getFirestore,doc,setDoc,getDoc} from 'firebase/firestore/lite'
import AppLoader from "../../../assets/animations/AppLoader.js";

const CreateProfile = ({navigation}) => {
    const db=getFirestore();
    const [isLoading,setIsLoading]=useState(false);
    
    const auth=getAuth();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [isProfileCreated,setIsProfileCreated]=useState(false);
    useEffect(() => {
 
      // Set the count variable value to Zero.
   
      getUserName();
   
    }, [] );

    const getUserName=()=>{
      const userUid=auth.currentUser.uid;
      const docRef=doc(db,"profile",userUid);
      setIsLoading(true);
      getDoc(docRef).then((docSnap)=>{
        setIsLoading(false);
        if(docSnap.exists()){
          setName(docSnap.data()['name']);
          setPhone(docSnap.data()['phone']);
          if(docSnap.data()['email']!=null && docSnap.data()['name']!=null && docSnap.data()['phone']!=null ){
           setIsProfileCreated(true)
          }else{
            setIsProfileCreated(false)
          }
        }
      })
      
    }
  

    const onFormSubmit=async()=>{
      
      const userUid=auth.currentUser.uid;
      const docRef=doc(db,"profile",userUid);
      const data={
        name:name,
        phone:phone,
        email:auth.currentUser.email,
        uid:auth.currentUser.uid
      }
      setIsLoading(true);
      setDoc(docRef,data).then(()=>{
        setIsLoading(false);
        navigation.navigate("HomeContainer");
      }).catch(error=>
        {
          alert(error)
        },{merge:true});
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>
            Create New Profile
            </Text>
        </View>
        <View style={styles.textInputUnit}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput style={styles.textInput} editable={false} placeholder="Enter your name" value={auth.currentUser.email} placeholderTextColor="#bbb" />
        </View>
        <View style={styles.textInputUnit}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput style={styles.textInput} placeholder="Enter your name" value={name} onChangeText={text=>setName(text)} placeholderTextColor="#bbb" />
        </View>
        <View style={styles.textInputUnit}>
            <Text style={styles.inputLabel}>Phone No.</Text>
            <TextInput style={styles.textInput} placeholder="Enter your phone number" value={phone} onChangeText={text=>setPhone(text)} placeholderTextColor="#bbb" />
        </View>

        <View style={styles.textInputUnit}>
            <Text style={styles.inputLabel}>Date of birth</Text>
            <Text style={styles.birthdayText}>{date.toLocaleDateString()}</Text>
            <TouchableOpacity style={styles.selectDateButton} onPress={() => setOpen(true)}>
                <Text style={{color:"#000",textAlign:'center'}}>Select Date</Text>
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                }}
                onCancel={() => {
                setOpen(false)
                }}
            />
        </View>
        <View style={styles.textInputUnit}>
            <TouchableOpacity activeOpacity={0.8} style={styles.createNewProfile} onPress={onFormSubmit} >
                <Text style={{color:"#fff",textAlign:'center'}}>Update Profile</Text>
            </TouchableOpacity>
        </View>
        {
          isLoading?<AppLoader />:null
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
        padding:20,
        marginTop:50
    },  
    headerText:{
        flex:1,
        fontSize:23,
        color:'#000',
        textAlign:'center',
        letterSpacing:1
    },
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
      birthdayText:{
        fontSize:15,
        color:"#000",
        textAlign:'center',
        margin:10
      },
      selectDateButton:{
        backgroundColor:'#e9e9e9',
        textAlign:'center',
        alignSelf:'center',
        padding:12,
        width:'100%',
        borderRadius:10
      },
      createNewProfile:{
        backgroundColor:'#E34133',
        textAlign:'center',
        alignSelf:'center',
        padding:20,
        width:'100%',
        borderRadius:10,
        marginTop:120,

      }
});

export default CreateProfile;
