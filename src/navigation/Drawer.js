import { FlatList, Image, StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, Login, Quotes, ShortVideo, WallpaerSet } from '../screens';
import NavigationString from '../contants/NavigationString';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomDrawer from '../components/CustomDrawer';
import imagePaths from '../contants/imagePaths';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import fontsName from '../styles/fontsName';
import { color } from 'react-native-reanimated';
import colors from '../styles/colors';



const Stack = createNativeStackNavigator();



 function HomeStack (){
   return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
    <Stack.Screen name={NavigationString.HomeStack} component={Home}  />
    <Stack.Screen name={NavigationString.WallpaperSet} component={WallpaerSet} />
    
  </Stack.Navigator>
   )
}


const DrawerStack = createDrawerNavigator();

 function Drawer(props) {


  


  return (
    <DrawerStack.Navigator drawerContent={ props => <CustomDrawer {...props}/>} screenOptions={{headerShown:false,drawerLabelStyle:{
      marginLeft:responsiveWidth(-3),fontFamily:fontsName.PoppinsMedium,fontSize:responsiveFontSize(2.3),fontWeight:'600',color:colors.black
    },drawerActiveBackgroundColor:colors.white,drawerContentStyle:{backgroundColor:'red'}}} >
      <DrawerStack.Screen name={NavigationString.Home} component={HomeStack} options={{
        drawerIcon:({color})=>(
          <Image source={imagePaths.homeIcon} style={{resizeMode:'contain',width:responsiveWidth(6),height:responsiveHeight(3)}} />
        )
      }} />

<DrawerStack.Screen name={NavigationString.Wallpapers} component={HomeStack} options={{
        drawerIcon:({color})=>(
          <Image source={imagePaths.wallpaperIcon} style={{resizeMode:'contain',width:responsiveWidth(7),height:responsiveHeight(3.5),alignSelf:'center'}} />
        ),drawerContentStyle:{justifyContent:'center',alignItems:'center'}
      }} />


      {/* <DrawerStack.Screen name={NavigationString.WallpaperSet} component={WallpaerSet} /> */}
      <DrawerStack.Screen name={NavigationString.ShortVideo} component={ShortVideo} options={{
        drawerIcon:({color})=>(
          <Image source={imagePaths.videoIcon} style={{resizeMode:'contain',width:responsiveWidth(6),height:responsiveHeight(3)}} />
        )
      }}   />
      <DrawerStack.Screen name={NavigationString.Quotes} component={Quotes} options={{
        drawerIcon:({color})=>(
          <Image source={imagePaths.quoteIcon} style={{resizeMode:'contain',width:responsiveWidth(6),height:responsiveHeight(3)}} />
        )
      }}  />
      
    </DrawerStack.Navigator>
  );
}


export default Drawer