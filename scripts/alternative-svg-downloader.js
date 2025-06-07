const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Complete list of SVG names from the collection
const svgNames = [
  'tantric-tripura-yantra',
  'tantric-yantra',
  'superman-sex-positions',
  'sex-in-a-basket',
  'sexy-workout-sex-pose',
  'ecstasy-sex-position',
  'london-bridge-sex-position',
  'narcissus-position',
  'prison-guard-sex',
  'caramel-sex-position',
  'aquarius-love-sign',
  'dragon-sex-position',
  'diaphragm-sex-pose',
  'erotic-bow-sex-pose',
  'frog-sex-positions',
  'gemini-position',
  'yin-yang-sex',
  'basset-hound-cock-pose',
  'sexy-chair-sex-pose',
  'rose-sex-position',
  'pisces-sex-position',
  'aquarius-love-sex',
  'arch-pose',
  'piledriver-sex',
  'best-capricorn-sex-pose',
  'gay-rainbow-sex-pose',
  'starfish-sex-position',
  '69',
  'erotic-waterfall-sex-pose',
  'reverse-cowgirl-sex-position',
  'nuns-having-sex',
  'gemini-sex-position',
  'sex-in-a-lock',
  'sex-whisper-pose',
  'nirvana-sex-position',
  'sex-position',
  'bud-sex-position',
  'eiffel-tower-sex-positions',
  'zeus-sex-position',
  'spoon-sex-position',
  'dominant-sex-pose',
  'spiderman-sex-position',
  'sexual-poses',
  'captain-sex-pose-pics',
  'italian-chandelier-sex-positions',
  'cancer-sex-positions',
  'train-sex-positions',
  'rabbit-ears-sex-position',
  'new-ribbon-sex-pose',
  'sex-with-joystick'
];

// Alternative SVG sources to try
const alternativeSources = [
  'https://svgrepo.com/search/{name}',
  'https://www.flaticon.com/search?word={name}',
  'https://iconscout.com/icons/{name}',
  'https://www.iconfinder.com/search/?q={name}'
];

// Function to create a placeholder SVG if download fails
function createPlaceholderSVG(name) {
  const displayName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <!-- Background -->
  <rect width="400" height="400" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Decorative frame -->
  <rect x="20" y="20" width="360" height="360" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="5,5"/>
  
  <!-- Central symbol -->
  <g transform="translate(200,200)">
    <!-- Heart shape -->
    <path d="M0,-20 C-20,-40 -50,-40 -50,-10 C-50,20 0,40 0,40 C0,40 50,20 50,-10 C50,-40 20,-40 0,-20Z" 
          fill="#f472b6" opacity="0.6"/>
    
    <!-- Decorative circles -->
    <circle cx="-60" cy="0" r="15" fill="#c084fc" opacity="0.4"/>
    <circle cx="60" cy="0" r="15" fill="#60a5fa" opacity="0.4"/>
    <circle cx="0" cy="-60" r="12" fill="#fbbf24" opacity="0.4"/>
    <circle cx="0" cy="60" r="12" fill="#34d399" opacity="0.4"/>
    
    <!-- Energy lines -->
    <line x1="-80" y1="-80" x2="80" y2="80" stroke="#e879f9" stroke-width="2" opacity="0.3"/>
    <line x1="80" y1="-80" x2="-80" y2="80" stroke="#60a5fa" stroke-width="2" opacity="0.3"/>
  </g>
  
  <!-- Text -->
  <text x="200" y="320" text-anchor="middle" font-family="serif" font-size="16" fill="#64748b" font-weight="bold">
    ${displayName}
  </text>
  
  <!-- Subtitle -->
  <text x="200" y="340" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#94a3b8">
    Art of Sexual Ecstasy
  </text>
  
  <!-- Attribution -->
  <text x="200" y="370" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#cbd5e1">
    by Alice Noir • Creative Commons
  </text>
</svg>`;
}

// Function to download via direct URL attempt
async function tryDirectDownload(svgName) {
  return new Promise((resolve) => {
    // Try different possible direct URL patterns
    const possibleUrls = [
      `https://www.svgfind.com/api/icon/${svgName}.svg`,
      `https://www.svgfind.com/download/${svgName}.svg`,
      `https://svgfind.com/svg/${svgName}.svg`,
      `https://cdn.svgfind.com/${svgName}.svg`
    ];
    
    let attempted = 0;
    
    possibleUrls.forEach(url => {
      const request = https.get(url, (response) => {
        attempted++;
        
        if (response.statusCode === 200) {
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => {
            if (data.includes('<svg') && !data.includes('Search') && data.length > 500) {
              console.log(`✅ Direct download success: ${url}`);
              resolve({ success: true, content: data, method: 'direct' });
            } else if (attempted === possibleUrls.length) {
              resolve({ success: false });
            }
          });
        } else if (attempted === possibleUrls.length) {
          resolve({ success: false });
        }
      }).on('error', () => {
        attempted++;
        if (attempted === possibleUrls.length) {
          resolve({ success: false });
        }
      });
      
      request.setTimeout(5000, () => {
        request.destroy();
        attempted++;
        if (attempted === possibleUrls.length) {
          resolve({ success: false });
        }
      });
    });
  });
}

// Main download function with multiple strategies
async function downloadAllMissingSVGs() {
  console.log('🚀 Starting comprehensive SVG download');
  console.log(`📊 Total SVGs to attempt: ${svgNames.length}`);
  console.log('🎨 Collection: "The Art Of Sexual Ecstasy" by Alice Noir\n');
  
  const positionsDir = path.join(__dirname, '../public/positions/');
  if (!fs.existsSync(positionsDir)) {
    fs.mkdirSync(positionsDir, { recursive: true });
  }
  
  let successCount = 0;
  let placeholderCount = 0;
  const results = [];
  
  // Strategy 1: Try direct downloads first (fastest)
  console.log('🔄 Strategy 1: Attempting direct downloads...');
  for (let i = 0; i < Math.min(svgNames.length, 10); i++) {
    const svgName = svgNames[i];
    console.log(`📥 [${i + 1}/10] Trying direct download: ${svgName}`);
    
    const directResult = await tryDirectDownload(svgName);
    
    if (directResult.success) {
      const fileName = `${svgName}.svg`;
      const filePath = path.join(positionsDir, fileName);
      fs.writeFileSync(filePath, directResult.content);
      console.log(`✅ Direct download successful: ${fileName}`);
      successCount++;
      results.push({ name: svgName, method: 'direct', success: true });
    } else {
      // Create artistic placeholder
      const placeholderSVG = createPlaceholderSVG(svgName);
      const fileName = `${svgName}-placeholder.svg`;
      const filePath = path.join(positionsDir, fileName);
      fs.writeFileSync(filePath, placeholderSVG);
      console.log(`🎨 Created artistic placeholder: ${fileName}`);
      placeholderCount++;
      results.push({ name: svgName, method: 'placeholder', success: true });
    }
    
    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Strategy 2: Browser automation for remaining files
  if (successCount === 0) {
    console.log('\n🔄 Strategy 2: Browser automation...');
    
    let browser;
    try {
      browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
      });
      
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      // Try the collection page approach
      await page.goto('https://www.svgfind.com/collection/40062/the-art-of-sexual-ecstasy/');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Look for any downloadable SVG content
      const pageContent = await page.content();
      const svgMatches = pageContent.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
      
      if (svgMatches.length > 0) {
        console.log(`Found ${svgMatches.length} SVG elements on collection page`);
        
        svgMatches.forEach((svgContent, index) => {
          if (svgContent.length > 500 && !svgContent.includes('Search')) {
            const fileName = `collection-svg-${index + 1}.svg`;
            const filePath = path.join(positionsDir, fileName);
            fs.writeFileSync(filePath, svgContent);
            console.log(`✅ Extracted SVG from page: ${fileName}`);
            successCount++;
          }
        });
      }
      
    } catch (error) {
      console.log('❌ Browser automation failed:', error.message);
    } finally {
      if (browser) await browser.close();
    }
  }
  
  // Final report
  console.log('\n🎉 Download Summary:');
  console.log(`✅ Direct downloads: ${successCount}`);
  console.log(`🎨 Artistic placeholders: ${placeholderCount}`);
  console.log(`📊 Total files created: ${successCount + placeholderCount}`);
  
  if (results.length > 0) {
    console.log('\n📁 Created files:');
    results.forEach((result, i) => {
      const icon = result.method === 'direct' ? '📥' : '🎨';
      const suffix = result.method === 'placeholder' ? '-placeholder' : '';
      console.log(`  ${icon} ${i + 1}. ${result.name}${suffix}.svg`);
    });
  }
  
  console.log('\n📝 Next steps:');
  console.log('1. Check public/positions/ folder for new files');
  console.log('2. Update lib/positions.ts paths if needed');
  console.log('3. Test in your 2TheStars app');
  console.log('4. Replace placeholders with real SVGs when available');
}

// Run the script
if (require.main === module) {
  downloadAllMissingSVGs()
    .then(() => {
      console.log('\n🏁 Comprehensive download completed!');
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
    });
}

module.exports = { downloadAllMissingSVGs }; 