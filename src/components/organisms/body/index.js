import React, { Component } from 'react'

import './style.less'

import { CalculateCelsiusForFahrenheit, weatherIcons, getInfoAditional } from '../../../utils'

import { getWeather } from '../../../services'

import iconLoading from '../../../assets/images/loading-icon.svg'

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

    if (prevProps.city !== props.city) {
      this.setWeatherInformation()
    }

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

  getInfoTemp = (temp, i) => {
    const { weatherInformation, days} = this.state
    const todayInfo = weatherInformation && weatherInformation.list[0]
    return temp && (
      <div key={temp} className="row">
        <div className="column">
          {(i === 0 && weatherInformation) && (
            <i data-icon={weatherIcons[todayInfo.weather[0].main]} className="icon" />
          )}
        </div>
        <div className="column">
          <strong>{days[i]}</strong>
          <strong onClick={this.toggleTempUnit} className="temp">
            {parseInt(temp)}º{this.state.isCelsius ? 'C' : 'F'}
          </strong>
          {getInfoAditional(i, todayInfo)}
        </div>
      </div>
    )
  }


  render () {
    const { weatherInformation, isLoading, today, tomorrow, afterTomorrow  } = this.state
    return (
      <div className="main">
        {!!weatherInformation && (
          [today,
            tomorrow,
            afterTomorrow,
          ].map(this.getInfoTemp)
        )}
        {isLoading && (
          <div className="icon-loading">
            <img src={iconLoading}></img>
          </div>
        )}
      </div>
    )
  }
}
