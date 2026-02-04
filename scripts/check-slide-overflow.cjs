/**
 * Playwright script to detect slide overflow issues at 100% zoom
 * Run with: node scripts/check-slide-overflow.cjs
 *
 * Options:
 *   --screenshots    Take screenshots of each slide
 *   --threshold=N    Pixels beyond viewport to flag (default: 5)
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const VIEWPORT = { width: 1920, height: 1080 };
const BASE_URL = process.env.BASE_URL || 'http://localhost:2027';
const TAKE_SCREENSHOTS = process.argv.includes('--screenshots');
const THRESHOLD = parseInt(process.argv.find(a => a.startsWith('--threshold='))?.split('=')[1] || '5');

async function checkSlideOverflow() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  if (TAKE_SCREENSHOTS) {
    const screenshotDir = path.join(__dirname, '..', 'slide-screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
  }

  console.log('Checking slides for overflow at 1920x1080...');
  console.log(`Threshold: ${THRESHOLD}px beyond viewport\n`);

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);

  const totalSlides = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/\d+\s*\/\s*(\d+)/);
    return match ? parseInt(match[1]) : 45;
  });

  console.log(`Found ${totalSlides} slides to check\n`);

  const issues = [];

  for (let slideNum = 1; slideNum <= totalSlides; slideNum++) {
    await page.waitForTimeout(250);

    // Check for overflow and clipping issues
    const overflowData = await page.evaluate((threshold) => {
      const results = {
        hasOverflow: false,
        slideTitle: '',
        slideNumber: '',
        issues: [],
        bottomMostElement: { y: 0, text: '' },
        clippedContent: []
      };

      // Get slide number
      const counterMatch = document.body.innerText.match(/(\d+)\s*\/\s*\d+/);
      results.slideNumber = counterMatch ? counterMatch[1] : '?';

      // Get slide title
      const titleEl = document.querySelector('main h1, main h2, h1, h2');
      results.slideTitle = titleEl?.textContent?.trim().slice(0, 60) || 'Unknown';

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Find all visible content elements
      const elements = document.querySelectorAll('h1, h2, h3, h4, p, div, span, li, td, th, pre, code, button, a');
      let maxBottom = 0;
      let maxBottomEl = null;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);

        // Skip invisible elements
        if (style.display === 'none' || style.visibility === 'hidden') continue;
        if (style.opacity === '0') continue;
        if (rect.width < 5 || rect.height < 5) continue;

        // Track bottom-most element
        if (rect.bottom > maxBottom) {
          maxBottom = rect.bottom;
          maxBottomEl = el;
        }

        // Check for content below viewport
        if (rect.bottom > viewportHeight + threshold) {
          const text = el.textContent?.trim().slice(0, 80);
          if (text && text.length > 3) {
            results.hasOverflow = true;
            const overflow = Math.round(rect.bottom - viewportHeight);
            results.issues.push({
              type: 'below_viewport',
              text: text,
              overflow: overflow,
              tagName: el.tagName.toLowerCase()
            });
          }
        }

        // Check for content right of viewport
        if (rect.right > viewportWidth + threshold) {
          const text = el.textContent?.trim().slice(0, 50);
          if (text) {
            results.hasOverflow = true;
            results.issues.push({
              type: 'right_of_viewport',
              text: text,
              overflow: Math.round(rect.right - viewportWidth)
            });
          }
        }

        // Check for clipping by parent with overflow: hidden
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          const parentStyle = window.getComputedStyle(parent);
          if (parentStyle.overflow === 'hidden' || parentStyle.overflowY === 'hidden') {
            const parentRect = parent.getBoundingClientRect();
            if (rect.bottom > parentRect.bottom + 2 && rect.bottom > 0) {
              // Content is being clipped
              const clipAmount = Math.round(rect.bottom - parentRect.bottom);
              if (clipAmount > 10) {
                const text = el.textContent?.trim().slice(0, 50);
                if (text && text.length > 5) {
                  results.clippedContent.push({
                    text: text,
                    clipAmount: clipAmount,
                    clipper: parent.className || parent.tagName
                  });
                }
              }
            }
          }
          parent = parent.parentElement;
        }
      }

      // Record bottom-most element position
      if (maxBottomEl) {
        results.bottomMostElement = {
          y: Math.round(maxBottom),
          text: maxBottomEl.textContent?.trim().slice(0, 50) || '',
          margin: Math.round(viewportHeight - maxBottom)
        };
      }

      // Deduplicate issues
      const seen = new Set();
      results.issues = results.issues.filter(issue => {
        const key = issue.text.slice(0, 30);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 5);

      results.clippedContent = results.clippedContent.slice(0, 3);

      return results;
    }, THRESHOLD);

    const displayNum = parseInt(overflowData.slideNumber) || slideNum;
    const title = overflowData.slideTitle;

    // Take screenshot if requested
    if (TAKE_SCREENSHOTS) {
      const screenshotPath = path.join(__dirname, '..', 'slide-screenshots', `slide-${String(displayNum).padStart(2, '0')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
    }

    // Report findings
    if (overflowData.hasOverflow || overflowData.clippedContent.length > 0) {
      const totalOverflow = Math.max(...overflowData.issues.map(i => i.overflow || 0), 0);

      issues.push({
        slideNum: displayNum,
        title: title,
        overflowAmount: totalOverflow,
        issues: overflowData.issues,
        clipped: overflowData.clippedContent,
        bottomY: overflowData.bottomMostElement.y
      });

      console.log(`❌ Slide ${String(displayNum).padStart(2)}: ${title}`);
      if (totalOverflow > 0) {
        console.log(`   Content extends ${totalOverflow}px below viewport`);
      }
      if (overflowData.clippedContent.length > 0) {
        console.log(`   ✂️  ${overflowData.clippedContent.length} element(s) being clipped`);
      }
    } else {
      // Show margin info for slides that are close to the edge
      const margin = overflowData.bottomMostElement.margin;
      let status = '✓ ';
      if (margin < 20) {
        status = '⚠️';
      }
      console.log(`${status} Slide ${String(displayNum).padStart(2)}: ${title} (${margin}px margin)`);
    }

    // Navigate to next slide
    if (slideNum < totalSlides) {
      await page.keyboard.press('PageDown');
      await page.waitForTimeout(350);
    }
  }

  await browser.close();

  // Summary Report
  console.log('\n' + '═'.repeat(70));
  console.log('SLIDE OVERFLOW REPORT');
  console.log('═'.repeat(70));

  if (issues.length === 0) {
    console.log('\n✅ All slides fit within 1920x1080 viewport!\n');
  } else {
    issues.sort((a, b) => (b.overflowAmount || 0) - (a.overflowAmount || 0));

    console.log(`\n❌ ${issues.length} slides have potential issues:\n`);

    issues.forEach(issue => {
      console.log(`Slide ${String(issue.slideNum).padStart(2)}: ${issue.title}`);

      if (issue.overflowAmount > 0) {
        console.log(`  → ${issue.overflowAmount}px below viewport`);
      }

      if (issue.issues.length > 0) {
        console.log('  Content affected:');
        issue.issues.slice(0, 3).forEach(i => {
          console.log(`    - "${i.text.slice(0, 45)}..." (+${i.overflow}px)`);
        });
      }

      if (issue.clipped.length > 0) {
        console.log('  Clipped by overflow:hidden:');
        issue.clipped.forEach(c => {
          console.log(`    - "${c.text.slice(0, 40)}..." (${c.clipAmount}px cut)`);
        });
      }
      console.log('');
    });
  }

  if (TAKE_SCREENSHOTS) {
    console.log(`📸 Screenshots saved to: slide-screenshots/`);
  }

  return issues;
}

checkSlideOverflow().catch(console.error);
