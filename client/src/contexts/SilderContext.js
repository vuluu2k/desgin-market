import React,{
    createContext,
    useReducer,
    useState
} from 'react'
import axios from 'axios'
import {
    LOAD_SILDER_FAIL,
    LOAD_SILDER_SUCCESS,apiUrl,
    IMAGE_CREATE_SUCCESS,
    DELETE_IMAGE_SUCESS,
    IMAGE_UPDATE_SUCCESS,
    LOAD_DETAIL_IMAGE_SUCCESS
} from './contants'
import { silderReducer } from '../reducers/silderReducer';
export const SilderContext=createContext();
const SilderContextProvider=({children})=>{
    // [STATE]
    const [silderState,dispatch]=useReducer(silderReducer,{
        sildersLoading:true,
        image:[]
    })
    const [showAddImage,setShowAddImage]=useState(false)
    const [showUpdateImage,setShowUpdateImage]=useState(false)
    const [showDelImage,setShowDelImage]=useState({
        show:false,
        imageId:null
    })
    // [GET] Nhận ảnh
    const getImage=async ()=>{
        try {
            const response=await axios.get(`${apiUrl}/silders`)
            if(response.data.success){
                dispatch({type:LOAD_SILDER_SUCCESS,payload:response.data.image})
            }
        } catch (e) {
            dispatch({type:LOAD_SILDER_FAIL})
        }
    }
    const getImageDetail=async (id)=>{
        try {
            const response=await axios.get(`${apiUrl}/silders/${id}`)
            if(response.data.success){
                dispatch({type:LOAD_DETAIL_IMAGE_SUCCESS,payload:response.data.image})
            }
        } catch (e) {
            dispatch({type:LOAD_SILDER_FAIL})
        }
    }
    const createImage=async (imageForm)=>{
        try {
            const response= await axios.post(`${apiUrl}/silders`,imageForm);
            if(response.data.success){
                dispatch({type:IMAGE_CREATE_SUCCESS,payload:response.data.image})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }
    const updateImage = async (imageForm) => {
        try {
            const response = await axios.put(`${apiUrl}/silders/${imageForm._id}`,imageForm)
            if(response.data.success){
                dispatch({type:IMAGE_UPDATE_SUCCESS,payload:response.data.image})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }
    const deleteImage=async (id)=>{
        try {
            const response=await axios.delete(`${apiUrl}/silders/${id}`)
            if(response.data.success){
                dispatch({type:DELETE_IMAGE_SUCESS,payload:id})
            }
        } catch (e) {
            console.log(e);
        }
    }
    const silderContextData={
        silderState,getImage,
        showAddImage,setShowAddImage,
        createImage,updateImage,
        deleteImage,showDelImage,setShowDelImage,
        showUpdateImage,setShowUpdateImage,
        getImageDetail
    };
    return (
        <SilderContext.Provider value={silderContextData}>
            {children}
        </SilderContext.Provider>
    )
}

export default SilderContextProvider;