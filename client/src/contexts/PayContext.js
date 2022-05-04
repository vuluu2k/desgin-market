import React,{
    createContext,
    useReducer,
    useState
} from 'react';
import {
    apiUrl,
    LOAD_ORDER_SUCCESS,LOAD_ORDER_FAIL,
    ORDER_CREATE_SUCCESS,DELETE_ORDER_SUCESS,
    ORDER_LOAD_DETAIL_SUCCESS,ORDER_UPDATE_SUCCESS
} from './contants'
import {payReducer} from '../reducers/payReducer'
import axios from 'axios'
export const PayContext=createContext();

const PayContextProvider = ({children})=>{
    // STATE
    const [orderState,dispatch]=useReducer(payReducer,{
        ordersLoading:true,
        orderLoading:true,
        orders:[],
        order:null
    }) 
    const [showView,setShowView]=useState(false);
    const [showUpdate,setShowUpdate]=useState(true);
    const [showDelete,setShowDelete]=useState({
        show:false,
        idOrder:null
    });

    // [GET] Order
    const getOrder=async ()=>{
        try {
            const response = await axios.get(`${apiUrl}/orders`);
            if(response.data.success){
                dispatch({type:LOAD_ORDER_SUCCESS,payload:response.data.orders});
            }
        } catch (e) {
            dispatch({type:LOAD_ORDER_FAIL});
        }
    }
    //[GET] Order Detail
    const getOrderDetail=async (id)=>{
        try {
            const response=await axios.get(`${apiUrl}/orders/${id}`)
            if(response.data.success){
                dispatch({type:ORDER_LOAD_DETAIL_SUCCESS,payload:response.data.order})
            }
        } catch (e) {
            console.log(e)
        }
    }
    // [CREATE] Order
    const createOrder=async (orderForm)=>{
        try {
            const response= await axios.post(`${apiUrl}/orders`,orderForm);
            if(response.data.success){
                dispatch({type:ORDER_CREATE_SUCCESS,payload:response.data.order})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }
    // [UPDATE] PRODUCT
    const updateOrder=async (orderForm)=>{
        try {
            const response = await axios.put(`${apiUrl}/orders/${orderForm._id}`,orderForm)
            if(response.data.success){
                dispatch({type:ORDER_UPDATE_SUCCESS,payload:response.data.order})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }
     // [DELETE] PRODUCT
    const deleteOrder=async (id)=>{
        try {
            const response=await axios.delete(`${apiUrl}/orders/${id}`)
            if(response.data.success){
                dispatch({type:DELETE_ORDER_SUCESS,payload:id})
            }
        } catch (e) {
            console.log(e);
        }
    }
    const payContextData={
        orderState,getOrder,
        createOrder,showView,setShowView,
        showUpdate,setShowUpdate,
        showDelete,setShowDelete,
        getOrderDetail,updateOrder,
        deleteOrder
    }
    return(
        <PayContext.Provider value={payContextData}>
            {children}
        </PayContext.Provider>
    )
}

export default PayContextProvider;