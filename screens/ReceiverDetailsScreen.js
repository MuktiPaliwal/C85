import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import {Card} from 'react-native-elements'

import firebase from 'firebase';
import db from '../config'


export default class ReceiverDetailsScreen extends Component{
constructor(props){
    super(props);

    this.state = {
        userId                  : firebase.auth().currentUser.email,  
        receiverId              : this.props.navigation.getParam('details')['user_id'],
        bookName                : this.props.navigation.getParam('details')['book_name'],
        reason_for_requesting   : this.props.navigation.getParam('details')['reason_to_request'],
        requestId               : this.props.navigation.getParam('details')['request_id'],
        receiverName: '',
        receiverContact: '',
        receiverAddress : '',
        receiverRequestDocId: ''

    }
}

getReceiverDetails(){
    db.collection('users').where('email_id', '==', this.state.receiverId).get().then(snapshot =>{
        snapshot.forEach(doc=>{
            console.log(doc.data())
            this.setState({
                receiverName: doc.data().first_name,
                receiverContact: doc.data().contact,
                receiverAddress: doc.data().address
            })
        })
    })

    db.collection('requsted_books').where('request_id', '==', this.state.requestId).get().then(snapshot=>{
        snapshot.forEach(doc =>{
            this.setState({
                receiverRequestDocId: doc.id
            })
        })
    })
}

componentDidMount(){
    this.getReceiverDetails();
}

updateBookStatus=()=>{
    db.collection("all_donations").add({
        book_name       : this.state.bookName,
        request_id      : this.state.requestId,
        requested_by    : this.state.receiverId,
        donor_id        : this.state.userId,
        request_status  : "Donor Interested"
    })
}
    render(){
        return(
            <View style = {{flex:1}}>
               <View>
                    <Card>
                        <Text>
                            Name : {this.state.receiverName}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            Book Name : {this.state.bookName}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            Reason : {this.state.reason_for_requesting}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            Contact : {this.state.receiverContact}
                        </Text>
                    </Card>
                    <Card>
                        <Text>
                            Address : {this.state.receiverAddress}
                        </Text>
                    </Card>
               </View>

               <View>
                   {
                       this.state.receiverId !== this.state.userId
                       ?(
                           <TouchableOpacity onPress = {()=>{
                               this.updateBookStatus()
                               this.props.navigation.navigate("MyDonations")
                           }}>
                               <Text> I want to donate </Text>
                           </TouchableOpacity>

                       ): null
                   }
               </View>
            </View>
        )
    }
}