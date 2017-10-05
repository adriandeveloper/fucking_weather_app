const rootURL = 'http://api.openweathermap.org/data/2.5/weather?appid=5b82a93fe35f83ebdd2d62f40355f77c'

export const fetchWeather = (lat, lon) => {
  const url = rootURL+'&lat='+lat+'&lon='+lon+'&units=imperial'
  console.log(url);
  
  // fetch is used for making requests to the internet
  // fetch takes in a url and returns a promise
  // use the method then to tell our promise what to do when it returns
  return fetch(url)
    .then(res => res.json())
    .then(json => ({
      temp: json.main.temp,
      weather: json.weather[0].main
    }))
}