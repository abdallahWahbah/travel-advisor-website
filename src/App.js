import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'; // CssBaseline: normalizes the style
import Grid from '@material-ui/core/Grid';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {getPlacesData} from './api';

const App = () => 
{
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});  // for top right and bottom left corners
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [rating, setRating] = useState("");

  useEffect(()=>
  {
    navigator.geolocation.getCurrentPosition((data =>
    {
      // console.log(data)
      setCoordinates({lat: data.coords.latitude, lng: data.coords.longitude})
    }))
    // navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>
    // {
    //   setCoordinates({lat: latitude, lng: longitude})
    // })
  }, [])

  useEffect(()=>
  {
    const filteredPlaces = places.filter(place => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(()=>
  {
      setLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne).then(data => 
      {
        // console.log(data);
        setPlaces(data);
        setFilteredPlaces([])
        setLoading(false);  
      })
  }, [type, coordinates, bounds])

  return (
    <React.Fragment>
      <CssBaseline/> 
      <Header />

      <Grid container spacing={3} style={{width: "100%"}}> {/* Spacing = padding between items (3 * 8 = 24px) */} {/* Grid is a 12 column system (in width) */}
        <Grid item xs={12} md={4}> 
          {/* for extra small and above screen take the width to be 12 of 12 columns */} {/* for deium and above screen take the width to be 4 of 12 */}
          <List 
            places={filteredPlaces ? filteredPlaces : places} 
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>     
    </React.Fragment>
  )
};

export default App;
