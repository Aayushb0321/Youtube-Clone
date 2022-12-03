import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import Comment from './Comment/Comment';
import './Comments.scss';
import { useSelector } from 'react-redux/es/exports';

const {getCommentsUsingVideoId,addComments} =require('../../../redux-files/actions/comment.js');

function Comments({id,channelId}) {
  const dispatch=useDispatch();

  const [text,setComment]=useState("");
  
  function addComment(event){
    event.preventDefault();
    if(text.length===0)return 0;
    dispatch(addComments(id,text,channelId));
    setComment('');
  }
  
  const {_meta,commentCount}=useSelector(state=>state.video_meta);

  const {comment}=useSelector(state=>state.comments);

  const _comments_List=comment?.map(comment=>comment?.snippet.topLevelComment.snippet);
  const profile=useSelector(state=>state.auth.user?.picture);

  function loadMoreComments(){
    dispatch(getCommentsUsingVideoId(id));
  }
  return (
    <div className='comments'>
        <h6>{_meta?.statistics?.commentCount} Comments</h6>
        <div className='_form d-flex w-100 my-2'>
            <img 
              src={profile.toString()}
              alt="" 
            />
            <form onSubmit={addComment} className="flex-grow-1">
                <input type="text" className='flex-grow-1' placeholder='Add a comment...' value={text} onInput={event=>setComment(event.target.value)}></input>
                <button className='comment-button border-0 p-2'>COMMENT</button>
            </form> 
        </div>
        <InfiniteScroll dataLength={_comments_List.length} next={loadMoreComments} hasMore={commentCount>_comments_List.length} >
          <div className='_comments_List'>
            {
              _comments_List.map((_comment,key)=>{
                  // console.log(key);
                  return <Comment _comment={_comment} id={key}></Comment>
              })
            }

          </div>
        </InfiniteScroll>
    </div>
  )
}

export default Comments