# Deployment Guide for RelationBooster

## 🚀 Step-by-Step Deployment Process

### 1. Build Verification ✅
- [x] PWA configuration enabled for production
- [x] Service worker generated (`public/sw.js`)
- [x] Build successful
- [x] All SVG files accessible

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Command Line)
```bash
# Login to Vercel (you may need to authenticate in browser)
vercel login

# Deploy your app
vercel

# Follow the prompts:
# - Set up and deploy? [Y/n] y
# - Which scope? Choose your account
# - Link to existing project? [y/N] n
# - Project name: relationbooster (or your preferred name)
# - In which directory is your code located? ./
# - Want to modify settings? [y/N] n
```

#### Option B: Using Vercel Dashboard (Web Interface)
1. Go to https://vercel.com
2. Sign up/login with GitHub, GitLab, or Bitbucket
3. Click "New Project"
4. Import your Git repository or upload project
5. Configure build settings (Vercel auto-detects Next.js)
6. Click "Deploy"

### 3. Update Domain Configuration

Once deployed, you'll get a URL like: `https://relationbooster-xxx.vercel.app`

Update this in your code:

```typescript
// In app/layout.tsx, update metadataBase:
metadataBase: new URL('https://your-actual-vercel-url.vercel.app'),

// Update openGraph URL:
url: 'https://your-actual-vercel-url.vercel.app',
```

### 4. Test PWA on Mobile

1. Open your deployed URL on a mobile device
2. Look for "Add to Home Screen" option in browser
3. Test offline functionality
4. Verify all SVGs load correctly
5. Test the position selector functionality

### 5. Custom Domain (Optional)

If you want a custom domain:
1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS settings as instructed
5. Update `metadataBase` URL in your code

## 📱 Mobile Testing Checklist

- [ ] App loads correctly on mobile
- [ ] Can be installed as PWA (Add to Home Screen)
- [ ] SVGs display properly
- [ ] Position selector works
- [ ] Auto mode functions correctly
- [ ] Offline functionality works
- [ ] App icon displays in home screen

## 🔧 Common Issues & Solutions

### Issue: PWA not installable
**Solution**: Check manifest.json is accessible at `/manifest.json`

### Issue: SVGs don't load in production
**Solution**: Verify all SVG files are in `public/positions/` directory

### Issue: Service worker errors
**Solution**: Check browser console for specific error messages

## 📝 Notes for Google Play Store

- Your deployed URL will be used in the Android app wrapper
- Make sure HTTPS is working (Vercel provides this automatically)
- Test thoroughly on mobile devices before proceeding to Android app generation

## 🎯 Next Step Preview

After successful deployment and testing, you'll use your live URL to generate the Android app:

```bash
# Example with Bubblewrap
bubblewrap init --manifest https://your-deployed-url.vercel.app/manifest.json
```

## 📧 Need Help?

If you encounter any issues:
1. Check Vercel build logs
2. Test locally with `npm run build && npm start`
3. Verify all files are committed to Git
4. Check browser console for errors 