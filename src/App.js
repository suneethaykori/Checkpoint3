import React, { Component } from 'react';
//import DropdownList from 'react-widgets/lib/DropdownList';
//import { DropdownList } from 'react-widgets';
// import logo from './logo.svg';
import './App.css';
import Today from './today.js';
import Day5 from './day5.js';
import Day16 from './day16.js';

//let { DropdownList } = ReactWidgets;
//let cities = ['Austin', 'Boston', 'San Fransisco', 'New York', 'Chicago', 'Dallas', 'Los Angeles', 'London', 'Paris', 'Berlin'];


class App extends Component {
  state ={
    forecast: 'today',
    city: 'Austin',
    tempCity: ''
  }

  //Handle the button click
  handleClick(forecastDay){
    //if input is empty, then do nothing
    if(this.state.tempCity === '')
    {
      alert("Please enter the city name");
      return
    }

    this.setState({
      forecast:forecastDay,
      city: this.state.tempCity
    });
  }

  //store the data in input to tempcity
  handleInput(e){
      this.setState({tempCity:e.target.value})
  }

  render() {
    let selection;
    //load the component based on the button clicked
    if(this.state.forecast === 'today')
      selection = <Today key={this.state.city} cityname={this.state.city}/>
    else if(this.state.forecast === '5day')
      selection = <Day5 key={this.state.city} cityname={this.state.city}/>
    else
      selection = <Day16/>
    return (
      <div className="App">
        <input value={this.state.tempCity} onChange={(e) => this.handleInput(e)} placeholder="Enter City"/>
        {/* <DropdownList
          data={cities}
          value={this.state.tempCity}
          onChange={city => this.setState({ city })}
        /> */}

        <button className="butclass" onClick = {() =>this.handleClick('today') }>Weather Today</button>
        <button className="butclass" onClick = {() => this.handleClick('5day')}>5-Day forecast </button>
        {selection}
      </div>
    );
  }
}

export default App;
