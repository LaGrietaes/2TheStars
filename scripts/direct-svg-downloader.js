const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// SVG URLs extracted from the page analysis
const svgUrls = [
  'https://www.svgfind.com/svg/7680536/tantric-tripura-yantra',
  'https://www.svgfind.com/svg/7680537/tantric-yantra',
  'https://www.svgfind.com/svg/7960685/superman-sex-positions',
  'https://www.svgfind.com/svg/7960686/sex-in-a-basket',
  'https://www.svgfind.com/svg/7960687/sexy-workout-sex-pose',
  'https://www.svgfind.com/svg/7960688/ecstasy-sex-position',
  'https://www.svgfind.com/svg/7960689/london-bridge-sex-position',
  'https://www.svgfind.com/svg/7960690/narcissus-position',
  'https://www.svgfind.com/svg/7960691/prison-guard-sex',
  'https://www.svgfind.com/svg/7960692/caramel-sex-position',
  'https://www.svgfind.com/svg/7960693/aquarius-love-sign',
  'https://www.svgfind.com/svg/7960694/dragon-sex-position',
  'https://www.svgfind.com/svg/7960695/diaphragm-sex-pose',
  'https://www.svgfind.com/svg/7960696/erotic-bow-sex-pose',
  'https://www.svgfind.com/svg/7960697/frog-sex-positions',
  'https://www.svgfind.com/svg/7960698/gemini-position',
  'https://www.svgfind.com/svg/7960699/yin-yang-sex',
  'https://www.svgfind.com/svg/7960700/basset-hound-cock-pose',
  'https://www.svgfind.com/svg/7960701/sexy-chair-sex-pose',
  'https://www.svgfind.com/svg/7960702/rose-sex-position',
  'https://www.svgfind.com/svg/7960703/pisces-sex-position',
  'https://www.svgfind.com/svg/7960704/aquarius-love-sex',
  'https://www.svgfind.com/svg/7960705/arch-pose',
  'https://www.svgfind.com/svg/7960706/piledriver-sex',
  'https://www.svgfind.com/svg/7960707/best-capricorn-sex-pose',
  'https://www.svgfind.com/svg/7960708/gay-rainbow-sex-pose',
  'https://www.svgfind.com/svg/7960709/starfish-sex-position',
  'https://www.svgfind.com/svg/7960710/69',
  'https://www.svgfind.com/svg/7960711/erotic-waterfall-sex-pose',
  'https://www.svgfind.com/svg/7960712/reverse-cowgirl-sex-position',
  'https://www.svgfind.com/svg/7960713/nuns-having-sex',
  'https://www.svgfind.com/svg/7960714/gemini-sex-position',
  'https://www.svgfind.com/svg/7960715/sex-in-a-lock',
  'https://www.svgfind.com/svg/7960716/sex-whisper-pose',
  'https://www.svgfind.com/svg/7960717/nirvana-sex-position',
  'https://www.svgfind.com/svg/7960718/sex-position',
  'https://www.svgfind.com/svg/7960719/bud-sex-position',
  'https://www.svgfind.com/svg/7960720/eiffel-tower-sex-positions',
  'https://www.svgfind.com/svg/7960721/zeus-sex-position',
  'https://www.svgfind.com/svg/7960722/spoon-sex-position',
  'https://www.svgfind.com/svg/7960723/dominant-sex-pose',
  'https://www.svgfind.com/svg/7960724/spiderman-sex-position',
  'https://www.svgfind.com/svg/7960725/sexual-poses',
  'https://www.svgfind.com/svg/7960726/captain-sex-pose-pics',
  'https://www.svgfind.com/svg/7960727/italian-chandelier-sex-positions',
  'https://www.svgfind.com/svg/7960728/cancer-sex-positions',
  'https://www.svgfind.com/svg/7960729/train-sex-positions',
  'https://www.svgfind.com/svg/7960730/rabbit-ears-sex-position',
  'https://www.svgfind.com/svg/7960731/new-ribbon-sex-pose',
  'https://www.svgfind.com/svg/7960732/sex-with-joystick'
];

// Function to sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9\-]/gi, '-').toLowerCase();
}

// Function to extract name from URL
function extractNameFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 1]; // Get the last part (the name)
}

// Function to download a single SVG
async function downloadSVG(page, url, index) {
  try {
    const name = extractNameFromUrl(url);
    console.log(`\n📥 [${index + 1}/${svgUrls.length}] Downloading: ${name}`);
    console.log(`🌐 URL: ${url}`);
    
    // Navigate to the SVG page
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract SVG content from the page
    const svgContent = await page.evaluate(() => {
      // Try multiple selectors to find the SVG
      const selectors = [
        'svg',
        '.svg-content svg',
        '#svg-preview svg',
        '.preview svg',
        '.icon-preview svg',
        '.main-svg svg',
        'main svg',
        '.content svg'
      ];
      
      for (const selector of selectors) {
        const svg = document.querySelector(selector);
        if (svg && svg.outerHTML && svg.outerHTML.includes('<svg')) {
          return svg.outerHTML;
        }
      }
      
      // Try to find SVG in the page source
      const svgMatch = document.documentElement.innerHTML.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
      return svgMatch ? svgMatch[0] : null;
    });
    
    if (svgContent) {
      const fileName = `${sanitizeFilename(name)}.svg`;
      const filePath = path.join(__dirname, '../public/positions/', fileName);
      
      // Ensure the SVG is properly formatted
      const cleanSvg = svgContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      
      fs.writeFileSync(filePath, cleanSvg);
      console.log(`✅ Successfully saved: ${fileName}`);
      return { success: true, fileName, name };
    } else {
      console.log(`❌ No SVG content found for: ${name}`);
      return { success: false, fileName: null, name };
    }
    
  } catch (error) {
    const name = extractNameFromUrl(url);
    console.error(`❌ Error downloading ${name}:`, error.message);
    return { success: false, fileName: null, name };
  }
}

// Main download function
async function downloadAllSVGs() {
  console.log('🚀 Starting direct SVG download');
  console.log(`📊 Total SVGs to download: ${svgUrls.length}`);
  console.log('🎨 Collection: "The Art Of Sexual Ecstasy" by Alice Noir');
  console.log('⚖️ License: Creative Commons\n');
  
  // Ensure positions directory exists
  const positionsDir = path.join(__dirname, '../public/positions/');
  if (!fs.existsSync(positionsDir)) {
    fs.mkdirSync(positionsDir, { recursive: true });
    console.log('📁 Created positions directory');
  }
  
  let browser;
  let successCount = 0;
  let failCount = 0;
  const downloadedFiles = [];
  
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({ 
      headless: false, // Set to true to run in background
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Download each SVG (limit to 10 for testing)
    const urlsToDownload = svgUrls.slice(0, 10); // Remove this limit to download all
    
    for (let i = 0; i < urlsToDownload.length; i++) {
      const url = urlsToDownload[i];
      const result = await downloadSVG(page, url, i);
      
      if (result.success) {
        successCount++;
        downloadedFiles.push(result);
      } else {
        failCount++;
      }
      
      // Add delay between downloads
      if (i < urlsToDownload.length - 1) {
        console.log('⏳ Waiting 2 seconds before next download...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // Final report
  console.log('\n🎉 Download Summary:');
  console.log(`✅ Successfully downloaded: ${successCount} SVGs`);
  console.log(`❌ Failed downloads: ${failCount} SVGs`);
  console.log(`📊 Success rate: ${((successCount / (successCount + failCount)) * 100).toFixed(1)}%`);
  
  if (successCount > 0) {
    console.log('\n📁 Downloaded files:');
    downloadedFiles.forEach((file, i) => {
      console.log(`  ${i + 1}. ${file.fileName} (${file.name})`);
    });
    
    console.log('\n📝 Next steps:');
    console.log('1. Check public/positions/ folder for downloaded SVGs');
    console.log('2. Update lib/positions.ts to include new positions');
    console.log('3. Restart your dev server: npm run dev');
    
    // Generate position template
    generatePositionTemplate(downloadedFiles);
  }
}

// Generate position data template
function generatePositionTemplate(downloadedFiles) {
  console.log('\n📄 Generating position template...');
  
  const template = `
// Add these new positions to your lib/positions.ts file:
// Generated from "The Art Of Sexual Ecstasy" collection

${downloadedFiles.map((file, index) => {
  const name = file.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const key = file.name.replace(/-/g, '').toLowerCase();
  return `  { id: ${100 + index}, key: "${key}", name: "${name}", svgPath: "/positions/${file.fileName}", category: "ecstasy" },`;
}).join('\n')}

// Don't forget to:
// 1. Add "ecstasy" to your position categories if not already added
// 2. Update position names to be more user-friendly
// 3. Test that all SVGs load correctly in your app
`;

  fs.writeFileSync(path.join(__dirname, 'generated-positions.txt'), template);
  console.log('📄 Template saved to scripts/generated-positions.txt');
}

// Run the script
if (require.main === module) {
  downloadAllSVGs()
    .then(() => {
      console.log('\n🏁 Direct download completed!');
      console.log('\n💡 Tips:');
      console.log('- If some downloads failed, try running the script again');
      console.log('- You can edit the urlsToDownload limit in the script to download more');
      console.log('- All downloaded SVGs are ready to use in your 2TheStars app!');
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
    });
}

module.exports = { downloadAllSVGs, svgUrls }; 