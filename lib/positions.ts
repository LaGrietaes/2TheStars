export interface Position {
  id: number
  key: string
  name: string
  svgPath: string
  category?: string
}

export const positions: Position[] = [
  // Main positions
  { id: 1, key: "intimateEmbrace", name: "Intimate Embrace", svgPath: "/positions/position-1.svg", category: "intimate" },
  { id: 2, key: "ecstaticUnion", name: "Ecstatic Union", svgPath: "/positions/position-2.svg", category: "passionate" },
  { id: 3, key: "deepSurrender", name: "Deep Surrender", svgPath: "/positions/position-3.svg", category: "intimate" },
  
  // Zodiac inspired positions
  { id: 4, key: "aquariusFree", name: "Aquarius Free", svgPath: "/positions/noun-aquarius-sex-pose-1984869.svg", category: "adventurous" },
  { id: 5, key: "aquariusFlow", name: "Aquarius Flow", svgPath: "/positions/noun-aquarius-sex-pose-1984880.svg", category: "adventurous" },
  { id: 6, key: "capricornStability", name: "Capricorn Stability", svgPath: "/positions/noun-capricorn-sex-pose-1984883.svg", category: "intimate" },
  { id: 7, key: "cancerNurture", name: "Cancer Nurture", svgPath: "/positions/noun-cancer-sex-pose-1984904.svg", category: "intimate" },
  
  // Mythological positions
  { id: 8, key: "aphroditeGrace", name: "Aphrodite Grace", svgPath: "/positions/noun-aphrodite-sex-pose-1984901.svg", category: "romantic" },
  { id: 9, key: "zeusPassion", name: "Zeus Passion", svgPath: "/positions/noun-zeus-sex-pose-1984897.svg", category: "passionate" },
  
  // Playful positions
  { id: 10, key: "accordionRhythm", name: "Accordion Rhythm", svgPath: "/positions/noun-accordion-sex-pose-1984871.svg", category: "playful" },
  { id: 11, key: "basketWeave", name: "Basket Weave", svgPath: "/positions/noun-basket-sex-pose-1984862.svg", category: "playful" },
  { id: 12, key: "budBlossom", name: "Bud Blossom", svgPath: "/positions/noun-bud-sex-pose-1984895.svg", category: "intimate" },
  { id: 13, key: "celloSerenade", name: "Cello Serenade", svgPath: "/positions/noun-cello-sex-pose-1984909.svg", category: "romantic" },
  { id: 14, key: "chairSupport", name: "Chair Support", svgPath: "/positions/noun-chair-sex-pose-1984877.svg", category: "adventurous" },
  { id: 15, key: "joystickControl", name: "Joystick Control", svgPath: "/positions/noun-joystick-sex-pose-1984908.svg", category: "playful" },
  
  // Nature inspired
  { id: 16, key: "frogLeap", name: "Frog Leap", svgPath: "/positions/noun-frog-sex-pose-1984873.svg", category: "adventurous" },
  { id: 17, key: "roseBloom", name: "Rose Bloom", svgPath: "/positions/noun-rose-sex-pose-1984878.svg", category: "romantic" },
  { id: 18, key: "starfishSpread", name: "Starfish Spread", svgPath: "/positions/noun-starfish-sex-pose-1984885.svg", category: "intimate" },
  
  // Comfort positions
  { id: 19, key: "spoonCuddle", name: "Spoon Cuddle", svgPath: "/positions/noun-spoon-sex-pose-1984898.svg", category: "intimate" },
  { id: 20, key: "wallLean", name: "Wall Lean", svgPath: "/positions/noun-wall-sex-pose-1984914.svg", category: "adventurous" },
  
  // Dynamic positions
  { id: 21, key: "trainRhythm", name: "Train Rhythm", svgPath: "/positions/noun-train-sex-pose-1984905.svg", category: "passionate" },
  { id: 22, key: "straddleControl", name: "Straddle Control", svgPath: "/positions/noun-straddle-sex-pose-1984894.svg", category: "passionate" },
  { id: 23, key: "scissorSync", name: "Scissor Sync", svgPath: "/positions/noun-scissor-sex-pose-1984886.svg", category: "playful" },
  
  // Artistic positions
  { id: 24, key: "ribbonTie", name: "Ribbon Tie", svgPath: "/positions/noun-ribbon-sex-pose-1984907.svg", category: "romantic" },
  { id: 25, key: "caramelSwirl", name: "Caramel Swirl", svgPath: "/positions/noun-caramel-sex-pose-1984868.svg", category: "romantic" },
  { id: 26, key: "captainCommand", name: "Captain Command", svgPath: "/positions/noun-captain-sex-pose-1984902.svg", category: "adventurous" },
  
  // Spiritual positions
  { id: 27, key: "nirvanaBliss", name: "Nirvana Bliss", svgPath: "/positions/noun-nirvana-sex-pose-1984893.svg", category: "intimate" },
  { id: 28, key: "ecstasyHeaven", name: "Ecstasy Heaven", svgPath: "/positions/noun-ecstasy-sex-pose-1984864.svg", category: "passionate" },
  { id: 29, key: "crucifixionSacred", name: "Sacred Cross", svgPath: "/positions/noun-crucifixion-sex-pose-1984911.svg", category: "intimate" },
  
  // Trust positions
  { id: 30, key: "lockSecure", name: "Lock Secure", svgPath: "/positions/noun-lock-sex-pose-1984891.svg", category: "intimate" },
  { id: 31, key: "submissiveTrust", name: "Submissive Trust", svgPath: "/positions/noun-submissive-sex-pose-1984899.svg", category: "playful" },
  { id: 32, key: "whisperSecret", name: "Whisper Secret", svgPath: "/positions/noun-whisper-sex-pose-1984892.svg", category: "intimate" },
  
  // Roleplay positions
  { id: 33, key: "prisonGuard", name: "Prison Guard", svgPath: "/positions/noun-prison-guard-sex-pose-1984867.svg", category: "playful" },
  { id: 34, key: "nunVow", name: "Sacred Vow", svgPath: "/positions/noun-nun-sex-pose-1984889.svg", category: "romantic" },
  
  // Classic positions
  { id: 35, key: "classicPosition", name: "Classic Position", svgPath: "/positions/noun-sex-pose-1984876.svg", category: "intimate" },
  
  // Solo position
  { id: 36, key: "selfLove", name: "Self Love", svgPath: "/positions/noun-masturbation-2473545.svg", category: "intimate" },

  // Additional Intimate Positions
  { id: 37, key: "tenderlockEmbrace", name: "Tenderlock Embrace", svgPath: "/positions/noun-lock-sex-pose-1984891.svg", category: "intimate" },
  { id: 38, key: "secretWhisper", name: "Secret Whisper", svgPath: "/positions/noun-whisper-sex-pose-1984892.svg", category: "intimate" },
  { id: 39, key: "gentleTouch", name: "Gentle Touch", svgPath: "/positions/noun-bud-sex-pose-1984895.svg", category: "intimate" },

  // Additional Passionate Positions  
  { id: 40, key: "fierceUnion", name: "Fierce Union", svgPath: "/positions/noun-zeus-sex-pose-1984897.svg", category: "passionate" },
  { id: 41, key: "intenseDrive", name: "Intense Drive", svgPath: "/positions/noun-train-sex-pose-1984905.svg", category: "passionate" },
  { id: 42, key: "blazingConnection", name: "Blazing Connection", svgPath: "/positions/noun-ecstasy-sex-pose-1984864.svg", category: "passionate" },

  // Additional Adventurous Positions
  { id: 43, key: "wildFrog", name: "Wild Frog", svgPath: "/positions/noun-frog-sex-pose-1984873.svg", category: "adventurous" },
  { id: 44, key: "explorerUnion", name: "Explorer Union", svgPath: "/positions/noun-captain-sex-pose-1984902.svg", category: "adventurous" },
  { id: 45, key: "freeSpirit", name: "Free Spirit", svgPath: "/positions/noun-aquarius-sex-pose-1984869.svg", category: "adventurous" },

  // Additional Romantic Positions
  { id: 46, key: "roseGarden", name: "Rose Garden", svgPath: "/positions/noun-rose-sex-pose-1984878.svg", category: "romantic" },
  { id: 47, key: "sweetCaramel", name: "Sweet Caramel", svgPath: "/positions/noun-caramel-sex-pose-1984868.svg", category: "romantic" },
  { id: 48, key: "loveSerenade", name: "Love Serenade", svgPath: "/positions/noun-cello-sex-pose-1984909.svg", category: "romantic" },

  // Additional Playful Positions
  { id: 49, key: "gameController", name: "Game Controller", svgPath: "/positions/noun-joystick-sex-pose-1984908.svg", category: "playful" },
  { id: 50, key: "musicalRhythm", name: "Musical Rhythm", svgPath: "/positions/noun-accordion-sex-pose-1984871.svg", category: "playful" },
  { id: 51, key: "weavingPattern", name: "Weaving Pattern", svgPath: "/positions/noun-basket-sex-pose-1984862.svg", category: "playful" },

  // Additional Elegant Positions
  { id: 52, key: "divineLove", name: "Divine Love", svgPath: "/positions/noun-aphrodite-sex-pose-1984901.svg", category: "romantic" },
  { id: 53, key: "gracefulRibbon", name: "Graceful Ribbon", svgPath: "/positions/noun-ribbon-sex-pose-1984907.svg", category: "romantic" },
  { id: 54, key: "refinedUnion", name: "Refined Union", svgPath: "/positions/noun-nun-sex-pose-1984889.svg", category: "romantic" },

  // Additional Supportive Positions
  { id: 55, key: "chairComfort", name: "Chair Comfort", svgPath: "/positions/noun-chair-sex-pose-1984877.svg", category: "adventurous" },
  { id: 56, key: "wallSupport", name: "Wall Support", svgPath: "/positions/noun-wall-sex-pose-1984914.svg", category: "adventurous" },
  { id: 57, key: "stabilityBase", name: "Stability Base", svgPath: "/positions/noun-capricorn-sex-pose-1984883.svg", category: "intimate" },

  // Additional Dynamic Positions  
  { id: 58, key: "powerStraddle", name: "Power Straddle", svgPath: "/positions/noun-straddle-sex-pose-1984894.svg", category: "passionate" },
  { id: 59, key: "syncMovement", name: "Sync Movement", svgPath: "/positions/noun-scissor-sex-pose-1984886.svg", category: "playful" },
  { id: 60, key: "flowingSpread", name: "Flowing Spread", svgPath: "/positions/noun-starfish-sex-pose-1984885.svg", category: "adventurous" },
]

export const categories = [
  { key: "all", name: "All Positions" },
  { key: "intimate", name: "Intimate" },
  { key: "passionate", name: "Passionate" },
  { key: "romantic", name: "Romantic" },
  { key: "playful", name: "Playful" },
  { key: "adventurous", name: "Adventurous" },
]

export const getPositionsByCategory = (category: string) => {
  if (category === "all") return positions
  return positions.filter(position => position.category === category)
}

export const getPositionById = (id: number) => {
  return positions.find(position => position.id === id)
}

export const getRandomPosition = (excludeIds: number[] = []) => {
  const availablePositions = positions.filter(position => !excludeIds.includes(position.id))
  if (availablePositions.length === 0) return null
  const randomIndex = Math.floor(Math.random() * availablePositions.length)
  return availablePositions[randomIndex]
} 