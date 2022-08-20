export class Weather {
  constructor() {
    this.baseUrl = 'https://dataservice.accuweather.com';
    this.apiKey = 'jCLPUDFqHDZV7369qCF3gfHGutmpcVKG';
  }

  async getLocation(inpt) {
    const data = await fetch(`${this.baseUrl}/locations/v1/cities/search?q=${inpt}&apikey=${this.apiKey}`);
    const response = await data.json();
    const { Key, EnglishName } = response[0];
    return {
      Key,
      EnglishName,
    };
  }

  async getWeatherCondition(key) {
    const data = await fetch(`${this.baseUrl}/currentconditions/v1/${key}?apikey=${this.apiKey}&language=id-id`);
    const response = await data.json();
    const { WeatherText, IsDayTime, WeatherIcon } = response[0];
    const temp = response[0].Temperature.Metric.Value;
    return {
      WeatherText,
      IsDayTime,
      temp,
      WeatherIcon,
    };
  }
}
