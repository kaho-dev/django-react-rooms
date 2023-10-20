import React, {useState} from 'react';
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RoomJoinPage = () => {

  const [room, setRoom] = useState({
    roomCode: "",
    error: ""
  });

  return (
    <div>
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
            FormHelperTextProps={room.error} 
            variant="outlined"
            >
              

            </TextField>
          </Grid>
        </Grid>
    </div>
  )
}

export default RoomJoinPage