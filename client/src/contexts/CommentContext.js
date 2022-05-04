import React from 'react'
import {createContext,useReducer,useState} from 'react';
import {commentReducer} from '../reducers/commentReducer';
import {
    apiUrl,COMMENT_CREATE_SUCCESS,
    COMMENT_LOAD_SUCCESS,
    COMMENT_LOAD_FAIL,
    DELETE_COMMENT_SUCCESS
} from './contants';
import axios from 'axios';

export const CommentContext=createContext();

const CommentContextProvider = ({children})=>{
    // [STATE]
    const [commentState,dispatch]=useReducer(commentReducer,{
        commentsLoading:true,
        comments:[]
    })

    const [showComment, setShowComment] = useState(true);
    const [showToastComment,setShowToastComment] = useState({
        show:false,
        message:''
    });
    // [GET] COMMENT
    const getComment= async (productId)=>{
        try {
            const response = await axios.get(`${apiUrl}/comments/${productId}`);
            if(response.data.success){

                dispatch({type:COMMENT_LOAD_SUCCESS,payload:response.data.comments});
            }
        } catch (e) {
            dispatch({type:COMMENT_LOAD_FAIL});
        }
    }
    // [CREATE] COMMENT
    const createComment = async (commentForm)=>{
        try {
            const response=await axios.post(`${apiUrl}/comments`,commentForm);
            if(response.data.success){
                dispatch({type:COMMENT_CREATE_SUCCESS,payload:response.data.comment})
                return response.data;
            }
        } catch (e) {
            return e.response.data ? e.response.data:{success:false,message:'Lỗi Server'}
        }
    }
    // [DELETE] COMMENT
    const deleteComment = async (commentId)=>{
        try {
            const response = await axios.delete(`${apiUrl}/comments/${commentId}`)
            
            if(response.data.success){
                dispatch({type:DELETE_COMMENT_SUCCESS,payload:commentId})
            }
                
        } catch (e) {
            console.log(e);
        }
    }
    
    


    const commentContextData={
        commentState,showComment,setShowComment,
        createComment,showToastComment,setShowToastComment,
        getComment,deleteComment
    };
    return (
        <CommentContext.Provider value={commentContextData}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContextProvider;