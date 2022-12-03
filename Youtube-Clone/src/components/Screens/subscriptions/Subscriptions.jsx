import React from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Channel from './Channel/Channel.jsx';
import { getAllSubscriptions } from '../../../redux-files/actions/channel.js';

function Subscriptions() {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllSubscriptions());
  },[]);

  const channels=useSelector(state=>state.subscribersAll?.subscriptions);

  function loadMore(){
    dispatch(getAllSubscriptions());
  }
  return (
    <Container>
          <InfiniteScroll dataLength={channels.length} next={loadMore} hasMore={true} 
          loader={<div className='spinner-border text-danger d-block mx-auto mt-2'></div>} >
              {
                channels.map(channel=><Channel channels={channel}></Channel>)
              }
          </InfiniteScroll>
    </Container>
  )
}

export default Subscriptions