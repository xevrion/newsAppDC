# VKS News - React Native Expo

A modern, feature-rich news application built with React Native and Expo, featuring multiple news categories, dark mode, search functionality, and a clean UI.

## Features

- **Top Trending News**: View the top 5 trending headlines on the home screen
- **Multiple Categories**: Browse news across 5 categories:
  - Business 💼
  - Sports ⚽
  - Technology 💻
  - Entertainment 🎬
  - Science 🔬
- **Search Functionality**: Search for news articles by keyword
- **Dark Mode**: Toggle between light and dark themes (persisted with AsyncStorage)
- **Pull to Refresh**: Refresh news lists with pull-down gesture
- **Modern UI**: Clean, intuitive interface similar to Google News/Inshorts
- **Category Badges**: Visual indicators showing article categories
- **Loading Skeletons**: Smooth loading states while fetching data
- **Article Details**: Full article view with title, image, source, date, and content
- **Cross-Platform**: Runs on both Android and iOS

## Screenshots

[Add screenshots here after testing]

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for macOS) or Android Studio (for Android development)
- Expo Go app (for testing on physical devices)

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   cd newsApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Get a NewsAPI key**:
   - Visit [NewsAPI.org](https://newsapi.org/)
   - Sign up for a free account
   - Copy your API key

4. **Configure API key**:
   - Open `src/constants/news.ts`
   - Replace `YOUR_NEWS_API_KEY_HERE` with your actual API key:
   ```typescript
   export const NEWS_API_KEY = 'your_actual_api_key_here';
   ```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on Android:
```bash
npm run android
```

### Run on iOS (macOS only):
```bash
npm run ios
```

### Run on Web:
```bash
npm run web
```

### Using Expo Go:
1. Install Expo Go on your iOS or Android device
2. Scan the QR code shown in the terminal
3. The app will load on your device

## Project Structure

```
newsApp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ArticleCard.tsx
│   │   └── SkeletonLoader.tsx
│   ├── constants/           # App constants and configuration
│   │   ├── news.ts
│   │   └── theme.ts
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   ├── BusinessScreen.tsx
│   │   ├── SportsScreen.tsx
│   │   ├── TechnologyScreen.tsx
│   │   ├── EntertainmentScreen.tsx
│   │   ├── ScienceScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   └── ArticleScreen.tsx
│   ├── services/            # API services
│   │   └── newsApi.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── news.ts
│   │   └── navigation.ts
│   └── utils/               # Utility functions
│       └── dateUtils.ts
├── App.tsx                  # App entry point
├── package.json
└── README.md
```

## Technologies Used

- **React Native**: Mobile app framework
- **Expo**: Development platform
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
  - Bottom Tabs Navigator
  - Native Stack Navigator
- **AsyncStorage**: Local data persistence
- **Axios**: HTTP client for API calls
- **NewsAPI**: News data source

## Features in Detail

### Home Screen
- Displays top 5 trending news articles
- Dark mode toggle button
- Pull-to-refresh functionality
- Loading skeletons during data fetch

### Category Screens
- Dedicated screen for each news category
- Scrollable list of articles
- Pull-to-refresh support
- Category icon in header

### Article Detail Screen
- Full article title and image
- Source badge and publication date
- Author information
- Article content preview
- "Read Full Article" button (opens in browser)

### Search Screen
- Search input field
- Real-time article search
- Empty state with helpful messages
- Loading indicator during search

### Dark Mode
- System-wide theme toggle
- Persisted across app restarts
- Smooth theme transitions
- Optimized colors for readability

## API Information

This app uses [NewsAPI.org](https://newsapi.org/) for fetching news data.

**Free Tier Limitations**:
- 100 requests per day
- Only works with localhost in development
- Production deployment requires a paid plan

**Alternative APIs** (if needed):
- [The Guardian API](https://open-platform.theguardian.com/)
- [New York Times API](https://developer.nytimes.com/)
- [Currents API](https://currentsapi.services/)

## Troubleshooting

### API Key Issues
- Ensure you've replaced `YOUR_NEWS_API_KEY_HERE` with your actual key
- Check that your API key is active on NewsAPI.org
- Verify you haven't exceeded the free tier limit (100 requests/day)

### Navigation Errors
- Make sure all dependencies are installed: `npm install`
- Clear cache: `expo start -c`

### Image Loading Issues
- Some articles may not have images (fallback placeholder is shown)
- Check your internet connection

## Future Enhancements

- Bookmarking/favorites functionality
- Push notifications for breaking news
- Offline mode with cached articles
- Social sharing features
- Multiple language support
- Custom news sources selection

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For questions or support, please open an issue in the repository.
