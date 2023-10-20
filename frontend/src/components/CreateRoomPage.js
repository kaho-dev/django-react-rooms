import React from 'react';
import {useState} from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, Grid, Typography, FormControl, Radio, RadioGroup, FormControlLabel, FormHelperText } from '@mui/material';

const CreateRoomPage = () => {

  let defaultVotes = 2;

  const [guest, setGuest] = useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });

  const handleVotesChange = (e) => {
    setGuest({
      ...guest,
      votesToSkip: e.target.value, 
    })
  }

  const handleGuestCanPauseChange = (e) => {
    setGuest({
      ...guest,
      guestCanPause: e.target.value === "true" ? true : false,
    })
  }

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: guest.votesToSkip,
        guest_can_pause: guest.guestCanPause
      })
    };

    fetch('/api/create-room', requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));

  }

  return (
    <div className="create-room__main">
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Create A Room
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">
                  Guest Control of Playback State
                </div>
              </FormHelperText>
              <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom" />
                <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <TextField required={true} type="number" onChange={handleVotesChange} default={defaultVotes} inputProps={
                  {
                    min: 1,
                    style: { textAlign: "center" },
                  }
                }/>
                <FormHelperText>
                  <div align="center">Votes Required to Skip Song</div>
                </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
          </Grid>
        </Grid>
    </div>
  )
  


}

export default CreateRoomPage