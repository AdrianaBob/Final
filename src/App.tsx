import { Button, Card, CardContent, Chip, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {

  const [cities, setCities] = useState<any>([]);
  const [cityName, setCityName] = useState<string>('');


  useEffect(() => { axios.get('http://localhost:8080/cities').then((response) => setCities(response.data)) }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/cities?name='+ cityName).then((response) => setCities(response.data));
  }, [cityName]);

  
  return (
    <div className="App">
      <img src='https://cdn-icons-png.flaticon.com/512/3845/3845731.png'></img>
      <TextField label= 'City Name' variant='outlined' value={cityName} onChange={(e) => setCityName(e.target.value)}></TextField>
      <List sx={{width: 1}}>
        {cities.map((city: any) => <ListItem sx={{ justifyContent: 'center', paddingLeft: 0, paddingRight: 0 }}>
          <Card sx={{ width: 0.2 }}>
            <CardContent>
              <Typography variant="h6">{city.name}</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Temp: {city.temperature?.temp} °C</Typography>
                  <Typography>Description: {city.temperature?.description}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </ListItem>)}
      </List>;
      
      <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant='outlined' sx={{ margin: 1 }}> Add city</Button>
                            <Button sx={{ color: 'red', margin: 1 }} >Delete City</Button>
                            <Button variant='outlined' sx={{ margin: 1 }}>Edit</Button>
      </Grid>          
    </div>
  );
  
}


    
export default App;
