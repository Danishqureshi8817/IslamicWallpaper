import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { color } from 'react-native-reanimated'
import colors from '../../styles/colors'
import Header from '../../components/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import YoutubePlayer from "react-native-youtube-iframe";
import { wHeight, wWidht } from '../../styles/Dimensions'

const YoutubePlayers = ({navigation,route}) => {
    
    const {videoId} = route.params
    console.log({videoId});

    const [playVideo, setPlayVideo] = useState(false)

  return (
    <View style={styles.mainContainer} >
        <Header openDrawer={()=> navigation.openDrawer()} iconName='arrow-back-outline' headerName={'Short Video Player'} optionStyles={{borderBottomWidth:1,borderBottomColor:colors.blackOpacity15}} navigation={navigation} />
        

        <View style={{ alignItems: 'center',marginTop:responsiveHeight(28)}}    >
        <YoutubePlayer
            style={{}}
            width={wWidht*0.9}
            height={wHeight*0.6}
            play={playVideo}
            videoId={videoId}
                            
                         onChangeState={(state)=>{
                         
                                  if (state === "playing") {
                                    setPlayVideo(true);
                                  //   setCount(delay);
                                                                
                                  //   setTimeout(() => {
                                  //     setclaimButton(false);
                                  //     setbuttonDisableTrue(false)

                                  // }, delaySeconds);
                                  // showApplovinRewarded();

                                  }
                                      }
                                    }
                        />


                        </View>
    </View>
  )
}

export default YoutubePlayers

const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:colors.white,
    }
})