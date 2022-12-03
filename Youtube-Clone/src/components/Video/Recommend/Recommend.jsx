import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import './Recommend.scss';
import { useDispatch, useSelector } from 'react-redux';


const api=require('../../../axios/api.js');
const OAuth=require('../../../redux-files/actions/auth.js');

function Recommend({video}) {

  const {id,
      snippet:{
        channelId,
        channelTitle,
        title,
        publishedAt,
        thumbnails
      }
  } =video;
  const [views,setViews]=useState(0);
  const [duration,setDuration]=useState(0);
  const auth=useSelector(state=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();



  useEffect(()=>{
    const _id=id?.videoId||id;
    const extraDetails=async()=>{
      const {data:{items}}=await api.request('/videos',{
        params:{
          part:'contentDetails,statistics',
          id:_id,
        }
      })
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount)
      // console.log(items[0]);
    }
    extraDetails();
  },[id]);

  const _duration_time=moment.utc(moment.duration(duration).asSeconds()*1000).format("mm:ss")

  function watchIt(){
    if(auth.accessToken==null){
      dispatch(OAuth.Login());
    }else{
      navigate(`/watch/${id?.videoId ? id?.videoId:id}/${channelId}`,{state:{id:id,channelId:channelId}});
    }
  }

  return (
    <div className='_Recommend' onClick={watchIt}>
        <div className='thumbnail'>
          <LazyLoadImage 
            className='_image'
            src={thumbnails?.medium?.url} 
            alt=""
            effect="blur"
          >
          </LazyLoadImage>
          <span className='duration'>{_duration_time}</span>
        </div>
        <div className='_desc'>
            <span className='_title'>
                  {title}
            </span>
            <span className="_channel">
                <span className='_name'>
                    {channelTitle}
                </span>
                <span className='_detail'> 
                    {numeral(views).format('( 0 a)').toLocaleUpperCase()} Views • {moment(publishedAt).fromNow()}
                </span>
            </span>
        </div>
    </div>
  )
}

export {Recommend as Recommendation}