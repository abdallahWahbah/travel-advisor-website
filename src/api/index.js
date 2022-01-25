import axios from "axios";

export const getPlacesData = async (type, sw, ne) =>
{
  // if(bounds === null) return;
  try
  {
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, 
    {  // response.data.data // deconstructure the o/p 2 times
      params: {
        bl_latitude: sw.lat, // bottom left,  // sw: south west, ne: north east
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': '394334c6a5mshf41a9a7a42290dbp1a5126jsnaf94a6d526ab'
      }
    })
    return data;
  }
  catch(error)
  {
    console.log(error);
  }
}