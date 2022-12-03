import {createStore,applyMiddleware,combineReducers} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from './reducers/auth';
import { channelVideoReducer, likeVideoReducer, recommendationReducer, videoReducer, _metaReducer } from './reducers/video';
import { channelReducer, SubscriptionByIdReducer, SubscriptionReducer } from './reducers/channel';
import { commentReducer } from './reducers/comment';
import { searchReducer } from './reducers/search';


const rootReducer =combineReducers({
    auth:authReducer,
    video:videoReducer,
    video_meta:_metaReducer,
    channel:channelReducer,
    subscriptionStatus:SubscriptionByIdReducer,
    subscribersAll:SubscriptionReducer,
    comments:commentReducer,
    recommendation:recommendationReducer,
    likeVideos:likeVideoReducer,
    searchReducer:searchReducer,
    channelVideos:channelVideoReducer
})

const store =createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;