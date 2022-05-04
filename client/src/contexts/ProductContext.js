import React from 'react'
import {createContext,useReducer,useState} from 'react';
import {productReducer} from '../reducers/productReducer';
import {
    apiUrl,PRODUCT_LOAD_SUCCESS,
    PRODUCT_LOAD_FAIL,PRODUCT_CREATE_SUCCESS,
    PRODUCT_LOAD_DETAIL_SUCCESS,DELETE_PRODUCT_SUCESS,
    PRODUCT_UPDATE_SUCCESS,PRODUCT_LOAD_CATE_SUCCESS
} from './contants';
import axios from 'axios';

export const ProductContext=createContext();

const ProductContextProvider = ({children})=>{
    // [STATE]
    const [productState,dispatch]=useReducer(productReducer,{
        product:null,
        products:[],
        graphics:[],
        productsLoading:true,
        productLoading:true,
        graphicsLoading:true,
    })

    const [showAddCar,setShowAddCar]=useState(false);
    const [showUpdateCar,setShowUpdateCar]=useState(false);
    const [showViewCar,setShowViewCar]=useState(false);
    const [showDelCar,setShowDelCar]=useState({
        show:false,productId:''
    });
    // [GET] PRODUCTS
    const getProduct=async (nameCar)=>{ 
        try {
            const response=await axios.get(`${apiUrl}/products?nameCar=${nameCar||''}`)
            if(response.data.success){
                dispatch({type:PRODUCT_LOAD_SUCCESS,payload:response.data.products})
                
            }
        } catch (e) {
            dispatch({type:PRODUCT_LOAD_FAIL})
        }
    }
    const getProductWithCategory=async ()=>{ 
        try {
            const response=await axios.get(`${apiUrl}/products/view?category=logo`)
            if(response.data.success){
                dispatch({type:PRODUCT_LOAD_CATE_SUCCESS,payload:response.data.graphics})
            }
            console.log("a")
        } catch (e) {
            dispatch({type:PRODUCT_LOAD_FAIL})
        }
    }
    // [GET] PRODUCT DETAIL
    const getProductDetail=async (productId)=>{
        try {
            const response=await axios.get(`${apiUrl}/products/${productId}`)
            if(response.data.success){
                dispatch({type:PRODUCT_LOAD_DETAIL_SUCCESS,payload:response.data.product})
            }
        } catch (e) {
            console.log(e)
        }
    }

    // [CREATE] PRODUCT
    const createProduct=async (productForm)=>{
        try {
            const response= await axios.post(`${apiUrl}/products`,productForm);
            if(response.data.success){
                dispatch({type:PRODUCT_CREATE_SUCCESS,payload:response.data.product})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }
    // [UPDATE] PRODUCT
    const updateProduct=async (productForm)=>{
        try {
            const response = await axios.put(`${apiUrl}/products/${productForm._id}`,productForm)
            if(response.data.success){
                dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:response.data.product})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }
    
    // [DELETE] PRODUCT
    const deleteProduct=async (productId)=>{
        try {
            const response=await axios.delete(`${apiUrl}/products/${productId}`)
            if(response.data.success){
                dispatch({type:DELETE_PRODUCT_SUCESS,payload:productId})
            }
        } catch (e) {
            console.log(e);
        }
    }

    const productContextData={
        productState,getProductWithCategory,
        getProduct,createProduct,
        showAddCar,setShowAddCar,
        getProductDetail,deleteProduct,
        showDelCar,setShowDelCar,updateProduct,
        showUpdateCar,setShowUpdateCar,
        showViewCar,setShowViewCar
    }

    return(
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default  ProductContextProvider;