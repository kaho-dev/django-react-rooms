import React, {useState} from 'react';
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {

  let navigate = useNavigate();

  const [room, setRoom] = useState({
    roomCode: "",
    errorMsg: "",
    error: false,
  });

  const handleTextFieldChange = (e) => {
    setRoom({
      ...room,
      roomCode: e.target.value
    })
  }

  const roomButtonPress = () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        code: room.roomCode
      })
    };

    fetch('/api/join-room', requestOptions)
    .then((res) => {
      if (res.ok) {
        navigate('/room/' + room.roomCode)
      } else {
        setRoom({
          ...room,
          errorMsg: "Room not found."
        }).catch((error) => {
          console.log(error);
        })
      }
    })

  }

  return (
    <div className="room-join__main"> 
        <Grid container spacing={1}>
          <Grid item xs={12} align="center" >
            <Typography variant="h4" component="h4">
              Join A Room
            </Typography>
          </Grid>
          <Grid item xs={12} align="center" >
            <TextField 
              error={room.error}
              label="code"
              placeholder="Enter a Room Code"
              value={room.roomCode}
              helperText={room.error} 
              variant="outlined"
              onChange={handleTextFieldChange}
            />
          </Grid>
          <Grid item xs={12} align="center" >
            <Button variant="contained" color="primary" onClick={roomButtonPress} >Enter Room</Button>
          </Grid>
          <Grid item xs={12} align="center" >
          <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
          </Grid>
        </Grid>
    </div>
  )

}

export default RoomJoinPage