import { 
    ALL_SUBSCRIPTION_FAILED, 
    ALL_SUBSCRIPTION_REQUEST, 
    ALL_SUBSCRIPTION_SUCCESS,
     CHANNEL_FAILED, 
     CHANNEL_REQUEST, 
     CHANNEL_SUCCESS, 
     SUBSCRIPTION_FAILED, 
     SUBSCRIPTION_REQUEST, 
     SUBSCRIPTION_SUCCESS } from "../channelActions.js"

const api=require('../../axios/api.js');

export const getChannelById=(id)=> async (dispatch,getState) =>{
    try {
        if(getState().channel.loading===false){
            dispatch({
                type:CHANNEL_REQUEST
            });
            const response=await api.request('/channels',{
                params:{
                    part:'snippet,contentDetails,statistics',
                    id:id
                }
            });
            // console.log(response.data.items[0]);
            dispatch({
                type:CHANNEL_SUCCESS,
                payload:{
                    channel:response.data.items[0]
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:CHANNEL_FAILED,
            payload:error.message
        })
    }
}

export const getSubscriptionStatus=(id)=> async (dispatch,getState) =>{
    try {
        if(getState().subscriptionStatus.loading===false){
            dispatch({
                type:SUBSCRIPTION_REQUEST
            })
    
            // console.log(`Bearer ${getState().auth.accessToken}`);
            const response=await api.request('/subscriptions',{
                params:{
                   part:'snippet',
                   forChannelId:id,
                   mine:true 
                },
                headers:{
                    Authorization:`Bearer ${getState().auth.accessToken}`
                }
            });
    
            // console.log(response);
            dispatch({
                type:SUBSCRIPTION_SUCCESS,
                payload:{
                    isSubscribed:response.data.items.length>0?true:false,
                    subscriptionId:response.data.items[0]?.id
                }
            })
        }
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:SUBSCRIPTION_FAILED,
            payload:error.message
        })
    }
}

export const getAllSubscriptions=()=> async (dispatch,getState) =>{
    try {
        if(getState().subscribersAll.loading===false){
            dispatch({
                type:ALL_SUBSCRIPTION_REQUEST
            })
    
            if(getState().subscribersAll.totalResults!==getState().subscribersAll.subscriptions.length){
                const response =await api.request('/subscriptions',{
                    params:{
                       part:'snippet,contentDetails',
                       mine:true,
                       pageToken:getState().subscribersAll.nextPageToken,
                    },
                    headers:{
                        Authorization:`Bearer ${getState().auth.accessToken}`
                    }
                });
                // console.log(response);
        
                dispatch({
                    type:ALL_SUBSCRIPTION_SUCCESS,
                    payload:{
                        subscriptions:response.data.items,
                        nextPage:response.data.nextPageToken,
                        totalResults:response.data.pageInfo.totalResults
                    }
                })
            }
        }
        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:ALL_SUBSCRIPTION_FAILED,
            payload:error.message
        })
    }
}

export const subcribeToThisChannel=(id)=> async (dispatch,getState) =>{
    try {
            const obj={
                snippet: {
                    resourceId: {
                      kind: "youtube#channel",
                      channelId: id
                    }
                }
            }

            await api.request.post('/subscriptions',obj,{
                params:{
                    part:'snippet'
                },
                headers:{
                    Authorization:`Bearer ${getState().auth.accessToken}`
                }
            });

            dispatch({
                type:'SUBSCRIBED'
            });

            setTimeout(()=>dispatch(getSubscriptionStatus(id)),2800);
    } catch (error) {
        console.log(error.message);
    }
} 

export const removeSubcriptionToThisChannel=(channelId)=>async (dispatch,getState) =>{
    try {
        await api.request.delete('/subscriptions',{
            params:{
                id:getState().subscriptionStatus.subscriptionId
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            }
        });

        dispatch({
            type:'UNSUBSCRIBED'
        })
        setTimeout(()=>dispatch(getSubscriptionStatus(channelId)),2800);
    } catch (error) {
        console.log(error.message);
    }
}

export const rateThisVideo=(what,videoId)=> async (dispatch,getState) =>{
    try {
        const Rate=what===1?'like':what===0?'dislike':'none';

        await api.request.post('/videos/rate',{
            params:{
                id:videoId,
                rating:Rate
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            }
        });

        dispatch({
            type:'Rated Video Success'
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:'Rate Video Failed'
        })
    }
}