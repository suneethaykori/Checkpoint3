import React, { Component } from 'react';

class Today extends Component {
  constructor(props){
    super(props)
  }

  state = {
    condition: '',
    temp : 0,
    mintemp : 0,
    maxtemp: 0,
    humidity: 0,
  }

  /*componentDidMount() {
    const apiurl="https://api.openweathermap.org/data/2.5/weather?q="+this.props.cityname+"&APPID=f981b5331f921feabfdb4bd00d04da04";
    fetch(apiurl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          console.log(result.main.temp)
          this.setState({
            temp:result.main.temp,
            mintemp: result.main.temp_min,
            maxtemp: result.main.temp_max,
            humidity: result.main.humidity,
            condition: result.weather[0].description})
          console.log(this.state.temp)
        },
        (error) => {
          this.setState({
            temp:0,
            mintemp: 0,
            maxtemp: 0,
            humidity: 0,
            condition: "Failed to get weather data"});
            console.log("The city was not found!!!!!!!!!!!!!!!!!!")
        }
      )
  }*/

  componentDidMount() {
    const apiurl="https://api.openweathermap.org/data/2.5/weather?q="+this.props.cityname+"&APPID=f981b5331f921feabfdb4bd00d04da04";
    fetch(apiurl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

          if(result.cod == '200'){
            console.log("The code is 200" + result.main.temp)
            this.setState({
              temp:result.main.temp,
              mintemp: result.main.temp_min,
              maxtemp: result.main.temp_max,
              humidity: result.main.humidity,
              condition: result.weather[0].description})
              console.log(this.state.temp);
          }
          else{
            console.log("The code is " + result.cod)
            this.setState({
              temp:255.372,
              mintemp: 255.372,
              maxtemp: 255.372,
              humidity: 0,
              condition: "City Not Found!!!"})
          }
        },
        (error) => {
          this.setState({
            temp:0,
            mintemp: 0,
            maxtemp: 0,
            humidity: 0,
            condition: "Failed to get weather data"});
            console.log("The city was not found!!!!!!!!!!!!!!!!!!")
        }
      )
  }


  render(){
    //convert the temps to F from Kelvin
    const tempf = Math.round(9/5 * (this.state.temp - 273) + 32)
    const mintempf = Math.round(9/5 * (this.state.mintemp - 273) + 32)
    const maxtempf = Math.round(9/5 * (this.state.maxtemp - 273) + 32)

    //Change the color of background based on temp
    let color
    if(tempf < 30)
      color = 'very-cold'
    else if (tempf < 60)
      color = 'cold'
    else if (tempf < 75)
      color = 'normal'
    else if (tempf <90)
      color = 'warm'
    else if (tempf< 180)
      color = 'very-warm'

    return(
      <div>
        <p className="city">{this.props.cityname} </p>
        <div className={"wdata " +color}>
          <div>
            <p className="temp"> {tempf} F</p>
          </div>
          <div className="cond">
            <h1> {this.state.condition} </h1>
            <h3> Low - {mintempf} F   |   High - {maxtempf} F </h3>
            <h3> Humidity - {this.state.humidity}%</h3>
          </div>
        </div>
      </div>

    );
  }
}

export default Today;
