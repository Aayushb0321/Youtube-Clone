import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideosByChannel } from '../../../redux-files/actions/video';
import { Col, Container, Row } from 'react-bootstrap';
import Video from '../../Video/Video';
import numeral from 'numeral';
import './channel.scss';
import { getChannelById, removeSubcriptionToThisChannel, subcribeToThisChannel } from '../../../redux-files/actions/channel';
import InfiniteScroll from 'react-infinite-scroll-component';

function Channel() {
  const {id}=useParams();

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch({type:'RESET_CHANNEL_VIDEO_STATE'});
    dispatch(getVideosByChannel(id));
    dispatch(getChannelById(id));
  },[id]);

  const {videos,loading}=useSelector(state=>state?.channelVideos);
  const channel =useSelector(state=>state?.channel?.channel);
  const {isSubscribed}=useSelector(state=>state.subscriptionStatus);
  function loadMoreVideos(){
    dispatch(getVideosByChannel(id));
  }
  return (
    <>
      <Container>
        <div className='_channel d-flex justify-content-between align-items-center my-2 py-3'>
            <div className="d-flex">
                <img 
                  src={channel?.snippet?.thumbnails?.medium?.url}
                  alt=''
                />
                <div className="d-flex flex-column">
                  <span className='name'>{channel?.snippet?.title}</span>
                  <span className='detail'>{numeral(channel?.statistics?.subscriberCount).format('( 0.00 a)').toLocaleUpperCase()} subscribers</span>
                </div>
            </div>
            <button 
              className={isSubscribed?'subscribed':'subscribe'} 
              onClick={()=>{
                if(isSubscribed){
                    dispatch(removeSubcriptionToThisChannel(id));
                }else{
                    dispatch(subcribeToThisChannel(id));
                }
              }}
            >{isSubscribed?'SUBSCRIBED':'SUBSCRIBE'}</button>
        </div>
        <InfiniteScroll dataLength={videos.length} next={loadMoreVideos} hasMore={true}>
          <Row className="mt-2">
            {(!loading || videos.length>0) && videos?.map(video=>(
              <Col md={3} lg={3}>
                <Video video={video} channelScreen={true}/>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>

      </Container>
    </>
  )
}

export default Channel