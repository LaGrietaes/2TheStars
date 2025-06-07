# Android App Generation Guide

## 🎯 Step 4: Generate Android App with Bubblewrap

### Prerequisites ✅
- [x] PWA deployed to Vercel (or other hosting)
- [x] Bubblewrap CLI installed
- [x] Android Studio installed (optional but recommended)
- [x] Java Development Kit (JDK) 8 or higher

### 1. Initialize Android Project

Once you have your deployed URL (e.g., `https://relationbooster-xxx.vercel.app`), run:

```bash
# Initialize Bubblewrap project
bubblewrap init --manifest https://your-deployed-url.vercel.app/manifest.json

# Follow the prompts:
# - Package ID: com.yourcompany.relationbooster
# - App name: RelationBooster
# - Launcher name: RelationBooster
# - Theme color: #7c3aed
# - Background color: #1e1b4b
# - Start URL: /
# - Display mode: fullscreen
# - Orientation: portrait
```

### 2. Configure App Details

Bubblewrap will create a `twa-manifest.json` file. Update it with proper details:

```json
{
  "packageId": "com.yourcompany.relationbooster",
  "host": "your-deployed-url.vercel.app",
  "name": "RelationBooster",
  "launcherName": "RelationBooster",
  "display": "fullscreen",
  "orientation": "portrait",
  "themeColor": "#7c3aed",
  "backgroundColor": "#1e1b4b",
  "startUrl": "/",
  "iconUrl": "https://your-deployed-url.vercel.app/icons/icon-512x512.png",
  "maskableIconUrl": "https://your-deployed-url.vercel.app/icons/icon-512x512.png",
  "shortcuts": [],
  "enableSiteSettingsShortcut": true,
  "isChromeOSOnly": false,
  "includeNotificationDelegation": false
}
```

### 3. Build the Android App

```bash
# Build debug APK for testing
bubblewrap build

# Build release APK for Play Store
bubblewrap build --release
```

### 4. Sign the APK for Play Store

You'll need to create a keystore for app signing:

```bash
# Generate keystore (run this once)
keytool -genkey -v -keystore relationbooster-release-key.keystore -alias relationbooster -keyalg RSA -keysize 2048 -validity 10000

# Follow prompts to set password and details
```

### 5. Configure Signing in Bubblewrap

Edit `twa-manifest.json` to include signing configuration:

```json
{
  // ... other config
  "signingKey": {
    "path": "./relationbooster-release-key.keystore",
    "alias": "relationbooster"
  }
}
```

### 6. Build Signed Release APK

```bash
# Build signed release APK
bubblewrap build --release

# APK will be generated at: ./app-release-unsigned.apk
```

## 📋 Google Play Store Requirements

### App Content Declaration

Since your app contains adult content, you'll need to:

1. **Age Rating**: Apply for 17+ or 18+ rating
2. **Content Description**: Clearly describe the app's purpose
3. **Privacy Policy**: Required for all apps
4. **Content Categories**: Select appropriate categories

### Store Listing Information

**App Title**: RelationBooster - Relationship Enhancer

**Short Description**: 
"Interactive position selector to enhance intimacy and connection in relationships"

**Full Description**:
```
RelationBooster helps couples enhance their intimate connection through interactive exploration.

🌟 Features:
• Interactive position selector with beautiful animations
• Multiple language support
• Elegant, discreet interface
• Randomization for spontaneous experiences
• Position library with detailed categories
• Auto-play mode for hands-free experience

This app is designed for consenting adults in committed relationships. It provides educational and entertainment value for couples looking to enhance their intimacy and connection.

🔒 Privacy & Safety:
• No data collection or tracking
• Works offline for complete privacy
• No user accounts required
• All content stored locally

Age Rating: 17+ (Mature content)
```

### Required Assets

Create these files for the Play Store:

1. **App Icon**: 512x512 PNG (already in your `icons` folder)
2. **Feature Graphic**: 1024x500 PNG
3. **Screenshots**: At least 2, maximum 8 (phone screenshots)
4. **Privacy Policy**: Host this on your website

## 🔧 Troubleshooting

### Issue: Build fails with Java errors
**Solution**: Ensure JDK 8+ is installed and JAVA_HOME is set

### Issue: Keystore generation fails
**Solution**: Make sure keytool is in your PATH (comes with JDK)

### Issue: APK is unsigned
**Solution**: Verify keystore path and alias in twa-manifest.json

### Issue: App doesn't install on device
**Solution**: Enable "Install unknown apps" in Android settings

## 📱 Testing the APK

1. Copy APK to Android device
2. Enable "Developer options" and "USB debugging"
3. Install APK: `adb install app-release.apk`
4. Test all functionality
5. Verify PWA works in full-screen mode

## 🚀 Upload to Google Play Store

1. Go to Google Play Console (https://play.google.com/console)
2. Create new app
3. Upload APK/AAB file
4. Fill in store listing details
5. Set content rating (17+/18+)
6. Add screenshots and graphics
7. Submit for review

## 📝 Important Notes

- **Adult Content Policy**: Follow Google's guidelines carefully
- **Age Verification**: Consider implementing age verification
- **Regional Restrictions**: Some countries may restrict this content
- **Privacy Compliance**: Ensure GDPR compliance if targeting EU

## 🎯 Alternative Methods

If Bubblewrap doesn't work, try these alternatives:

### PWA Builder (Microsoft)
```bash
# Visit https://www.pwabuilder.com/
# Enter your PWA URL
# Download Android package
```

### Capacitor (Ionic)
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init RelationBooster com.yourcompany.relationbooster
npx cap add android
npx cap sync
npx cap open android
```

## 📞 Support

- Bubblewrap Documentation: https://github.com/GoogleChromeLabs/bubblewrap
- Google Play Console Help: https://support.google.com/googleplay/android-developer/
- PWA Best Practices: https://web.dev/pwa-checklist/ 