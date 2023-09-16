import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect,useState} from 'react'

import {requestUserPermission, notificationListener} from './src/utiles/NotificationService'

import Routes from './src/navigation/Routes';



const App = () => {

  const [userData,setUserData]=useState();

  useEffect(() => {
    
    requestUserPermission()
    notificationListener()
     
    }, [])


  

  return (

 <Routes/>
  )
}

export default App

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:'#F6F8FC'
 }

})