const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// SVG URLs extracted from the page analysis
const svgUrls = [
  'https://www.svgfind.com/svg/7680536/tantric-tripura-yantra',
  'https://www.svgfind.com/svg/7680537/tantric-yantra',
  'https://www.svgfind.com/svg/7960685/superman-sex-positions',
  'https://www.svgfind.com/svg/7960686/sex-in-a-basket',
  'https://www.svgfind.com/svg/7960687/sexy-workout-sex-pose'
];

// Function to sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9\-]/gi, '-').toLowerCase();
}

// Function to extract name from URL
function extractNameFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

// Function to download a single SVG with multiple strategies
async function downloadSVG(page, url, index) {
  try {
    const name = extractNameFromUrl(url);
    console.log(`\n📥 [${index + 1}] Downloading: ${name}`);
    console.log(`🌐 URL: ${url}`);
    
    // Navigate to the SVG page
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Take a screenshot for debugging
    await page.screenshot({ path: path.join(__dirname, `debug-${name}.png`) });
    
    // Strategy 1: Look for download links
    console.log('🔍 Strategy 1: Looking for download links...');
    const downloadUrls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.map(link => ({
        href: link.href,
        text: link.textContent?.trim(),
        download: link.hasAttribute('download')
      })).filter(link => 
        link.href.includes('.svg') || 
        link.download || 
        link.text?.toLowerCase().includes('download')
      );
    });
    
    console.log(`📋 Found ${downloadUrls.length} potential download links:`, downloadUrls);
    
    // Strategy 2: Extract all SVG elements from the page
    console.log('🔍 Strategy 2: Extracting SVG elements...');
    const allSvgs = await page.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('svg'));
      return svgs.map((svg, index) => ({
        index,
        html: svg.outerHTML,
        width: svg.getAttribute('width'),
        height: svg.getAttribute('height'),
        viewBox: svg.getAttribute('viewBox'),
        classes: svg.className.baseVal || svg.className
      })).filter(svg => svg.html.length > 100); // Filter out small/icon SVGs
    });
    
    console.log(`📋 Found ${allSvgs.length} SVG elements:`, allSvgs.map(s => ({
      index: s.index,
      size: s.html.length,
      width: s.width,
      height: s.height,
      classes: s.classes
    })));
    
    // Strategy 3: Look for specific content containers
    console.log('🔍 Strategy 3: Looking for content containers...');
    const contentInfo = await page.evaluate(() => {
      const containers = [
        '.svg-content',
        '.main-content',
        '.icon-content',
        '.preview',
        '.download-section',
        'main',
        '.content'
      ];
      
      const info = {};
      containers.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          info[selector] = {
            exists: true,
            innerHTML: element.innerHTML.length,
            svgCount: element.querySelectorAll('svg').length
          };
        }
      });
      
      return info;
    });
    
    console.log('📋 Content containers:', contentInfo);
    
    // Strategy 4: Get page source and search for SVG patterns
    console.log('🔍 Strategy 4: Searching page source...');
    const pageSource = await page.content();
    const svgMatches = pageSource.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
    
    console.log(`📋 Found ${svgMatches.length} SVG patterns in source`);
    svgMatches.forEach((match, i) => {
      console.log(`  SVG ${i + 1}: ${match.length} characters`);
    });
    
    // Choose the best SVG (largest one that's not the search icon)
    let bestSvg = null;
    
    // First try the extracted SVGs from the DOM
    if (allSvgs.length > 0) {
      bestSvg = allSvgs.find(svg => !svg.html.includes('Search') && svg.html.length > 200) || allSvgs[0];
      console.log(`✅ Selected SVG from DOM extraction (${bestSvg.html.length} characters)`);
    }
    
    // If no good SVG from DOM, try the source matches
    if (!bestSvg && svgMatches.length > 0) {
      const goodMatch = svgMatches.find(match => !match.includes('Search') && match.length > 200);
      if (goodMatch) {
        bestSvg = { html: goodMatch };
        console.log(`✅ Selected SVG from source matching (${goodMatch.length} characters)`);
      }
    }
    
    if (bestSvg) {
      const fileName = `${sanitizeFilename(name)}.svg`;
      const filePath = path.join(__dirname, '../public/positions/', fileName);
      
      // Clean the SVG content
      const cleanSvg = bestSvg.html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"');
      
      fs.writeFileSync(filePath, cleanSvg);
      console.log(`✅ Successfully saved: ${fileName} (${cleanSvg.length} characters)`);
      return { success: true, fileName, name, size: cleanSvg.length };
    } else {
      console.log(`❌ No suitable SVG content found for: ${name}`);
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
  console.log('🚀 Starting improved SVG download');
  console.log(`📊 Total SVGs to download: ${svgUrls.length}`);
  console.log('🎨 Collection: "The Art Of Sexual Ecstasy" by Alice Noir\n');
  
  // Ensure positions directory exists
  const positionsDir = path.join(__dirname, '../public/positions/');
  if (!fs.existsSync(positionsDir)) {
    fs.mkdirSync(positionsDir, { recursive: true });
  }
  
  let browser;
  let successCount = 0;
  let failCount = 0;
  const downloadedFiles = [];
  
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Download each SVG
    for (let i = 0; i < svgUrls.length; i++) {
      const url = svgUrls[i];
      const result = await downloadSVG(page, url, i);
      
      if (result.success) {
        successCount++;
        downloadedFiles.push(result);
      } else {
        failCount++;
      }
      
      // Add delay between downloads
      if (i < svgUrls.length - 1) {
        console.log('⏳ Waiting 3 seconds before next download...');
        await new Promise(resolve => setTimeout(resolve, 3000));
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
  
  if (successCount > 0) {
    console.log('\n📁 Downloaded files:');
    downloadedFiles.forEach((file, i) => {
      console.log(`  ${i + 1}. ${file.fileName} (${file.size} chars)`);
    });
  }
}

// Run the script
if (require.main === module) {
  downloadAllSVGs()
    .then(() => {
      console.log('\n🏁 Improved download completed!');
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
    });
}

module.exports = { downloadAllSVGs }; 