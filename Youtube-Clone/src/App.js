import { Container } from 'react-bootstrap';
import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Home from './components/Screens/home/home.jsx';
import Watch from './components/Screens/watch/watch.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom';
import Trending from './components/Screens/trending/trending.jsx';
import LikeVideos from './components/Screens/Like Videos/likeVideos.jsx';
import SearchScreen from './components/Screens/search/SearchScreen.jsx';
import Subscriptions from './components/Screens/subscriptions/Subscriptions.jsx';
import Channel from './components/Screens/channel/channel.jsx';
import { useSelector } from 'react-redux';

function App() {

const GenericParentLayout=({Component,login,noSidebar})=>{
    const [sidebar,handleSidebar]=useState(0);
    
    function switchSidebar(){
        handleSidebar(value=>1-value);
    }

    const accessToken=useSelector(state=>state.auth.accessToken);

    return <>
      <Header switchSidebar={switchSidebar} ></Header>
        <div className='app-container'>
            {!noSidebar && <Sidebar className="sidebar" sidebar={sidebar}></Sidebar>}
            {(!login || accessToken)? 
                <Container fluid className='app-main'>
                    {Component}
                </Container> : 
                <Navigate replace to="/"/>}
      </div>
    </>
  }
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={<GenericParentLayout Component={<Home/>}/>} exact></Route>
            <Route path="/Home" element={<GenericParentLayout Component={<Home/>}/>}></Route>
            <Route path="/search/:query" element={<GenericParentLayout Component={<SearchScreen/>}/>}></Route>
            <Route path="/watch/:id/:channel" element={<GenericParentLayout Component={<Watch/>}  noSidebar login/>}></Route>
            <Route path="/trending"  element={<GenericParentLayout  Component={<Trending/>}/>}></Route>
            <Route path="/likevideos"  element={<GenericParentLayout  Component={<LikeVideos/>} login/>}></Route>
            <Route path="/subscriptions"  element={<GenericParentLayout  Component={<Subscriptions/>} login/>}></Route>
            <Route path="/channel/:id"  element={<GenericParentLayout  Component={<Channel/>}/>}></Route>
            <Route path="*" element={<Navigate replace to="/"/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
