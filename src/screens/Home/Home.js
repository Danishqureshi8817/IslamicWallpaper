import { StyleSheet, Text, View,Image,FlatList,ImageBackground,TouchableOpacity,Linking, PermissionsAndroid,ToastAndroid } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../styles/colors'
import { background } from '../../contants/imagePaths'
import Header from '../../components/Header'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
  } from 'react-native-responsive-dimensions';
import { wWidht } from '../../styles/Dimensions'
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob'
import NavigationString from '../../contants/NavigationString'


const Home = ({navigation}) => {

  const [selectedId, setSelectedId] = useState();

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

  const requestStoragePermission = async () => {
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
        downloadFile()
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile= () => {
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
      description:'Fole Download'
    }
  })
  .fetch('GET', 'https://i.pinimg.com/736x/f9/87/df/f987dfccfe88f125a742af67f232ebfe.jpg', {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    console.log('The file saved to ', res.path())
    ToastAndroid.show('File downloaded Successfully', ToastAndroid.SHORT);
 
  })
  }

 const myShare = async () =>{

  const shareOptions ={ 
    message:'Download Islamimc Wallpaper App From Playstore ',
    // url:imageShr,
    // social:Share.Social.WHATSAPP
   
  }

  try {
    const ShareResponse = await Share.open(shareOptions);
    console.log(JSON.stringify(shareOptions));
  } catch (error) {
    console.log('Error =>',error);
  }
 }


 const shareWhatsapp = async (img) =>{
  const shareOptions ={ 
    message:'Download Islamimc Wallpaper App From Playstore',
    url:img,
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
  // console.log({item});
  const backgroundColor = index === selectedId ? '#000' : '#ebebeb';
  const color = index === selectedId ? 'white' : 'black';

  return (
    <Item
      item={item}
      onPress={() => setSelectedId(index)}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={{backgroundColor,paddingHorizontal:responsiveWidth(4),marginHorizontal:responsiveWidth(1),paddingVertical:responsiveHeight(1),borderRadius:responsiveWidth(5)}}>
    <Text style={{color: textColor,fontSize:responsiveFontSize(1.8),height:responsiveHeight(3),textAlign:'center'}}>{item}</Text>
  </TouchableOpacity>
);

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
        data={["Wallpaper","Habis","Status","Islamic","Video"]}
        renderItem={renderItem}
      
        keyExtractor={index => index}
      />
 

     
       <FlatList
      style={{marginTop:responsiveHeight(2),}}
       showsVerticalScrollIndicator={false}
        data={hadisData}
        renderItem={({item,index}) => {
          // console.log("size",(hadisData.length-1),index)
           return(
            <View style={[styles.itemWrapper,{marginTop:responsiveHeight(2),marginBottom:(hadisData.length-1)===index && responsiveHeight(1)}]} >
              <ImageBackground source={{uri:item.img}} style={styles.image} >
                    
                    <View style={styles.iconsWrapper} >
                        <View style={styles.leftIconWrapper}>
                        <Icon name="eye" size={responsiveWidth(5)} color={'#ebebeb'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >211</Text>
                        <Icon name="share-social" size={responsiveWidth(5)} color={'#ebebeb'} />
                        <Text style={{color:colors.black,fontWeight:'500',marginLeft:responsiveWidth(1)}} >25</Text>
                        </View>

                        <View style={styles.rightIconWrapper}>
                        <TouchableOpacity onPress={()=>{navigation.navigate(NavigationString.Login)}}>
                        <Icon  name="heart-outline" size={responsiveWidth(7)} color={'#fe0000'} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>{myShare()}} >
                        <Icon  name="share" size={responsiveWidth(7)} color={colors.themeText} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity  onPress={()=>{shareWhatsapp(item.img)}} >
                        <Icon name="logo-whatsapp" size={responsiveWidth(7)} color={'#25D366'} />
                        </TouchableOpacity>
                     

                        </View>
                    </View>
              </ImageBackground>
            </View>

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
        backgroundColor:colors.white,
        marginHorizontal:responsiveWidth(5),
        paddingVertical:responsiveHeight(0.5),
        borderRadius:responsiveWidth(10),
        marginTop:responsiveHeight(2.5),
        paddingHorizontal:responsiveWidth(2),
        overflow:'hidden'


    
    },
    optionText:{
        color:colors.black,
       fontSize:responsiveFontSize(1.8),
       height:responsiveHeight(3)
    
        // fontSize:responsiveFontSize(1.9)
    },
    optionButtonWrapper:{
          backgroundColor:'#ebebeb',
          paddingHorizontal:responsiveWidth(5),
          // paddingVertical:responsiveHeight(2),
          marginHorizontal:responsiveWidth(1),
          paddingVertical:responsiveHeight(1),
          borderRadius:responsiveWidth(6)
          
    }, 
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
        paddingBottom:responsiveHeight(1)
    },
    leftIconWrapper:{
        flexDirection:'row',
        
    },
    rightIconWrapper:{
        flexDirection:'row',
        gap:responsiveWidth(1),
        
       
    }
})