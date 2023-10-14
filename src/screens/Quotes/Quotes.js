import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity, ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import colors from '../../styles/colors'
import Header from '../../components/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { wWidht } from '../../styles/Dimensions'
import { CallApiJson } from '../../utiles/network'
import { imageBaseURL,appName } from '../../contants/config'


const Quotes = ({navigation}) => {

  const [categoryListData, setCategoryList] = useState()
  const [wallpaperListData, setWallpaperListData] = useState()

  const quotes = [
    require('../../assets/images/quote1.png'),
    require('../../assets/images/quote2.png'),
    require('../../assets/images/quote3.png'),
    require('../../assets/images/quote4.png'),

  ]


  const  fetchCategory =  async()=>{


    const body = {
      app_name: appName,
      type:'quotes'
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
            <ImageBackground resizeMode='cover' source={{uri:`${imageBaseURL}${item?.ori_img}`}} style={[styles.quotesImg,{marginTop:index==0?0:responsiveHeight(2),overflow:'hidden'}]} >

            </ImageBackground>
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