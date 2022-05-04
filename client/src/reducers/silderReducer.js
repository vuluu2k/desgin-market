import {
    LOAD_SILDER_SUCCESS,LOAD_SILDER_FAIL,
    IMAGE_CREATE_SUCCESS,DELETE_IMAGE_SUCESS,
    IMAGE_UPDATE_SUCCESS,LOAD_DETAIL_IMAGE_SUCCESS
} from '../contexts/contants'

export const silderReducer=(state,action)=>{
    const {type,payload}=action
    switch(type){
        case LOAD_SILDER_SUCCESS:
            return{
                ...state,
                image:payload,
                sildersLoading:false
            }
        case LOAD_SILDER_FAIL:
            return{
                ...state,
                image:[],
                sildersLoading:false
            }
        case LOAD_DETAIL_IMAGE_SUCCESS:
            return {
                ...state,
                img:payload,
                imgLoading:false
            }
        case IMAGE_CREATE_SUCCESS:
            return{
                ...state,
                image:[...state.image,payload]
            }
        case IMAGE_UPDATE_SUCCESS:
            const newImage=state.image.map(img =>{
                if(img._id===payload._id)
                    return payload
                return img
            })
            return{
                ...state,
                image:newImage
            }
        case DELETE_IMAGE_SUCESS:
            return {
                ...state,
                image:state.image.filter(img=>img._id!==payload)
            }
        default:
            return state
    }
}