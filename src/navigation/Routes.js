import { View, Text } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';




const Routes = () => {

    // const {userData,setUserData} = useContext(AuthContext)
      
    const [Login, setLogin] = useState(false)

  
    return (
     <NavigationContainer>
  
       {/* {AuthStack()} */}
      {MainStack()}

      

     </NavigationContainer>
    )
  }
  
  export default Routes

