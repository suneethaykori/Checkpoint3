import React, { Component } from 'react';

class Day5 extends Component {
  constructor(props){
    super(props)
  }

  state = {
    //Initialize with 5 blank entries
    weather:[]
  }


  componentDidMount() {
    const apiurl="https://api.openweathermap.org/data/2.5/forecast?q="+this.props.cityname+"&APPID=f981b5331f921feabfdb4bd00d04da04";

    fetch(apiurl)
      .then(res => res.json())
      .then(
        (result) => {
          let list =[]
          //Get the data from 5 days in 3 hour increments
          result.list.forEach((item, index)=>{
            list.push({
            temp :  Math.round(9/5 * (item.main.temp - 273) + 32),
            temp_min :  Math.round(9/5 * (item.main.temp_min - 273) + 32),
            temp_max : Math.round(9/5 * (item.main.temp_max - 273) + 32),
            condition: item.weather[0].description,
            date : item.dt_txt})
          })

          //Get the first entry from each day (every 8th entry)
          const newlist = list.filter((item,index)=> {
            if(index%8 === 0)
              return true;
            return false;
          })

          this.setState({
            weather: newlist
          });
        },
        (error) => {
          this.setState({
            weather: [],
          });
        }
      )
  }

  render(){
    //Display the City and the Weather entries in a table
    return(
      <div>
        <p className="city">{this.props.cityname} </p>
        <table id="weather">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Condition</th>
            <th>Temperature</th>
            <th>Min Temp</th>
            <th>Max Temp</th>
          </tr>
          {this.state.weather.map((item,index)=> {
            return(
              <tr>
                <td>{item.date}</td>
                <td>{item.condition}</td>
                <td>{item.temp} F</td>
                <td>{item.temp_min} F</td>
                <td>{item.temp_max} F</td>
              </tr>
            )
          })}
          </tbody>
        </table>

      </div>

    );
  }
}

export default Day5;
