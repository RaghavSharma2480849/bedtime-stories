import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView} from 'react-native';
import db from '../config'

import * as firebase from 'firebase'
import { ScrollView } from 'react-native-gesture-handler';



export default class WriteScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        storyName:"",
        story:""
      }
    }
    submitStory = async(name, story)=>{

     await db.collection('stories').add({
        storyId: Math.random().toString(36).substring(5),
        storyName:  name.toUpperCase(),
        story:  story,
        userId : firebase.auth().currentUser.email,
        date : firebase.firestore.Timestamp.now().toDate(),
      })

      alert("Story Saved Successfully");

    }
    render(){
    return(

      <ImageBackground source = {require('../assets/evening.jpg')} 
      style = {{width:'100%', height:'100%', alignItems: "centre"}}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View>
            <Image
              source={require("../assets/booklogo.jpg")}
              style={{width:200, height: 200}}/>
            <Text style={{textAlign: 'center', fontSize: 30, color:"yellow"}}>Write Your Story</Text>
          </View>


        <View style={styles.inputView}>
        <TextInput 
          style={styles.inputBox}
          placeholder="Story Name"
          onChangeText={(text)=>{
            this.setState({
              storyName: text
            })
          }}
          value={this.state.storyName}/>
       
        </View>

        <View style={styles.inputView}>
        <TextInput 
          style={[styles.inputBox, {height: 100}]}
          placeholder="Full Story"
          onChangeText={(text)=>{
            this.setState({
              story: text
            })
          }}
          value={this.state.story}
          multiline = {true}/>
      
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={()=>{

            this.submitStory(this.state.storyName, this.state.story)

          }}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={()=>{

            this.setState({
              storyName:"",
              story:""
            })

          }}>
          <Text style={styles.submitButtonText}>Cancel</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
displayText:{
  fontSize: 15,
  textDecorationLine: 'underline'
},
scanButton:{
  backgroundColor: '#2196F3',
  padding: 10,
  margin: 10
},
buttonText:{
  fontSize: 15,
  textAlign: 'center',
  marginTop: 10
},
inputView:{
  flexDirection: 'row',
  margin: 20
},
inputBox:{
  width: 200,
  height: 40,
  borderWidth: 1.5,
  fontSize: 20,

  backgroundColor: "whiteSmoke"
},
scanButton:{
  backgroundColor: '#66BB6A',
  width: 50,
  borderWidth: 1.5,
  borderLeftWidth: 0
},
submitButton:{
  backgroundColor: '#FBC02D',
  width: 100,
  height:50
},
submitButtonText:{
  padding: 10,
  textAlign: 'center',
  fontSize: 20,
  fontWeight:"bold",
  color: 'white'
},
transactionAlert:{
  margin:10,
  color: 'red'
}
});