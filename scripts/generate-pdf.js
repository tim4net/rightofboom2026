#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

// ⚠️  KEEP IN SYNC with src/data/slides.jsx
// Count slides: grep -c "type:" src/data/slides.jsx
const SLIDE_COUNT = 31; // Total slides (0-30)
const SKIP_SLIDES = []; // No slides skipped - mockups shown for demos
const DEMO_SLIDES = [4]; // AttackLab (index 4) has internal navigation - use PageDown to exit
const OUTPUT_FILE = 'presentation.pdf';
const BASE_URL = process.env.URL || 'http://localhost:2026';
const URL = `${BASE_URL}?pdf=true`; // PDF mode shows static mockups for demos

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport to 1920x1080 (standard presentation size)
  await page.setViewport({ width: 1920, height: 1080 });

  console.log(`Connecting to ${URL}...`);
  try {
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
  } catch (err) {
    console.error(`Failed to connect to ${URL}`);
    console.error('Make sure the dev server is running: npm run dev');
    await browser.close();
    process.exit(1);
  }

  // Wait for app to fully render
  await page.waitForSelector('[class*="h-screen"]', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));

  // Hide navigation UI, presenter notes, and overlays
  await page.addStyleTag({
    content: `
      footer { display: none !important; }
      button[title^="Theme"] { display: none !important; }
      .fixed.bottom-3.left-3 { display: none !important; }
      .fixed.bottom-0.left-0.right-0.h-1 { display: none !important; }
      .presenter-notes { display: none !important; }
    `
  });

  const screenshots = [];
  const slidesToCapture = SLIDE_COUNT - SKIP_SLIDES.length;
  let capturedCount = 0;

  for (let i = 0; i < SLIDE_COUNT; i++) {
    if (SKIP_SLIDES.includes(i)) {
      console.log(`Skipping slide ${i + 1} (demo slide)...`);
      // Use PageDown to skip demo slides, ArrowRight for others
      if (DEMO_SLIDES.includes(i)) {
        await page.keyboard.press('PageDown');
      } else {
        await page.keyboard.press('ArrowRight');
      }
      await new Promise(r => setTimeout(r, 300));
      continue;
    }

    capturedCount++;
    console.log(`Capturing slide ${capturedCount}/${slidesToCapture}...`);

    // Wait for any animations to complete
    await new Promise(r => setTimeout(r, 500));

    // Capture screenshot as PNG buffer
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });
    screenshots.push(screenshot);

    // Navigate to next slide (unless we're on the last one)
    if (i < SLIDE_COUNT - 1) {
      // Demo slides capture ArrowRight - use PageDown to force-exit
      if (DEMO_SLIDES.includes(i)) {
        await page.keyboard.press('PageDown');
      } else {
        await page.keyboard.press('ArrowRight');
      }
      await new Promise(r => setTimeout(r, 300));
    }
  }

  await browser.close();

  console.log('Combining screenshots into PDF...');

  // Create PDF from screenshots
  const pdfDoc = await PDFDocument.create();

  for (const screenshot of screenshots) {
    const pngImage = await pdfDoc.embedPng(screenshot);
    const pdfPage = pdfDoc.addPage([1920, 1080]);
    pdfPage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: 1920,
      height: 1080
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(OUTPUT_FILE, pdfBytes);

  console.log(`PDF saved to ${OUTPUT_FILE} (${slidesToCapture} slides)`);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
