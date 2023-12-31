import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../styles/colors'
import Header from '../../components/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux';

import { getCategory } from '../../store/CategorySlice';
import { wallpaperList } from '../../store/wallpaperSlice'
import fontsName from '../../styles/fontsName'

import NavigationString from '../../contants/NavigationString'
import { CallApiJson } from '../../utiles/network'
import { appName } from '../../contants/config'

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




//applovin
import AppLovinMAX from  "react-native-applovin-max";

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

const ShortVideo = ({navigation}) => {

   
  const [categoryListData, setCategoryList] = useState()
  const [shortVideos, setShortVideos] = useState()

  const [admobIntrestial, setadmobIntrestial] = useState(false);
  const [admobRewarded, setadmobRewarded] = useState(false);

  // const { categoryListData } = useSelector(state=>state.cat);
  // const { wallpaperListData } = useSelector(state=>state.wallPaper);


  const [selectedId, setSelectedId] = useState();
 // const [shortVideos, setShortVideos] = useState()
  


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




//    const shortVideoData = [
//     {  
//        id:'01',
//         heading:'How to Pray?',
//         author:'Khudeja',
//         detail:'130k views - 7 years ago',
//         status:'Trending',
//         img:require('../../assets/images/short1.png')

//     },
//     { 
//       id:'02',
//       heading:'10 Beautiful things about Islam',
//       author:'Ayat166',
//       detail:'70k views - 1 year ago',
//       status:'Top-Rated',
//       img:require('../../assets/images/short2.png')

//   },
//   {
//     id:'03',
//     heading:'How to give up bad habits',
//     author:'Farooq',
//     detail:'2.2k views - 12 Hours ago',
   
//     img:require('../../assets/images/short3.png')

// },
// { 
//   id:'04',
//   heading:'Every detail about Jannah you need to know',
//   author:'Noman',
//   detail:'130k views - 2 weeks ago',

//   img:require('../../assets/images/short4.png')

// },
// { 
//   id:'05',
//   heading:'Arabic Language',
//   author:'Kaif',
//   detail:'66k views - 1 day ago',
//   status:'Must-Watch',
//   img:require('../../assets/images/short5.png')

// },
// {
//   id:'06',
//   heading:' Reading Quran',
//   author:'Umera',
//   detail:'12m views - 5 years ago',
//   status:'Trending',
//   img:require('../../assets/images/short6.png')

// },
//    ]


  const dispatch = useDispatch();



 
  const fetchShortVideos = async(catId) =>{
    
    const body = {
      app_name: 'ISLAMICAPP',
      cat_id:catId
    };
    const result =  await CallApiJson('wallpaperlist', 'POST', body);

     await setShortVideos(result?.wallpapers)
  }

   
  // const fetchCategory = async () => {
         
  //   await dispatch(getCategory('short'))
   
  //   if(categoryListData != null){
  //     fetchShortVideos(8)
  //   }
    
  // }

  const  fetchCategory =  async()=>{


    const body = {
      app_name: appName,
      type:'short'
    };
    
    
    const listCat = await CallApiJson('wallpapercategory', 'POST',body);

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

    setShortVideos( listWall.wallpapers);
    
    
    } 


  useEffect(()=>{

     fetchCategory()
     
  
     
    //  dispatch(wallpaperList(categoryListData[0]?.id))

      // fetch('https://fakestoreapi.com/products')r
      // .then(data=>data.json())
      // .then(result => getlistData(result) )




    },[])



  const shortVideoListItem = ({index,item}) => {
    
    const backgroundColor = index === selectedId ? '#ffffff' : '#000000';
    const color = index === selectedId ? '#000000' : 'white';
  
    return (
      <>
      <Item
        name={item?.name}
        img = {item.img}
        onPress={() => {
          // dispatch(wallpaperList(index+1))
          fetchWallpaper(item?.id)
          setSelectedId(index)
          }}
        backgroundColor={backgroundColor}
        textColor={color}
        index={index}
      />

    

</>

    );
  };


  const Item = ({name, img,onPress, backgroundColor, textColor,index}) => (

  
      <TouchableOpacity onPress={onPress} style={[styles.optionsWrapper,{backgroundColor:backgroundColor,marginRight:responsiveWidth(2),marginLeft:index==0 && responsiveWidth(5)}]} >
  
      <Text style={[styles.optionText,{color:textColor}]}>{name}</Text>
  
    </TouchableOpacity>
  
  );
    
    
    const shortVideoList = ({item,index}) => {
  //  console.log('compry',index,shortVideoData.length-1);
   var leg = shortVideos.length-1

// var thumbData 
  
// const datathum = async () => { 
//  var thumbDat = await LinkPreview.getPreview(item.ori_img)
//  console.log({thumbDat});

//  thumbData = await thumbDat
//   // .then(data =>{ 
//   //   // setThumbNail(data)
//   //   thumbData=data
//   //   console.log("Thumbnails",data.images[0])});
//  }
//  datathum()

       return (
        <>
        
        <View style={[styles.shortVideoWrapper,{marginBottom:leg==index?0:responsiveHeight(1)}]} >

           <TouchableOpacity onPress={()=>{navigation.navigate(NavigationString.YoutubePlayers,{videoId:item?.thumb})}} >
           <Image source={{uri:`http://img.youtube.com/vi/${item?.thumb}/default.jpg`}} style={styles.shortVideoImg} />

           </TouchableOpacity>
           

       

           <View style={styles.shortVideoContentWrapper} >
              <Text style={styles.shortVideoHeading} >{item?.name}</Text>
              <Text style={styles.shortVideoAuthor} >{item?.cat_name}</Text>
              <Text style={styles.shortVideoDetail} >{item?.no_view} views - 5 years ago</Text>
              { item?.short_status != null && <Text style={styles.shortVideoStatus} >{item?.short_status}</Text>}
           </View>
        </View>

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
      <Header openDrawer={()=> navigation.openDrawer()} headerName={'Short Videos'}  />

      <FlatList
        style={{marginTop:responsiveHeight(1),borderBottomWidth:1,maxHeight:responsiveHeight(6),borderBottomColor:colors.blackOpacity15,}}
       horizontal
       showsHorizontalScrollIndicator={false}
        data={categoryListData}
        renderItem={shortVideoListItem}
      //  ListEmptyComponent={EmptyOption}
      
        keyExtractor={item => item.id}
      />
       

       <FlatList
        style={{marginTop:responsiveHeight(2),marginHorizontal:responsiveWidth(4)}}

       showsHorizontalScrollIndicator={false}
        data={shortVideos}
        renderItem={shortVideoList}
      //  ListEmptyComponent={EmptyOption}
      
        keyExtractor={item => item.id}
      />




    </View>
  )
}

export default ShortVideo

const styles = StyleSheet.create({

  mainContainer:{
    flex:1,
    backgroundColor:colors.white,
  },
  optionsWrapper:{
    height:responsiveHeight(4),
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:responsiveWidth(4),
    borderRadius:responsiveWidth(3),
    elevation:5,
    marginBottom:responsiveHeight(2)

    
  },
  optionText:{
    textAlign:'center',
    fontFamily:fontsName.PoppinsLight,
    fontSize:responsiveFontSize(1.8)

  },
  shortVideoWrapper:{
    flexDirection:'row',
    
    
   
  
  },
  shortVideoImg:{
    resizeMode:'contain',
    width:responsiveWidth(45),
    height:responsiveHeight(15),
    borderRadius:responsiveWidth(2)

  },
  shortVideoContentWrapper:{
    marginLeft:responsiveWidth(2),
    gap:responsiveHeight(0.1),
    width:responsiveWidth(50)
  },
  shortVideoHeading:{
    fontFamily:fontsName.PoppinsSemiBold,
    fontSize:responsiveFontSize(1.9),
    color:colors.black,
    fontWeight:'800'
  },
  shortVideoAuthor:{
    fontFamily:fontsName.PoppinsLight,
    fontSize:responsiveFontSize(1.6),
    color:colors.black,
   
  },
  shortVideoDetail:{
    fontFamily:fontsName.PoppinsLight,
    fontSize:responsiveFontSize(1.6),
    color:colors.black,
  },
  shortVideoStatus:{
    backgroundColor:colors.black,
    color:colors.white,
    fontFamily:fontsName.PoppinsMedium,
    fontSize:responsiveFontSize(1.4),
    width:responsiveWidth(20),
    textAlign:'center',
    paddingVertical:responsiveHeight(0.5)
  }



})