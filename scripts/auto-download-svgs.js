const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// SVG names from The Art Of Sexual Ecstasy collection
// Based on the search results from svgfind.com
const svgList = [
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

// Function to sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9\-]/gi, '-').toLowerCase();
}

// Function to download a single SVG
async function downloadSVG(page, svgName, index) {
  try {
    const url = `https://www.svgfind.com/icon/${svgName}`;
    console.log(`\n📥 [${index + 1}/${svgList.length}] Downloading: ${svgName}`);
    console.log(`🌐 URL: ${url}`);
    
    // Navigate to the SVG page
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait a moment for page to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try multiple possible selectors for the download button
    const downloadSelectors = [
      'button[download]',
      'a[download]', 
      '.download-btn',
      '.download-button',
      'button:contains("Download")',
      'a:contains("Download")',
      '[class*="download"]',
      '.btn-download',
      '#download',
      'button[aria-label*="download"]'
    ];
    
    let downloadButton = null;
    for (const selector of downloadSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 3000 });
        downloadButton = await page.$(selector);
        if (downloadButton) {
          console.log(`✅ Found download button with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!downloadButton) {
      console.log(`❌ No download button found for: ${svgName}`);
      // Try to get the SVG content directly from the page
      return await extractSVGFromPage(page, svgName);
    }
    
    // Set up download path
    const downloadPath = path.join(__dirname, '../public/positions/');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }
    
    // Configure download behavior
    await page._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: downloadPath
    });
    
    // Click the download button
    await downloadButton.click();
    
    // Wait for download to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log(`✅ Successfully downloaded: ${svgName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error downloading ${svgName}:`, error.message);
    // Try alternative method - extract SVG content directly
    return await extractSVGFromPage(page, svgName);
  }
}

// Alternative method: Extract SVG content directly from the page
async function extractSVGFromPage(page, svgName) {
  try {
    console.log(`🔄 Trying alternative method for: ${svgName}`);
    
    // Look for SVG elements on the page
    const svgContent = await page.evaluate(() => {
      // Try different ways to find the SVG
      const svgElement = document.querySelector('svg') || 
                        document.querySelector('.svg-content svg') ||
                        document.querySelector('#svg-preview svg') ||
                        document.querySelector('[class*="preview"] svg');
      
      if (svgElement) {
        return svgElement.outerHTML;
      }
      
      // If no SVG found, try to find it in the page source
      const svgMatch = document.documentElement.innerHTML.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
      return svgMatch ? svgMatch[0] : null;
    });
    
    if (svgContent) {
      const filename = `${sanitizeFilename(svgName)}.svg`;
      const filepath = path.join(__dirname, '../public/positions/', filename);
      fs.writeFileSync(filepath, svgContent);
      console.log(`✅ Extracted SVG content for: ${filename}`);
      return true;
    } else {
      console.log(`❌ No SVG content found for: ${svgName}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error extracting SVG for ${svgName}:`, error.message);
    return false;
  }
}

// Main download function
async function downloadAllSVGs() {
  console.log('🚀 Starting automated SVG download from SVGFind.com');
  console.log(`📊 Total SVGs to download: ${svgList.length}`);
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
  
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({ 
      headless: false, // Set to true to run in background
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set user agent to avoid being blocked
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Download each SVG
    for (let i = 0; i < svgList.length; i++) {
      const svgName = svgList[i];
      const success = await downloadSVG(page, svgName, i);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Add delay between downloads to be respectful
      if (i < svgList.length - 1) {
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
  console.log(`📊 Success rate: ${((successCount / svgList.length) * 100).toFixed(1)}%`);
  
  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Check the public/positions/ folder for downloaded SVGs');
    console.log('2. Update lib/positions.ts to include new positions');
    console.log('3. Restart your dev server: npm run dev');
    
    // Generate position template
    generatePositionTemplate(successCount);
  }
}

// Generate position data template
function generatePositionTemplate(count) {
  console.log('\n📄 Generating position template...');
  
  const template = `
// Add these new positions to your lib/positions.ts file:
// Generated from "The Art Of Sexual Ecstasy" collection

// Example entries (update the names and keys as needed):
${svgList.slice(0, Math.min(count, 10)).map((svg, index) => {
  const name = svg.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const key = svg.replace(/-/g, '');
  return `  { id: ${100 + index}, key: "${key}", name: "${name}", svgPath: "/positions/${sanitizeFilename(svg)}.svg", category: "ecstasy" },`;
}).join('\n')}

// Don't forget to:
// 1. Add "ecstasy" to your position categories
// 2. Update position names to be more user-friendly
// 3. Test that all SVGs load correctly
`;

  fs.writeFileSync(path.join(__dirname, 'new-positions-template.txt'), template);
  console.log('📄 Template saved to scripts/new-positions-template.txt');
}

// Manual instructions fallback
function printManualInstructions() {
  console.log('\n📋 If automated download fails, here are manual instructions:');
  console.log('1. Visit: https://www.svgfind.com/collection/40062/the-art-of-sexual-ecstasy/');
  console.log('2. Click on each SVG individually');
  console.log('3. Look for a download button or right-click → "Save as"');
  console.log('4. Save to public/positions/ folder with .svg extension');
}

// Run the script
if (require.main === module) {
  downloadAllSVGs()
    .then(() => {
      console.log('\n🏁 Script completed!');
      printManualInstructions();
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      printManualInstructions();
    });
}

module.exports = { downloadAllSVGs, svgList }; 