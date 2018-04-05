import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {

  state = {
    weather: '',
    temp: '',
    city: 'Austin',
    isLoaded: 'false'
  }

  componentDidMount() {
    const apiHeaders = new Headers()
    apiHeaders.append('appid', '2d85f8e0e0dd87bf9ae4eac8d4a4be56')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},US&appid=2d85f8e0e0dd87bf9ae4eac8d4a4be56&units=imperial`)
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data)
          this.setState({
            isLoaded: true,
            weather: data.weather[0].description,
            temp: data.main.temp

          });
          console.log(this.state)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  splitTime = (time) =>{
    const timeArr = time.split(' ')
     timeArr.pop()
     timeArr.pop()
     return timeArr.join(' ')
  }

  renderInfo = () => {
    const stylesheet = {
      bar: {
        color: 'white',
        width: '75%',
        position: 'fixed',
        left: '40%'
      }
    }

    return (
      <MuiThemeProvider>
        <div>
        <h1>{this.splitTime(Date())}</h1>
          <div className = 'weather'>	
            <h2>{this.state.city}, TX</h2>
            <h2>{(this.state.weather).toUpperCase()}</h2>
            <h2>{`${this.state.temp}°`}</h2>
          </div>
          <div style={stylesheet.bar}>
          <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed={true}
          // style={stylesheet.bar}
        />
        <RaisedButton label="Secondary" secondary={true}/>
        </div>
      </div>
      </MuiThemeProvider>
    )
  }


  render() {
    return (

        <div className ='container'>
        {this.renderInfo()}
        
         </div>
    );
  }
}

export default App;
