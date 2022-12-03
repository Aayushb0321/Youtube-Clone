import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSearchResult} from '../../../redux-files/actions/search.js';
import {Container} from 'react-bootstrap'
import VideosSearch from './_videosSearch/VideosSearch.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';


function SearchScreen() {
  const {query}=useParams();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getSearchResult(query));
  },[query]);

  const {searchResults,loading}=useSelector(state=>state.searchReducer);

  function loadMore(){
    dispatch(getSearchResult(query));
  }
  return (
      <Container>
          <InfiniteScroll dataLength={searchResults.length} next={loadMore} hasMore={true}
          loader={<div className='spinner-border text-danger d-block mx-auto mt-2'></div>} >
              {
                searchResults.map(video=><VideosSearch video={video}></VideosSearch>)
              }
          </InfiniteScroll>
      </Container>
  )
}

export default SearchScreen