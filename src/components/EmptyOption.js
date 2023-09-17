import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import colors from '../styles/colors'
import { responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const EmptyOption = () => {
  return (
    <View>
      <ShimmerPlaceholder
      style={{   paddingHorizontal:responsiveWidth(4),
    //   marginHorizontal:responsiveWidth(1),
      paddingVertical:responsiveHeight(1),
      borderRadius:responsiveWidth(5),
      height:wHeight*0.04,
      marginBottom:responsiveHeight(2),
      justifyContent:'center',
      alignItems:'center'}}
       shimmerColors={[colors.shimmerColor1,colors.shimmerColor2,colors.shimmerColor3]}
      >

      </ShimmerPlaceholder>
    </View>
  )
}

export default EmptyOption

const styles = StyleSheet.create({})