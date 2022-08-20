export class Weather {
  constructor() {
    this.baseUrl = 'https://dataservice.accuweather.com';
    this.apiKey = 'jCLPUDFqHDZV7369qCF3gfHGutmpcVKG';
  }

  async getLocation(inpt) {
    const data = await fetch(`${this.baseUrl}/locations/v1/cities/search?q=${inpt}&apikey=${this.apiKey}`);
    const response = await data.json();
    const key = response[0].Key;
    const location = response[0].EnglishName;
    return {
      key,
      location,
    };
  }

  async getWeatherCondition(key) {
    const data = await fetch(`${this.baseUrl}/currentconditions/v1/${key}?apikey=${this.apiKey}&language=id-id`);
    const response = await data.json();
    const weatherText = response[0].WeatherText;
    const dataDay = response[0].IsDayTime;
    const temp = response[0].Temperature.Metric.Value;
    const icon = response[0].WeatherIcon;
    return {
      weatherText,
      temp,
      icon,
      dataDay,
    };
  }
}
