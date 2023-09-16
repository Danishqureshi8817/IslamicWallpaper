import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CallApi, {setToken ,CallApiJson } from '../utiles/network';
 const initialState= {
    categoryListData:[],
    danish:'start',
    status:'pending'
 };

 const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{

        // fetchProducts (state,action){

        //     state.listData = action.payload
        // }
    },

    extraReducers:(builder) =>{

        //  3 pending, fullfilled rjected 

        builder.addCase( getCategory.pending, ( state , action )=>{

           // ...state   -> draft ->  immer.js 

          state.status='loading';
         } )
        .addCase( getCategory.fulfilled, ( state , action )=>{

 
            state.status='success';
            state.categoryListData = action.payload;
  
        } )

        .addCase( getCategory.rejected, ( state , action )=>{
            state.status='failed';
         } )
    }



 })

// vite 

 //export const {fetchProducts} = productSlice.actions;
 export default categorySlice.reducer;

// async api  1- thunk , saga-> , RTQ   

// swr , reactquery ,  appollo  ->  // 

// RTQ API REDUX TOP ->

 export const getCategory = createAsyncThunk('category', async()=>{
     
    const body = {
        app_name: 'ISLAMICAPP'
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