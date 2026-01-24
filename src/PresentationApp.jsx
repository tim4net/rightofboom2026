import React, { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';

// Layout components
import { Footer, PresenterNotes } from './components/layout';

// Slide components (all numbered slides now in /slides)
import {
  TitleSlide,
  ContentSlide,
  GridSlide,
  ThreatSlide,
  SandwichSlide,
  EvolutionSlide,
  BreakSlide,
  ControlsSlide,
  ClosingSlide,
  ImageSlide,
  CISDeepDiveSlide,
  BridgeSlide,
  OperationalizationSlide,
  LiveDemoSlide,
  IntroSlide,
  MultiTenantSlide,
  BudgetSlide,
  LearningPathSlide,
  FailureModesSlide,
  ShadowAISlide,
  TAILSlide,
  InsuranceSlide,
  SourcesSlide,
  GovernanceSlide,
  AttackSetupSlide,
  AIRiskTensionSlide,
  AIVocabSlide,
  AIVocabTermsSlide,
  ToolUseSlide,
  SandwichExampleSlide,
  // Slides moved from /demos
  AttackLabSlide,
  CACrateIntroSlide,
  M365DriftSlide,
  PatternApplicationsSlide,
  AlertTriageSlide,
  TieredResponseSlide,
  TakeawaysSlide,
  // NEW: Endpoint Protection Testing Section
  SafeEndpointTestingSlide,
  PowerShellCodeSlide,
  AttackerChecklistSlide,
  EndpointSandwichSlide,
  SafeSweepResultsSlide,
  SafeSweepReportDemoSlide,
  // NEW: AI Tabletop Exercises
  AITabletopSlide
} from './components/slides';

// Demo components (interactive demos, not slides)
import {
  AIReconDemo,
  AttackDemo,
  EvolutionRace,
  TokenHeistDemo,
  DeterminismDemo,
  NetworkSegmentationDemo,
  AlertTriageDemo,
  EndpointValidationDemo,
  ClaudeCodeDemo,
  AttackPathValidatorDemo
} from './DemoComponents';

// Data
import { slides, themes } from './data/slides';

const PresentationApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState('corporate');
  const [showNotes, setShowNotes] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [demoMode, setDemoMode] = useState(true);
  const timerRef = useRef(null);
  const t = themes[theme];

  // Timer logic
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleTimer = () => setTimerRunning(!timerRunning);
  const resetTimer = () => { setTimerRunning(false); setElapsedTime(0); };

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Slide types that handle their own keyboard navigation (don't intercept SPACE/arrows)
  const selfNavigatingSlides = ['attackLab', 'attackPathValidator'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSlideType = slides[currentSlide]?.type;
      const isSelfNavigating = selfNavigatingSlides.includes(currentSlideType);

      // PageDown always advances (used by PDF generation to skip demo internals)
      if (e.key === 'PageDown') {
        nextSlide();
        return;
      }

      // For demo slides that handle their own navigation, only allow certain keys
      if (isSelfNavigating) {
        // Only intercept non-navigation keys (notes, timer, etc.)
        if (e.key === 'n' || e.key === 'N') setShowNotes(prev => !prev);
        if (e.key === 't' || e.key === 'T') toggleTimer();
        if (e.key === 'd' || e.key === 'D') setDemoMode(prev => !prev);
        // Escape exits the demo slide
        if (e.key === 'Escape') nextSlide();
        return;
      }

      // Normal slide navigation
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'n' || e.key === 'N') setShowNotes(prev => !prev);
      if (e.key === 't' || e.key === 'T') toggleTimer();
      if (e.key === 'r' || e.key === 'R') resetTimer();
      if (e.key === 'd' || e.key === 'D') setDemoMode(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];
  const themeClass = theme === 'terminal' ? 'theme-terminal' : theme === 'dramatic' ? 'theme-dramatic' : '';

  // Render the appropriate slide component based on type
  const renderSlide = () => {
    switch (slide.type) {
      case 'title':
        return <TitleSlide theme={t} />;

      case 'intro':
        return <IntroSlide theme={t} />;

      case 'aiRiskTension':
        return <AIRiskTensionSlide theme={t} />;

      case 'content':
        return <ContentSlide slide={slide} theme={t} />;

      case 'grid':
        return <GridSlide slide={slide} theme={t} />;

      case 'controls':
        return <ControlsSlide slide={slide} theme={t} />;

      case 'threat':
        return <ThreatSlide slide={slide} theme={t} themeName={theme} />;

      case 'aiVocab':
        return <AIVocabSlide theme={t} />;

      case 'aiVocabTerms':
        return <AIVocabTermsSlide theme={t} />;

      case 'toolUse':
        return <ToolUseSlide theme={t} />;

      case 'sandwich':
        return <SandwichSlide theme={t} />;

      case 'sandwichExample':
        return <SandwichExampleSlide theme={t} />;

      case 'evolution':
        return <EvolutionSlide slide={slide} theme={t} />;

      case 'break':
        return <BreakSlide theme={t} />;

      case 'closing':
        return <ClosingSlide theme={t} />;

      case 'image':
        return <ImageSlide slide={slide} theme={t} />;

      case 'cisDeepDive':
        return <CISDeepDiveSlide slide={slide} theme={t} />;

      case 'bridge':
        return <BridgeSlide theme={t} />;

      case 'operationalization':
        return <OperationalizationSlide theme={t} />;

      case 'liveDemo':
        return <LiveDemoSlide slide={slide} theme={t} />;

      case 'takeaways':
        return <TakeawaysSlide theme={t} />;

      // Demo components
      case 'aiRecon':
        return (
          <div className="animate-in fade-in duration-500">
            <AIReconDemo theme={t} />
          </div>
        );

      case 'attackLab':
        return (
          <div className="animate-in fade-in duration-500 w-full h-full">
            <AttackLabSlide theme={t} />
          </div>
        );

      case 'attackDemo':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
              <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
            </div>
            <AttackDemo theme={t} />
          </div>
        );

      case 'tokenHeist':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
              <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
            </div>
            <TokenHeistDemo theme={t} />
          </div>
        );

      case 'determinismDemo':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-6">
              <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
              <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
            </div>
            <DeterminismDemo theme={t} />
          </div>
        );

      case 'caCrateIntro':
        return (
          <div className="animate-in fade-in duration-500">
            <CACrateIntroSlide theme={t} />
          </div>
        );

      case 'm365Drift':
        return (
          <div className="animate-in fade-in duration-500">
            <M365DriftSlide theme={t} />
          </div>
        );

      case 'patternApplications':
        return (
          <div className="animate-in fade-in duration-500">
            <PatternApplicationsSlide theme={t} />
          </div>
        );

      case 'networkSeg':
        return (
          <div className="animate-in fade-in duration-500">
            <NetworkSegmentationDemo theme={t} />
          </div>
        );

      case 'alertTriage':
        return (
          <div className="animate-in fade-in duration-500">
            <AlertTriageSlide theme={t} />
          </div>
        );

      case 'tieredResponse':
        return (
          <div className="animate-in fade-in duration-500">
            <TieredResponseSlide theme={t} />
          </div>
        );

      case 'endpointValidation':
        return (
          <div className="animate-in fade-in duration-500">
            <EndpointValidationDemo theme={t} />
          </div>
        );

      case 'attackPathValidator':
        return (
          <div className="animate-in fade-in duration-500 w-full h-full">
            <AttackPathValidatorDemo theme={t} />
          </div>
        );

      case 'evolutionRace':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
              <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
            </div>
            <EvolutionRace theme={t} />
          </div>
        );

      case 'claudeCode':
        return (
          <div className="animate-in fade-in duration-500">
            <ClaudeCodeDemo theme={t} />
          </div>
        );

      // New slide types for 2026 content
      case 'multiTenant':
        return <MultiTenantSlide theme={t} />;

      case 'budget':
        return <BudgetSlide theme={t} />;

      case 'learningPath':
        return <LearningPathSlide theme={t} />;

      case 'failureModes':
        return <FailureModesSlide theme={t} />;

      case 'shadowAI':
        return <ShadowAISlide theme={t} />;

      case 'tail':
        return <TAILSlide theme={t} />;

      case 'insurance':
        return <InsuranceSlide theme={t} />;

      case 'sources':
        return <SourcesSlide theme={t} />;

      case 'governance':
        return <GovernanceSlide theme={t} />;

      case 'attackSetup':
        return <AttackSetupSlide theme={t} />;

      // Endpoint Protection Testing Section (after Break)
      case 'safeEndpointTesting':
        return <SafeEndpointTestingSlide theme={t} />;

      case 'powershellCode':
        return <PowerShellCodeSlide theme={t} />;

      case 'attackerChecklist':
        return <AttackerChecklistSlide theme={t} />;

      case 'endpointSandwich':
        return <EndpointSandwichSlide theme={t} />;

      case 'safeSweepResults':
        return <SafeSweepResultsSlide theme={t} />;

      case 'safeSweepReportDemo':
        return <SafeSweepReportDemoSlide theme={t} />;

      case 'aiTabletop':
        return <AITabletopSlide theme={t} />;

      default:
        return (
          <div className="text-center">
            <h2 className="text-4xl text-red-500">Unknown slide type: {slide.type}</h2>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen ${t.bg} text-slate-100 flex flex-col font-sans overflow-hidden ${themeClass} presentation-container`}>
      {/* Background gradient */}
      <div className={`fixed inset-0 bg-gradient-to-br ${t.gradient} pointer-events-none`} />

      {/* Floating orbs */}
      <div className={`fixed top-0 right-0 w-[600px] h-[600px] ${t.accentBg}/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
      <div className={`fixed bottom-0 left-0 w-[600px] h-[600px] ${t.accentBg}/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none`} />

      {/* Sponsor logos header - shown on all slides except title */}
      {currentSlide > 0 && (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 z-40 pointer-events-none">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-20 w-auto object-contain"
          />
          <img
            src="/images/sherweb-logo-white.svg"
            alt="Sherweb"
            className="h-6 w-auto object-contain"
          />
        </div>
      )}

      {/* Logo - bottom right corner with white pill behind */}
      <div className="fixed bottom-3 right-3 bg-white/90 rounded-xl px-4 py-2 z-40">
        <img
          src="/images/rob-logo-horiz.webp"
          alt="Right of Boom"
          className="h-[50px] w-auto object-contain"
        />
      </div>

      {/* Theme Switcher */}
      <button
        onClick={cycleTheme}
        className="fixed bottom-3 left-3 z-50 p-1.5 rounded-md bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 transition-all opacity-30 hover:opacity-100"
        title={`Theme: ${t.name}`}
      >
        <Palette className={`w-3 h-3 ${t.accentColor}`} />
      </button>

      {/* Main Slide Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 relative z-10 overflow-hidden slide-content">
        <div className="w-full max-w-[95vw] h-full flex flex-col items-center justify-center">
          {renderSlide()}

        </div>
      </main>

      {/* Footer */}
      <Footer
        theme={t}
        currentSlide={currentSlide}
        totalSlides={slides.length}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />

      {/* Presenter Notes Panel */}
      {showNotes && (
        <PresenterNotes
          slide={slide}
          slideIndex={currentSlide}
          totalSlides={slides.length}
          theme={t}
          onClose={() => setShowNotes(false)}
        />
      )}

      {/* Progress Bar */}
      <div className="h-1 bg-slate-800/50 w-full relative z-20">
        <div
          className={`h-full ${t.accentBg} transition-all duration-500 ease-out`}
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PresentationApp;
