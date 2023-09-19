import { StyleSheet, Text, View,Pressable,Image,TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wHeight, wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import WallPaperManager from '@ajaybhatia/react-native-wallpaper-manager';

const WallpaperSet = ({navigation,route}) => {

    const {imgUrl} = route.params;

    // console.log({imgUrl});

    const setWallpaper = () => {

        WallPaperManager.setWallpaper({uri: `https://islamicwallpaper.newindiagyan.online/uploads/${imgUrl}`, screen: 'home'},
        
        (res) => { console.log(res) ;

            Alert.alert(
                

                'Success ',
                'Wallpaper Set Successfully ',
                [
                   {text: 'Yes', onPress:  ()=>   {  navigation.navigate('Home') }   },
                ],
                { cancelable: false }

            )

        }
        
        
        
        );
    }

  return (
    <View style={styles.mainContainer} >
       
       <View style={styles.headerWrapper} >
       <Pressable onPress={()=>{navigation.goBack()}} >
       <Icon
          name="arrow-back-outline"
          size={responsiveWidth(6)}
          color={colors.black}
        /> 
     
       </Pressable>

       <Text style={styles.headerText} > WallpaperSet </Text>
       </View>

       <Image source={{uri:`https://islamicwallpaper.newindiagyan.online/uploads/${imgUrl}`}}  style={styles.wallpaperImg} />

       <TouchableOpacity onPress={()=>{setWallpaper()}} style={styles.buttonWrapper} >
           <Text style={styles.buttonText}>Set Wallpaper</Text>
       </TouchableOpacity>

    </View>
  )
}

export default WallpaperSet

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:colors.white,
    },
    headerWrapper:{
        flexDirection:'row',
        alignItems:'center',
        width:wWidht,
        height:wHeight*0.07,
       paddingHorizontal:responsiveWidth(2),
        gap:responsiveWidth(4),
       paddingVertical:responsiveHeight(1),
        // elevation:5,
        borderBottomWidth:1,
        borderBottomColor:colors.blackOpacity15,
        backgroundColor:colors.white
        
    },
    headerText:{
        color:colors.black,
        fontSize:responsiveFontSize(2.1),
        fontWeight:'500'
    },
    wallpaperImg:{
        resizeMode:'contain',
        width:wWidht*0.7,
        height:wHeight*0.6,
        alignSelf:'center',
        marginTop:responsiveHeight(10),
        borderRadius:responsiveWidth(2),
        
    },
    buttonWrapper:{
        backgroundColor:colors.blackOpacity80,
        alignSelf:'center',
        paddingHorizontal:responsiveWidth(20),
        paddingVertical:responsiveHeight(1.5),
        borderRadius:responsiveWidth(2),
        marginTop:responsiveHeight(4),
    },
    buttonText:{
        color:colors.whiteText,
        fontSize:responsiveFontSize(1.9),
        fontWeight:'500'
    }
})