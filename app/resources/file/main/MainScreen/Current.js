import { View, Text, StyleSheet,TouchableOpacity, TextInput,FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Book from "../../../assets/json/bookList.json"
import React,{useState} from 'react';


const Current = ({navigation}) => {
  const [counter,setCounter]=useState(5);
  const [searchText,setSearchText]=useState("");
  const [Ebook,setEbook]=useState(null);
  const [dataExists,setDataExists]=useState(false);
  const [EbookRender,setEbookRender]=useState(null);
  const onSearchChange=(text)=>{
    setSearchText(text);
    let data=[];
    Book.forEach((doc)=>{
      
      let title=doc['title'].toLowerCase();
      let keyword=text.toLowerCase();
      if(title.includes(keyword)){
        data.push(doc)
        
      }
    });
    setEbook(data);
    if(data.length>=counter){
      setEbookRender(data.slice(0,counter))
    }else{
      setEbookRender(data.slice(0,data.length))
    }
    
    if(data.length>0){
      setDataExists(true);
    }
    if(text==""){
      setCounter(5);
      setDataExists(false);
      setEbook(null);
    }

  }
  const loadMoreFunction=()=>{
    setCounter(counter+6);
    onSearchChange(searchText);

  }
  const renderSearchBook=({item})=>{
    let publishedDate="";
    if('publishedDate' in item){
    publishedDate=(item.publishedDate['$date']).split('T')[0];
    }
    return(
      <TouchableOpacity style={styles.bookCardView} onPress={()=>navigation.navigate("OpenBook",{isbn:item['isbn']})} activeOpacity={0.7}>
        <View style={{flex:1}}>
          <Image source={{uri:item.thumbnailUrl}} style={styles.bookImage}/>
        </View>
        <View style={{flex:3,flexDirection:'column'}}>
          <Text style={styles.renderTitleText}>{item.title}</Text>
          <Text style={styles.renderTitleDate}>{publishedDate}</Text>
          <FlatList
                data={item.authors}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({item}) => 
                    <Text style={styles.bookAuthor}>{item}</Text>
                }/>
        </View>

        
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Search
        </Text>
      </View>
      <View style={styles.searchHeader}>
        <TextInput placeholder='Search' placeholderTextColor={"#c8c8c8"} style={styles.searchInput} onChangeText={(text)=>onSearchChange(text)} />
      </View>
      <View style={{flex:1,flexDirection:'column'}}>

      {
        dataExists?
        <View style={{flex:3}}>
          <FlatList
          data={EbookRender}
          renderItem={renderSearchBook}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}/>
          
          <TouchableOpacity style={styles.loadMore} onPress={()=>loadMoreFunction()} activeOpacity={0.8}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        </View>
        :
          <Text style={{textAlign:'center',marginTop:100}}>No Books Found</Text>
        
      }

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
    padding:20
  },  
  headerText:{
      flex:1,
      fontSize:23,
      color:'#000',
      textAlign:'center',
      letterSpacing:1
  },
  searchInput:{
    color:'#585858',
    padding:10,
    borderWidth:1,
    borderColor:"#b8b8b8",
    borderRadius:50,
    width:'90%',
    alignSelf:"center",
    paddingLeft:20
  },
  bookCardView:{
    padding:10,
    marginHorizontal:20,
    marginVertical:5,
    borderRadius:10,
    backgroundColor:"#f2f2f2",
    flexDirection:'row'
  },
  bookImage:{
    width:60,
    height:80,
  },
  renderTitleText:{
    color:"#383838",
    fontFamily:"Arial",
    fontSize:16
  },
  renderTitleDate:{
    fontSize:12
  },
  bookAuthor:{
    fontSize:10,
    marginTop:10,
    margin:15,
    backgroundColor:'#ccc',
    padding:5,
    marginLeft:0,
    color:'#000',
    borderRadius:5,
    paddingHorizontal:10
},
loadMore:{
  padding:10,
  backgroundColor:'#4285F4',
  width:"90%",
  alignSelf:'center',
  borderRadius:10,
  marginVertical:10
},
loadMoreText:{
  textAlign:'center',
  color:'#fff'
}

})

export default Current;
