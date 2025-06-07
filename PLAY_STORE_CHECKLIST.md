# Google Play Store Upload Checklist

## Pre-Development Setup
- [x] PWA configuration added to Next.js
- [x] Web App Manifest created
- [x] PWA meta tags added to layout
- [x] Icon generation script created

## Icon & Asset Creation
- [ ] Create source icon (1024x1024 PNG) named `source-icon.png`
- [ ] Install sharp: `npm install sharp --save-dev`
- [ ] Run icon generation: `npm run generate-icons`
- [ ] Review generated icons in `public/icons/`
- [ ] Create app screenshots for store listing
- [ ] Create feature graphic (1024x500px)

## PWA Deployment
- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Update domain in `app/layout.tsx` metadataBase
- [ ] Deploy PWA to live URL
- [ ] Test PWA on mobile devices
- [ ] Verify manifest.json loads correctly
- [ ] Test offline functionality

## Legal & Compliance
- [ ] Create Privacy Policy
- [ ] Create Terms of Service
- [ ] Implement age verification (18+)
- [ ] Review Google Play Adult Content Policy
- [ ] Prepare content rating application

## Android App Generation
Choose one method:

### Option A: Bubblewrap (Google's Tool)
- [ ] Install: `npm install -g @bubblewrap/cli`
- [ ] Initialize: `bubblewrap init --manifest [YOUR_URL]/manifest.json`
- [ ] Build: `bubblewrap build --release`

### Option B: PWA Builder (Microsoft)
- [ ] Visit https://www.pwabuilder.com/
- [ ] Enter your PWA URL
- [ ] Generate Android package
- [ ] Download and test APK

### Option C: Capacitor (Ionic)
- [ ] Install Capacitor dependencies
- [ ] Initialize Capacitor project
- [ ] Add Android platform
- [ ] Build in Android Studio

## Google Play Console Setup
- [ ] Create Google Play Console account ($25 fee)
- [ ] Create new app in console
- [ ] Set up app signing
- [ ] Configure app details

## Store Listing
- [ ] Write app title: "RelationBooster - Relationship Enhancer"
- [ ] Write short description (80 chars max)
- [ ] Write full description
- [ ] Add screenshots (min 2, max 8)
- [ ] Upload feature graphic
- [ ] Set content rating (17+/18+)
- [ ] Configure pricing (Free)
- [ ] Set up store listing languages

## Testing
- [ ] Test APK on physical Android device
- [ ] Test core functionality
- [ ] Test offline capabilities
- [ ] Verify app icon displays correctly
- [ ] Test app launch and navigation

## Final Submission
- [ ] Upload APK/AAB to Play Console
- [ ] Fill in all required store information
- [ ] Submit for review
- [ ] Wait for approval (typically 1-7 days)

## Post-Launch
- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Plan update strategy
- [ ] Monitor app performance

---

## Important Notes
- **Content Rating**: This app requires mature content rating (17+/18+)
- **Age Verification**: Consider implementing age verification
- **Regional Restrictions**: Some countries may restrict this content
- **Privacy**: Ensure GDPR compliance if targeting EU users

## Quick Commands
```bash
# Install dependencies
npm install sharp --save-dev

# Generate icons
npm run generate-icons

# Build PWA
npm run build

# Test locally
npm run dev
```

## Support
If you need help with any step, refer to the detailed `GOOGLE_PLAY_STORE_GUIDE.md` file. 