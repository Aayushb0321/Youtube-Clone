import { SEARCH_ELEMENT_FAILED, 
        SEARCH_ELEMENT_REQUEST, 
        SEARCH_ELEMENT_SUCCESS } from "../videoActions.js";

const api=require('../../axios/api.js');
export const getSearchResult=(query)=> async (dispatch,getState) =>{
    try {
        if(getState().searchReducer.loading===false){
            dispatch({
                type:SEARCH_ELEMENT_REQUEST
            });
            const nextPageToken=getState().searchReducer.nextPageToken;
    
            const response=await api.request('/search',{
                params:{
                    part:'snippet',
                    maxResults:30,
                    q:query,
                    pageToken:nextPageToken,
                    type:'video,channel'
                }
            });
                
            dispatch({
                type:SEARCH_ELEMENT_SUCCESS,
                payload:{
                    searchResults:response.data.items,
                    nextPageToken:response.data.nextPageToken
                }
            })
        }
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:SEARCH_ELEMENT_FAILED,
            payload:error.message
        })
    }
}