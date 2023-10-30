import React, { useState, useEffect } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { FrontPage } from './FrontPage';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
    Navigate,
} from "react-router-dom";


const HomePage = () => {

    const [roomInfo, setRoomInfo] = useState({
        roomCode: null,
    });

    useEffect(() => {
        (async () => {
            const response = await fetch('/api/user-in-room');
            const data = await response.json();
            setRoomInfo({
                roomCode: data.code
            });
        })();
    }, []);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={roomInfo.roomCode ? (<Navigate replace to={`/room/${roomInfo.roomCode}`} />) : (<FrontPage />)} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    )
}

export default HomePage