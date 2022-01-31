import { View, Text,StyleSheet,TextInput,KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';

const AddBook = () => {
  return (
    <KeyboardAvoidingView behavior='position' style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Add Book 
        </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputText}>
          Book Name
        </Text>
        <TextInput style={styles.input} placeholder="Book Name" />
      </View>  
      <View style={styles.inputView}>
        <Text style={styles.inputText}>
          Short Description
        </Text>
        <TextInput style={styles.input} numberOfLines={10} textAlignVertical='top' placeholder="Short Description" />
      </View>  
      <View style={styles.inputView}>
        <Text style={styles.inputText}>
          Long Description
        </Text>
        <TextInput style={styles.input} numberOfLines={18} textAlignVertical='top' placeholder="Long Description" />
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>
          Submit
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
