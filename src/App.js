import React, { Component } from 'react'
import './styles/app.less'

import { getBackgroundBing, getLocation } from './services'

import { Header } from './components/molecules/Header'
import { Body } from './components/organisms/body'

export class App extends Component {
  state = {
    todayBackground: null,
    userLocation: null,
    temperature: ''
  }

  componentDidMount() {
    this.SetBindBackgorund()
    navigator.geolocation.getCurrentPosition(
      this.setUserLocation
    )
  }

  //Aqui define o backgound do bing
  async SetBindBackgorund() {
    const todayBackground = await getBackgroundBing()
    this.setState({ todayBackground })
  }

  setUserLocation = async position => {
    const userLocation = await getLocation(position)
  
    if (userLocation) {
      this.setState({ userLocation })
    } 
  }

  getThermalSensation = (temp) => {
    let temperature = 'environment'

    if (temp < 15) {
      temperature = 'cold'
    } else if (temp > 35) {
      temperature = 'hot'
    }

    this.setState({ temperature })
  }

  render() {
    const {
      todayBackground,
      userLocation,
      temperature
    } = this.state

    return (
      <div
        className="app"
        style={{ backgroundImage: `url(${todayBackground})` }}
      >
        <div id="temperature" className={temperature} />
        <div id="main-content">
          <Header
            userLocation={userLocation}
          />
          <Body
            city={userLocation && userLocation.city}
            setBackground={this.getThermalSensation}
          />
        </div>
      </div>
    )
  }
}
