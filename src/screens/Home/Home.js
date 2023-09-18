import { StyleSheet, Text, View,Image,FlatList,ImageBackground,TouchableOpacity,Linking, PermissionsAndroid,ToastAndroid,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../styles/colors'
import { background } from '../../contants/imagePaths'
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



const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const Home = ({navigation}) => {

  const [selectedId, setSelectedId] = useState();
  const [Base64, setBase64] = useState()

  const dispatch = useDispatch();

  const { categoryListData } = useSelector(state=>state.cat);
  const { wallpaperListData } = useSelector(state=>state.wallPaper);





  useEffect(

    ()=>{
 
     dispatch(getCategory())
     dispatch(wallpaperList(1))

      // fetch('https://fakestoreapi.com/products')
      // .then(data=>data.json())
      // .then(result => getlistData(result) )


    }
    ,[]
  )

  // console.log('ctry', wallpaperListData[1].img_name )
 
  const hadisData = [
    {
        id:'01',
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dtjsLKRZb_ipdnFqAS8ic80Te5wEZyUfBg&usqp=CAU"
    },
    {
        id:'02',
        img:"https://i.pinimg.com/736x/14/98/0e/14980e0e4024f1d4757f993793f4eb85.jpg"
    },
    {
        id:'03',
        img:"https://i.pinimg.com/736x/f9/87/df/f987dfccfe88f125a742af67f232ebfe.jpg"
    },
    {
        id:'04',
        img:"https://i.pinimg.com/736x/a3/87/2c/a3872c07d5b3152ffe25a8940bba50c5.jpg"
    },
  ]

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
        console.log('Storage permission denied');
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
  .fetch('GET', `https://islamicwallpaper.newindiagyan.online/uploads/${uriImg}`, {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    // res.base64().then((rr)=>{
    //   console.log("Base64",rr);
    // })
    
    console.log('The file saved to ', res.path())
    ToastAndroid.show('File downloaded Successfully', ToastAndroid.SHORT);
 
  })
  }

 const myShare = async (imgUri) =>{
    
  RNFetchBlob.fetch('GET', `https://islamicwallpaper.newindiagyan.online/uploads/${imgUri}`, {
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
    message:'Download Islamimc Wallpaper App From Playstore ',
    url:`data:image/jpeg;base64,${Base64}`,
    // social:Share.Social.WHATSAPP
   
  }

  try {
    const ShareResponse = await Share.open(shareOptions);
    console.log(JSON.stringify(shareOptions));
  } catch (error) {
    console.log('Error =>',error);
  }
 }


 const shareWhatsapp = async (imgUri) =>{
  
  // let bse64='';
  RNFetchBlob.fetch('GET', `https://islamicwallpaper.newindiagyan.online/uploads/${imgUri}`, {
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
    message:'Download Islamimc Wallpaper App From Playstore',
    url:`data:image/jpeg;base64,${Base64}`,
    social:Share.Social.WHATSAPP
   
  }

  try {
    const ShareResponse = await Share.shareSingle(shareOptions);
    console.log(JSON.stringify(shareOptions));
  } catch (error) {
    console.log('Error =>',error);
  }
 }

 const renderItem = ({index,item}) => {
    
  console.log('categoryListData in renderitem', index+1 );
  const backgroundColor = index === selectedId ? '#000' : '#ebebeb';
  const color = index === selectedId ? 'white' : 'black';

  return (
    <Item
      name={item.name}
      onPress={() => {
        dispatch(wallpaperList(index+1))
        setSelectedId(index)
        }}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};

const Item = ({name, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.optionsWrapper,{backgroundColor}]}>
    <Text style={[styles.optionText,{color:textColor}]}>{name}</Text>
  </TouchableOpacity>

);



const emptyItem = () => {

  return (
    <View style={{marginTop:responsiveHeight(2),gap:responsiveHeight(2)}}>
    <ShimmerPlaceHolder 
    style={{width:wWidht*0.9,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
    shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
    >
      <Text style={{color:colors.white}} >Please Wait</Text>
    </ShimmerPlaceHolder>

    <ShimmerPlaceHolder 
    style={{width:wWidht*0.9,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
    shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
    >

    </ShimmerPlaceHolder>

    <ShimmerPlaceHolder 
    style={{width:wWidht*0.9,height:responsiveHeight(30),alignSelf:'center',borderRadius:responsiveWidth(2)}}
    shimmerColors={[colors.shimmerColor2,colors.shimmerColor2,colors.shimmerColor3]}
    >

    </ShimmerPlaceHolder>
    </View>



  )
}

  return (
    <View style={styles.mainContainer} >
    {/* <Image source={background} style={styles.bg} /> */}
       
       <Header/>

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
        style={{alignSelf:'center',marginTop:responsiveHeight(3)}}
       horizontal
       showsHorizontalScrollIndicator={false}
        data={categoryListData}
        renderItem={renderItem}
      //  ListEmptyComponent={EmptyOption}
      
        keyExtractor={item => item.id}
      />
 

     
       <FlatList
      style={{marginTop:responsiveHeight(2),}}
       showsVerticalScrollIndicator={false}
        data={wallpaperListData}
        ListEmptyComponent={emptyItem}
        renderItem={({item,index}) => {
          // console.log("size",(hadisData.length-1),index)
           return(
            <Pressable onPress={()=>{navigation.navigate(NavigationString.WallpaperSet,{imgUrl:item.img_name})}} style={[styles.itemWrapper,{marginTop:responsiveHeight(2),marginBottom:(wallpaperListData.length-1)===index && responsiveHeight(1)}]} >
              <ImageBackground source={{uri:`https://islamicwallpaper.newindiagyan.online/uploads/${item.img_name}`}} style={styles.image} >
                    
                    <View style={styles.iconsWrapper} >
                        <View style={styles.leftIconWrapper}>
                        <Icon name="eye" size={responsiveWidth(5)} color={'#ebebeb'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >211</Text>
                        {/* <Icon name="share-social" size={responsiveWidth(5)} color={'#ebebeb'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >25</Text> */}
                        </View>

                        <View style={styles.rightIconWrapper}>
                        <TouchableOpacity onPress={()=>{}}>
                        <Icon  name="heart-outline" size={responsiveWidth(8)} color={'#fe0000'} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>{myShare(item.img_name)}} >
                        <Icon  name="share" size={responsiveWidth(8)} color={colors.white} />
                        </TouchableOpacity>
{/* 
                        <TouchableOpacity  onPress={()=>{requestStoragePermission(item.img_name)}} >
                        <Icon name="cloud-download" size={responsiveWidth(7)} color={colors.themeText} />
                        </TouchableOpacity> */}
                        
                        <TouchableOpacity  onPress={()=>{shareWhatsapp(item.img_name)}} >
                        <Icon name="logo-whatsapp" size={responsiveWidth(8)} color={'#25D366'} />
                        </TouchableOpacity>
                     

                        </View>
                       
                    </View>
                    <View style={{backgroundColor:'rgba(36,87,116,0.6)',width:'100%',height:responsiveHeight(4.5),position:'absolute'}} >

                 </View>
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
      paddingHorizontal:responsiveWidth(4),
      marginHorizontal:responsiveWidth(1),
      paddingVertical:responsiveHeight(1),
      borderRadius:responsiveWidth(5),
      height:wHeight*0.04,
      marginBottom:responsiveHeight(2),
      justifyContent:'center',
      alignItems:'center'

    
    },
    optionText:{
 
      fontSize:responsiveFontSize(1.8),
      height:responsiveHeight(3),
      textAlign:'center'
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
        alignItems:'center',
        paddingBottom:responsiveHeight(0.5),
        zIndex:5,
        
    },
    leftIconWrapper:{
        flexDirection:'row',
        
    },
    rightIconWrapper:{
        flexDirection:'row',
        gap:responsiveWidth(4),
        
       
    }
})