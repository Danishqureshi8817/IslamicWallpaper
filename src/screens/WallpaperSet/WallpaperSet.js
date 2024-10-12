import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity, Alert, ImageBackground, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../styles/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wHeight, wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import WallPaperManager from '@ajaybhatia/react-native-wallpaper-manager';
import { imageBaseURL } from '../../contants/config'
import { useNavigation, useIsFocused } from "@react-navigation/native";








const WallpaperSet = ({ navigation, route }) => {

  const { imgUrl, wallId } = route.params;

  console.log('wallId', route.params)
  const [process, setProcess] = useState(false)
  const [admobIntrestial, setadmobIntrestial] = useState(false);
  const [admobRewarded, setadmobRewarded] = useState(false);

  const navigationUrl = useNavigation();

  // console.log({imgUrl});


  //google ad mob ads


  //rewarded

  const wallpaperView = async () => {


    console.log('wallpaperView', wallId)

    const body = {
      app_name: 'ISLAMICAPP',
      type: 'wallpaper',
      wallId: wallId
    };


    const listCat = await CallApiJson('wallpaperview', 'POST', body);
    console.log('wallpaperView', listCat)

    //dispatch(wallpaperList(listCat.category[0]?.id))
    //
  }

  const wallpaperSetApply = async () => {



    const body = {
      app_name: 'ISLAMICAPP',
      type: 'wallpaper',
      wallId: wallId
    };


    const listCat = await CallApiJson('wallpapersetapplied', 'POST', body);

    //dispatch(wallpaperList(listCat.category[0]?.id))
    //
  }




  useEffect(() => {
    wallpaperView();


  }, []);










  //applovin 


  const setWallpaper = () => {

    setProcess(true)
    wallpaperSetApply();
    WallPaperManager.setWallpaper({ uri: `${imageBaseURL}${imgUrl}`, screen: 'home' },

      (res) => {
        console.log(res);

        setProcess(false)

        Alert.alert(


          'Success ',
          'Wallpaper Set Successfully ',
          [
            {
              text: 'Yes', onPress: () => {
                navigationUrl.navigate('Home');

              }
            },
          ],
          { cancelable: false }

        )

      }



    );
  }

  return (
    <View style={styles.mainContainer} >

      {/* <View style={styles.headerWrapper} >
       <Pressable onPress={()=>{navigation.goBack()}} >
       <Icon
          name="arrow-back-outline"
          size={responsiveWidth(6)}
          color={colors.black}
        /> 
     
       </Pressable>

       <Text style={styles.headerText} > Wallpaper </Text>
       </View> */}

      <View style={styles.wallpaperWraper} >
        <ImageBackground source={{ uri: `${imageBaseURL}${imgUrl}` }} style={styles.wallpaperImg} >
          <Pressable onPress={() => { navigation.goBack() }} style={{ marginBottom: responsiveHeight(25), marginLeft: responsiveWidth(2) }} >
            <Icon
              name="arrow-back-outline"
              size={responsiveWidth(7)}
              color={colors.white}
            />

          </Pressable>

          <ActivityIndicator size='large' animating={process} color='#FF7A00' style={{ alignSelf: 'center', marginBottom: responsiveHeight(45) }} />


          <TouchableOpacity onPress={() => { setWallpaper() }} style={styles.buttonWrapper} >
            <Text style={styles.buttonText}>SET AS WALLPAPER</Text>




          </TouchableOpacity>



        </ImageBackground>
      </View>


      {/* <Image source={{uri:`https://islamicwallpaper.newindiagyan.online/uploads/${imgUrl}`}}  style={styles.wallpaperImg} /> */}



    </View>
  )
}

export default WallpaperSet

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wWidht,
    height: wHeight * 0.07,
    paddingHorizontal: responsiveWidth(2),
    gap: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    // elevation:5,
    borderBottomWidth: 1,
    borderBottomColor: colors.blackOpacity15,
    backgroundColor: colors.white

  },
  headerText: {
    color: colors.black,
    fontSize: responsiveFontSize(2.1),
    fontWeight: '500'
  },
  wallpaperImg: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
    // alignSelf:'center',
    // marginTop:responsiveHeight(10),
    // borderRadius:responsiveWidth(2),

  },
  wallpaperWraper: {
    width: wWidht,
    height: wHeight,
    // alignSelf:'center',
    // marginTop:responsiveHeight(10),
    // borderRadius:responsiveWidth(2),
    // overflow:'hidden',
    // elevation:5
  },
  buttonWrapper: {
    backgroundColor: colors.black,
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(5),
    elevation: 5
    // marginTop:responsiveHeight(4),
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: responsiveFontSize(1.9),
    fontWeight: '500'
  }
})