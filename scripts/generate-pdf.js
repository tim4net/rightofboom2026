#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

const SLIDE_COUNT = 26; // Total slides (0-25)
const SKIP_SLIDES = [3]; // Slide indices to skip (attackLab demo)
const SELF_NAVIGATING_SLIDES = [3]; // Slides that capture ArrowRight (use Escape to exit)
const OUTPUT_FILE = 'presentation.pdf';
const URL = process.env.URL || 'http://localhost:2026';

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

  // Hide navigation UI (footer buttons, theme switcher, progress bar)
  await page.addStyleTag({
    content: `
      footer { display: none !important; }
      button[title^="Theme"] { display: none !important; }
      .fixed.bottom-3.left-3 { display: none !important; }
      .fixed.bottom-0.left-0.right-0.h-1 { display: none !important; }
    `
  });

  const screenshots = [];
  const slidesToCapture = SLIDE_COUNT - SKIP_SLIDES.length;
  let capturedCount = 0;

  for (let i = 0; i < SLIDE_COUNT; i++) {
    if (SKIP_SLIDES.includes(i)) {
      console.log(`Skipping slide ${i + 1} (demo slide)...`);
      // Self-navigating slides need Escape to exit, not ArrowRight
      if (SELF_NAVIGATING_SLIDES.includes(i)) {
        await page.keyboard.press('Escape');
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
      // Check if NEXT slide is self-navigating (we need ArrowRight to GET there)
      await page.keyboard.press('ArrowRight');
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
