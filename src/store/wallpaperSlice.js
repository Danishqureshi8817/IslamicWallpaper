import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CallApi, {setToken ,CallApiJson } from '../utiles/network';
 const initialState= {
    wallpaperListData:[],
    danish:'start',
    status:'pending'
 };

 const wallpaperSlice = createSlice({
    name:'wallpaperlist',
    initialState,
    reducers:{

        // fetchProducts (state,action){

        //     state.listData = action.payload
        // }
    },

    extraReducers:(builder) =>{

        //  3 pending, fullfilled rjected 

        builder.addCase( wallpaperList.pending, ( state , action )=>{

           // ...state   -> draft ->  immer.js 

          state.status='loading';
        //  console.log( 'createAsyncThunk pending ' ,state, action)

        } )
        .addCase( wallpaperList.fulfilled, ( state , action )=>{

            console.log( 'getCategory-wallpaperlist', action.payload )

            state.status='success';
            state.wallpaperListData = action.payload;
            //console.log( 'createAsyncThunk wallpaperlist  fulfilled'  ,state )

 
        } )

        .addCase( wallpaperList.rejected, ( state , action )=>{
            state.status='failed';
           // console.log( 'createAsyncThunk fulfilled',state ,action  )
        } )
    }



 })

// vite 

 //export const {fetchProducts} = productSlice.actions;
 export default wallpaperSlice.reducer;

// async api  1- thunk , saga-> , RTQ   

// swr , reactquery ,  appollo  ->  // 

// RTQ API REDUX TOP ->

 export const wallpaperList = createAsyncThunk('wallpaperlist', async(cat_id)=>{
    console.log( 'createAsyncThunk Api callcat id wallpaperlist',cat_id )
    
    const body = {
        app_name: 'ISLAMICAPP',
        cat_id:cat_id
      };

      
    const result =  await CallApiJson('wallpapercategory', 'POST', body);

        // const data = await fetch( 'https://islamicwallpaper.newindiagyan.online/api/wallpapercategory');
        // const result = await data.json();
         return result.category;

 }  )




//  export  function getProducts(){

//     console.log( 'getProductsapi', )

//     return async function getProductThunk(dispatch,getState){
//         console.log( 'getProductThunk', getState )

//         const data = await fetch( 'https://fakestoreapi.com/products') ;
//         const result = await data.json();
//         console.log( 'getProductThunkresultthn', result  )

//         dispatch(fetchProducts(result))

//     }
//  }