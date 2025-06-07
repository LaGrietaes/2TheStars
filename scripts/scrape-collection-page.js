const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Function to scrape the main collection page
async function scrapeCollectionPage() {
  console.log('🚀 Starting collection page scraper');
  console.log('🌐 Target: https://www.svgfind.com/collection/40062/the-art-of-sexual-ecstasy/');
  
  let browser;
  let successCount = 0;
  
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await puppeteer.launch({ 
      headless: false, // Set to true to run in background
      defaultViewport: { width: 1280, height: 720 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to collection page
    console.log('📥 Loading collection page...');
    await page.goto('https://www.svgfind.com/collection/40062/the-art-of-sexual-ecstasy/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Extract all SVG links from the collection page
    console.log('🔍 Extracting SVG links...');
    const svgLinks = await page.evaluate(() => {
      const links = [];
      
      // Try different selectors to find SVG links
      const selectors = [
        'a[href*="/icon/"]',
        '.icon-item a',
        '.svg-item a', 
        '.collection-item a',
        '[class*="icon"] a',
        'a[href*="svg"]'
      ];
      
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const href = el.getAttribute('href');
          const text = el.textContent?.trim() || '';
          const imgSrc = el.querySelector('img')?.src || '';
          
          if (href && href.includes('/icon/')) {
            links.push({
              href: href.startsWith('http') ? href : `https://www.svgfind.com${href}`,
              text,
              imgSrc
            });
          }
        });
      }
      
      return [...new Set(links.map(l => JSON.stringify(l)))].map(l => JSON.parse(l));
    });
    
    console.log(`🎯 Found ${svgLinks.length} SVG links`);
    
    if (svgLinks.length === 0) {
      console.log('❌ No SVG links found. Let\'s try to get SVG names from the page...');
      
      // Alternative: Extract SVG names from the page text
      const svgNames = await page.evaluate(() => {
        const names = [];
        const textContent = document.body.textContent;
        
        // Look for patterns like "SVG File" in the text
        const matches = textContent.match(/[\w\s]+SVG File/gi);
        if (matches) {
          matches.forEach(match => {
            const name = match.replace(/\s+SVG\s+File/gi, '').trim()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '');
            if (name.length > 2) {
              names.push(name);
            }
          });
        }
        
        return [...new Set(names)];
      });
      
      console.log(`📝 Found ${svgNames.length} SVG names from page text`);
      svgNames.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));
      
      // Save the extracted names for manual downloading
      if (svgNames.length > 0) {
        const namesFile = path.join(__dirname, 'extracted-svg-names.json');
        fs.writeFileSync(namesFile, JSON.stringify(svgNames, null, 2));
        console.log(`💾 Saved SVG names to: ${namesFile}`);
      }
      
      return;
    }
    
    // Ensure positions directory exists
    const positionsDir = path.join(__dirname, '../public/positions/');
    if (!fs.existsSync(positionsDir)) {
      fs.mkdirSync(positionsDir, { recursive: true });
    }
    
    // Now visit each SVG link and download
    for (let i = 0; i < Math.min(svgLinks.length, 10); i++) { // Limit to 10 for testing
      const link = svgLinks[i];
      console.log(`\n📥 [${i + 1}/${svgLinks.length}] Processing: ${link.text}`);
      console.log(`🌐 URL: ${link.href}`);
      
      try {
        await page.goto(link.href, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Try to extract SVG content directly
        const svgContent = await page.evaluate(() => {
          // Look for SVG elements
          const svg = document.querySelector('svg') || 
                     document.querySelector('.svg-content svg') ||
                     document.querySelector('#svg-preview svg') ||
                     document.querySelector('[class*="preview"] svg') ||
                     document.querySelector('.icon-preview svg');
          
          if (svg) {
            return svg.outerHTML;
          }
          
          // Try to find SVG in page source
          const svgMatch = document.documentElement.innerHTML.match(/<svg[^>]*>[\s\S]*?<\/svg>/i);
          return svgMatch ? svgMatch[0] : null;
        });
        
        if (svgContent) {
          const fileName = `${link.text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}.svg`;
          const filePath = path.join(positionsDir, fileName);
          
          fs.writeFileSync(filePath, svgContent);
          console.log(`✅ Saved: ${fileName}`);
          successCount++;
        } else {
          console.log(`❌ No SVG content found`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${link.text}:`, error.message);
      }
      
      // Delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  console.log('\n🎉 Scraping completed!');
  console.log(`✅ Successfully downloaded: ${successCount} SVGs`);
  
  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Check public/positions/ folder');
    console.log('2. Update lib/positions.ts');
    console.log('3. Test in your app');
  }
}

// Alternative method: Try to directly download from collection page
async function extractFromCollectionPage() {
  console.log('🔄 Trying alternative extraction method...');
  
  let browser;
  
  try {
    browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: { width: 1280, height: 720 }
    });
    
    const page = await browser.newPage();
    await page.goto('https://www.svgfind.com/collection/40062/the-art-of-sexual-ecstasy/');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Take a screenshot to see what's on the page
    await page.screenshot({ 
      path: path.join(__dirname, 'collection-page-screenshot.png'),
      fullPage: true 
    });
    
    console.log('📸 Screenshot saved to scripts/collection-page-screenshot.png');
    
    // Extract all possible SVG-related information
    const pageInfo = await page.evaluate(() => {
      return {
        title: document.title,
        links: Array.from(document.querySelectorAll('a')).map(a => ({
          href: a.href,
          text: a.textContent?.trim(),
          classes: a.className
        })).filter(link => link.href.includes('svg') || link.href.includes('icon')),
        images: Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          classes: img.className
        })),
        svgElements: Array.from(document.querySelectorAll('svg')).map(svg => svg.outerHTML)
      };
    });
    
    console.log('📋 Page analysis:');
    console.log(`  Title: ${pageInfo.title}`);
    console.log(`  Links found: ${pageInfo.links.length}`);
    console.log(`  Images found: ${pageInfo.images.length}`);
    console.log(`  SVG elements: ${pageInfo.svgElements.length}`);
    
    // Save the analysis
    fs.writeFileSync(
      path.join(__dirname, 'page-analysis.json'), 
      JSON.stringify(pageInfo, null, 2)
    );
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the appropriate function
if (require.main === module) {
  const mode = process.argv[2] || 'scrape';
  
  if (mode === 'analyze') {
    extractFromCollectionPage();
  } else {
    scrapeCollectionPage();
  }
}

module.exports = { scrapeCollectionPage, extractFromCollectionPage }; 