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
  
       const timer = setTimeout(() => loadAdmobIntrestial() , 5000);
      // Unsubscribe from events on unmount
      return unsubscribe;
    }, []);

//intrestail

  //google admob 



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

            { index%2==0 &&

            <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
          }

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