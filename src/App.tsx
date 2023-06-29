import './App.css';
import GoogleMapReact from 'google-map-react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar } from '@mui/material';
import { useState } from 'react';

const START_HOUR = 9
const END_HOUR = 18

const DAY_1 = new Date(`06/30/2023 ${START_HOUR}:00:00`)
const DAY_2 = new Date(`07/01/2023 ${START_HOUR}:00:00`)
const DAY_3 = new Date(`07/02/2023 ${START_HOUR}:00:00`)


const CarIcon = ({heading}: { heading: number }) => <img style={{ transform : `translate(-25px, -25px) rotate(${heading}deg) scale(1,-1)` }} width="50px" src="./car.png" alt='car'></img>;

function dayIsActive(day: Date, now: Date) {
  return (
    day.getDate() === now.getDate() &&
    day.getMonth() === now.getMonth() &&
    now.getHours() >= START_HOUR &&
    now.getHours() < END_HOUR
  )
}

function getDayStatus(day: Date, now: Date) {
  if (now < day) {
    return 'grey' //not active
  }

  if (dayIsActive(day, now)) {
    return '#ffd700'
  }

  return '#90EE90'
}

function calculateTimeRemain(now: Date) {

  if (![
    dayIsActive(DAY_1, now),
    dayIsActive(DAY_2, now),
    dayIsActive(DAY_3, now)
  ].some(Boolean)) {
    return "Race is not active"
  }
  const hoursLeft =  END_HOUR - now.getHours() - (now.getMinutes() === 0 ? 0 : 1)
  const minsLeft = now.getMinutes() === 0 ? 0 : 60 - now.getMinutes()

  return `${hoursLeft} hours ${minsLeft} mins`
}

function App() {
  const [now, setNow] = useState(new Date())
  setInterval(() => {
    setNow(new Date())
  }, 500)
  const defaultProps = {
    center: {
      lat: 38.93040387746305,
      lng: -95.67559895270186
    },
    zoom: 15.7
  };

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent'>
        <Toolbar variant="dense">
          <img src='logo192.png' height='50px' alt='logo' />
          <Typography variant="h6" color="inherit" component="div">
            Solar Gators Status
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container height={"95%"}>
      <Grid item md={3} xs={12}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: String(process.env.REACT_APP_GOOGLE_MAPS_KEY) }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={{
            mapTypeId: "satellite",
            disableDefaultUI: true,
            mapId: "satellite"
          }}
        >
          <CarIcon
            heading={120}
          />
        </GoogleMapReact>
      </Grid>
      <Grid md={9} xs={12}>
        <div style={{ margin: "10px" }}>
          <svg width="100%" viewBox="0 0 200 40">
            <circle cx="50" cy="10" r="6" fill={getDayStatus(DAY_1, now)} id="day1"/>
            <text x="50" y="20" textAnchor="middle" fontSize="3px" fontWeight="bold" >Day 1</text>
            <circle cx="100" cy="10" r="6" fill={getDayStatus(DAY_2, now)} id="day2"/>
            <text x="100" y="20" textAnchor="middle" fontSize="3px" fontWeight="bold" >Day 2</text>
            <circle cx="150" cy="10" r="6" fill={getDayStatus(DAY_3, now)} id="day3"/>
            <text x="150" y="20" textAnchor="middle" fontSize="3px" fontWeight="bold" >Day 3</text>
          </svg>

          <div style={{ margin: 'auto', width: 'fit-content' }}>
            <Typography variant='h3' marginTop={"20px"}>
              <strong>Remaining today:</strong> {calculateTimeRemain(now)}
            </Typography>

            <Typography variant='h3' marginTop={"40px"}><strong>Laps:</strong> 0</Typography>

            <Typography variant='h3' marginTop={"40px"}><strong>Driven:</strong> 0 miles</Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  </>
}

export default App;
