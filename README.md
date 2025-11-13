# Weather Gambling App

A modern, visually appealing Angular app that lets you bet on real-time weather outcomes for any city. Experience a realistic weather dashboard and a fun, interactive betting interface.

---

## 🌦️ Features

- **Realistic Weather Dashboard**: View current weather, temperature, humidity, wind, and conditions for any city, with weather icons and date.
- **Betting Interface**: Place bets on weather outcomes with dynamic odds and instant feedback.
- **Wallet System**: Track your balance, reset your wallet, and see potential payouts.
- **Bet History**: Review your past bets, see results, and clear your history.
- **Responsive Design**: Looks great on desktop and mobile.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Angular CLI](https://angular.io/cli)

### Installation
1. Clone the repository:
  ```sh
  git clone https://github.com/Ohio-University-CS/weather-gambling.git
  cd weather-gambling
  ```
2. Install dependencies:
  ```sh
  npm install
  ```
3. Start the development server:
  ```sh
  npm start
  ```
4. Open your browser and go to [http://localhost:4200](http://localhost:4200)

---

## 🖼️ Screenshots

> _Add screenshots of the dashboard, betting interface, and bet history here!_

---

## 🛠️ Project Structure

- `src/app/components/` — Main UI components (dashboard, betting, history, wallet)
- `src/app/services/` — Angular services for weather, betting, and wallet logic
- `src/app/models/` — TypeScript models for weather and betting data
- `src/environments/` — Environment configs

---

## ⚡ Customization

- Update the weather API endpoint in `weather.service.ts` to use your preferred provider.
- Tweak odds, wallet starting balance, or UI colors in the respective service/component files.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT
# Weather Gambling App

A modern Angular application where users can gamble with fake money on weather predictions. Users start with $200 and can place bets on various weather conditions.

## Features

- **Wallet System**: Start with $200 fake money, balance persists in localStorage
- **Weather Integration**: Get weather data for any city (currently using mock data)
- **Betting Options**: Multiple betting options including:
  - Temperature above/below thresholds
  - Rain predictions
  - Sunny weather
  - Wind speed
  - Humidity levels
- **Dynamic Odds**: Odds are calculated based on current weather conditions
- **Bet History**: Track all your bets with win/loss status
- **Modern UI**: Beautiful, responsive design with glassmorphism effects

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

## Weather API Integration

The app currently uses mock weather data for demonstration. To integrate with a real weather API:

### Using Environment Files (Recommended)

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `src/environments/environment.ts` (for development)
3. Replace `'demo'` with your actual API key:
   ```typescript
   weatherApiKey: 'your_actual_api_key_here'
   ```
4. For production, update `src/environments/environment.prod.ts` as well

The app will automatically use the real API when the key is not 'demo'. If the API call fails, it will fall back to mock data.

### Environment Files Location

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

These files are already configured in `angular.json` to be swapped automatically during production builds.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main dashboard component
│   │   ├── betting-interface/  # Betting form and options
│   │   ├── wallet-display/     # Wallet balance display
│   │   └── bet-history/        # Bet history component
│   ├── models/
│   │   └── weather.model.ts     # TypeScript interfaces
│   ├── services/
│   │   ├── wallet.service.ts   # Wallet balance management
│   │   ├── weather.service.ts  # Weather API integration
│   │   └── betting.service.ts  # Bet management
│   └── app.module.ts
├── environments/
│   ├── environment.ts          # Development environment config
│   └── environment.prod.ts     # Production environment config
└── styles.scss                  # Global styles
```

## Technologies Used

- Angular 17
- TypeScript
- SCSS
- RxJS
- LocalStorage for data persistence

## License

MIT

