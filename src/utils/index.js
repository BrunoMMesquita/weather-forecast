export function CalculateCelsiusForFahrenheit(temp) {
    return (temp * 1.8) + 32
}

export function CalculateMetroToKilometer(value) {
    let valueCalculate = value * 3.6
    return valueCalculate.toFixed(2)
}

export const iconsDictionary = {
    'Clouds': 'Y',
    'Clear': 'B',
    'Mist': 'M',
    'Smoke': 'M',
    'Haze': 'M',
    'Dust': 'M',
    'Fog': 'M',
    'Sand': 'M',
    'Tornado': 'M',
    'Ash': 'M',
    'Squall': 'M',
    'Snow': 'W',
    'Rain': 'Q',
    'Drizzle': 'R',
    'Thunderstorm': 'O',
}