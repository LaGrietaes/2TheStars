# 2TheStars - Relationship Enhancer PWA

<div align="center">
  <h3>💫 Enhance your intimate connection with 60 carefully curated positions 💫</h3>
  <p>A beautiful, discreet Progressive Web App designed for couples</p>
  
  ![PWA Ready](https://img.shields.io/badge/PWA-Ready-green)
  ![Google Play](https://img.shields.io/badge/Google%20Play-Ready-blue)
  ![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
</div>

## 🌟 Features

- **60 Intimate Positions** across 6 categories
- **Random Position Selector** with smooth animations
- **Interactive Timer** with customizable duration
- **Beautiful, Discreet Design** with modern UI
- **Offline Functionality** - works without internet
- **Multi-language Support** (English/Spanish)
- **PWA Ready** - installable on mobile devices
- **Google Play Store Ready** - APK generation support

## 🎯 Categories

- **Intimate** (20 positions) - Close, tender connections
- **Passionate** (12 positions) - Dynamic, energetic encounters  
- **Romantic** (14 positions) - Sweet, artistic expressions
- **Playful** (9 positions) - Fun, experimental experiences
- **Adventurous** (11 positions) - Bold, supportive explorations
- **All Positions** - Complete collection

## 🚀 Live Demo

**Production:** [https://2thestars.netlify.app](https://2thestars.netlify.app)

## 📱 Installation

### Option 1: Install as PWA
1. Visit the live demo URL
2. Click "Add to Home Screen" in your browser
3. Enjoy the app-like experience

### Option 2: Download from Google Play Store
*Coming soon - APK ready for submission*

## 🛠️ Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/2thestars.git
cd 2thestars

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Generate APK (after deployment)
npm run generate:apk
```

## 🏗️ Tech Stack

- **Framework:** Next.js 15.2.4 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **PWA:** next-pwa with service worker
- **Deployment:** Netlify with automatic deployments
- **APK Generation:** Bubblewrap (TWA)

## 📂 Project Structure

```
2thestars/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Shadcn/ui components  
│   └── ...               # App-specific components
├── lib/                  # Utilities and data
├── public/               # Static assets
│   ├── icons/           # PWA icons
│   ├── positions/       # Position illustrations
│   └── manifest.json    # PWA manifest
├── scripts/             # Build and deployment scripts
└── docs/               # Documentation files
```

## 🔧 Configuration

### PWA Configuration
- Service worker enabled in production
- Offline functionality with smart caching
- App icons for all device sizes
- Manifest configured for installation

### Deployment Configuration
- Netlify.toml for optimal deployment
- Static export for universal hosting
- Automatic deployments from GitHub

## 📈 APK Generation

Ready for Google Play Store submission:

1. **Deploy to Production** ✅
2. **Install Bubblewrap** ✅
3. **Generate APK:**
   ```bash
   bubblewrap init --manifest https://yoururl.netlify.app/manifest.json
   bubblewrap build --release
   ```

## 🎨 Design Principles

- **Discreet & Elegant** - Sophisticated design for mature audiences
- **User-Friendly** - Intuitive navigation and clear interface
- **Responsive** - Perfect on all devices and screen sizes
- **Accessible** - WCAG compliant with keyboard navigation

## 📋 Content Rating

- **Mature 17+** - Adult content designed for couples
- **Privacy First** - No data collection or tracking
- **Local Storage Only** - All preferences stored on device

## 🔒 Privacy & Security

- ✅ No user data collection
- ✅ No analytics or tracking
- ✅ Local storage only
- ✅ HTTPS required
- ✅ Privacy policy included

## 🌐 Multi-language Support

Currently supports:
- **English** (default)
- **Spanish** (Español)

Easy to extend with additional languages.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

While this is primarily a personal project, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or support:
- **Website:** [www.lagrieta.es](https://www.lagrieta.es)
- **Issues:** GitHub Issues tab

## 🙏 Credits

- **App Design & Development:** LaGrieta Labs
- **UI Framework:** Shadcn/ui
- **Icons:** Lucide React
- **Illustrations:** Custom SVG artwork

---

<div align="center">
  <p>Made with ❤️ for couples seeking deeper connection</p>
  <p><strong>⭐ If you find this helpful, please star the repository! ⭐</strong></p>
</div> 