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
  { type: 'aiRiskTension', notes: notes.aiRiskTension },    // 001
  { type: 'attackSetup', notes: notes.attackSetup },        // 002
  { type: 'attackLab' },                                    // 003
  { type: 'aiVocab', notes: notes.aiVocab },                // 004
  { type: 'aiVocabTerms', notes: notes.aiVocabTerms },      // 005
  { type: 'toolUse', notes: notes.toolUse },                // 006

  // === HANDOFF: Roddy presents CA Policies ===
  { type: 'handoff', presenter: 'Roddy Bergeron', topic: 'Conditional Access Attacks', subtitle: 'Turning Attacks Into Tests' }, // 007

  { type: 'caCrateIntro', notes: notes.caCrateIntro },      // 008 - CA Policy Monitor (follows Roddy's CA section)

  { type: 'sandwich', notes: notes.sandwich },              // 009
  { type: 'sandwichExample', notes: notes.sandwichExample },// 010

  // ============================================
  // PART 2: DEFENSIVE AUTOMATION (75 min)
  // "Same tools, your advantage"
  // ============================================

  { type: 'bridge', notes: notes.bridge },                  // 011
  { type: 'm365Drift', notes: notes.m365Drift },            // 012
  { type: 'patternApplications', notes: notes.patternApplications }, // 013
  { type: 'alertTriage', notes: notes.alertTriage },        // 014
  { type: 'tieredResponse', notes: notes.tieredResponse },  // 015

  // ============================================
  // PART 2.5: ENDPOINT PROTECTION TESTING
  // "Safely test endpoint detection"
  // Note: Break slide removed from sequence - press 'B' anytime to show break
  // ============================================

  // === HANDOFF: Roddy presents Endpoint Testing ===
  { type: 'handoff', presenter: 'Roddy Bergeron', topic: 'Endpoint Attack Testing', subtitle: 'Turning Attacks Into Tests - Part 2' }, // 016

  { type: 'safeEndpointTesting', notes: notes.safeEndpointTesting }, // 017
  { type: 'mirrorDesign', notes: notes.mirrorDesign },      // 018
  { type: 'powershellCode', notes: notes.powershellCode },  // 019
  { type: 'endpointSandwich', notes: notes.endpointSandwich }, // 020
  { type: 'safeSweepReportDemo', notes: notes.safeSweepReportDemo }, // 021

  // ============================================
  // PART 3: GOVERNANCE & TRUST (35 min)
  // "How to do this without getting fired"
  // ============================================

  // === HANDOFF: Roddy presents AI Pros/Cons ===
  { type: 'handoff', presenter: 'Roddy Bergeron', topic: 'The AI Arms Race', subtitle: 'Pros and Cons of AI in Security' }, // 022

  { type: 'governance', notes: notes.governance },           // 023
  { type: 'shadowAIRealStory', notes: notes.shadowAIRealStory }, // 024
  { type: 'shadowAI', notes: notes.shadowAI },               // 025
  // { type: 'aiCreatesLiability', notes: notes.aiCreatesLiability }, // commented out to save time
  // { type: 'aiEnablesAttacks', notes: notes.aiEnablesAttacks }, // commented out to save time
  { type: 'aiTabletop', notes: notes.aiTabletop }, // 026

  // ============================================
  // PART 4: MONDAY MORNING (30 min)
  // "What you actually do next"
  // ============================================

  { type: 'operationalization', notes: notes.operationalization }, // 027
  { type: 'tail', notes: notes.tail },                           // 028
  { type: 'sources' },                  // 029
  { type: 'closing' }                   // 030
];

// Re-export themes from centralized config
export { themes } from '../config/themes';
