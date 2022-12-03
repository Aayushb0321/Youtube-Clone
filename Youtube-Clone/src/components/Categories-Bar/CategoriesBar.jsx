import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import './CategoriesBar.scss';


const video=require('../../redux-files/actions/video.js');

function CategoriesBar(category) {
  const categories=[
    'All',
    'Gaming',
    'Live',
    'Music',
    'Ranveer Allahbadia',
    'Sadhguru',
    'Shemaroo',
    'Arjit Singh',
    'Stock Market',
    'Linkin Park',
    'Avicii',
    'TVF',
    'Shiva',
    'Anuv Jain',
    'Valorant',
    'Abhi and Niyu'
  ]

  const dispatch=useDispatch();
  const [currentCategory,setcurrentCategory]=useState('All');

  function updatecurrentCategory(value){
    setcurrentCategory(value);
    category=value;
    dispatch(video.getVideosUsingCategories(value));
  }
  return (
    <div className='categories-header'>
      {
        categories.map((value,index)=>{
            return (
              <span
              onClick={()=>updatecurrentCategory(value)}
              key={index}
              className={
                  currentCategory===value?'current':'inactive'
              }
              >{value}</span>
            )
        })
      }
    </div>
  )
}

export default CategoriesBar