import React from 'react';
import { createContext,useReducer,useState } from 'react';
import {newReducer} from '../reducers/newReducer';
import {
    apiUrl,NEW_LOAD_SUCCESS,
    NEW_LOAD_FAIL,NEW_CREATE_SUCCESS,
    NEW_LOAD_DETAIL_SUCCESS,DELETE_NEW_SUCESS,
    NEW_UPDATE_SUCCESS
} from './contants';
import axios from 'axios';

export const NewContext= createContext();

const NewContextProvider = ({children}) =>{

    const [newState,dispatch]=useReducer(newReducer,{
        newTT:null,
        news:[],
        newLoading:true
    })

    const [showAddNew,setShowAddNew]=useState(false);
    const [showUpdateNew,setShowUpdateNew]=useState(false);
    const [showViewNew,setShowViewNew]=useState(false);
    const [showDelNew,setShowDelNew]=useState({
        show:false,newId:''
    });

    // [GET] NewS
    const getNew=async ()=>{
        try {
            const response=await axios.get(`${apiUrl}/news`)
            if(response.data.success){
                dispatch({type:NEW_LOAD_SUCCESS,payload:response.data.news})
            }
        } catch (e) {
            dispatch({type:NEW_LOAD_FAIL})
        }
    }

    const getNewDetail=async (newId)=>{
        try {
            const response=await axios.get(`${apiUrl}/news/${newId}`)
            if(response.data.success){
                dispatch({type:NEW_LOAD_DETAIL_SUCCESS,payload:response.data.news})
            }
        } catch (e) {
            console.log(e)
        }
    }

     // [CREATE] 
     const createNew=async (newForm)=>{
        try {
            
            const response= await axios.post(`${apiUrl}/news`,newForm);
            if(response.data.success){
                dispatch({type:NEW_CREATE_SUCCESS,payload:response.data.news})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }

    // [UPDATE] 
    const updateNew=async (newForm)=>{
        try {
            const response = await axios.put(`${apiUrl}/news/${newForm._id}`,newForm)
            if(response.data.success){
                dispatch({type:NEW_UPDATE_SUCCESS,payload:response.data.news})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data : {success: false,message: 'Lỗi server'}
        }
    }

    // [DELETE] 
    const deleteNew=async (newId)=>{
        try {
            const response=await axios.delete(`${apiUrl}/news/${newId}`)
            console.log(response.data)
            if(response.data.success){
                dispatch({type:DELETE_NEW_SUCESS,payload:newId})
            }
        } catch (e) {
            console.log(e);
        }
    }


    const newContextData={
        newState, 
        getNew,createNew,
        showAddNew,setShowAddNew,
        getNewDetail,deleteNew,
        showDelNew,setShowDelNew,updateNew,
        showUpdateNew,setShowUpdateNew,
        showViewNew,setShowViewNew
    }


    return (
        <NewContext.Provider value={newContextData}>
            {children}
        </NewContext.Provider>
    )

}

export default NewContextProvider;