import React, {useState} from 'react';
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RoomJoinPage = () => {

  const [room, setRoom] = useState({
    roomCode: "",
    error: "",
  });

  const handleTextFieldChange = e => {
    room.setRoom({
      ...room,
      roomCode: e.target.value
    })
  }

  const roomButtonPress = () => {
    console.log(room.roomCode)
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
              //value={room.roomCode}
              FormHelperTextProps={room.error} 
              variant="outlined"
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