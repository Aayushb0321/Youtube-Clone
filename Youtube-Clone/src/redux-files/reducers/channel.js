import { ALL_SUBSCRIPTION_FAILED, ALL_SUBSCRIPTION_REQUEST, ALL_SUBSCRIPTION_SUCCESS, CHANNEL_FAILED, CHANNEL_REQUEST, CHANNEL_SUCCESS, SUBSCRIPTION_FAILED, SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS } from "../channelActions.js";

export const channelReducer=(
    prevState={
        loading:false,
        channel:[],
        error:'',
        noError:true
    },action)=>{
        const {type,payload}=action;
        // console.log(action);
        switch(type){
            case CHANNEL_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case CHANNEL_SUCCESS:
                return {
                    ...prevState,
                    loading:false,
                    channel:payload.channel,
                    error:'',
                    noError:true
                }
            case CHANNEL_FAILED:
                return {
                    ...prevState,
                    loading:false,
                    error:payload,
                    noError:false
                }
            default:
                return prevState
        }
}

export const SubscriptionByIdReducer=(
    prevState={
        loading:false,
        isSubscribed:false,
        subscriptionId:null,
        error:'',
        noError:true
    },action)=>{
        const {type,payload}=action;
        // console.log(payload);
        switch(type){
            case SUBSCRIPTION_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case SUBSCRIPTION_SUCCESS:
                return {
                    ...prevState,
                    loading:false,
                    isSubscribed:payload.isSubscribed,
                    subscriptionId:payload.subscriptionId,
                    error:'',
                    noError:true
                }
            case SUBSCRIPTION_FAILED:
                return {
                    ...prevState,
                    loading:false,
                    error:payload,
                    noError:false
                }
            default:
                return prevState
        }
}

export const SubscriptionReducer=(
    prevState={
        nextPageToken:null,
        subscriptions:[],
        loading:false,
        totalResults:-1,
        error:'',
        noError:true
    },action)=>{
        const {type,payload}=action;

        switch(type){
            case ALL_SUBSCRIPTION_REQUEST:
                return {
                    ...prevState,
                    loading:true,
                    error:'',
                    noError:true
                }
            case ALL_SUBSCRIPTION_SUCCESS:
                return {
                    ...prevState,
                    loading:false,
                    subscriptions:[...prevState.subscriptions,...payload.subscriptions],
                    nextPageToken:payload.nextPage,
                    totalResults:payload.totalResults,
                    error:'',
                    noError:true
                }
            case ALL_SUBSCRIPTION_FAILED:
                return{
                    ...prevState,
                    error:payload,
                    noError:false
                }
            case 'RESET_SUBSCRIPTION_ALL':
                return{
                    ...prevState,
                    nextPageToken:null,
                    subscriptions:[],
                    loading:false,
                    totalResults:-1,
                    error:'',
                    noError:true
                }
            default:
                return prevState
        }
}