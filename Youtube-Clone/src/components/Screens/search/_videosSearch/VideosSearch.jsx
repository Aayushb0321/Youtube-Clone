import React, { useEffect, useState } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import {useNavigate } from 'react-router-dom'
import './VideosSearch.scss'
import { useDispatch, useSelector } from 'react-redux'
const api=require('../../../../axios/api.js');
const auth=require('../../../../redux-files/actions/auth.js');



function VideosSearch ({ video}){
   const {
      id,
      snippet: {
         channelId,
         channelTitle,
         description,
         title,
         publishedAt,
         thumbnails,
         resourceId,
      },
   } = video

   const isVideo = !(id.kind === 'youtube#channel')

   const [views, setViews] = useState(null);
   const [duration, setDuration] = useState(null);
   const [channelVideoCount, setChannelVideoCount] = useState(null);
   const [subscriberCount,setsubscriberCount]=useState(null);
   const [channel,setChannel]=useState('');

   const accessToken=useSelector(state=>state.auth.accessToken);
   const dispatch=useDispatch();

   useEffect(() => {
      const get_video_details = async () => {
         const {
            data: { items },
         } = await api.request('/videos', {
            params: {
               part: 'contentDetails,statistics',
               id: id.videoId,
            },
         })
         setDuration(items[0].contentDetails.duration)
         setViews(items[0].statistics.viewCount)
      }
      if (isVideo) get_video_details()
   }, [id, isVideo])

   useEffect(() => {
      const get_channel_icon = async () => {
         const {
            data: { items },
         } = await api.request('/channels', {
            params: {
               part: 'snippet,contentDetails,statistics',
               id: channelId,
            },
         })
         setChannelVideoCount(items[0].statistics.videoCount);
         setsubscriberCount(items[0].statistics.subscriberCount);
         setChannel(items[0].snippet.thumbnails.medium.url);
      }
      get_channel_icon();
   }, [channelId])

   const _duration = moment.utc(moment.duration(duration).asSeconds() * 1000).format('mm:ss')

   const navigate = useNavigate()

   const _channelId = resourceId?.channelId || channelId

   function performLogin(){
      dispatch(auth.Login());
    }

   const watchIt = () => {
      // console.log(id);
      
      if(accessToken!=null){
         isVideo
            ? navigate(`/watch/${id?.videoId}/${_channelId}`)
            : navigate(`/channel/${_channelId}`)
      }else{
         performLogin();
      }
   }

   return (
      <div className='Recommend' onClick={watchIt}>
        <div className={isVideo? '_thumbnail' : '_thumbnailchannel'}>
          <LazyLoadImage 
            className={isVideo?'image':'_channel'}
            src={thumbnails?.medium?.url} 
            alt=""
            effect="blur"
          >
          </LazyLoadImage>
          {isVideo && <span className='_duration'>{_duration}</span>}
        </div>
        <div className='desc'>
            <span className='title'>
                  {title}
            </span>
            {isVideo && <span className="channel">
                <span className='detail'> 
                    {numeral(views).format('( 0a)').toLocaleUpperCase()} views • {moment(publishedAt).fromNow()}
                </span>
                <span className='name'>
                     <LazyLoadImage 
                        className={'image'}
                        src={channel} 
                        alt=""
                        effect="blur"
                     >
                     </LazyLoadImage>
                    {channelTitle}
                </span>
                <span className='description'>
                     {description}
                </span>
            </span>}
            {
               !isVideo && <span className="channel">
                  <span className='detail'> 
                     {numeral(subscriberCount).format('( 0 a)').toLocaleUpperCase()} subscribers • {channelVideoCount} videos
                  </span>
                  <span className='description'>
                     {description}
                  </span>
               </span>
            }
        </div>
    </div>
   )
}

export default VideosSearch