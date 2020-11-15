import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import * as firebase from 'firebase'

export default class  WelcomeScreen extends React.Component{
    constructor(){
            super()
            this.state ={
                email:"",
                password:""
            }


    }

    login = async(email, password)=>{
        if(email && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate('ReadStory')
                  }
            }catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        alert("user dosen't exists")
                        console.log("doesn't exist")
                        break
                      case 'auth/invalid-email':
                        alert('incorrect email or password')
                        console.log('invaild')
                        break

                    default: alert("Server is down. Please try it Again")
                    break
                }
                
            }
           
        }else{

            alert("Please enter email and password")

        }




    }

    

    render(){
        return  (       
            
            <ImageBackground source = {require('../assets/sky.jpg')} 
            style = {{width:'100%', height:'100%', alignItems: "centre"}}>
                <KeyboardAvoidingView style={{alignItems:"center", marginTop:50}}>
                    <Text style={{alignSelf:"center",textAlign: 'center', fontSize: 40, color:'white', fontWeight:'bold'}}>
                        BedTime Stories
                    </Text>  

                    <View>
                        <TextInput 
                        placeholder = 'enter your email id' 
                        keyboardType = 'email-address'
                        onChangeText={(text)=>{
                            this.setState({
                                email: text
                            })
                        }}
                        style = {styles.inputBox}/>

                        <TextInput 
                        placeholder = 'enter password' 
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({
                                password: text
                            })
                        }}
                        style = {styles.inputBox}/>

                    </View>

                    <View>
                    <TouchableOpacity 
                    style={{alignSelf:"center",alignItems:"center",justifyContent:"center",height:55,boxShadow:'2px 3px #25847C',width:160,borderWidth:4,marginTop:20,paddingTop:5,borderRadius:20, backgroundColor:'#60BFB7'}}
                    onPress={()=>{this.login(this.state.email ,this.state.password)}}>
                        <Text 
                        style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>
                            Login Here
                        </Text>
                    </TouchableOpacity>

                 </View>
                </KeyboardAvoidingView>
                
            </ImageBackground>

        )




    }


}

const styles = StyleSheet.create({
    inputBox:{
        width: '90%',
        height: 50,
        backgroundColor: "red",
        fontSize: 22,
        borderWidth: 4,
        borderRadius: 15,
        margin: 50,
        textAlign: "center",
        alignSelf:"center"


    }
})