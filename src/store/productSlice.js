import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

 const initialState= {
    listData:[],
    danish:'start',
    status:'pending'
 };

 const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{

        // fetchProducts (state,action){

        //     state.listData = action.payload
        // }
    },

    extraReducers:(builder) =>{

        //  3 pending, fullfilled rjected 

        builder.addCase( getProducts.pending, ( state , action )=>{

           // ...state   -> draft ->  immer.js 

          state.status='loading';
          console.log( 'createAsyncThunk pending ' ,state, action)
        } )
        .addCase( getProducts.fulfilled, ( state , action )=>{
            state.listData=action.payload;
            state.status='success';
            console.log( 'createAsyncThunk fulfilled'  ,action.payload )
        } )

        .addCase( getProducts.rejected, ( state , action )=>{
            state.status='failed';
            console.log( 'createAsyncThunk fulfilled',state ,action  )
        } )
    }



 })

// vite 

 //export const {fetchProducts} = productSlice.actions;
 export default productSlice.reducer;

// async api  1- thunk , saga-> , RTQ   

// swr , reactquery ,  appollo  ->  // 

// RTQ API REDUX TOP ->

 export const getProducts = createAsyncThunk('products', async()=>{
    console.log( 'createAsyncThunk' )
        const data = await fetch( 'https://fakestoreapi.com/products');
        const result = await data.json();
        console.log( 'createAsyncThunkresult',result )
        return result;

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