# Google Play Store Deployment Guide for 2TheStars

## Overview
This guide will help you deploy your 2TheStars PWA to the Google Play Store using the TWA (Trusted Web Activity) approach.

## Prerequisites Completed ✓
- [x] PWA configuration with next-pwa
- [x] Web App Manifest (manifest.json)
- [x] App icons in multiple sizes
- [x] Next.js app with PWA features

## Step 1: Deploy Your PWA to Production

### Option A: Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and get your production URL
# Example: https://2thestars.vercel.app
```

### Option B: Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the app
npm run build

# Deploy
netlify deploy --prod --dir=out
```

### Option C: Other Hosting
- Deploy to any static hosting service
- Ensure HTTPS is enabled
- Note your production URL

## Step 2: Verify PWA Functionality

After deployment, test your PWA:
1. Open Chrome DevTools on your deployed site
2. Go to Application tab > Manifest
3. Verify manifest loads correctly
4. Test "Add to Home Screen" functionality
5. Check Service Worker registration

## Step 3: Generate Android APK using Bubblewrap

### Install Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

### Initialize TWA Project
```bash
# Replace YOUR_PRODUCTION_URL with your actual deployed URL
bubblewrap init --manifest https://YOUR_PRODUCTION_URL/manifest.json
```

This will prompt you for:
- Package name (e.g., `com.laggrieta.twothestars`)
- App name: `2TheStars`
- Launcher name: `2TheStars`
- Display mode: `fullscreen`
- Orientation: `portrait`
- Theme color: `#7c3aed`
- Background color: `#1e1b4b`
- Start URL: `/`
- Icon URL: Will auto-detect from manifest

### Build the APK
```bash
# Generate release APK
bubblewrap build --release
```

### Sign the APK
```bash
# Generate keystore (do this once)
keytool -genkey -v -keystore release-key.keystore -alias 2thestars -keyalg RSA -keysize 2048 -validity 10000

# Sign the APK
bubblewrap build --release --keystore release-key.keystore --alias 2thestars
```

## Step 4: Alternative - PWA Builder Method

If Bubblewrap doesn't work, use Microsoft's PWA Builder:

1. Go to https://www.pwabuilder.com/
2. Enter your PWA URL
3. Click "Start" and wait for analysis
4. Go to "Publish" tab
5. Select "Android" platform
6. Configure settings:
   - Package name: `com.laggrieta.twothestars`
   - App name: `2TheStars`
   - Version: `1.0.0`
7. Download the generated APK

## Step 5: Google Play Console Setup

### Create Developer Account
1. Go to https://play.google.com/console
2. Pay $25 one-time registration fee
3. Complete account verification

### Create New App
1. Click "Create app"
2. App details:
   - App name: `2TheStars`
   - Default language: English
   - App or game: App
   - Free or paid: Free
3. Content rating: Mature 17+ (due to adult content)

### Upload APK
1. Go to "Release" > "Production"
2. Click "Create new release"
3. Upload your APK file
4. Fill in release notes
5. Review and rollout

## Step 6: Store Listing Information

### Required Assets
- App icon: 512x512 PNG (already have)
- Feature graphic: 1024x500 PNG
- Screenshots: At least 2 phone screenshots
- Privacy Policy URL (required)

### Store Listing Content
```
Title: 2TheStars - Relationship Enhancer

Short Description (80 chars):
Spice up your relationship with 60 intimate positions and interactive features

Long Description:
Enhance your intimate connection with 2TheStars, featuring 60 carefully curated positions across 6 different categories. This beautifully designed app helps couples explore and strengthen their relationship through interactive position selection, timer features, and a comprehensive library.

Features:
• 60 intimate positions across 6 categories
• Random position selector
• Interactive timer with customizable duration
• Beautiful, discreet interface
• Offline functionality
• Regular updates with new content

Perfect for couples looking to add variety and excitement to their relationship. All content is tastefully presented and designed for mature audiences.

Categories: Lifestyle, Health & Fitness
Content Rating: Mature 17+
```

## Step 7: Privacy Policy

You'll need a privacy policy. Here's a basic template:

```
Privacy Policy for 2TheStars

This app does not collect, store, or transmit any personal data. All functionality is local to your device.

Data Collection: None
Data Storage: Local device only
Data Sharing: None
Analytics: None
Advertising: None

For questions, contact: [your-email]
```

## Step 8: Content Rating

Due to the nature of your app, you'll need:
- Mature 17+ rating
- Proper content warnings
- Age verification consideration

## Step 9: Testing

Before submission:
```bash
# Test the APK on a physical device
adb install app-release.apk

# Or use Android Studio emulator
```

Test all features:
- App launches correctly
- Icons display properly
- All navigation works
- Position images load
- Timer functionality works
- Settings persist

## Step 10: Submission

1. Complete all store listing information
2. Upload all required assets
3. Set content rating to Mature 17+
4. Add privacy policy URL
5. Submit for review

## Expected Timeline
- Review process: 1-7 days
- Common rejection reasons:
  - Missing privacy policy
  - Incorrect content rating
  - Icon quality issues
  - App crashes

## Troubleshooting

### Common Issues:
1. **Manifest not loading**: Check HTTPS and CORS headers
2. **APK build fails**: Verify Node.js and Java versions
3. **App crashes**: Test thoroughly on different devices
4. **Store rejection**: Follow Google Play policies strictly

### Support Commands:
```bash
# Check app on device
adb shell pm list packages | grep 2thestars

# View app logs
adb logcat | grep 2TheStars

# Uninstall for clean testing
adb uninstall com.laggrieta.twothestars
```

## Next Steps After Approval
1. Monitor crash reports in Play Console
2. Respond to user reviews
3. Plan updates and new features
4. Consider iOS version using similar PWA approach

---

**Important**: Due to the adult nature of the content, ensure you comply with all Google Play policies regarding mature content and age restrictions. 