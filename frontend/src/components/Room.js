import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = (props) => {

    const [roomInfo, setRoomInfo] = useState({
        votesToSkip: 2,
        guestCanPause: false, 
        isHost: false,
    })

    const { roomCode } = useParams();

    useEffect(() => {
        fetch('/api/get-room?code=' + roomCode)
        .then((res) => res.json())
        .then((data) => {
            setRoomInfo({
                ...roomInfo,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    }, [roomCode, setRoomInfo]);

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {roomInfo.votesToSkip}</p>
            <p>Guest Can Pause: {roomInfo.guestCanPause.toString()}</p>
            <p>is host: {roomInfo.isHost.toString()}</p>
        </div>
    )
}

export default Room