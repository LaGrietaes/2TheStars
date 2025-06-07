const fs = require('fs');
const path = require('path');
const https = require('https');

// SVG collection URLs from The Art Of Sexual Ecstasy collection
// Based on the search results from svgfind.com
const svgCollection = [
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

// Function to download SVG from svgfind.com
function downloadSVG(svgName, index) {
  return new Promise((resolve, reject) => {
    // SVGFind typically uses this URL pattern (you may need to adjust)
    const url = `https://www.svgfind.com/api/icons/${svgName}`;
    
    console.log(`📥 Downloading ${index + 1}/${svgCollection.length}: ${svgName}`);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          const fileName = `${svgName}.svg`;
          const filePath = path.join(__dirname, '../public/positions/', fileName);
          
          fs.writeFileSync(filePath, data);
          console.log(`✅ Downloaded: ${fileName}`);
          resolve(fileName);
        });
      } else {
        console.log(`❌ Failed to download: ${svgName} (Status: ${response.statusCode})`);
        resolve(null);
      }
    }).on('error', (error) => {
      console.error(`❌ Error downloading ${svgName}:`, error.message);
      resolve(null);
    });
  });
}

// Main download function
async function downloadCollection() {
  console.log('🎨 Starting download of "The Art Of Sexual Ecstasy" collection...');
  console.log(`📊 Total files to download: ${svgCollection.length}`);
  
  // Ensure directory exists
  const positionsDir = path.join(__dirname, '../public/positions/');
  if (!fs.existsSync(positionsDir)) {
    fs.mkdirSync(positionsDir, { recursive: true });
  }
  
  const downloadedFiles = [];
  
  // Download files one by one to avoid overwhelming the server
  for (let i = 0; i < svgCollection.length; i++) {
    const svgName = svgCollection[i];
    const result = await downloadSVG(svgName, i);
    if (result) {
      downloadedFiles.push(result);
    }
    
    // Add a small delay between downloads
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎉 Download complete!');
  console.log(`✅ Successfully downloaded: ${downloadedFiles.length} files`);
  console.log(`❌ Failed downloads: ${svgCollection.length - downloadedFiles.length} files`);
  
  // Generate position data template
  generatePositionData(downloadedFiles);
}

// Generate position data for lib/positions.ts
function generatePositionData(files) {
  console.log('\n📝 Generating position data template...');
  
  const positionData = files.map((file, index) => {
    const name = file.replace('.svg', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const key = file.replace('.svg', '').replace(/-/g, '');
    
    return `  { id: ${index + 100}, key: "${key}", name: "${name}", svgPath: "/positions/${file}", category: "ecstasy" },`;
  }).join('\n');
  
  const template = `
// New positions from "The Art Of Sexual Ecstasy" collection
// Add these to your lib/positions.ts file:

${positionData}

// Don't forget to also add categories for these new positions!
`;

  fs.writeFileSync(path.join(__dirname, 'new-positions-template.txt'), template);
  console.log('📄 Position data template saved to scripts/new-positions-template.txt');
}

// Manual alternative URLs (in case the API doesn't work)
function printManualDownloadInstructions() {
  console.log('\n📋 Manual Download Instructions:');
  console.log('If the automatic download doesn\'t work, you can manually download from:');
  console.log('https://www.svgfind.com/collection/40062/the-art-of-sexual-ecstasy/');
  console.log('\nFor each SVG:');
  console.log('1. Click on the SVG');
  console.log('2. Right-click and "Save As" to public/positions/ folder');
  console.log('3. Make sure to save with .svg extension');
}

if (require.main === module) {
  downloadCollection().catch(console.error);
  printManualDownloadInstructions();
}

module.exports = { downloadCollection, svgCollection }; 