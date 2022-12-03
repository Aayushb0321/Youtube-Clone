import moment from 'moment';
import React, { useState } from 'react'
import './Comment.scss';
import ShowMore from "react-simple-show-more"


function Comment({_comment}) {

  const [showMore,setShowMore]=useState(true);

  const {authorDisplayName,authorProfileImageUrl,publishedAt,updatedAt,textDisplay}=_comment;

  return (
    <div className='_comment'>
         <img 
            src={authorProfileImageUrl?authorProfileImageUrl:'https://lh3.googleusercontent.com/a-/AOh14GgXQyvlq1U1_vy_9s1YWpFaOQx8kbmgWPtcAlxkmw=s96-c'}
            alt="" 
         />
         <div className='_body'>
            <p className='_name'>
                {authorDisplayName} <span>{publishedAt!==updatedAt && "(edited)"}{moment(publishedAt).fromNow()}</span>
            </p>
            <p className='_comment'>
                <ShowMore
                  text={textDisplay}
                  length={150}
                  showMoreLabel=""
                  showLessLabel=""
                  tag="p"
                  ellipsis="..."
                  enabled={showMore}
                />
                 <button className='showMoreText' onClick={()=>{
                      setShowMore(!showMore);
                  }}>{showMore?'SHOW MORE':'SHOW LESS'}</button>
            </p>
         </div>
    </div>
  )
}

export default Comment;