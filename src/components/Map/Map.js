import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core'; // useMediaQuery is helpfut to make the map responsive
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData}) => {

  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)'); // will be true if the width of the device is > 600px

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{key: "AIzaSyBQUFBqePPADZ-5kb-dCty7Jw6-b0fGrTg"}}
        // bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}} 
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
        onChange={e=>
        {
          setCoordinates({lat: e.center.lat, lng: e.center.lng});
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw}) // ne: north east, sw: south west
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {/* we use lat and lng to render the element on the map */}
        {places?.map((place, i) =>(
          <div 
            className={classes.markerContainer} 
            lat={Number(place?.latitude)}
            lng={Number(place?.longitude)}
            key={i}
            >
              {
                !isDesktop ? 
                (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ): (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                    <img
                      className={classes.pointer}
                      src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                      alt={place.name}
                    />
                    <Rating size="small" value={Number(place.rating)} readOnly />
                  </Paper>
                )
              }
          </div>
        ))}
        {weatherData?.list?.map((data,i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
          </div>
        ))}

      </GoogleMapReact>
    </div>
  )
};


export default Map;
