import React from 'react'

//Calculando celcius para Fehrenheit
export function CalculateCelsiusForFahrenheit(temp) {
    return (temp * 1.8) + 32
}

//Calculando metro para kilometro
export function CalculateMetroToKilometer(value) {
    let valueCalculate = value * 3.6
    return valueCalculate.toFixed(2)
}

export const weatherIcons = {
    'Sand': 'M',
    'Tornado': 'M',
    'Ash': 'M',
    'Squall': 'M',
    'Snow': 'W',
    'Rain': 'Q',
    'Drizzle': 'R',
    'Thunderstorm': 'O',
    'Clouds': 'Y',
    'Clear': 'B',
    'Mist': 'M',
    'Smoke': 'M',
    'Haze': 'M',
    'Dust': 'M'
}

//Informações adicionais de tempo
export function getInfoAditional (i, info) {
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