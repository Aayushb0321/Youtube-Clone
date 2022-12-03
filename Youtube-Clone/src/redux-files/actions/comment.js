import {ADD_COMMENTS_FAILED, 
        ADD_COMMENTS_SUCCESS, 
        GET_COMMENTS_FAILED,
        GET_COMMENTS_REQUEST, 
        GET_COMMENTS_SUCCESS } from "../commentActions.js";

const api=require('../../axios/api.js');

export const getCommentsUsingVideoId= (id)=> async (dispatch,getState) =>{
    try {

        if(getState().comments.loading===false){
            dispatch({
                type:GET_COMMENTS_REQUEST,
                payload:{
                    id:id
                }
            })
    
            const response=await api.request('/commentThreads',{
                params:{
                    part:'snippet',
                    videoId:id,
                    pageToken:getState().comments.nextPageToken
                }
            });
    
            dispatch({
                type:GET_COMMENTS_SUCCESS,
                payload:{
                    nextPageToken:getState().comments.nextPageToken,
                    totalResults:response.data.pageInfo.totalResults,
                    comments:response.data.items,
                    id:id
                }
            })
        }
        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:GET_COMMENTS_FAILED,
            payload:error.message
        })
    }
}

export const addComments= (id,text,channelid)=> async (dispatch,getState) =>{
    try {

        const obj={
            snippet:{
                videoId:id,
                channelId:channelid,
                topLevelComment:{
                    snippet:{
                        textOriginal:text
                    }
                }
            }
        }
        
        await api.request.post('/commentThreads',obj,{
            params:{
                part:'snippet',
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            }
        });

        dispatch({
            type:ADD_COMMENTS_SUCCESS,
        })

        setTimeout(()=>dispatch(getCommentsUsingVideoId(id)),2800);
        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:ADD_COMMENTS_FAILED,
            payload:error.message
        })
    }
}