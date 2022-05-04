
import {
    LOAD_ORDER_SUCCESS,LOAD_ORDER_FAIL,
    ORDER_CREATE_SUCCESS,DELETE_ORDER_SUCESS,
    ORDER_LOAD_DETAIL_SUCCESS,ORDER_UPDATE_SUCCESS
} from '../contexts/contants'


export const payReducer = (state,action)=>{
    const {type, payload}=action
    switch(type){
        case LOAD_ORDER_SUCCESS:
            return{
                ...state,
                orders:payload,
                ordersLoading:false
            }
        case LOAD_ORDER_FAIL:
            return{
                ...state,
                orders:[],
                ordersLoading:false
            }
        case ORDER_LOAD_DETAIL_SUCCESS:
            return {
                ...state,
                order:payload,
                orderLoading:false
            }
        case ORDER_CREATE_SUCCESS:
            return{
                ...state,
                orders:[...state.orders, payload]
            }
        case ORDER_UPDATE_SUCCESS:
            const newOrders=state.orders.map(order =>{
                if(order._id===payload._id)
                    return payload
                return order
            })
            return{
                ...state,
                orders:newOrders
            }
        case DELETE_ORDER_SUCESS:
            return{
                ...state,
                orders:state.orders.filter(order=>{
                    return order._id!==payload;
                })
            }
        default:
            return state
    }
}