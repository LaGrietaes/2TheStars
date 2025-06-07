# APK Deployment Checklist for 2TheStars

## Current Status ✅
- [x] PWA configuration complete
- [x] App icons generated (72px to 512px)
- [x] Manifest.json configured
- [x] Privacy policy created
- [x] Feature graphic template ready

## Next Steps to Generate APK

### 1. Deploy PWA to Production ✅ IN PROGRESS
Choose one deployment method:

**✅ Option B: Netlify (SELECTED)**
```bash
# Build the app ✅ COMPLETED
npm run build

# Install Netlify CLI ✅ COMPLETED
npm install -g netlify-cli

# Deploy ⏳ IN PROGRESS
netlify deploy --prod --dir=out
```

**Option A: Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

### 2. Update Privacy Policy
- Edit `public/privacy-policy.html`
- Replace `[your-email-here]` with your actual email
- Deploy the updated version

### 3. Create Feature Graphic
- Open `public/feature-graphic-template.html` in Chrome
- Press F12 → Device toolbar → Set dimensions to 1024x500
- Take screenshot and save as `feature-graphic.png`

### 4. Generate APK using Bubblewrap

**Install Bubblewrap:**
```bash
npm install -g @bubblewrap/cli
```

**Initialize TWA project:**
```bash
# Replace YOUR_PRODUCTION_URL with your actual URL
bubblewrap init --manifest https://YOUR_PRODUCTION_URL/manifest.json
```

**Configure when prompted:**
- Package name: `com.laggrieta.twothestars`
- App name: `2TheStars`
- Display mode: `fullscreen`
- Theme color: `#7c3aed`
- Background color: `#1e1b4b`

**Build APK:**
```bash
bubblewrap build --release
```

### 5. Alternative: PWA Builder Method
If Bubblewrap fails:
1. Go to https://www.pwabuilder.com/
2. Enter your production URL
3. Click "Start" → "Publish" → "Android"
4. Configure settings and download APK

### 6. Google Play Console Setup
1. Create developer account ($25 fee)
2. Create new app
3. Upload APK
4. Set content rating to "Mature 17+"
5. Add store listing information

### 7. Required Store Assets
- [x] App icon (512x512) - Ready
- [ ] Feature graphic (1024x500) - Use template
- [ ] Screenshots (2-8 phone screenshots)
- [ ] Privacy policy URL

### 8. Store Listing Information
```
App Name: 2TheStars - Relationship Enhancer
Category: Lifestyle
Content Rating: Mature 17+

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
```

## Quick Commands

```bash
# Test PWA locally
npm run build
npm run start

# Deploy to Vercel
vercel --prod

# Generate APK (after deployment)
bubblewrap init --manifest https://YOUR_URL/manifest.json
bubblewrap build --release
```

## Important Notes

1. **Content Rating**: Must be Mature 17+ due to intimate content
2. **Privacy Policy**: Required for Google Play Store
3. **HTTPS Required**: PWA must be served over HTTPS
4. **Testing**: Test APK on physical device before submission
5. **Regional Restrictions**: Some countries may restrict this content

## Support Links
- [PWA Builder](https://www.pwabuilder.com/)
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [Google Play Console](https://play.google.com/console)
- [Vercel Documentation](https://vercel.com/docs)

---

**Next Action**: Deploy your PWA to production and get the URL, then proceed with APK generation! 