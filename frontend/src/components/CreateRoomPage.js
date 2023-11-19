import React from 'react';
import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, FormControl, Radio, RadioGroup, FormControlLabel, FormHelperText, Collapse, Alert } from '@mui/material';



const CreateRoomPage = (props) => {

  const defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {}
  }

  let navigate = useNavigate();

  const [guest, setGuest] = useState({
    guestCanPause: props.guestCanPause,
    votesToSkip: props.votesToSkip,
    errorMsg: "",
    successMsg: ""
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
    .then((data) => navigate('/room/' + data.code));

  }

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: guest.votesToSkip,
        guest_can_pause: guest.guestCanPause,
        code: props.roomCode
      })
    };
    

    fetch('/api/update-room', requestOptions)
    .then((response) => {
      if (response.ok) {
        setGuest({
          ...guest,
          successMsg: "Room updated successfully!"
        })
      } else {
        setGuest({
          ...guest,
          errorMsg: "Room did not update successfully..."
        })
      }
      props.updateCallback();
    });
  }

  const title = props.update ? 'Update Room' : 'Create a Room';

  const renderCreateButton = () => {
    return(
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create a Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    );
  }

  const renderUpdateButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>Update Room</Button>
      </Grid>
    )
  }

  return (
    <div className="create-room__main">
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Collapse
              in={guest.errorMsg != "" || guest.successMsg != ""}
            >
              {guest.successMsg != "" ? (
                <Alert
                  severity="success"
                  onClose={() => {
                    setGuest({
                      ...guest, 
                      successMsg: "" 
                    });
                  }}
                >
                  {guest.successMsg}
                </Alert>
              ) : (
                <Alert
                  severity="error"
                  onClose={() => {
                    setGuest({
                      ...guest, 
                      errorMsg: "" 
                    });
                  }}
                >
                  {guest.errorMsg}
                </Alert>
              )}
            </Collapse>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <span align="center">
                  Guest Control of Playback State
                </span>
              </FormHelperText>
              <RadioGroup row defaultValue={props.guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
                <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom" />
                <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <TextField required={true} type="number" onChange={handleVotesChange} defaultValue={guest.votesToSkip} inputProps={
                  {
                    min: 1,
                    style: { textAlign: "center" },
                  }
                }/>
                <FormHelperText>
                  <span align="center">Votes Required to Skip Song</span>
                </FormHelperText>
            </FormControl>
          </Grid>
            {props.update ? renderUpdateButton() : renderCreateButton()}
        </Grid>
    </div>
  )
  


}

export default CreateRoomPage