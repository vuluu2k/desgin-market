
import {QUOTE_CREATE_SUCCESS,QUOTE_LOAD_SUCCESS,QUOTE_LOAD_FAIL,DELETE_QUOTE_SUCCESS} from '../contexts/contants';

export const quoteReducer=(state,action)=>{
    const{type,payload}=action;
    switch(type){
        case QUOTE_LOAD_SUCCESS:
            return {
                ...state,
                quotes:payload,
                quotesLoading:false
            }
        case QUOTE_LOAD_FAIL:
            return {
                ...state,
                quotes:[],
                quotesLoading:false
            }
        case QUOTE_CREATE_SUCCESS:
            return{
                ...state,
                quotes:[...state.quotes,payload]
            }
        case DELETE_QUOTE_SUCCESS:
            return{
                ...state,
                quotes:state.quotes.filter(quote=>{
                    return quote._id!==payload;
                })
            }
        default:
            return state;
    }
}