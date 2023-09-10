import { StyleSheet, Text, View,Image,FlatList,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
import { background } from '../../contants/imagePaths'
import Header from '../../components/Header'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import { wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {

  const hadisData = [
    {
        id:'01',
        img:require('../../assets/images/h1.jpg')
    },
    {
        id:'02',
        img:require('../../assets/images/h2.jpg')
    },
    {
        id:'03',
        img:require('../../assets/images/h3.jpg')
    },
    {
        id:'04',
        img:require('../../assets/images/h4.jpg')
    },
  ]

  return (
    <View style={styles.mainContainer} >
    <Image source={background} style={styles.bg} />
       
       <Header/>

       <View style={styles.optionsWrapper} >
       <FlatList
        
       horizontal
       showsHorizontalScrollIndicator={false}
        data={["Wallpaper","Habis","Status","Islamic"]}
        renderItem={({item}) => {
           return(
         <TouchableOpacity>
               <Text style={styles.optionText} >{item}</Text>
         </TouchableOpacity>
           
           )
        }}
        keyExtractor={index => index}
      />
       </View>
     
       <FlatList
      style={{marginTop:responsiveHeight(2),}}
       showsVerticalScrollIndicator={false}
        data={hadisData}
        renderItem={({item}) => {
           return(
            <View style={[styles.itemWrapper,{marginTop:responsiveHeight(2)}]} >
              <ImageBackground source={item.img} style={styles.image} >
                    
                    <View style={styles.iconsWrapper} >
                        <View style={styles.leftIconWrapper}>
                        <Icon onPress={() => { }} name="eye" size={responsiveWidth(5)} color={'#FFBB2E'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >211</Text>
                        <Icon onPress={() => { }} name="share-social" size={responsiveWidth(5)} color={'#FFBB2E'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >25</Text>
                        </View>

                        <View style={styles.rightIconWrapper}>
                        <TouchableOpacity>
                        <Icon onPress={() => { }} name="heart-outline" size={responsiveWidth(7)} color={'#fe0000'} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                        <Icon onPress={() => { }} name="share" size={responsiveWidth(7)} color={colors.themeText} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                        <Icon onPress={() => { }} name="logo-whatsapp" size={responsiveWidth(7)} color={'#25D366'} />
                        </TouchableOpacity>
                     

                        </View>
                    </View>
              </ImageBackground>
            </View>

            //   <Image source={item.img} />
           )
        }}
        keyExtractor={ item => item.id}
      />
  
    
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colors.white,
        // paddingHorizontal:responsiveWidth(2),
        // paddingTop:responsiveHeight(2)
    },
    bg:{
        resizeMode:'cover',
        width:'100%',
        height:'40%',
        tintColor:colors.blackOpacity90,
        position:'absolute',
        top:0
      
    },
    optionsWrapper:{
        backgroundColor:colors.white,
        marginHorizontal:responsiveWidth(5),
        paddingVertical:responsiveHeight(0.5),
        borderRadius:responsiveWidth(10),
        marginTop:responsiveHeight(2.5),
        paddingHorizontal:responsiveWidth(2),
        overflow:'hidden'


    
    },
    optionText:{
        color:colors.black,
        marginHorizontal:responsiveWidth(2),
        backgroundColor:'#FFBB2E',
        paddingHorizontal:responsiveWidth(4),
        paddingVertical:responsiveHeight(1.5),
        borderRadius:responsiveWidth(6)
    },
    image:{
         resizeMode:'stretch',
        width:'100%',
         height:responsiveHeight(30),
         alignSelf:'center',
         justifyContent:'flex-end'

         
    },
    itemWrapper:{
        // marginVertical:responsiveHeight(1)
        borderRadius:responsiveWidth(2),
      
        width:wWidht*0.9,
        alignSelf:'center',
        overflow:'hidden',
        elevation:10
    },
    iconsWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:responsiveWidth(3),
        alignItems:'center'
    },
    leftIconWrapper:{
        flexDirection:'row',
        
    },
    rightIconWrapper:{
        flexDirection:'row',
        gap:responsiveWidth(1)
       
    }
})