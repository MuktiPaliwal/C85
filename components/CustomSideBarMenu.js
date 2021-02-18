import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View styles= {{flex:1}}>
                <View style = {{flex:0.8}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View>
                    <TouchableOpacity 
                        onPress = {()=>{
                            this.props.navigation.navigate("WelcomeScreen")
                            firebase.auth().signOut();
                        }}
                    >
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}