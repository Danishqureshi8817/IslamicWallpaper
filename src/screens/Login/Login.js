import { StyleSheet, Text, View,Button,Animated } from 'react-native'
import React,{useRef,useState} from 'react'

const Login = () => {

    const animation = useRef(new Animated.Value(0)).current

const [btnClicked, setbtnClicked] = useState(false)
    const startAnimation = () => {

        Animated.spring(animation,{
            toValue: btnClicked ? 0 : 1,
            // duration:500, use with animated.timing
            useNativeDriver:true,

        }).start()
    }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >

      <Animated.View style={[{width:100,height:100,backgroundColor:'orange',marginBottom:20,borderRadius:btnClicked?50:0},{transform:[{translateY:animation.interpolate({
        inputRange:[0,1],outputRange:[0,-100]
      })},{rotate:animation.interpolate({
        inputRange:[0,1],outputRange:['0deg','360deg']
      })},{translateX:animation.interpolate({
        inputRange:[0,1],outputRange:[0,150]
      })},{scale:animation.interpolate({
        inputRange:[0,1],outputRange:[1,0.5]
      })}, ]}]}></Animated.View>

      <Button onPress={()=>{
        setbtnClicked(!btnClicked)
        startAnimation()}} title='Start Animation' />
      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})