import { View, Text,StyleSheet } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {responsiveFontSize,responsiveHeight,responsiveWidth} from 'react-native-responsive-dimensions'
import { Home } from '../screens';
import NavigationString from '../contants/NavigationString';



const Stack = createNativeStackNavigator();


const MainStack = () => {

//   const {userData,setUserData} = useContext(AuthContext)
  const [splashShow, setSplashShow] = useState(true)
  const [login, setlogin] = useState(true)


   const splashStatus = async() => {
   await setSplashShow(false)
   }

//    const load = async() => {
//     Services.getUserAuth().then( resp => {
//       console.log("mmmain",resp)
//       if(resp){
//         setUserData(resp)
//         console.log("DAT...")
//         setlogin(false)
        
//       }
//       else{
//         setUserData(null)
//       }
//     })
//    }

  useEffect(() => {
    
//    load()

//     setTimeout( async () => {
//       await splashStatus()
//    }, 2000);



  }, [])


  return (
    <Stack.Navigator screenOptions={{headerShown:false,}} >
     {/* {splashShow?<Stack.Screen name={navigationStrings.Splash} component={Splash}/>:null} */}
    
     {/* <Stack.Screen name='Tabs' component={TabStack}  /> */}
     {/* <Stack.Screen name={navigationStrings.Menu} component={Menu} options={{headerShown:true,}} /> */}
     {/* <Stack.Screen name={navigationStrings.Login} component={Login} />
     <Stack.Screen name={navigationStrings.Otp} component={Otp} /> */}
     <Stack.Screen name={NavigationString.Home} component={Home} />
    
     {/* <Stack.Screen name={navigationStrings.Login} component={Login} /> */}
     
 


  </Stack.Navigator>
  )
}

export default MainStack

const styles = StyleSheet.create({

})