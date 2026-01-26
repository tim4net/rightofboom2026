import React from 'react';
import {
  Shield,
  Cpu,
  Lock,
  Brain,
  ShieldCheck,
  Scale,
  Zap,
  Users,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { notes } from './notes';

// ============================================
// SLIDE DATA - Right of Boom 2026
// "Think Like an Attacker" - 3-hour presentation
//
// NOTE: All text content is now self-contained
// in the individual slide components.
// This file contains ONLY metadata (slide type & order).
// Presenter notes are in ./notes.js for easy editing.
//
// ⚠️  WHEN ADDING/REMOVING SLIDES: Update scripts/generate-pdf.js
//     - SLIDE_COUNT must match total slides
//     - DEMO_SLIDES must list indices of interactive demos (e.g., attackLab)
// ============================================

export const slides = [
  // ============================================
  // PART 1: THE LANDSCAPE (25 min)
  // "What's actually happening"
  // ============================================

  { type: 'title' },                                        // 000
  { type: 'intro' },                                        // 001
  { type: 'aiRiskTension', notes: notes.aiRiskTension },    // 002
  { type: 'attackSetup', notes: notes.attackSetup },        // 003
  { type: 'attackLab' },                                    // 004
  { type: 'aiVocab', notes: notes.aiVocab },                // 005
  { type: 'aiVocabTerms', notes: notes.aiVocabTerms },      // 006
  { type: 'toolUse', notes: notes.toolUse },                // 007
  { type: 'sandwich', notes: notes.sandwich },              // 008
  { type: 'sandwichExample', notes: notes.sandwichExample },// 009

  // ============================================
  // PART 2: DEFENSIVE AUTOMATION (75 min)
  // "Same tools, your advantage"
  // ============================================

  { type: 'bridge', notes: notes.bridge },                  // 010
  { type: 'caCrateIntro', notes: notes.caCrateIntro },      // 011
  { type: 'm365Drift', notes: notes.m365Drift },            // 012
  { type: 'patternApplications', notes: notes.patternApplications }, // 013
  { type: 'alertTriage', notes: notes.alertTriage },        // 014
  { type: 'tieredResponse', notes: notes.tieredResponse },  // 015

  // ============================================
  // PART 2.5: ENDPOINT PROTECTION TESTING
  // "Safely test endpoint detection"
  // Note: Break slide removed from sequence - press 'B' anytime to show break
  // ============================================

  { type: 'safeEndpointTesting', notes: notes.safeEndpointTesting }, // 016
  { type: 'mirrorDesign', notes: notes.mirrorDesign },      // 017
  { type: 'powershellCode', notes: notes.powershellCode },  // 018
  { type: 'endpointSandwich', notes: notes.endpointSandwich }, // 019
  { type: 'safeSweepReportDemo', notes: notes.safeSweepReportDemo }, // 020

  // ============================================
  // PART 3: GOVERNANCE & TRUST (35 min)
  // "How to do this without getting fired"
  // ============================================

  { type: 'governance' },               // 021
  { type: 'shadowAI' },                 // 022
  { type: 'aiCreatesLiability' },       // 023
  { type: 'aiEnablesAttacks' },         // 024
  { type: 'aiTabletop', notes: notes.aiTabletop }, // 025

  // ============================================
  // PART 4: MONDAY MORNING (30 min)
  // "What you actually do next"
  // ============================================

  { type: 'operationalization' },       // 026
  { type: 'tail' },                     // 027
  { type: 'insurance' },                // 028
  { type: 'sources' },                  // 029
  { type: 'closing' }                   // 030
];

// Re-export themes from centralized config
export { themes } from '../config/themes';
