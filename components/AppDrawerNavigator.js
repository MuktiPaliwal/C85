import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Alert, Image, Modal, ScrollView } from 'react-native';
//import MyHeader from '../components/myHeader'
import db from '../config'
import firebase from 'firebase'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {AppTabNavigator} from '../components/AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen'
import MyDonationScreen from '../screens/MyDonationScreen';
//next line C83
import NotificationScreen from '../screens/NotificationScreen';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen'


export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    }, 
    MyDonations : {
        screen : MyDonationScreen
      },
      MyReceivedBooks:{
          screen:MyReceivedBooksScreen
      },
      //next 3 lines C83
      Notification : {
        screen : NotificationScreen
      },
    Settings: {
        screen: SettingScreen
    }
    }, 
    {
        contentComponent: CustomSideBarMenu
    }, 
    {
        initialRouteName: 'Home'
    }
)