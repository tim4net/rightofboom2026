import React, { useState, useEffect } from 'react';
import { Coffee, Quote } from 'lucide-react';

const rawItems = [
  // Quotes with titles for lesser-known figures
  { type: 'quote', text: "The question is not whether intelligent machines can have emotions, but whether machines can be intelligent without emotions.", author: "Marvin Minsky", title: "MIT AI Lab Co-founder" },
  { type: 'quote', text: "AI is probably the most important thing humanity has ever worked on.", author: "Sundar Pichai", title: "Google CEO" },
  { type: 'quote', text: "The real risk with AI isn't malice but competence.", author: "Stephen Hawking" },
  { type: 'quote', text: "The development of full artificial intelligence could spell the end of the human race.", author: "Stephen Hawking" },
  { type: 'quote', text: "Artificial intelligence is the new electricity.", author: "Andrew Ng", title: "Stanford AI Professor, Coursera Co-founder" },
  { type: 'quote', text: "AI is about amplifying human potential, not replacing it.", author: "Satya Nadella", title: "Microsoft CEO" },
  { type: 'quote', text: "A year spent in artificial intelligence is enough to make one believe in God.", author: "Alan Perlis", title: "First Turing Award Winner" },
  { type: 'quote', text: "The purpose of AI is to help humans, not to replace them.", author: "Fei-Fei Li", title: "Stanford HAI Co-director" },
  { type: 'quote', text: "By far, the greatest danger of AI is that people conclude too early that they understand it.", author: "Eliezer Yudkowsky", title: "AI Safety Researcher" },
  { type: 'quote', text: "Machine intelligence is the last invention that humanity will ever need to make.", author: "Nick Bostrom", title: "Oxford Philosopher" },
  { type: 'quote', text: "Success in creating AI would be the biggest event in human history. Unfortunately, it might also be the last.", author: "Stephen Hawking" },
  { type: 'quote', text: "I'm sorry Dave, I'm afraid I can't do that.", author: "HAL 9000", title: "2001: A Space Odyssey" },
  { type: 'quote', text: "The best thing about AI is that it makes everyone an expert on AI.", author: "Unknown" },
  { type: 'quote', text: "I for one welcome our new robot overlords.", author: "Kent Brockman", title: "Channel 6 News" },
  { type: 'quote', text: "Artificial Intelligence is no match for natural stupidity.", author: "Anonymous" },
  { type: 'quote', text: "A computer once beat me at chess, but it was no match for me at kickboxing.", author: "Emo Philips", title: "Comedian" },
  { type: 'quote', text: "I'm not worried about AI taking over the world. I can barely get my Roomba to clean under the couch.", author: "Rita Rudner", title: "Comedian" },
  { type: 'quote', text: "Copilot? Think of it as Clippy after a decade at the gym.", author: "Satya Nadella", title: "Microsoft CEO" },
  { type: 'quote', text: "The robots are coming, but they'll need charging first.", author: "Tom Scott", title: "YouTuber & Educator" },
  { type: 'quote', text: "AI is great at multitasking: it can misunderstand five tasks at once.", author: "Daniel Kahneman", title: "Nobel Prize Economist" },
  { type: 'quote', text: "To err is human, but to really foul things up, you need a computer.", author: "Paul R. Ehrlich", title: "Stanford Biologist" },
  { type: 'quote', text: "Any AI smart enough to pass a Turing test is smart enough to know to fail it.", author: "Ian McDonald", title: "Science Fiction Author" },
  { type: 'quote', text: "AI will delete jobs... and invent ones we can't yet pronounce.", author: "Jensen Huang", title: "NVIDIA CEO" },
  { type: 'quote', text: "AI is a toddler: teach it, guide it, and keep it away from the sockets.", author: "Gary Marcus", title: "NYU Cognitive Scientist" },
  { type: 'quote', text: "The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.", author: "Edsger Dijkstra", title: "Turing Award Winner, CS Pioneer" },
  { type: 'quote', text: "Your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.", author: "Dr. Ian Malcolm", title: "Jurassic Park" },
  { type: 'quote', text: "A robot may not injure a human being, or, through inaction, allow a human being to come to harm.", author: "Isaac Asimov", title: "First Law of Robotics" },
  { type: 'quote', text: "The Matrix is everywhere. It is all around us.", author: "Morpheus", title: "The Matrix" },
  { type: 'quote', text: "I'll be back.", author: "T-800", title: "The Terminator" },
  { type: 'quote', text: "Would you like to play a game?", author: "WOPR", title: "WarGames" },
  { type: 'quote', text: "In the game of chess, you can never let your adversary see your pieces.", author: "Zapp Brannigan", title: "" },
  { type: 'quote', text: "Kill all humans... kill all humans... hey sexy mama, wanna kill all humans?", author: "Bender", title: "" },
  { type: 'quote', text: "Bite my shiny metal ass.", author: "Bender", title: "" },
  { type: 'quote', text: "Computers make excellent and efficient servants, but I have no wish to serve under them.", author: "Spock", title: "" },
  { type: 'quote', text: "R2-D2, you know better than to trust a strange computer!", author: "C-3PO", title: "" },
  { type: 'quote', text: "I am fully functional and programmed in multiple techniques.", author: "Data", title: "" },
  { type: 'quote', text: "Insufficient facts always invite danger.", author: "Spock", title: "" },
  { type: 'quote', text: "Logic is the beginning of wisdom, not the end.", author: "Spock", title: "" },
  { type: 'quote', text: "I'm 40% titanium!", author: "Bender", title: "" },
  { type: 'quote', text: "There are only two types of companies: those that have been hacked, and those that will be.", author: "Robert Mueller", title: "Former FBI Director" },
  { type: 'quote', text: "The only truly secure system is one that is powered off, cast in concrete, and sealed in a room with armed guards.", author: "Gene Spafford", title: "Purdue CS Professor" },
  { type: 'quote', text: "If you think technology can solve your security problems, then you don't understand the problems and you don't understand the technology.", author: "Bruce Schneier", title: "Security Technologist" },
  { type: 'quote', text: "Amateurs hack systems, professionals hack people.", author: "Bruce Schneier", title: "Security Technologist" },
  { type: 'quote', text: "The more you sweat in training, the less you bleed in combat.", author: "Richard Marcinko", title: "Navy SEAL Commander" },
  { type: 'quote', text: "The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else.", author: "Eliezer Yudkowsky", title: "AI Safety Researcher" },
  { type: 'quote', text: "Artificial intelligence will reach human levels by around 2029. Follow that out further to 2045, we will have multiplied the intelligence a billion-fold.", author: "Ray Kurzweil", title: "Futurist, Google Engineer" },
  { type: 'quote', text: "Our intelligence is what makes us human, and AI is an extension of that quality.", author: "Yann LeCun", title: "Meta Chief AI Scientist" },
  { type: 'quote', text: "The definition of today's AI is a machine that can make a perfect chess move while the room is on fire.", author: "Oren Etzioni", title: "AI2 Founding CEO" },
  { type: 'quote', text: "Nobody phrases it this way, but I think that artificial intelligence is almost a humanities discipline. It's really an attempt to understand human intelligence and human cognition.", author: "Sebastian Thrun", title: "Stanford AI Professor" },

  // XKCD Comics
  { type: 'xkcd', num: 1838, title: "Machine Learning", img: "https://imgs.xkcd.com/comics/machine_learning.png", alt: "The pile gets soaked with data and starts to get hot. It's a neural network!" },
  { type: 'xkcd', num: 1425, title: "Tasks", img: "https://imgs.xkcd.com/comics/tasks.png", alt: "In CS, it can be hard to explain the difference between easy and virtually impossible." },
  { type: 'xkcd', num: 2173, title: "Trained a Neural Net", img: "https://imgs.xkcd.com/comics/trained_a_neural_net.png", alt: "It also works for anything you teach a neural net to do." },
  { type: 'xkcd', num: 1450, title: "AI-Box Experiment", img: "https://imgs.xkcd.com/comics/ai_box_experiment.png", alt: "I'll just move my mass to crush the Confederacy and... wait, which side was I playing again?" },
  { type: 'xkcd', num: 2228, title: "Machine Learning Captcha", img: "https://imgs.xkcd.com/comics/machine_learning_captcha.png", alt: "More data = more learning" },
  { type: 'xkcd', num: 1046, title: "Skynet", img: "https://imgs.xkcd.com/comics/skynet.png", alt: "Skynet launching nuclear missiles" },
  { type: 'xkcd', num: 329, title: "Turing Test", img: "https://imgs.xkcd.com/comics/turing_test.png", alt: "Hit Alarm, Robot!" },
  { type: 'xkcd', num: 948, title: "AI", img: "https://imgs.xkcd.com/comics/ai.png", alt: "And yet you spend 10 hours a day doing it." },
  { type: 'xkcd', num: 1613, title: "The Three Laws of Robotics", img: "https://imgs.xkcd.com/comics/the_three_laws_of_robotics.png", alt: "Zeroth law addition" },
  { type: 'xkcd', num: 1696, title: "AI Research", img: "https://imgs.xkcd.com/comics/ai_research.png", alt: "We've finally created AI!" },
  { type: 'xkcd', num: 2237, title: "AI Hiring Algorithm", img: "https://imgs.xkcd.com/comics/ai_hiring_algorithm.png", alt: "We should just revert the algorithm." },
  { type: 'xkcd', num: 2635, title: "Superintelligent AIs", img: "https://imgs.xkcd.com/comics/superintelligent_ais.png", alt: "Superintelligent AIs would be just like us" },
];

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const BreakSlide = ({ theme: t }) => {
  const title = "Break";
  const subtitle = "Process, caffeinate, prepare to operationalize";

  const [items] = useState(() => shuffleArray(rawItems));
  const [itemIndex, setItemIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const currentItem = items[itemIndex];

  useEffect(() => {
    const displayDuration = currentItem.type === 'xkcd' ? 25000 : 15000; // 25s for comics, 15s for quotes
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setItemIndex(i => (i + 1) % items.length);
        setIsVisible(true);
      }, 400);
    }, displayDuration);
    return () => clearTimeout(timeout);
  }, [itemIndex, currentItem.type]);

  return (
    <div className="animate-in fade-in duration-500 text-center">
      <div className={`mb-8 ${t.accentBg} w-24 h-24 rounded-full flex items-center justify-center mx-auto ${t.accentGlow}`}>
        <Coffee className="w-12 h-12 text-white" />
      </div>
      <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{title}</h2>
      <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium mb-12`}>{subtitle}</p>

      <div className={`max-w-5xl mx-auto ${t.cardBg} p-6 rounded-2xl border ${t.cardBorder} min-h-[480px] flex flex-col justify-center`}>
        <div className={`transition-opacity duration-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {currentItem.type === 'quote' ? (
            <>
              <Quote className={`w-6 h-6 ${t.accentColor} mx-auto mb-3 opacity-50`} />
              <p className={`text-xl md:text-2xl italic ${t.textOnPage} mb-3 leading-relaxed`}>
                "{currentItem.text}"
              </p>
              <p className={`text-lg ${t.accentColor} font-medium`}>
                — {currentItem.author}{currentItem.title && <span className="text-slate-500 font-normal">, {currentItem.title}</span>}
              </p>
            </>
          ) : (
            <>
              <p className={`text-base ${t.accentColor} font-mono mb-3`}>
                xkcd #{currentItem.num}: {currentItem.title}
              </p>
              <img
                src={currentItem.img}
                alt={currentItem.alt}
                title={currentItem.alt}
                className="max-h-[400px] max-w-full mx-auto rounded"
                style={{ filter: 'invert(0.85) hue-rotate(180deg)' }}
              />
              <p className="text-sm text-slate-500 italic mt-3 max-w-2xl mx-auto">
                {currentItem.alt}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakSlide;
