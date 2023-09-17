import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { splashLogo } from '../../contants/imagePaths'
import { wHeight, wWidht } from '../../styles/Dimensions'

const Splash = () => {
  return (
    <View style={styles.mainContainer} >
      <Image source={splashLogo} style={{resizeMode:'cover',width:wWidht,height:wHeight}} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  
  mainContainer:{
    flex:1,
    backgroundColor:'#00021a'
  }
})