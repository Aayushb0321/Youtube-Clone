import { CHANNEL_VIDEO_FAILED, CHANNEL_VIDEO_REQUEST, CHANNEL_VIDEO_SUCCESS, LIKE_VIDEOS_FAILED, LIKE_VIDEOS_REQUEST, LIKE_VIDEOS_SUCCESS, RECOMMENDED_VIDEO_FAILED, RECOMMENDED_VIDEO_REQUEST, RECOMMENDED_VIDEO_SUCCESS, VIDEOS_FAILED, VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEO_SELECTED_FAILED, VIDEO_SELECTED_REQUEST, VIDEO_SELECTED_SUCCESS } from "../videoActions.js";

export const videoReducer=(
    prevState={
        videos:[],
        loading:false,
        nextPageToken:null,
        category:'All',
        error:'',
        noError:true
    },action)=>{
        const {type,payload}=action;
        switch(type){
            case VIDEOS_FAILED:
                return{
                    ...prevState,
                    loading:false,
                    error:payload,
                    noError:false
                }
            case VIDEOS_SUCCESS:
                return{
                    ...prevState,
                    videos:prevState.category===payload.category?[...prevState.videos,...payload.videos]:payload.videos,
                    loading:false,
                    nextPageToken:payload.nextPageToken,
                    category:payload.category,
                    error:'',
                    noError:true
                }
            case VIDEOS_REQUEST:
                return{
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case 'RESET_STATE':
                return{
                    videos:[],
                    loading:false,
                    nextPageToken:null,
                    category:'All',
                    error:'',
                    noError:true
                }
            default:
                return prevState;
        }

}
export const _metaReducer=(
    prevState={
        _meta:[],
        commentCount:null,
        loading:false,
        id:null,
        error:'',
        noError:true
    },action)=>{
        const {type,payload}=action;
        switch(type){
            case VIDEO_SELECTED_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    _meta:payload.id===prevState.id?prevState._meta:[],
                    commentCount:payload.id===prevState.id?prevState.commentCount:null,
                    error:'',
                    noError:true
                }
            case VIDEO_SELECTED_SUCCESS:
                return{
                    ...prevState,
                    _meta:payload.meta_,
                    commentCount:payload.meta_.statistics.commentCount,
                    loading:false,
                    error:'',
                    noError:true
                }
            case VIDEO_SELECTED_FAILED:
                return{
                    ...prevState,
                    loading:false,
                    error:payload,
                    noError:false
                }
            default:
                return prevState
        }
}

export const recommendationReducer=(
    prevState={
        Recommend:[],
        loading:false,
        videoId:null,
        error:'',
        noError:true
    },action) =>{
        const {type,payload}=action;

        switch(type){
            case RECOMMENDED_VIDEO_FAILED:
                return {
                    ...prevState,
                    loading:false,
                    error:payload,
                    noError:false
                }
            case RECOMMENDED_VIDEO_REQUEST:
                return {
                    ...prevState,
                    Recommend:payload.videoId===prevState.videoId?prevState.Recommend:[],
                    loading:true,
                    videoId:payload.videoId,
                    error:'',
                    noError:true
                }
            case RECOMMENDED_VIDEO_SUCCESS:
                return{
                    ...prevState,
                    Recommend:[...prevState.Recommend,...payload.Recommend],
                    loading:false,
                    error:'',
                    noError:true
                }
            default:
                return prevState
        }
}

export const likeVideoReducer=(
    prevState={
        videos:[],
        loading:false,
        nextPageToken:null,
        totalResults:-1,
        error:'',
        noError:true
    },action)=>{
        const {type,payload}=action;
        switch(type){
            case LIKE_VIDEOS_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case LIKE_VIDEOS_SUCCESS:
                return{
                    ...prevState,
                    videos:[...prevState.videos,...payload.videos],
                    nextPageToken:payload.nextPageToken,
                    totalResults:payload.totalResults,
                    loading:false,
                    error:'',
                    noError:true
                }
            case LIKE_VIDEOS_FAILED:
                return{
                    ...prevState,
                    error:payload,
                    noError:false
                }
            case 'RESET_LIKE_STATE':
                return {
                    ...prevState,
                    videos:[],
                    loading:false,
                    nextPageToken:null,
                    totalResults:-1,
                    error:'',
                    noError:true
                }
            default:
                return prevState
        }
}

export const channelVideoReducer=(
    prevState={
        videos:[],
        loading:false,
        error:'',
        noError:true,
        nextPageToken:null,
        channelId:null
    },action)=>{
        const {type,payload}=action;
        switch(type){
            case CHANNEL_VIDEO_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case CHANNEL_VIDEO_SUCCESS:
                return{
                    ...prevState,
                    videos:[...prevState.videos,...payload.videos],
                    nextPageToken:payload.nextPageToken,
                    loading:false,
                    error:'',
                    noError:true
                }
            case CHANNEL_VIDEO_FAILED:
                return{
                    ...prevState,
                    error:payload,
                    noError:false
                }
            case 'RESET_CHANNEL_VIDEO_STATE':
                return {
                    ...prevState,
                    videos:[],
                    loading:false,
                    nextPageToken:null,
                    error:'',
                    noError:true
                }
            default:
                return prevState
        }
}