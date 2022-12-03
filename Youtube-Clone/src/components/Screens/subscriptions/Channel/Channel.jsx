import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import './Channel.scss';
const api=require('../../../../axios/api.js');

function Channel({channels}) {
    const {
        snippet: {
            channelId,
            description,
            title,
            thumbnails,
            resourceId,
        },
    } = channels;

    const navigate=useNavigate();
    const [channelVideoCount, setChannelVideoCount] = useState(null);
    const [subscriberCount,setsubscriberCount]=useState(null);

    const _channelId = resourceId?.channelId || channelId;

    useEffect(() => {
        const get_channel = async () => {
            const {
                data: { items },
            } = await api.request('/channels', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: _channelId,
                },
            })
            setChannelVideoCount(items[0].statistics.videoCount);
            setsubscriberCount(items[0].statistics.subscriberCount);
        }
        get_channel();
        // console.log('here');
    }, [_channelId]);

    const channelLoad = () => {
        navigate(`/channel/${_channelId}`)
    }
    return (
        <div className='Recommend' onClick={channelLoad}>
            <div className='_thumbnailchannel'>
            <LazyLoadImage 
                className='_channel'
                src={thumbnails?.medium?.url} 
                alt=""
                effect="blur"
            >
            </LazyLoadImage>
            </div>
            <div className='desc'>
                <span className='title'>
                    {title}
                </span>
                <span className="channel">
                    <span className='detail'> 
                        {numeral(subscriberCount).format('( 0 a)').toLocaleUpperCase()} subscribers • {channelVideoCount} videos
                    </span>
                    <span className='description'>
                        {description}
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Channel