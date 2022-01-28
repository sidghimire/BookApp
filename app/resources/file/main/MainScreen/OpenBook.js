import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import Book from "../../../assets/json/bookList.json"
import { ScrollView } from 'react-native-gesture-handler';
const OpenBook = ({route,navigation}) => {
    const {isbn} = route.params;
    let book={}
    console.log(Book);
    for(var i=0;i<Book.length;i++){
        if(Book[i]['isbn']==isbn){
            book=Book[i];
            break;
        }
    }
    const publishedDate=(book['publishedDate']['$date']).split('T')[0];
    console.log(book);
  return (
    <ScrollView style={styles.container}>
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
            <Text style={{textAlign:'right'}}>
                <Text style={{color:'#000'}}>Date:</Text> {publishedDate}
            </Text>
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
  );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:20,
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
        width:"80%",
        height:"30%",
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
    }
});

export default OpenBook;
