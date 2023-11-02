import { StyleSheet, Text, View,Pressable,Image,TouchableOpacity, Alert,ImageBackground,ActivityIndicator, Platform } from 'react-native'
import React,{useState , useEffect } from 'react'
import colors from '../../styles/colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wHeight, wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import WallPaperManager from '@ajaybhatia/react-native-wallpaper-manager';
import { imageBaseURL } from '../../contants/config'
import { useNavigation, useIsFocused } from "@react-navigation/native";


// admob ads 
import { BannerAd, BannerAdSize, TestIds ,  InterstitialAd,  AdEventType  ,RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
const adUnitIdIntrestial = 'ca-app-pub-1573251550611689/7372882159' ;
const adUnitREWARDED_INTERSTITIAL = 'ca-app-pub-1573251550611689/8193378920';
const adunitRewarded = 'ca-app-pub-1573251550611689/2036794990';
const adUnitId =  'ca-app-pub-1573251550611689/6870319276' ;


const rewardedAdMob = RewardedAd.createForAdRequest(adunitRewarded, {
    requestNonPersonalizedAdsOnly: true
});

const interstitialAdmob = InterstitialAd.createForAdRequest(adUnitIdIntrestial, {
    requestNonPersonalizedAdsOnly: true
  });
// admob ads



//ad nnetwork
import AppLovinMAX from  "react-native-applovin-max";
import { CallApiJson } from '../../utiles/network'


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

    const {imgUrl, wallId } = route.params;

    console.log('wallId',  route.params )
    const [process, setProcess] = useState(false)
    const [admobIntrestial, setadmobIntrestial] = useState(false);
    const [admobRewarded, setadmobRewarded] = useState(false);
 
    const navigationUrl = useNavigation();

    // console.log({imgUrl});


    //google ad mob ads


//rewarded

const  wallpaperView =  async()=>{


  console.log('wallpaperView',  wallId )

  const body = {
    app_name: 'ISLAMICAPP',
    type:'wallpaper',
    wallId:wallId
  };
  
  
  const listCat = await CallApiJson('wallpaperview', 'POST',body);
  console.log('wallpaperView',  listCat )

   //dispatch(wallpaperList(listCat.category[0]?.id))
  //
  } 
  
const  wallpaperSetApply =  async()=>{


  
  const body = {
    app_name: 'ISLAMICAPP',
    type:'wallpaper',
    wallId: wallId
  };
  
  
  const listCat = await CallApiJson('wallpapersetapplied', 'POST',body);
    
   //dispatch(wallpaperList(listCat.category[0]?.id))
  //
  } 
  

  

const   showAdmobRewarded = ()=>{

    if( admobRewarded==true )
    rewardedAdMob.show();

}

useEffect(() => {
  wallpaperView();

    const unsubscribeLoaded = rewardedAdMob.addAdEventListener(RewardedAdEventType.LOADED, () => {

        setadmobRewarded(true)
    });
    const unsubscribeEarned = rewardedAdMob.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewardedAdMob.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);



//rewarded

    //intrestiall

  const   loadAdmobIntrestial = ()=>{

    if( admobIntrestial==true )  interstitialAdmob.show();

}


    useEffect(  () => {
        const unsubscribe = interstitialAdmob.addAdEventListener(AdEventType.LOADED, () => {
            setadmobIntrestial(true)

        });
    
        // Start loading the interstitial straight away
        interstitialAdmob.load();
    
      //   const timer = setTimeout(() => loadAdmobIntrestial() , 25000);
        // Unsubscribe from events on unmount
        return unsubscribe;
      }, []);

//intrestail

    //google admob 
 


    

//applovin 


//applovin 
useEffect(() => {


    //banner 

    // You may use the utility method `AppLovinMAX.isTablet()` to help with view sizing adjustments
    AppLovinMAX.createBanner(BANNER_AD_UNIT_ID, AppLovinMAX.AdViewPosition.BOTTOM_CENTER);

    // Set background or background color for banners to be fully functional
    // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
    AppLovinMAX.setBannerBackgroundColor(BANNER_AD_UNIT_ID, '#0a203e');
  //rewarded
  AppLovinMAX.showBanner(BANNER_AD_UNIT_ID);



    //banner
    //intrestial
    AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    const appLovinIntrestial = AppLovinMAX.addInterstitialLoadedEventListener( async () => {
      // Interstitial ad is ready to show. AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID) now returns 'true'
      const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
      if (isInterstitialReady) {
       //AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
  
       //setbuttonDisableTrue(false);
   
      }
    });
    // rewarded
    AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
    const appLovinRewarded =   AppLovinMAX.addRewardedAdLoadedEventListener( async () => {
      const isRewardedAdReady = await AppLovinMAX.isRewardedAdReady(REWARDED_AD_UNIT_ID);
  if (isRewardedAdReady) {
      // AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
   }
    });
    //rewarded
  
  
  
   //  const timer = setTimeout(() => showApplovinIntrestial() , 5000);
  
   
     return () => { 
      appLovinIntrestial();
      appLovinRewarded();
  
     }
  
  }, []);
  
  const showApplovinIntrestial = async ()=>{
    const isInterstitialReady =  await AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID);
    if (isInterstitialReady) {
          AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
         // setbuttonDisableTrue(false);
          return true;
    }else{
      return false;
    }
  }
   
  
  const showApplovinRewarded =()=>{
    AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
   }
  
  //applovin 
  
  
  
  //applovin 


    const setWallpaper = () => {

        setProcess(true)
        wallpaperSetApply();
        WallPaperManager.setWallpaper({uri: `${imageBaseURL}${imgUrl}`, screen: 'home'},
        
        (res) => { console.log(res) ;

            setProcess(false)

            Alert.alert(
                

                'Success ',
                'Wallpaper Set Successfully ',
                [
                   {text: 'Yes', onPress:  ()=>   {    navigationUrl.navigate('Home');     showApplovinIntrestial();
 
                    }   },
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
       <ImageBackground source={{uri:`${imageBaseURL}${imgUrl}`}} style={styles.wallpaperImg} > 
       <Pressable onPress={()=>{navigation.goBack()}} style={{marginBottom:responsiveHeight(25),marginLeft:responsiveWidth(2)}} >
       <Icon
          name="arrow-back-outline"
          size={responsiveWidth(7)}
          color={colors.white}
        /> 
     
       </Pressable>

        <ActivityIndicator size='large' animating={process} color='#FF7A00' style={{alignSelf:'center',marginBottom:responsiveHeight(45)}} />
          

       <TouchableOpacity onPress={()=>{   setWallpaper()}} style={styles.buttonWrapper} >
           <Text style={styles.buttonText}>SET AS WALLPAPER</Text>

                                
        

       </TouchableOpacity>


       <AppLovinMAX.AdView adUnitId={BANNER_AD_UNIT_ID}
                    adFormat={AppLovinMAX.AdFormat.BANNER}
                    style={styles.banner}
                    onAdLoaded={(adInfo) => {
                      console.log('Banner ad loaded from ' + adInfo.networkName);
                    }}
                    onAdLoadFailed={(errorInfo) => {
                      console.log('Banner ad failed to load with error code ' + errorInfo.code + ' and message: ' + errorInfo.message);
                    }}
                    onAdClicked={(adInfo) => {
                      console.log('Banner ad clicked');
                    }}
                    onAdExpanded={(adInfo) => {
                      console.log('Banner ad expanded')
                    }}
                    onAdCollapsed={(adInfo) => {
                      console.log('Banner ad collapsed')
                    }}
                    onAdRevenuePaid={(adInfo) => {
                      console.log('Banner ad revenue paid: ' + adInfo.revenue);
                    }}/>
                           <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />

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
        marginBottom:responsiveHeight(5),
        elevation:5
        // marginTop:responsiveHeight(4),
    },
    buttonText:{
        color:colors.whiteText,
        fontSize:responsiveFontSize(1.9),
        fontWeight:'500'
    }
})