import { StyleSheet, Text, View,Image,TouchableOpacity,Pressable } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import imagePaths, { avtar } from '../contants/imagePaths';
import fontsName from '../styles/fontsName';
import NavigationString from '../contants/NavigationString';

const Header = ({openDrawer,headerName,optionStyles,iconName,navigation}) => {
  return (
    <View style={[styles.headerWrapper,{...optionStyles}]} >

    <View style={styles.headerSubWrapper} >
        {/* <Icon onPress={() => { }} name="menu" size={responsiveWidth(7)} color={colors.black} /> */}
        <TouchableOpacity onPress={openDrawer} >
       { iconName == null ? <Image source={imagePaths.menuIcon}   style={styles.menuIcon} /> : 
       <Icon
              name={iconName}
              size={responsiveWidth(6)}
              onPress={() => {
                navigation.navigate(NavigationString.ShortVideo)
              }}
              color="#000"
            //   style={{
            //     marginRight: responsiveWidth(2),
            //     position: 'absolute',
            //     right: 0,
            //     marginTop: responsiveHeight(1),
            //   }}
            />}

        </TouchableOpacity>
  
        <Text style={styles.heading} >{headerName }</Text>
    </View>    
        <Image source={imagePaths.man} style={styles.avtar}/>


    
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
        paddingTop:responsiveHeight(1),
       
        paddingBottom:responsiveHeight(1)
    },
    heading:{
        color:colors.black,
        fontSize:responsiveFontSize(2.2),
        fontWeight:'bold',
        fontFamily:fontsName.PoppinsSemiBold
    },
    avtar:{
        resizeMode:'contain',
        width:responsiveWidth(18),
        height:responsiveHeight(5)
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