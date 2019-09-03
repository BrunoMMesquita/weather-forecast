//Usado para pegar a localização do usuário
export async function getLocation(position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude
    const key = '9835a91bca014aee882640aa75c51939'
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${key}&language=en`

    const request = await fetch(url)
    const response = await request.json()
    return {
        city: response.results[0].components.city,
        state: response.results[0].components.state,
    }
}

//Aqui onde pega a temperatura
export async function getWeather(city) {
    const key = '7ba73e0eb8efe773ed08bfd0627f07b8'
    const url = 'http://api.openweathermap.org/data/2.5/'
    // Fetch today weather information
    const TODAY_RAW_API_URL = `${url}weather?q=${city}&units=metric&lang=pt&APPID=${key}`
    // Fetch ahead weather information
    const AHEAD_RAW_API_URL = `${url}forecast?q=${city}&units=metric&cnt=25&lang=pt&APPID=${key}`

    const todayRequest = fetch(TODAY_RAW_API_URL)
    const aheadRequest = fetch(AHEAD_RAW_API_URL)

    const [todayRawResponse, aheadRawResponse] = await Promise.all([todayRequest, aheadRequest])

    const todayResponse = await todayRawResponse.json()
    const aheadResponse = await aheadRawResponse.json()

    aheadResponse.list.unshift(todayResponse)

    return aheadResponse
}

//Usado para pegar o backgound do Bing
export async function getBackgroundBing() {
    const url_api = 'https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR'
    const url_bing = 'https://www.bing.com'

    const request = await fetch(url_api)
    const response = await request.json()
    console.log(response)
    return url_bing + response.images[0].url
}



