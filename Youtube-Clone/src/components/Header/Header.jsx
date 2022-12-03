import React, { useState } from 'react'
import {FaBars} from "react-icons/fa"
import {AiOutlineSearch} from "react-icons/ai"
import {MdNotifications,MdApps} from "react-icons/md"
import './Header.scss'
import {YoutubeLogo} from '../../icons/AccessFile';
import Login from '../Login/Login'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header({switchSidebar}) {
  const accessToken=useSelector(state=>state.auth.accessToken);
  const profile=useSelector(state=>state.auth.user?.picture);

  const [searchText,setSearchText]=useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  function searchResult(event){
    event.preventDefault();
    dispatch({type:'SEARCH_ELEMENT_RESET'});
    navigate(`/search/${searchText}`);
    setSearchText('');
  }
  function Home(event){
    event.preventDefault();
    navigate(`/`);
  }
  return (
    <div className='header'>
      {/* {console.log(accessToken)} */}
      <FaBars className='Header-Bar' size={18} onClick={switchSidebar}></FaBars>
      <img 
        src={YoutubeLogo} 
        alt="YouTube" 
        className="youtube_logo"
        onClick={Home} 
      />

      <form onSubmit={searchResult}>
        <input type="text" placeholder='Search' value={searchText} onInput={(event)=>setSearchText(event.target.value)}/>
        {searchText!=="" && <span className='clear' onClick={()=>setSearchText('')}>X</span>}
        <button type='submit'>
            <AiOutlineSearch size={22}/>
        </button>
      </form>

      <div className="_icons">
        <MdNotifications size={22}/>
        <MdApps size={22}/>
        {accessToken==null && <Login></Login>}
        {accessToken!=null && <img src={profile?.toString()} alt="avatar" className="avatar" />}
      </div>
    </div>
  )
}

export default Header