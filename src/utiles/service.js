import AsyncStorage from "@react-native-async-storage/async-storage";


const setUserAuth = async (value) => {
    await AsyncStorage.setItem('userData',JSON.stringify(value))
}


const getUserAuth = async () => {
   const value =  await AsyncStorage.getItem('userData')

   return JSON.parse(value)
}

const setUserFirst = async (value) => {
    await AsyncStorage.setItem('userFirst',value)
}

const getUserFirst = async () => {
    const value =  await AsyncStorage.getItem('userFirst')
 
    return JSON.parse(value)
 }

const Logout = () =>{
    AsyncStorage.clear()
}


export  {
    setUserAuth,
    getUserAuth,
    Logout,
    setUserFirst,
    getUserFirst,

}