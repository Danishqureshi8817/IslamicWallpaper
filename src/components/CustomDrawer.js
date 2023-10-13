import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'

import colors from '../styles/colors'
import imagePaths from '../contants/imagePaths'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import fontsName from '../styles/fontsName'
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';



const CustomDrawer = (props) => {
  
    //  console.log("drawer",props);

     const navigation = useNavigation()

  return (
    <View style={{flex:1}}>
     <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:colors.white,}}>
       
     <Icon onPress={()=>{navigation.dispatch(DrawerActions.closeDrawer());}} name={"close-outline"} size={responsiveWidth(6)} color={colors.black} style={{ alignSelf:'flex-end',marginRight:responsiveWidth(5),marginTop:responsiveHeight(2),marginBottom:responsiveHeight(2)}} />

       <View style={styles.userCardWrapper} >
          <View style={styles.subUserCardWrapper}>
              <Text style={{color:colors.black,fontFamily:fontsName.PoppinsSemiBold,fontSize:responsiveFontSize(4)}} >Muzzamil</Text>
              <Text style={{color:colors.blackOpacity50,fontFamily:fontsName.PoppinsLight,fontSize:responsiveFontSize(1.8)}}>loremipsum@gmail.com</Text>

          </View>

          <Image source={imagePaths.man} style={styles.avtrImg} />
       </View>

       <View style={{borderBottomWidth:1,borderBottomColor:colors.blackOpacity15,marginVertical:responsiveHeight(1.4)}} ></View>

       <View style={{flex:1}} >
     
       <DrawerItemList {...props} />

       </View>


   </DrawerContentScrollView>

   <View style={{borderTopWidth:1,borderTopColor:colors.blackOpacity15,}}>

   <TouchableOpacity style={{marginLeft:responsiveWidth(5),marginVertical:responsiveHeight(2)}} >
      <View style={{flexDirection:'row',gap:responsiveWidth(5),alignItems:'center'}} >
       <Image source={imagePaths.versionIcon} style={{resizeMode:'contain',width:responsiveWidth(6),height:responsiveHeight(3)}} />
       <View>
       <Text style={{color:colors.black,fontFamily:fontsName.PoppinsMedium,fontSize:responsiveFontSize(2.3)}} >App Version</Text>
       <Text style={{color:colors.blackOpacity40,fontFamily:fontsName.PoppinsMedium,}} >V 0.2</Text>

       </View>
     

      </View>
     
      </TouchableOpacity>

      <TouchableOpacity style={{marginLeft:responsiveWidth(5),marginVertical:responsiveHeight(2)}} >
      <View style={{flexDirection:'row',gap:responsiveWidth(5),alignItems:'center'}} >
       <Image source={imagePaths.logoutIcon} style={{resizeMode:'contain',width:responsiveWidth(6),height:responsiveHeight(3)}} />
      <Text style={{color:'#FF0000',fontFamily:fontsName.PoppinsMedium,fontSize:responsiveFontSize(2.3)}} >Log Out</Text>

      </View>
     
      </TouchableOpacity>
      
   </View>

    </View>
 
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    userCardWrapper:{
        flexDirection:'row',
 
        gap:responsiveWidth(2),
        justifyContent:'center',
        alignItems:'center',
       
        
       

    },
    avtrImg:{
      resizeMode:'contain',
      width:responsiveWidth(15),
      height:responsiveHeight(7.5)
    },
    

})