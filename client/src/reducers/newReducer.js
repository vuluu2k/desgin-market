import {
    NEW_LOAD_SUCCESS,
    NEW_LOAD_FAIL,
    NEW_CREATE_SUCCESS,NEW_LOAD_DETAIL_SUCCESS,
    DELETE_NEW_SUCESS,NEW_UPDATE_SUCCESS
} from '../contexts/contants';

export const newReducer=(state,action)=>{
    const {type,payload} =action;
    switch(type){
        case NEW_LOAD_SUCCESS:
            return {
                ...state,
                news:payload,
                newsLoading:false
            }
        case NEW_LOAD_FAIL:
            return {
                ...state,
                news:[],
                newsLoading:false
            }
        case NEW_LOAD_DETAIL_SUCCESS:
            return {
                ...state,
                newTT:payload,
                newLoading:false
            }
        case NEW_CREATE_SUCCESS:
            return {
                ...state,
                newTT:[...state.news,payload]
            }
        case NEW_UPDATE_SUCCESS:
            const newNews=state.news.map(newTT =>{
                if(newTT._id===payload._id)
                    return payload
                return newTT
            })
            return{
                ...state,
                news:newNews
            }
        case DELETE_NEW_SUCESS:
            return {
                ...state,
                news:state.news.filter(newTT=>newTT._id!==payload)
            }
        default:
            return state;
    }
}