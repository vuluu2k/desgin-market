import {SET_ACCOUNT} from '../contexts/contants';

export const accountReducer=(state,action)=>{
    const {type,payload:{isAuthenticated,account}} = action;
    switch(type){
        case SET_ACCOUNT:
            return{
                ...state,
                accountLoading:false,
                isAuthenticated,
                account
            }
        default:
            return state;
    }
}