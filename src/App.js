import React, { Component } from 'react'
import './styles/app.less'

import { getBackgroundBing, getLocation } from './services'

import { Header } from './components/molecules/Header'
import { Body } from './components/organisms/body'

export class App extends Component {
  state = {
    todayBackground: null,
    userLocation: null,
    temperature: '',
    error: false,
  }

  componentDidMount() {
    this.setTodayBackground()
    navigator.geolocation.getCurrentPosition(
      this.setUserLocation,
      this.setUserLocation,
      { timeout: 5000 }
    )
  }

  async setTodayBackground() {
    const todayBackground = await getBackgroundBing()
    this.setState({ todayBackground })
  }

  setUserLocation = async position => {
    let userLocation

    userLocation = await getLocation(position)
    
    if (userLocation) {
      this.setState({ userLocation })
    } else {
      this.setState({ error: true })
    }
  }

  getThermalSensation = (temp) => {
    let temperature = 'normal'

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
      temperature,
      error,
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
            error={error}
          />
          <Body
            city={userLocation && userLocation.city}
            setBackground={this.getThermalSensation}
            error={error}
          />
        </div>
      </div>
    )
  }
}
