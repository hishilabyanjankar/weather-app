import React, { Component } from 'react';
import axios from 'axios';
import background from '../image/background.jpg';
class Weather extends Component {
    state={
        weatherData:[],
       date:""
        
    }

    componentDidMount(){
        this.getDate(); 
    }

    getDate =() => {
        var date = new Date().toDateString();
        this.setState({
            date:date
        });
        
    }
    getDataFromAPI =(city, country) => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid=8d2de98e089f1c28e1a22fc19a24ef04')
        .then ((response) => {
            this.setState({
                weatherData:response.data
                
            })
           
            const {country, sunrise, sunset} = response.data.sys;
            const {temp_min, temp_max, humidity, temp} = response.data.main;
            const {lon, lat} = response.data.coord;          
            const {main}= response.data.weather[0];
            const {name}= response.data;
            // const {icon}=response.situaation;

        
            this.setState({
                weatherData:{
                    city_name:name,
                    country_name:country,
                    // icon:weatherData[0].icon,
                    temperature_minimum:(temp_min -273.15).toFixed(2),
                    temperature_maximum:(temp_max -273.15).toFixed(2),
                    sunrise_hours: (new Date(sunrise * 1000)).getHours(),
                    sunrise_minute:(new Date(sunrise * 1000)).getMinutes(),
                    sunset_hours: (new Date(sunset * 1000)).getHours(),
                    sunset_minute:(new Date(sunrise * 1000)).getMinutes(),
                    humidity:humidity,
                    situation: main,
                    longitude: (lon).toFixed(2),
                    latitude:(lat).toFixed(2),
                    temperature: (temp-273.15).toFixed(),   
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
    
    }
    handleChange(e){
        let{name, value} = e.target;
        let{weatherData} = this.state;
        weatherData[name] = value;
        this.setState({
            weatherData
            
        })
    
    }
   
     render(){
        const {date} = this.state;
        return(
          <div className
            style={{
              background: `url(${background})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}> 
            <nav class="navbar navbar-expand-sm bg-lignt  justify-content-center">
              <h1><p>Weather Information</p></h1>
            </nav>
            <div className="container-fluid pt-5">
              <div className="row">
                <div className="col-md-3">
                  <h3><p>{this.state.weatherData.city_name}, {this.state.weatherData.country_name}</p></h3>
                  <h5><p>{date}</p></h5>
                  {/* <p className="pl-5 pt-5"><img alt='weather icon' src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} /></p> */}
                  <h4><p className="pl-5 pt-5">{this.state.weatherData.situation}</p></h4>
                  
                </div>
                <div className="col-md-6">
                  <h1 class="display-1"><p className="text-center p-5">{this.state.weatherData.temperature}°C</p></h1>     
                </div>
                <div className="col-md-3">
                  <form>
                    <div className="form-group">
  	    	            <label for="country"><b>Country Name:</b></label>
                        <input  value={this.state.weatherData.country}
                                onChange={(e)=>this.handleChange(e)}
                                type="text" 
                                className="form-control"  
                                id="country" 
                                name="country"
                                placeholder="Country Name" 
                        />
                    </div> 
                    <div className="form-group">
  	    	            <label for="city"><b>City Name:</b></label>
                        <input  value={this.state.weatherData.city}
                                onChange={(e)=>this.handleChange(e)}
                                type="text" 
                                className="form-control" 
                                id="city" 
                                name="city"
                                placeholder="City Name" 
                        />
                    </div> <br></br>
                    <button type="button" className="btn btn-info" onClick={() =>this.getDataFromAPI(this.state.weatherData.city, this.state.weatherData.country)}><b>Weather Details</b></button> 
                  </form>
                </div>
              </div>
            </div>
            <div className="container-fluid py-5">
              <div className="card-deck pt-5">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Mininum Temperature</p></h5>
                    <p>{this.state.weatherData.temperature_minimum}°C</p>
                  </div>
                </div>
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Maximum Temperature</p></h5>
                    <p>{this.state.weatherData.temperature_maximum}°C</p>
                  </div>
                </div>
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Humidity</p></h5>
                    <p>{this.state.weatherData.humidity}%</p>
                  </div>
                </div>
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Latitude</p></h5>
                    <p>{this.state.weatherData.latitude}°N</p>
                  </div>
                </div>
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Longitude</p></h5>
                    <p>{this.state.weatherData.longitude}°E</p>
                  </div>
                </div>
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Sunrise</p></h5>
                    <p>{this.state.weatherData.sunrise_hours}:{this.state.weatherData.sunrise_minute} A.M.</p>
                  </div>
                </div>
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h5><p>Sunset</p></h5>
                    <p>{this.state.weatherData.sunset_hours}:{this.state.weatherData.sunset_minute} P.M.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
     }
}
export default Weather;