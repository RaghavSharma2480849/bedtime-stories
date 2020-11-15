import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import db from '../config'




export default class ReadScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        allStories: [],
        lastVisibleTransaction: null,
        search:''
      }
    }

    fetchMoreStories = async ()=>{   
      
   
      const query = await db.collection("stories")
      .where('storyName','==',this.state.search.toUpperCase())
      .startAfter(this.state.lastVisibleTransaction)
      .limit(10)
      .get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    
     
  }

    searchStories= async(text) =>{
            
      if (text){
        const transaction =  await db.collection("stories").where('storyName','==',text.toUpperCase()).limit(10).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
     
    }

    render() {
      return (
        <ImageBackground source = {require('../assets/evening.jpg')} 
        style={{width:'100%', height:'100%', alignItems: "centre"}}>
        <View style={styles.container}>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter Story Name"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchStories(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Story Name: " + item.storyName}</Text>
              <Text>{"Story ID: " + item.storyId}</Text>
              <Text>{"User : " + item.userId}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
              <Text>{"Story: " + item.story}</Text>
              
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreStories}
          onEndReachedThreshold={0.7}
        /> 
        </View>
        </ImageBackground>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:2,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })