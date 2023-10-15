import { StyleSheet, Text, View,Pressable,Image,TouchableOpacity, Alert,ImageBackground,ActivityIndicator, Platform } from 'react-native'
import React,{useState , useEffect } from 'react'
import colors from '../../styles/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wHeight, wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import WallPaperManager from '@ajaybhatia/react-native-wallpaper-manager';
import { imageBaseURL } from '../../contants/config'
import { useNavigation, useIsFocused } from "@react-navigation/native";

//ad nnetwork
import AppLovinMAX from  "react-native-applovin-max";


//applovin
AppLovinMAX.initialize("WbvV2RHHbEGVC_s0Od_B0cZoG97sxIom919586O4G_eOin_W3n6ef2WdHqlug5t5IG_ZSo2D6VGE11RWPocUqk").then(configuration => {
  // SDK is initialized, start loading ads
  AppLovinMAX.setVerboseLogging(true);

  console.log( 'configuration',configuration )
//  AppLovinMAX.showMediationDebugger();

}).catch(error => {
  console.log( 'AppLovinMAX configurationerror',error )

});

const BANNER_AD_UNIT_ID = Platform.select({
  android: 'f615ab074dea518f'
 });
 const MREC_AD_UNIT_ID = Platform.select({
  android: '7f7595b047f6719c'
});

 const REWARDED_AD_UNIT_ID = Platform.select({
  android: '51b25fecd719c5f0',
 });
 const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: '49937ce4575b4e66',
 });

 //app lovin ad



const WallpaperSet = ({navigation,route}) => {

    const {imgUrl} = route.params;

    const [process, setProcess] = useState(false)
    const navigationUrl = useNavigation();

    // console.log({imgUrl});

 
    const [retryAttempt, setRetryAttempt] = useState(0);
    
    const initializeInterstitialAds = () => {
        AppLovinMAX.addInterstitialLoadedEventListener(() => {
            // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
    
            // Reset retry attempt
            setRetryAttempt(0)
        });
        AppLovinMAX.addInterstitialLoadFailedEventListener((fi) => {
            // Interstitial ad failed to load 
            // AppLovin recommends that you retry with exponentially higher delays up to a maximum delay (in this case 64 seconds)
            
            setRetryAttempt(retryAttempt + 1);
            const retryDelay = Math.pow(2, Math.min(6, retryAttempt));
    
            console.log('Interstitial ad failed to load - retrying in ' ,retryDelay + 's',fi);
              
            setTimeout(function() {
                loadInterstitial();
            }, retryDelay * 1000);
        });
        AppLovinMAX.addInterstitialClickedEventListener(() => {  console.log( 'ad clicked') });
        AppLovinMAX.addInterstitialDisplayedEventListener(() => {  console.log( 'ad dispalyed')   });
        AppLovinMAX.addInterstitialAdFailedToDisplayEventListener(() => {
            // Interstitial ad failed to display. AppLovin recommends that you load the next ad
            loadInterstitial();
        });
        AppLovinMAX.addInterstitialHiddenEventListener(() => {
            loadInterstitial();
        });
    
        // Load the first interstitial
        loadInterstitial();
    }
    
    const loadInterstitial = () => {
        AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    }

//applovin 
useEffect(() => {

    initializeInterstitialAds();
    

  }, []);


 
 
  const showApplovinIntrestial = async ()=>{
    console.log( 'show')
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {

          AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);

          console.log('showApplovinIntrestial');

          return true;
    }else{
      return false;
    }
  }
   
  
  const showApplovinRewarded =()=>{
    AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
  }
   
  
  
  //applovin 


    const setWallpaper = () => {
        setProcess(true)

        WallPaperManager.setWallpaper({uri: `${imageBaseURL}${imgUrl}`, screen: 'home'},
        
        (res) => { console.log(res) ;

            setProcess(false)

            Alert.alert(
                

                'Success ',
                'Wallpaper Set Successfully ',
                [
                   {text: 'Yes', onPress:  ()=>   {  navigationUrl.navigate('Home') }   },
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
       <ImageBackground source={{uri:`${imageBaseURL}${imgUrl}`}}  style={styles.wallpaperImg} > 
       <Pressable onPress={()=>{navigation.goBack()}} style={{marginBottom:responsiveHeight(30),marginLeft:responsiveWidth(2)}} >
       <Icon
          name="arrow-back-outline"
          size={responsiveWidth(7)}
          color={colors.white}
        /> 
     
       </Pressable>

        <ActivityIndicator size='large' animating={process} color='#FF7A00' style={{alignSelf:'center',marginBottom:responsiveHeight(45)}} />
          

       <TouchableOpacity onPress={()=>{ showApplovinIntrestial();  setWallpaper()}} style={styles.buttonWrapper} >
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
        resizeMode:'cover',
        width:'100%',
        height:'100%',
         justifyContent:'flex-end'
        // alignSelf:'center',
        // marginTop:responsiveHeight(10),
        // borderRadius:responsiveWidth(2),
        
    },
    wallpaperWraper:{
        width:wWidht,
        height:wHeight,
        // alignSelf:'center',
        // marginTop:responsiveHeight(10),
        // borderRadius:responsiveWidth(2),
        // overflow:'hidden',
        // elevation:5
    },
    buttonWrapper:{
        backgroundColor:colors.black,
        alignSelf:'center',
        paddingHorizontal:responsiveWidth(20),
        paddingVertical:responsiveHeight(1.5),
        borderRadius:responsiveWidth(2),
        marginBottom:responsiveHeight(10),
        elevation:5
        // marginTop:responsiveHeight(4),
    },
    buttonText:{
        color:colors.whiteText,
        fontSize:responsiveFontSize(1.9),
        fontWeight:'500'
    }
})