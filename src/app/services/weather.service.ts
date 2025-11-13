import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { WeatherData, BetOption } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly API_KEY = environment.weatherApiKey;
  private readonly API_URL = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  getWeatherData(location: string): Observable<WeatherData> {
    // Use mock data if API key is 'demo', otherwise use real API
    if (this.API_KEY === 'demo') {
      return of(this.generateMockWeatherData(location)).pipe(
        delay(500),
        map(data => data)
      );
    }

    // Real API call
    return this.http.get<any>(`${this.API_URL}?q=${location}&appid=${this.API_KEY}&units=metric`).pipe(
      map(response => ({
        location: response.name,
        temperature: response.main.temp,
        condition: response.weather[0].main,
        humidity: response.main.humidity,
        windSpeed: response.wind?.speed ? response.wind.speed * 3.6 : 0, // Convert m/s to km/h
        description: response.weather[0].description
      })),
      catchError(error => {
        console.error('Weather API error:', error);
        // Fallback to mock data on error
        return of(this.generateMockWeatherData(location));
      })
    );
  }

  getBetOptions(weatherData: WeatherData): BetOption[] {
    const temp = weatherData.temperature;
    const condition = weatherData.condition.toLowerCase();
    
    return [
      {
        id: 'temp-above-20',
        label: 'Temperature Above 20°C',
        odds: temp > 20 ? 1.5 : 2.5,
        description: `Bet that temperature will be above 20°C (Current: ${temp}°C)`
      },
      {
        id: 'temp-below-15',
        label: 'Temperature Below 15°C',
        odds: temp < 15 ? 1.5 : 2.5,
        description: `Bet that temperature will be below 15°C (Current: ${temp}°C)`
      },
      {
        id: 'rain',
        label: 'Rain Expected',
        odds: condition.includes('rain') ? 1.3 : 3.0,
        description: `Bet that it will rain (Current: ${weatherData.description})`
      },
      {
        id: 'sunny',
        label: 'Sunny Weather',
        odds: condition.includes('clear') || condition.includes('sun') ? 1.4 : 2.8,
        description: `Bet for sunny weather (Current: ${weatherData.description})`
      },
      {
        id: 'windy',
        label: 'Wind Speed Above 15 km/h',
        odds: weatherData.windSpeed > 15 ? 1.6 : 2.2,
        description: `Bet that wind speed will exceed 15 km/h (Current: ${weatherData.windSpeed} km/h)`
      },
      {
        id: 'humidity-high',
        label: 'High Humidity (>70%)',
        odds: weatherData.humidity > 70 ? 1.5 : 2.3,
        description: `Bet for high humidity (Current: ${weatherData.humidity}%)`
      }
    ];
  }

  private generateMockWeatherData(location: string): WeatherData {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm'];
    const descriptions = [
      'clear sky', 'few clouds', 'scattered clouds', 'broken clouds',
      'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'
    ];
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const baseTemp = 15 + Math.random() * 15; // 15-30°C
    
    return {
      location,
      temperature: Math.round(baseTemp * 10) / 10,
      condition: randomCondition,
      humidity: Math.round(40 + Math.random() * 50),
      windSpeed: Math.round((5 + Math.random() * 20) * 10) / 10,
      description: randomDescription
    };
  }

  resolveBet(betOption: BetOption, weatherData: WeatherData): boolean {
    switch (betOption.id) {
      case 'temp-above-20':
        return weatherData.temperature > 20;
      case 'temp-below-15':
        return weatherData.temperature < 15;
      case 'rain':
        return weatherData.condition.toLowerCase().includes('rain') || 
               weatherData.description.toLowerCase().includes('rain');
      case 'sunny':
        return weatherData.condition.toLowerCase().includes('clear') || 
               weatherData.description.toLowerCase().includes('clear');
      case 'windy':
        return weatherData.windSpeed > 15;
      case 'humidity-high':
        return weatherData.humidity > 70;
      default:
        return false;
    }
  }
}

