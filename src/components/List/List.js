import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({places, childClicked, loading, type, setType, rating, setRating}) => {

  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);  // references for all the elements(places)
  
  // we want a reference to each element in the array  
  useEffect(()=>
  {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
    // setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places])

  // if(!places) return <div></div>; // i added this line of code
  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels & Attraction around you</Typography>
      { loading ? 
      (
        <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div>
      ) : (
        <React.Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel >Restaurents</InputLabel>
            <Select
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value={"restaurants"}>Restaurants</MenuItem>
              <MenuItem value={"hotels"}>Hotels</MenuItem>
              <MenuItem value={"attractions"}>Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel >Rating</InputLabel>
            <Select
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={`${classes.list} sss`}>
            {places?.map((place, i) =>(
              <Grid item key={i} xs={12}> {/*from extra small screen (0px) to above, take the whole width*/}
                <PlaceDetails 
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </div>
  )
};

export default List;
