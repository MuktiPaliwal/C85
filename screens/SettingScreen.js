import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';

import firebase from 'firebase';
import db from '../config'

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state = {
            firstName : '',
            lastName: '',
            contact: '',
            address: '' ,
            emailId: '',
            docId: ''
        }
    }

    componentDidMount(){
        this.getUserDetails()
    }

    getUserDetails(){
        var user = firebase.auth().currentUser;
        var email = user.email;

        db.collection("users").where('email_id', '==', email).get().then(snapshot=>{
            snapshot.forEach(doc =>{
                var data = doc.data()
                this.setState({
                    emailId: data.email_id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    contact: data.contact,
                    docId: doc.id
                })
            })
        })
    }

    updateUserDetails= ()=>{
        db.collection("users").doc(this.state.docId).update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact
        })

        Alert.alert("Profile updated successfully")
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style ={styles.formContainer}>
                <TextInput
                    style={styles.formTextInput}
                    placeholder ={"First Name"}
                    maxLength ={8}
                    onChangeText={(text)=>{
                        this.setState({
                        firstName: text
                        })
                    }}
                    value= {this.state.firstName}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Last Name"}
                    maxLength ={8}
                    onChangeText={(text)=>{
                        this.setState({
                        lastName: text
                        })
                    }}
                    value= {this.state.lastName}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Contact"}
                    maxLength ={10}
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{
                        this.setState({
                        contact: text
                        })
                    }}
                    value= {this.state.contact}
                    />
                    <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Address"}
                    multiline = {true}
                    onChangeText={(text)=>{
                        this.setState({
                        address: text
                        })
                    }}
                    value= {this.state.address}
                    />

<TextInput
                    style={styles.formTextInput}
                    placeholder ={"Email ID"}
                    keyboardType={'email-address'}
                    onChangeText={(text)=>{
                        this.setState({
                        emailId: text
                        })
                    }}
                    value= {this.state.emailId}
                    />

                    <TouchableOpacity
                        onPress = {()=>{
                            this.updateUserDetails()
                        }}
                    >
                        <Text>
                            Update
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
   },
   formContainer:{
     flex:1,
     width:'30%',
     justifyContent:'center',
     alignItems:'center',
   },
   formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
})