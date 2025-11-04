# Quick Setup Guide

Follow these steps to get the News App running:

## 1. Get NewsAPI Key

1. Go to https://newsapi.org/
2. Click "Get API Key" and sign up
3. Copy your API key

## 2. Configure API Key

Open `src/constants/news.ts` and replace:

```typescript
export const NEWS_API_KEY = 'YOUR_NEWS_API_KEY_HERE';
```

with your actual API key:

```typescript
export const NEWS_API_KEY = 'abc123...your_key_here';
```

## 3. Start the App

```bash
npm start
```

Then:
- Press `a` for Android
- Press `i` for iOS (macOS only)
- Press `w` for Web
- Scan QR code with Expo Go app on your phone

## That's it!

The app should now load with real news data. Enjoy!

## Troubleshooting

**Problem**: "API key is invalid"
- Make sure you copied the entire key
- Check there are no extra spaces
- Verify the key is active on NewsAPI.org

**Problem**: "No articles found"
- Check your internet connection
- Verify you haven't exceeded the 100 requests/day limit
- Try a different category

**Problem**: Build errors
```bash
# Clear cache and restart
rm -rf node_modules
npm install
npx expo start -c
```
