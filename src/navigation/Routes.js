import { View, Text } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import Drawer from './Drawer';





const Routes = () => {

    // const {userData,setUserData} = useContext(AuthContext)
      
    const [Login, setLogin] = useState(false)

  
    return (
     <NavigationContainer>
  
       {/* {AuthStack()} */}
      {/* {MainStack()} */}
      <Drawer/>

      

     </NavigationContainer>
    )
  }
  
  export default Routes

