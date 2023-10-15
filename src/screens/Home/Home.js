import { StyleSheet, Text, View,Image,FlatList,ImageBackground,TouchableOpacity,Linking, PermissionsAndroid,ToastAndroid,Pressable , Button } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../styles/colors'

import Header from '../../components/Header'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import { wHeight, wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'
import NavigationString from '../../contants/NavigationString'

import { useDispatch, useSelector } from 'react-redux';

import { getCategory } from '../../store/CategorySlice';
import { wallpaperList } from '../../store/wallpaperSlice'
import CallApi, {setToken ,CallApiJson } from '../../utiles/network'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import EmptyOption from '../../components/EmptyOption'
import fontsName from '../../styles/fontsName';
import imagePaths from '../../contants/imagePaths';
import { appName, imageBaseURL,shareImgText } from '../../contants/config';

import VersionCheck from 'react-native-version-check';

import { BannerAd, BannerAdSize, TestIds ,  InterstitialAd,  AdEventType } from 'react-native-google-mobile-ads';
const adUnitIdIntrestial = TestIds.INTERSTITIAL ;

const adUnitId =  TestIds.BANNER ;

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntrestial, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
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


const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const Home = ({navigation}) => {

  const [selectedId, setSelectedId] = useState();
  const [Base64, setBase64] = useState()
  const [categoryListData, setCategoryList] = useState()
  const [wallpaperListData, setWallpaperListData] = useState()

  const dispatch = useDispatch();
  const userPaidType = 'FREE';
  ///const { categoryListData } = useSelector(state=>state.cat);
  // const { wallpaperListData } = useSelector(state=>state.wallPaper);

//  console.log({navigation});

const  load =  async()=>{
  
  fetchCategory();

} 

const  fetchCategory =  async()=>{


const body = {
  app_name: 'ISLAMICAPP',
  type:'wallpaper'
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
setWallpaperListData( listWall.wallpapers);

} 

const checkUpdateNeeded = async () => {
  const latestVersion = await VersionCheck.getLatestVersion();
  const currentVersion = VersionCheck.getCurrentVersion()
  let updateNeeded = await VersionCheck.needUpdate();
   if ((updateNeeded.isNeeded)) {
    Alert.alert('Update Required ',
      'Download Latest Version From PlayStore',
      [
        {
          text: 'Update Now ',
          onPress: () => {
            BackHandler.exitApp();
            Linking.openURL(updateNeeded.storeUrl);
          }
        }
      ],
      { cancelable: false }


    );
  }
}

function initializeBannerAds()
{
    // Banners are automatically sized to 320x50 on phones and 728x90 on tablets
    // You may use the utility method `AppLovinMAX.isTablet()` to help with view sizing adjustments
    AppLovinMAX.createBanner(BANNER_AD_UNIT_ID, AppLovinMAX.AdViewPosition.BOTTOM_CENTER);

    // Set background or background color for banners to be fully functional
    // In this case we are setting it to black - PLEASE USE HEX STRINGS ONLY
    AppLovinMAX.setBannerBackgroundColor(BANNER_AD_UNIT_ID, '#000000');

}


  useEffect(

    ()=>{
 
      fetchCategory();
      checkUpdateNeeded()
      AppLovinMAX.showBanner(BANNER_AD_UNIT_ID);

    // dispatch(getCategory('wallpaper'))
   //  dispatch(wallpaperList(categoryListData[0]?.id))

      // fetch('https://fakestoreapi.com/products')
      // .then(data=>data.json())
      // .then(result => getlistData(result) )


    }
    ,[]
  )

  // console.log('ctry', wallpaperListData[1].img_name )
 


  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {


      console.log( 'admobintrestial loaded')

    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  // const imageShr = ''

  const requestStoragePermission = async (imgUri) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Islamic App Storage Permission',
          message:
            'Islamic App needs access to your Storage ' +
            'so you can download Wallpaper.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile(imgUri)
      } else {

      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile= (uriImg) => {
        const {config,fs} = RNFetchBlob;
        const date = new Date()
        const fileDir = fs.dirs.DownloadDir;
   
  config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache : true,
    addAndroidDownloads:{
      useDownloadManager:true,
      notification:true,
      path: fileDir + "/download_" + Math.floor(date.getDate() + date.getSeconds()/2) + ".jpg",
      description:'Wallpapers Download'
    }
  })
  .fetch('GET', `${imageBaseURL}${uriImg}`, {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    // res.base64().then((rr)=>{
    //   console.log("Base64",rr);
    // })
    
    ToastAndroid.show('File downloaded Successfully', ToastAndroid.SHORT);
 
  })
  }

 const myShare = async (imgUri) =>{
    
  RNFetchBlob.fetch('GET', `${imageBaseURL}${imgUri}`, {
    //some headers ..
  }).then(async(res) => {
    // the temp file path
    // res.base64().then((rr)=>{
    //   console.log("Base64",rr);
    // })
    
    // console.log('The file saved to ', res.base64())
    // ToastAndroid.show('File downloaded Successfully', ToastAndroid.SHORT);
   await setBase64(res.base64())
   
  })
//  console.log('bas64',Base64);


  const shareOptions ={ 
    message:`${shareImgText}`,
    url:`data:image/jpeg;base64,${Base64}`,
    // social:Share.Social.WHATSAPP
   
  }

  try {
    const ShareResponse = await Share.open(shareOptions);

  } catch (error) {
    console.log('Error =>',error);
  }
 }


 const shareWhatsapp = async (imgUri) =>{
  
  // let bse64='';
  RNFetchBlob.fetch('GET', `${imageBaseURL}${imgUri}`, {
    //some headers ..
  }).then(async(res) => {
    // the temp file path
    // res.base64().then((rr)=>{
    //   console.log("Base64",rr);
    // })
    
    // console.log('The file saved to ', res.base64())
    // ToastAndroid.show('File downloaded Successfully', ToastAndroid.SHORT);
   await setBase64(res.base64())
   
  })
//  console.log('bas64',Base64);
  const shareOptions ={ 
    message:`${shareImgText}`,
    url:`data:image/jpeg;base64,${Base64}`,
    social:Share.Social.WHATSAPP
   
  }

  try {
    const ShareResponse = await Share.shareSingle(shareOptions);

  } catch (error) {
    console.log('Error =>',error);
  }
 }

 const renderItem = ({index,item}) => {
    
  // console.log('categoryListData in renderitem',  );
  const backgroundColor = index === selectedId ? '#000' : '#ebebeb';
  const color = index === selectedId ? '#FF7A00' : 'black';

  return (
    <Item
      name={item?.name}
      img = {item?.img}
      onPress={() => {
     
        fetchWallpaper( item?.id)
     //   dispatch(wallpaperList(item?.id))
        setSelectedId(index)
        }}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};

const Item = ({name, img,onPress, backgroundColor, textColor}) => (

  <View style={[styles.optionsWrapper]}>
    

    <TouchableOpacity onPress={onPress} >

      <Image source={{uri:`${imageBaseURL}${img}`}} style={styles.optionIcon}  /> 

  </TouchableOpacity>
    <Text style={[styles.optionText,{color:textColor}]}>{name}</Text>


  </View>


);



const emptyItem = () => {

  return (
    <View style={{marginTop:responsiveHeight(2),gap:responsiveHeight(2),}}>

    <View style={{flexDirection:'row',gap:responsiveWidth(3)}} >
      
    <ShimmerPlaceHolder 
    style={{width:wWidht*0.44,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
    shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
    >
      <Text style={{color:colors.white}} >Please Wait</Text>
    </ShimmerPlaceHolder>

    <ShimmerPlaceHolder 
    style={{width:wWidht*0.44,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
    shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
    >

    </ShimmerPlaceHolder>


    </View>

    <View style={{flexDirection:'row',gap:responsiveWidth(3)}} >
      
      <ShimmerPlaceHolder 
      style={{width:wWidht*0.44,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
      shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
      >
        <Text style={{color:colors.white}} >Please Wait</Text>
      </ShimmerPlaceHolder>
  
      <ShimmerPlaceHolder 
      style={{width:wWidht*0.44,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
      shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
      >
  
      </ShimmerPlaceHolder>
  
  
      </View>

      <View style={{flexDirection:'row',gap:responsiveWidth(3)}} >
      
      <ShimmerPlaceHolder 
      style={{width:wWidht*0.44,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
      shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
      >
        <Text style={{color:colors.white}} >Please Wait</Text>
      </ShimmerPlaceHolder>
  
      <ShimmerPlaceHolder 
      style={{width:wWidht*0.44,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
      shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
      >
  
      </ShimmerPlaceHolder>
  
  
      </View>

 
    
    </View>



  )
}

  return (
    <View style={styles.mainContainer} >

       
       <Header openDrawer={()=> navigation.openDrawer()} headerName={'Islamic Wallpaper'} optionStyles={{borderBottomWidth:1,borderBottomColor:colors.blackOpacity15}} />

       {/* <View style={styles.optionsWrapper} >
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
       </View> */}

        
       <FlatList
        style={{alignSelf:'center',marginTop:responsiveHeight(2)}}
       horizontal
       showsHorizontalScrollIndicator={false}
        data={categoryListData}
        renderItem={renderItem}
      //  ListEmptyComponent={EmptyOption}
      
        keyExtractor={item => item.id}
      />

 
     
       <FlatList
      style={{marginTop:responsiveHeight(1.5),alignSelf:'center'}}
       showsVerticalScrollIndicator={false}
       numColumns={2}
        data={wallpaperListData}
        ListEmptyComponent={emptyItem}
        renderItem={({item,index}) => {
          // console.log("size",(hadisData.length-1),index)
           return(
            <Pressable onPress={()=>{navigation.navigate(NavigationString.WallpaperSet,{imgUrl:item.img_name})}} style={[styles.itemWrapper,{marginTop:(index!=0 && index != 1) &&responsiveHeight(2),marginRight:index%2 == 0 && responsiveWidth(3)}]} >
              <ImageBackground source={{uri:`${imageBaseURL}${item.img_name}`}} style={[styles.image,{justifyContent:index%2 == 0?'space-between':'flex-end'}]} >
                    
          {  index%2 == 0 &&        <View style={styles.trendingWrapper} >
                      <Image source={imagePaths.fire} style={{resizeMode:'contain',width:responsiveWidth(4),height:responsiveHeight(1.8),marginLeft:responsiveWidth(0.8)}} />
                      <Text style={{color:'#FF7A00',fontSize:responsiveFontSize(1),fontFamily:fontsName.PoppinsLight,alignSelf:'center',fontWeight:'500'}} >Trending</Text>
                    </View>}
                
                    
                    <View style={styles.iconsWrapper} >
                        <View style={styles.leftIconWrapper}>
                        {/* <Icon name="eye" size={responsiveWidth(5)} color={'#ebebeb'} /> */}
                        <Text style={{color:colors.white,marginLeft:responsiveWidth(1),fontSize:responsiveFontSize(1.4),fontFamily:fontsName.PoppinsRegular}} >211</Text>

                        <Text style={{color:colors.white,marginLeft:responsiveWidth(1),fontSize:responsiveFontSize(1.4),fontFamily:fontsName.PoppinsRegular}} >Views</Text>

                        {/* <Icon name="share-social" size={responsiveWidth(5)} color={'#ebebeb'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >25</Text> */}
                        </View>

                        <View style={styles.rightIconWrapper}>
                        <TouchableOpacity onPress={()=>{myShare(item.img_name)}} style={styles.iconCircle} >
                        <Icon  name="paper-plane-outline" size={responsiveWidth(3.5)} color={'#FFFFFF'} />
                        
                        </TouchableOpacity>
                        
                        {/* <TouchableOpacity onPress={()=>{}} style={styles.iconCircle} >
                        <Icon  name="heart-outline" size={responsiveWidth(3.5)} color={'#FFFFFF'} />
                        
                        </TouchableOpacity> */}
{/* 
                        <TouchableOpacity  onPress={()=>{requestStoragePermission(item.img_name)}} >
                        <Icon name="cloud-download" size={responsiveWidth(7)} color={colors.themeText} />
                        </TouchableOpacity> */}
                        
                        {/* <TouchableOpacity  onPress={()=>{shareWhatsapp(item.img_name)}} >
                        <Icon name="logo-whatsapp" size={responsiveWidth(8)} color={'#25D366'} />
                        </TouchableOpacity>
                      */}

                        </View>
                       
                    </View>
                    {/* <View style={{backgroundColor:'rgba(36,87,116,0.6)',width:'100%',height:responsiveHeight(4.5),position:'absolute'}} >

                 </View> */}
              </ImageBackground>
            </Pressable>

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

  banner: {
    // Set background color for banners to be fully functional
    backgroundColor: '#000000',
    position: 'absolute',
    width: '100%',
    height: 'auto', // Defined by AdView per type of AdView and device
    bottom:  Platform.select({
      ios: 36, // For bottom safe area
      android: 0,
    })
  },

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
      // paddingHorizontal:responsiveWidth(1),
      marginRight:responsiveWidth(1),
      // paddingVertical:responsiveHeight(3),
      // borderRadius:responsiveWidth(5),
      height:wHeight*0.1,
      marginBottom:responsiveHeight(2),
      justifyContent:'center',
      alignItems:'center',
   

    
    },
    optionText:{
 
      fontSize:responsiveFontSize(1.4),
      height:responsiveHeight(3),
      textAlign:'center',
      fontFamily:fontsName.PoppinsLight

    },
    optionIcon:{
       resizeMode:'contain',
       width:responsiveWidth(16),
       height:responsiveHeight(8)
    },
    // optionButtonWrapper:{
    //       backgroundColor:'#ebebeb',
    //       paddingHorizontal:responsiveWidth(5),
    //       // paddingVertical:responsiveHeight(2),
    //       marginHorizontal:responsiveWidth(1),
    //       paddingVertical:responsiveHeight(1),
    //       borderRadius:responsiveWidth(6)
          
    // }, 
    image:{
         resizeMode:'stretch',
        width:'100%',
         height:responsiveHeight(34),
         alignSelf:'center',
         

         
    },
    itemWrapper:{
        // marginVertical:responsiveHeight(1)
        borderRadius:responsiveWidth(4),
        
        width:wWidht*0.44,
        alignSelf:'center',
        overflow:'hidden',
        elevation:3,
        
    },
    iconsWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:responsiveWidth(3),
        alignItems:'center',
        // paddingBottom:responsiveHeight(0.5),
        zIndex:5,
        width:'100%',
        marginBottom:responsiveHeight(1.5)
        
    },
    leftIconWrapper:{
        flexDirection:'row',
        
    },
    rightIconWrapper:{
        flexDirection:'row',
        gap:responsiveWidth(2),
        
       
    },
    iconCircle:{
      borderColor:colors.white,
      borderWidth:1,
      borderRadius:responsiveWidth(14),
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:responsiveWidth(1.2),
      paddingVertical:responsiveHeight(0.5)
    },
    trendingWrapper:{
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:colors.white,
      width:'40%',
      marginTop:responsiveHeight(1.5),
      borderRadius:responsiveWidth(5),
      marginLeft:responsiveWidth(2),
      paddingVertical:responsiveHeight(0.2)
      
    }
})