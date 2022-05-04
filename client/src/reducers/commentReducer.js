import {
    COMMENT_CREATE_SUCCESS,
    COMMENT_LOAD_SUCCESS,
    COMMENT_LOAD_FAIL,
    DELETE_COMMENT_SUCCESS
} from '../contexts/contants';
export const commentReducer=(state,action)=>{
    const {type,payload}=action
    switch(type){
        case COMMENT_LOAD_SUCCESS:
            return {
                ...state,
                comments:payload,
                commentsLoading:false
            }
        case COMMENT_LOAD_FAIL:
            return {
                ...state,
                comments:[],
                commentsLoading:false
            }
        case COMMENT_CREATE_SUCCESS:
            return {
                ...state,
                comments:[...state.comments,payload]
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                comments:state.comments.filter(comment=>{
                    return comment._id!==payload;
                })
            }
        default:
            return state;
    }
}