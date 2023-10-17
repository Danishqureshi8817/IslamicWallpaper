import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../styles/colors'
import Header from '../../components/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wWidht } from '../../styles/Dimensions'
import { CallApiJson } from '../../utiles/network'
import { imageBaseURL,appName } from '../../contants/config'

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



const Quotes = ({navigation}) => {

  const [categoryListData, setCategoryList] = useState()
  const [wallpaperListData, setWallpaperListData] = useState()

  const [admobIntrestial, setadmobIntrestial] = useState(false);
  const [admobRewarded, setadmobRewarded] = useState(false);


  const quotes = [
    require('../../assets/images/quote1.png'),
    require('../../assets/images/quote2.png'),
    require('../../assets/images/quote3.png'),
    require('../../assets/images/quote4.png'),

  ]

 

    //google ad mob ads


//rewarded


const   showAdmobRewarded = ()=>{

  if( admobRewarded==true )
  rewardedAdMob.show();

}

useEffect(() => {
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
  
     //  const timer = setTimeout(() => loadAdmobIntrestial() , 52000);
      // Unsubscribe from events on unmount
      return unsubscribe;
    }, []);

//intrestail

  //google admob 



   
//applovin 
useEffect(() => {

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
     //AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
 }
  });
  //rewarded



    // const timer = setTimeout(() => showApplovinIntrestial() , 59000);

 
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


  const  fetchCategory =  async()=>{


    const body = {
      app_name: appName,
      type:'quotes'
    };
    
    
    const listCat = await CallApiJson('wallpapercategory', 'POST',body);
    console.log( 'listCat quotes ', listCat)
    setCategoryList( listCat.category)
    fetchWallpaper( listCat.category[0]?.id )
     //dispatch(wallpaperList(listCat.category[0]?.id))
    //
    } 

const  fetchWallpaper =  async(cat_id)=>{

const body = {
  app_name: appName,
  cat_id: cat_id
};

const listWall = await CallApiJson('wallpaperlist', 'POST',body);
setWallpaperListData( listWall.wallpapers);


}


useEffect(

  ()=>{

    fetchCategory();
      // dispatch(getCategory('wallpaper'))
 //  dispatch(wallpaperList(categoryListData[0]?.id))

    // fetch('https://fakestoreapi.com/products')
    // .then(data=>data.json())
    // .then(result => getlistData(result) )

  }
  ,[]
)


  const quotesList = ({item,index}) => {
    //  console.log('compry',index,shortVideoData.length-1);
     
  let leg = quotes.length-1

 
  
         return (
          <>

<ImageBackground resizeMode='cover' source={{uri:`${imageBaseURL}${item?.ori_img}`}} style={[styles.quotesImg,{marginTop:index==0?0:responsiveHeight(2),overflow:'hidden'}]} >
            </ImageBackground>


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
 
 


          

          </>
            
         )
      }

  return (
    <View style={styles.mainContainer} >
        <Header openDrawer={()=> navigation.openDrawer()} headerName={'Quotes'} optionStyles={{borderBottomWidth:1,borderBottomColor:colors.blackOpacity15}}  />

        <FlatList
        style={{marginTop:responsiveHeight(2),marginHorizontal:responsiveWidth(4),alignSelf:'center'}}

      showsVerticalScrollIndicator={false}
        data={wallpaperListData}
        renderItem={quotesList}
      //  ListEmptyComponent={EmptyOption}
      
        keyExtractor={ item =>  item?.id}
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
    borderRadius:responsiveWidth(4)

  }
})