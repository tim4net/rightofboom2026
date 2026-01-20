#!/usr/bin/env node

import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

const SLIDE_COUNT = 26; // Total slides (0-25)
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

  const screenshots = [];

  for (let i = 0; i < SLIDE_COUNT; i++) {
    console.log(`Capturing slide ${i + 1}/${SLIDE_COUNT}...`);

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

  console.log(`PDF saved to ${OUTPUT_FILE}`);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
