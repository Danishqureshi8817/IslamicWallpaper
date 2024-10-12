import { StyleSheet, Text, View, Button, Animated, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import imagePaths from '../../contants/imagePaths'
import { wHeight, wWidht } from '../../styles/Dimensions'
import colors from '../../styles/colors'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../../styles/fontsName'
import NavigationString from '../../contants/NavigationString'
import { getUserFirst, setUserFirst } from '../../utiles/service'

const Login = ({ navigation }) => {


  return (

    <ImageBackground source={imagePaths.loginBG} resizeMode='cover' style={{ flex: 1, width: wWidht, height: wHeight, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'flex-end' }} >
      <LinearGradient colors={[colors.whiteOpacity0, colors.whiteOpacity60, colors.white]} locations={[0.1, 0.2, 0.5]} style={{ width: '100%', height: wHeight * 0.6, alignItems: 'center', }} >

        <Image source={imagePaths.logo} style={{ resizeMode: 'contain', width: responsiveWidth(22), height: responsiveHeight(11), marginTop: responsiveHeight(17), marginBottom: responsiveHeight(1) }} />
        <Text style={{ color: colors.black, fontSize: responsiveFontSize(3), fontFamily: fontsName.PoppinsBold }} >Explore 4k </Text>
        <Text style={{ color: colors.black, fontSize: responsiveFontSize(3), fontFamily: fontsName.PoppinsBold }} >Islamic Wallpapers</Text>

        <Text style={{ color: colors.black, fontSize: responsiveFontSize(1.7), fontFamily: fontsName.PoppinsLight, marginTop: responsiveHeight(1) }} >Explore, create, watch</Text>
        <Text style={{ color: colors.black, fontSize: responsiveFontSize(1.7), fontFamily: fontsName.PoppinsLight }}  >share 4k wallpapers.</Text>

        <TouchableOpacity onPress={() => {
          setUserFirst('true')
          navigation.navigate(NavigationString.Home)
        }} style={{ backgroundColor: colors.exploreButton, marginTop: responsiveHeight(3), paddingVertical: responsiveHeight(1.6), paddingHorizontal: responsiveWidth(25), borderRadius: responsiveWidth(10), elevation: 5 }} >
          <Text style={{ color: colors.white, fontSize: responsiveFontSize(1.8), fontFamily: fontsName.PoppinsMedium }} >Explore Now</Text>
        </TouchableOpacity>


      </LinearGradient>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({})

