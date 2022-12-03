import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useNavigate} from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Video.scss';
import { useDispatch, useSelector } from 'react-redux';

const api=require('../../axios/api.js');
const OAuth=require('../../redux-files/actions/auth.js')

function Video({video,channelScreen}) {

  const [views,setViews]=useState(0);
  const [duration,setDuration]=useState(0);
  const [channel,setChannel]=useState('');
  const navigate=useNavigate();
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const {
    id,
    snippet:{
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails:{high},
    },
    contentDetails
  }=video;

  function watchIt(){
    if(auth.accessToken==null){
      dispatch(OAuth.Login());
    }else{
      navigate(`/watch/${id?.videoId ? id?.videoId:contentDetails?.videoId?contentDetails?.videoId:id}/${channelId}`);
    }
  }
  function channelLoad (){
    if(auth.accessToken==null){
      dispatch(OAuth.Login());
    }else
      navigate(`/channel/${channelId}`)
  }

  useEffect(()=>{
    const _id=id?.videoId||contentDetails?.videoId|| id;
    const extraDetails=async()=>{
      const {data:{items}}=await api.request('/videos',{
        params:{
          part:'contentDetails,statistics',
          id:_id,
        }
      })
      setDuration(items[0]?.contentDetails.duration);
      setViews(items[0]?.statistics.viewCount)
      // console.log(items[0]);
    }
    extraDetails();
  },[id]);

  useEffect(()=>{
    const channelDetails=async()=>{
      const {data:{items}}=await api.request('/channels',{
        params:{
          part:'snippet',
          id:channelId,
        }
      })
      setChannel(items[0]?.snippet.thumbnails.medium.url)
      // console.log(items[0]);
    }
    channelDetails();
  },[channelId]);

  const _duration_time=moment.utc(moment.duration(duration).asSeconds()*1000).format("mm:ss")

  return (
    <div className='video'>
      <div className='thumbnail' onClick={watchIt}>
        <LazyLoadImage 
          className='img'
          src={high.url} 
          alt=""
          effect="blur"
        ></LazyLoadImage>
        <span className='duration'>{_duration_time}</span>
      </div>
      <div className='channel'>
          {!channelScreen && <img src={channel} alt=''></img>}
          <div className='title'>
              <span className="Description" onClick={watchIt}>{title}</span>
              <div className='details' onClick={channelLoad}>
                  {!channelScreen && <span>{channelTitle}</span>}
                  <span>{numeral(views).format('( 0 a)').toLocaleUpperCase()} Views • {moment(publishedAt).fromNow()}</span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Video