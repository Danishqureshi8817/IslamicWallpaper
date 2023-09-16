import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect,useState} from 'react'

import {requestUserPermission, notificationListener} from './src/utiles/NotificationService'

import Routes from './src/navigation/Routes';

import store from './src/store/store';
 
import { Provider } from 'react-redux';


const App = () => {

  const [userData,setUserData]=useState();

  useEffect(() => {
    
    requestUserPermission()
    notificationListener()
     
    }, [])


  

  return (
<Provider  store={store} >
 <Routes/>
 </Provider>

  )
}

export default App

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:'#F6F8FC'
 }

})