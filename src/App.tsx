import './App.css';
import GoogleMapReact from 'google-map-react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Toolbar } from '@mui/material';

const AnyReactComponent = ({ text }: { text: string, lat: number, lng: number }) => <div>{text}</div>;


function App() {
  //38.92640387746305, -95.67349895270186
  const defaultProps = {
    center: {
      lat: 38.92500387746305,
      lng: -95.67349895270186
    },
    zoom: 15.7
  };

  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Solar Gators Status
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container height={"95%"}>
      <Grid item md={3} xs={12}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={{
            mapTypeId: "satellite",
            disableDefaultUI: true,
            mapId: "satellite"
          }}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </Grid>
      <Grid md={9} xs={12}>
        <div style={{ margin: "10px" }}>
          <svg width="100%" viewBox="0 0 200 20">
            <circle cx="50" cy="10" r="3" fill="gray" id="day1"/>
            <text x="50" y="16" textAnchor="middle" fontSize="3px" >Day 1</text>
            <circle cx="100" cy="10" r="3" fill="gray" id="day2"/>
            <text x="100" y="16" textAnchor="middle" fontSize="3px" >Day 2</text>
            <circle cx="150" cy="10" r="3" fill="gray" id="day3"/>
            <text x="150" y="16" textAnchor="middle" fontSize="3px" >Day 3</text>
          </svg>

          <div style={{
            marginLeft: "200px"
          }}>
            <Typography variant='h3' marginTop={"20px"}><strong>Remaining Time:</strong> 9 Hours 10 mins</Typography>

            <Typography variant='h3' marginTop={"40px"}><strong>Laps:</strong> 0</Typography>

            <Typography variant='h3' marginTop={"40px"}><strong>Driven:</strong> 0 miles</Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  </>
}

export default App;
