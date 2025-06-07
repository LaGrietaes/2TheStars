const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function generateFeatureGraphic() {
  // Create canvas with Google Play Store feature graphic dimensions
  const canvas = createCanvas(1024, 500);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 1024, 500);
  gradient.addColorStop(0, '#1e1b4b'); // Dark blue
  gradient.addColorStop(0.5, '#7c3aed'); // Purple
  gradient.addColorStop(1, '#ec4899'); // Pink

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 500);

  // Add stars pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 500;
    const size = Math.random() * 3 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Main title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('2TheStars', 512, 200);

  // Subtitle
  ctx.font = '36px Arial, sans-serif';
  ctx.fillText('Relationship Enhancer', 512, 260);

  // Features
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText('60 Intimate Positions • Interactive Timer • Beautiful Design', 512, 320);

  // Rating indicator
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('Mature 17+ Content', 512, 380);

  // Add app icon if it exists
  try {
    const icon = await loadImage('./public/icons/icon-192x192.png');
    ctx.drawImage(icon, 50, 150, 200, 200);
  } catch (error) {
    console.log('Icon not found, skipping icon overlay');
  }

  // Save the feature graphic
  const buffer = canvas.toBuffer('image/png');
  
  // Ensure public directory exists
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public', { recursive: true });
  }

  fs.writeFileSync('./public/feature-graphic.png', buffer);
  console.log('✅ Feature graphic generated: ./public/feature-graphic.png');
  console.log('📱 Use this 1024x500 image for Google Play Store feature graphic');
}

// Run if called directly
if (require.main === module) {
  generateFeatureGraphic().catch(console.error);
}

module.exports = { generateFeatureGraphic }; 