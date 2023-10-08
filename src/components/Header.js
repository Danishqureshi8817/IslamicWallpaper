import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import imagePaths, { avtar } from '../contants/imagePaths';

const Header = () => {
  return (
    <View style={styles.headerWrapper} >

    <View style={styles.headerSubWrapper} >
        {/* <Icon onPress={() => { }} name="menu" size={responsiveWidth(7)} color={colors.black} /> */}
        <Image source={imagePaths.menuIcon}  style={styles.menuIcon} />
        <Text style={styles.heading} >Islamic Wallpaper</Text>
    </View>    
        <Image source={avtar} style={styles.avtar}/>


    
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    
    headerWrapper:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:responsiveWidth(2),
        paddingTop:responsiveHeight(1)
    },
    heading:{
        color:colors.black,
        fontSize:responsiveFontSize(2.2),
        fontWeight:'600'
    },
    avtar:{
        resizeMode:'contain',
        width:responsiveWidth(15),
        height:responsiveHeight(4)
    },
    headerSubWrapper:{
        flexDirection:'row',
        alignItems:'center',
        gap:responsiveWidth(5)
    },
    menuIcon:{
        resizeMode:'contain',
        width:responsiveWidth(7),
        height:responsiveHeight(3.5),
        
    }
    
})