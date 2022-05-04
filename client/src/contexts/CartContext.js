import React from 'react';
import { createContext,useState } from 'react';
import {LOCAL_STORAGE_PRODUCTS_CART_NAME,apiUrl} from './contants';
import axios from 'axios';

export const CartContext=createContext();

const CartContextProvider=({children})=>{
    const [showCart,setShowCart]=useState(false);

    let cart=[];
    let quantity=1;
    let product;
    let item;
    const addToCart=async (Id,options)=>{
        let storage=localStorage.getItem(LOCAL_STORAGE_PRODUCTS_CART_NAME);
        if(storage){
            cart=JSON.parse(storage)
        }
        if(options !== 'News'){
            const response= await axios.get(`${apiUrl}/products/${Id}`)
             product=response.data.product;
             item = cart.find(c=>c.product._id===Id)
        }else{
            const response= await axios.get(`${apiUrl}/news/${Id}`)
             product=response.data.product;
             item = cart.find(c=>c.product._id===Id)
        }
        
        
        if(item){
            item.quantity+=1;
        }
        else
        {
            cart.push({product,quantity});
        }
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_CART_NAME,JSON.stringify(cart))
    }
    const getCart=()=>{
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_PRODUCTS_CART_NAME))
    }
    const updateQuantityCart=(productId,updateQuality)=>{
        let storage=localStorage.getItem(LOCAL_STORAGE_PRODUCTS_CART_NAME);
        if(storage){
            cart=JSON.parse(storage);
        }
        let item = cart.find(c=>c.product._id===productId);
        if(item){
            item.quantity=updateQuality;
        }
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_CART_NAME,JSON.stringify(cart))
    }
    const deleteCart=(productId)=>{
        let storage=localStorage.getItem(LOCAL_STORAGE_PRODUCTS_CART_NAME)
        if(storage){
            cart=JSON.parse(storage);
        }
        let delCart=cart.filter(c=>c.product._id!==productId);
        if(delCart!==cart){
            localStorage.setItem(LOCAL_STORAGE_PRODUCTS_CART_NAME,JSON.stringify(delCart));
        }
        else if(delCart.length<0){
            localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_CART_NAME);
        }
    }
    const clearCart=()=>{
        localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_CART_NAME);
    }






    const cartContextData={showCart,setShowCart,addToCart,getCart,updateQuantityCart,deleteCart,clearCart};
    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )

}
export default CartContextProvider;