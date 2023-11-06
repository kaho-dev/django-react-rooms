import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';


const Room = (props) => {

    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState({
        votesToSkip: 2,
        guestCanPause: false, 
        isHost: false,
    })

    const { roomCode } = useParams();

    useEffect(() => {
        fetch('/api/get-room?code=' + roomCode)
        .then((res) => {
            if (!res.ok) {
                props.leaveRoomCallback();
                navigate('/');
            }
            return res.json();
        })
        .then((data) => {
            setRoomInfo({
                ...roomInfo,
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            })
        })
    }, [roomCode, setRoomInfo]);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch('/api/leave-room', requestOptions)
        .then((res) => {
            props.leaveRoomCallback();
            navigate('/');
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                Votes: {roomInfo.votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                Guest Can Pause: {roomInfo.guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                is host: {roomInfo.isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
            </Grid>

        </Grid>
    )
}

export default Room