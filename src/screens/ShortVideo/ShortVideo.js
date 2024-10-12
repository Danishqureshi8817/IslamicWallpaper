import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
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




const ShortVideo = ({ navigation }) => {


  const [categoryListData, setCategoryList] = useState()
  const [shortVideos, setShortVideos] = useState()

  const [admobIntrestial, setadmobIntrestial] = useState(false);
  const [admobRewarded, setadmobRewarded] = useState(false);

  // const { categoryListData } = useSelector(state=>state.cat);
  // const { wallpaperListData } = useSelector(state=>state.wallPaper);


  const [selectedId, setSelectedId] = useState();
  // const [shortVideos, setShortVideos] = useState()




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




  const fetchShortVideos = async (catId) => {

    const body = {
      app_name: 'ISLAMICAPP',
      cat_id: catId
    };
    const result = await CallApiJson('wallpaperlist', 'POST', body);

    await setShortVideos(result?.wallpapers)
  }


  // const fetchCategory = async () => {

  //   await dispatch(getCategory('short'))

  //   if(categoryListData != null){
  //     fetchShortVideos(8)
  //   }

  // }

  const fetchCategory = async () => {


    const body = {
      app_name: appName,
      type: 'short'
    };


    const listCat = await CallApiJson('wallpapercategory', 'POST', body);

    setCategoryList(listCat.category)
    fetchWallpaper(listCat.category[0]?.id)
    //dispatch(wallpaperList(listCat.category[0]?.id))
    //
  }


  const fetchWallpaper = async (cat_id) => {

    const body = {
      app_name: appName,
      cat_id: cat_id
    };

    const listWall = await CallApiJson('wallpaperlist', 'POST', body);

    setShortVideos(listWall.wallpapers);


  }


  useEffect(() => {

    fetchCategory()



    //  dispatch(wallpaperList(categoryListData[0]?.id))

    // fetch('https://fakestoreapi.com/products')r
    // .then(data=>data.json())
    // .then(result => getlistData(result) )




  }, [])



  const shortVideoListItem = ({ index, item }) => {

    const backgroundColor = index === selectedId ? '#ffffff' : '#000000';
    const color = index === selectedId ? '#000000' : 'white';

    return (
      <>
        <Item
          name={item?.name}
          img={item.img}
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


  const Item = ({ name, img, onPress, backgroundColor, textColor, index }) => (


    <TouchableOpacity onPress={onPress} style={[styles.optionsWrapper, { backgroundColor: backgroundColor, marginRight: responsiveWidth(2), marginLeft: index == 0 && responsiveWidth(5) }]} >

      <Text style={[styles.optionText, { color: textColor }]}>{name}</Text>

    </TouchableOpacity>

  );


  const shortVideoList = ({ item, index }) => {
    //  console.log('compry',index,shortVideoData.length-1);
    var leg = shortVideos.length - 1

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

        <View style={[styles.shortVideoWrapper, { marginBottom: leg == index ? 0 : responsiveHeight(1) }]} >

          <TouchableOpacity onPress={() => { navigation.navigate(NavigationString.YoutubePlayers, { videoId: item?.thumb }) }} >
            <Image source={{ uri: `http://img.youtube.com/vi/${item?.thumb}/default.jpg` }} style={styles.shortVideoImg} />

          </TouchableOpacity>




          <View style={styles.shortVideoContentWrapper} >
            <Text style={styles.shortVideoHeading} >{item?.name}</Text>
            <Text style={styles.shortVideoAuthor} >{item?.cat_name}</Text>
            <Text style={styles.shortVideoDetail} >{item?.no_view} views - 5 years ago</Text>
            {item?.short_status != null && <Text style={styles.shortVideoStatus} >{item?.short_status}</Text>}
          </View>
        </View>


      </>



    )
  }





  return (
    <View style={styles.mainContainer} >
      <Header openDrawer={() => navigation.openDrawer()} headerName={'Short Videos'} />

      <FlatList
        style={{ marginTop: responsiveHeight(1), borderBottomWidth: 1, maxHeight: responsiveHeight(6), borderBottomColor: colors.blackOpacity15, }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryListData}
        renderItem={shortVideoListItem}
        //  ListEmptyComponent={EmptyOption}

        keyExtractor={item => item.id}
      />


      <FlatList
        style={{ marginTop: responsiveHeight(2), marginHorizontal: responsiveWidth(4) }}

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

  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  optionsWrapper: {
    height: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    borderRadius: responsiveWidth(3),
    elevation: 5,
    marginBottom: responsiveHeight(2)


  },
  optionText: {
    textAlign: 'center',
    fontFamily: fontsName.PoppinsLight,
    fontSize: responsiveFontSize(1.8)

  },
  shortVideoWrapper: {
    flexDirection: 'row',




  },
  shortVideoImg: {
    resizeMode: 'contain',
    width: responsiveWidth(45),
    height: responsiveHeight(15),
    borderRadius: responsiveWidth(2)

  },
  shortVideoContentWrapper: {
    marginLeft: responsiveWidth(2),
    gap: responsiveHeight(0.1),
    width: responsiveWidth(50)
  },
  shortVideoHeading: {
    fontFamily: fontsName.PoppinsSemiBold,
    fontSize: responsiveFontSize(1.9),
    color: colors.black,
    fontWeight: '800'
  },
  shortVideoAuthor: {
    fontFamily: fontsName.PoppinsLight,
    fontSize: responsiveFontSize(1.6),
    color: colors.black,

  },
  shortVideoDetail: {
    fontFamily: fontsName.PoppinsLight,
    fontSize: responsiveFontSize(1.6),
    color: colors.black,
  },
  shortVideoStatus: {
    backgroundColor: colors.black,
    color: colors.white,
    fontFamily: fontsName.PoppinsMedium,
    fontSize: responsiveFontSize(1.4),
    width: responsiveWidth(20),
    textAlign: 'center',
    paddingVertical: responsiveHeight(0.5)
  }



})