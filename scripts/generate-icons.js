const fs = require('fs');
const path = require('path');

// Icon generation script for PWA
// You'll need to install: npm install sharp --save-dev
// Then run: node scripts/generate-icons.js

const sharp = require('sharp');

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = 'source-icon.png'; // Place your source icon (1024x1024 recommended) in project root
const outputDir = 'public/icons';

async function generateIcons() {
  // Create icons directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Check if source icon exists
  if (!fs.existsSync(sourceIcon)) {
    console.log(`❌ Source icon not found: ${sourceIcon}`);
    console.log('Please create a high-quality icon (1024x1024 PNG) and name it "source-icon.png"');
    console.log('Icon should represent your RelationBooster app (consider hearts, infinity symbols, etc.)');
    return;
  }

  console.log('🎨 Generating PWA icons...');

  for (const size of iconSizes) {
    try {
      await sharp(sourceIcon)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
      
      console.log(`✅ Generated icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Failed to generate icon-${size}x${size}.png:`, error.message);
    }
  }

  console.log('🎉 Icon generation complete!');
  console.log('\nNext steps:');
  console.log('1. Review all generated icons in public/icons/');
  console.log('2. Deploy your PWA to a live URL');
  console.log('3. Follow the Google Play Store guide');
}

if (require.main === module) {
  generateIcons().catch(console.error);
}

module.exports = { generateIcons }; 