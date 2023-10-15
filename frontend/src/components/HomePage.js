import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";


const HomePage = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<h1>This is the Home Page</h1>} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
            </Routes>
        </Router>
    </div>
  )
}

export default HomePage