# Logo Setup Instructions

## Adding Your VKS Logo

To complete the logo setup for **VKS News**, please follow these steps:

### Step 1: Prepare Your Logo Image

1. Your logo image should be a PNG file with a transparent background (or black background as configured)
2. Recommended sizes:
   - **App Icon**: 1024x1024 pixels (square)
   - **Splash Screen**: 1284x2778 pixels (or similar high resolution)
   - **Adaptive Icon**: 1024x1024 pixels (square)

### Step 2: Add the Logo File

1. Place your logo image file in the `assets` folder
2. Name it exactly: `vks-logo.png`
3. The file path should be: `newsAppDC/assets/vks-logo.png`

### Step 3: Verify Configuration

The app is already configured to use `vks-logo.png` in:
- ✅ App icon (`app.json` → `icon`)
- ✅ Splash screen (`app.json` → `splash.image`)
- ✅ Android adaptive icon (`app.json` → `android.adaptiveIcon.foregroundImage`)
- ✅ Web favicon (`app.json` → `web.favicon`)

### Step 4: Test the Logo

After adding the logo file:

1. Clear the Expo cache:
   ```bash
   npm start -- --clear
   ```

2. Restart the app to see the new logo

### Logo Specifications

Based on your logo description:
- **Letters**: "VKS" in bright blue
- **Background**: Black (already configured in `app.json`)
- **Arc**: Red and blue swoosh design

The app configuration uses:
- **Splash background**: Black (`#000000`)
- **Android adaptive icon background**: Black (`#000000`)

### Troubleshooting

If the logo doesn't appear:
1. Ensure the file is named exactly `vks-logo.png` (case-sensitive)
2. Check that the file is in the `assets` folder
3. Clear Expo cache and restart: `npm start -- --clear`
4. For production builds, you may need to rebuild the app

### Current Status

✅ App name changed to "vks news"
✅ Package name updated to "com.vks.news"
✅ All logo references configured
⏳ **Waiting for logo image file to be added to `assets/vks-logo.png`**

