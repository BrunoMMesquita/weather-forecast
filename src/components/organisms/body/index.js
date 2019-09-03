import React, { Component } from 'react'

import './style.less'

import { CalculateCelsiusForFahrenheit, CalculateMetroToKilometer, iconsDictionary } from '../../../utils'

import { getWeather } from '../../../services'
export class Body extends Component {
  state = {
    weatherInformation: '',
    isCelsius: true,
    isLoading: true,
    days : ['HOJE', 'AMANHÃ', 'DEPOIS DE AMANHÃ'],
    today : '',
    tomorrow: '',
    afterTomorrow: ''
  }

  componentDidUpdate (prevProps, prevState) {
    const { props, state } = this

    // Fetch weather information when find the user location
    if (prevProps.city !== props.city) {
      this.setWeatherInformation()
    }

    // Set gradient background by thermal sensation
    if (prevState.weatherInformation !== state.weatherInformation) {
      this.props.setBackground(state.weatherInformation.list[0].main.temp)
    }
  }

  toggleTempUnit = () => {
    const { isCelsius } = this.state
    this.setState({ isCelsius: !isCelsius })
  }


  async setWeatherInformation () {
    this.setState({ isLoading: true })
    const weatherInformation = await getWeather(this.props.city)
    this.setState({
      weatherInformation,
      isLoading: false,
    })

    this.setState({
      today: this.getTemp(),
      tomorrow: this.getTemp(1),
      afterTomorrow: this.getTemp(2)
    })  
  }

  getTemp = (n = 0) => {
    const { weatherInformation, isCelsius } = this.state
    const today = new Date()
    const date = new Date(today.setDate(today.getDate() + n))

    for (const item of weatherInformation.list) {
      const itemDate = item.dt_txt ? new Date(item.dt_txt) : new Date()
      if (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      ) {
        if (isCelsius) {
          return item.main.temp
        } else {
          return CalculateCelsiusForFahrenheit(item.main.temp)
        }
      }
    }
  }

  renderTempInfo = (temp, i) => {
    const { weatherInformation, days} = this.state
    const todayInfo = weatherInformation && weatherInformation.list[0]
    return temp && (
      <div key={temp} className="row">
        <div className="column">
          {(i === 0 && weatherInformation) && (
            <i data-icon={iconsDictionary[todayInfo.weather[0].main]} className="icon" />
          )}
        </div>
        <div className="column">
          <strong>{days[i]}</strong>
          <strong onClick={this.toggleTempUnit} className="temp">
            {parseInt(temp)}º{this.state.isCelsius ? 'C' : 'F'}
          </strong>
          {this.renderAdditionalInfo(i, todayInfo)}
        </div>
      </div>
    )
  }

  // Render wind, humidity and pressure information
  renderAdditionalInfo = (i, info) => {
    return i === 0 && (
      <div className="additional-info">
        <strong className="capitalize space-bottom">
          {info.weather[0].description}
        </strong>
        <span>Vento: {CalculateMetroToKilometer(info.wind.speed)}Km/h</span>
        <span>Humidade: {info.main.humidity}%</span>
        <span>Pressão: {info.main.pressure}hPA</span>
      </div>
    )
  }

  render () {
    const { weatherInformation, isLoading, today, tomorrow, afterTomorrow  } = this.state
    const { error } = this.props
    return !error && (
      <div className="main">
        {!!weatherInformation && (
          [today,
            tomorrow,
            afterTomorrow,
          ].map(this.renderTempInfo)
        )}
        {isLoading && (
          <div className="loading">
            Buscando informações...
          </div>
        )}
      </div>
    )
  }
}
