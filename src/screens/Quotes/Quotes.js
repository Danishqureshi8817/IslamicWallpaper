import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
import Header from '../../components/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wWidht } from '../../styles/Dimensions'


const Quotes = ({navigation}) => {

  const quotes = [
    require('../../assets/images/quote1.png'),
    require('../../assets/images/quote2.png'),
    require('../../assets/images/quote3.png'),
    require('../../assets/images/quote4.png'),

  ]



  const quotesList = ({item,index}) => {
    //  console.log('compry',index,shortVideoData.length-1);
     
  let leg = quotes.length-1

 
  
         return (
            <ImageBackground resizeMode='contain' source={item} style={[styles.quotesImg,{marginTop:index==0?0:responsiveHeight(2)}]} >

            </ImageBackground>
         )
      }

  return (
    <View style={styles.mainContainer} >
        <Header openDrawer={()=> navigation.openDrawer()} headerName={'Quotes'} optionStyles={{borderBottomWidth:1,borderBottomColor:colors.blackOpacity15}}  />

        <FlatList
        style={{marginTop:responsiveHeight(2),marginHorizontal:responsiveWidth(4),alignSelf:'center'}}

      showsVerticalScrollIndicator={false}
        data={quotes}
        renderItem={quotesList}
      //  ListEmptyComponent={EmptyOption}
      
        keyExtractor={index =>  index}
      />

    </View>
  )
}

export default Quotes

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:colors.white
  },
  quotesImg:{
  
    width:wWidht*0.9,
    height:responsiveHeight(22),

  }
})