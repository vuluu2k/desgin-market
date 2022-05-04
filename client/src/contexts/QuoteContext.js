import React from 'react'
import axios from 'axios';
import {createContext,useState,useReducer} from 'react';
import {apiUrl,QUOTE_CREATE_SUCCESS,QUOTE_LOAD_SUCCESS,QUOTE_LOAD_FAIL,DELETE_QUOTE_SUCCESS} from './contants';
import {quoteReducer} from '../reducers/quoteReducer';

export const QuoteContext = createContext();

const QuoteContextProvider=({children})=>{
    // [STATE]
    const [quoteState,dispatch]=useReducer(quoteReducer,{
        quotesLoading:true,
        quotes:[]
    })
    const [showQuote, setShowQuote] = useState(true);
    const [showToastQuote,setShowToastQuote] = useState({
        show:false,
        message:''
    });
    // [GET] QUOTE
    const getQuote= async ()=>{
        try {
            const response = await axios.get(`${apiUrl}/quotes`);
            if(response.data.success){
                dispatch({type:QUOTE_LOAD_SUCCESS,payload:response.data.quotes});
            }
        } catch (e) {
            dispatch({type:QUOTE_LOAD_FAIL});
        }
    }
    // [CREATE] QUOTE
    const createQuote = async (quoteForm)=>{
        try {
            const response=await axios.post(`${apiUrl}/quotes`,quoteForm);
            if(response.data.success){
                dispatch({type:QUOTE_CREATE_SUCCESS,payload:response.data.quote})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data:{success:false,message:'Lỗi Server'}
        }
    }
    // [DELETE] QUOTE
    const deleteQuote = async (quoteId)=>{
        try {
            const response = await axios.delete(`${apiUrl}/quotes/${quoteId}`)
            if(response.data.success){
                dispatch({type:DELETE_QUOTE_SUCCESS,payload:quoteId})
            }
                
        } catch (e) {
            console.log(e);
        }
    }
    
    


    const quoteContextData={
        quoteState,showQuote,setShowQuote,
        createQuote,showToastQuote,setShowToastQuote,
        getQuote,deleteQuote
    };
    return (
        <QuoteContext.Provider value={quoteContextData}>
            {children}
        </QuoteContext.Provider>
    )

}

export default QuoteContextProvider;