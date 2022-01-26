import { View, Text, StyleSheet,TextInput,Button } from 'react-native';
import React, { useState } from 'react';
import {getAuth} from 'firebase/auth'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateProfile = () => {
    const [email,setEmail]=useState("");
    const auth=getAuth();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
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
            <TextInput style={styles.textInput} placeholder="Enter your name" value={email} onChangeText={text=>setEmail(text)} placeholderTextColor="#bbb" />
        </View>
        <View style={styles.textInputUnit}>
            <Text style={styles.inputLabel}>Phone No.</Text>
            <TextInput style={styles.textInput} placeholder="Enter your phone number" value={email} onChangeText={text=>setEmail(text)} placeholderTextColor="#bbb" />
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
            <TouchableOpacity activeOpacity={0.8} style={styles.createNewProfile} >
                <Text style={{color:"#fff",textAlign:'center'}}>Create Profile</Text>
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
