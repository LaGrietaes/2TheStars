export type Language = "en" | "es" | "ca" | "fr" | "tr" | "de" | "it" | "pt"

export interface Translation {
  // App general
  appName: string
  // Navigation
  randomizer: string
  library: string
  // Randomizer
  autoMode: string
  stop: string
  auto: string
  selecting: string
  randomPosition: string
  nextIn: string
  autoModeTimer: string
  noPositionsSelected: string
  noPositionsMessage: string
  // Library
  positionLibrary: string
  selected: string
  all: string
  none: string
  tapToSelect: string
  // Share
  sharePosition: string
  shareWithPartner: string
  share: string
  copyText: string
  copied: string
  whatsapp: string
  email: string
  downloadImage: string
  discoverNewWays: string
  tryAppYourself: string
  // Settings
  language: string
  selectLanguage: string
  // Positions
  positions: {
    intimateEmbrace: { name: string; description: string }
    ecstaticUnion: { name: string; description: string }
    deepSurrender: { name: string; description: string }
    aquariusFree: { name: string; description: string }
    aquariusFlow: { name: string; description: string }
    capricornStability: { name: string; description: string }
    cancerNurture: { name: string; description: string }
    aphroditeGrace: { name: string; description: string }
    zeusPassion: { name: string; description: string }
    accordionRhythm: { name: string; description: string }
    basketWeave: { name: string; description: string }
    budBlossom: { name: string; description: string }
    celloSerenade: { name: string; description: string }
    chairSupport: { name: string; description: string }
    joystickControl: { name: string; description: string }
    frogLeap: { name: string; description: string }
    roseBloom: { name: string; description: string }
    starfishSpread: { name: string; description: string }
    spoonCuddle: { name: string; description: string }
    wallLean: { name: string; description: string }
    trainRhythm: { name: string; description: string }
    straddleControl: { name: string; description: string }
    scissorSync: { name: string; description: string }
    ribbonTie: { name: string; description: string }
    caramelSwirl: { name: string; description: string }
    captainCommand: { name: string; description: string }
    nirvanaBliss: { name: string; description: string }
    ecstasyHeaven: { name: string; description: string }
    crucifixionSacred: { name: string; description: string }
    lockSecure: { name: string; description: string }
    submissiveTrust: { name: string; description: string }
    whisperSecret: { name: string; description: string }
    prisonGuard: { name: string; description: string }
    nunVow: { name: string; description: string }
    classicPosition: { name: string; description: string }
    selfLove: { name: string; description: string }
    // Additional positions 37-60
    tenderlockEmbrace: { name: string; description: string }
    secretWhisper: { name: string; description: string }
    gentleTouch: { name: string; description: string }
    fierceUnion: { name: string; description: string }
    intenseDrive: { name: string; description: string }
    blazingConnection: { name: string; description: string }
    wildFrog: { name: string; description: string }
    explorerUnion: { name: string; description: string }
    freeSpirit: { name: string; description: string }
    roseGarden: { name: string; description: string }
    sweetCaramel: { name: string; description: string }
    loveSerenade: { name: string; description: string }
    gameController: { name: string; description: string }
    musicalRhythm: { name: string; description: string }
    weavingPattern: { name: string; description: string }
    divineLove: { name: string; description: string }
    gracefulRibbon: { name: string; description: string }
    refinedUnion: { name: string; description: string }
    chairComfort: { name: string; description: string }
    wallSupport: { name: string; description: string }
    stabilityBase: { name: string; description: string }
    powerStraddle: { name: string; description: string }
    syncMovement: { name: string; description: string }
    flowingSpread: { name: string; description: string }
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    appName: "2TheStars",
    randomizer: "Randomizer",
    library: "Library",
    autoMode: "Auto Mode",
    stop: "Stop",
    auto: "Auto",
    selecting: "Selecting...",
    randomPosition: "Random Position",
    nextIn: "Next in",
    autoModeTimer: "Session Duration",
    noPositionsSelected: "No Positions Selected",
    noPositionsMessage: "Please go to the Library to select positions for the randomizer.",
    positionLibrary: "Position Library",
    selected: "selected",
    all: "All",
    none: "None",
    tapToSelect: "Tap to select",
    sharePosition: "Share Position",
    shareWithPartner: "Share this position with your partner or friends!",
    share: "Share",
    copyText: "Copy Text",
    copied: "Copied!",
    whatsapp: "WhatsApp",
    email: "Email",
    downloadImage: "Download Image",
    discoverNewWays: "Discover new ways to connect with your partner",
    tryAppYourself: "Try the app yourself",
    language: "Language",
    selectLanguage: "Select Language",
    positions: {
      intimateEmbrace: {
        name: "Intimate Embrace",
        description: "A close position that promotes deep connection and eye contact. Perfect for moments of tenderness and emotional bonding between partners.",
      },
      ecstaticUnion: {
        name: "Ecstatic Union",
        description: "An intense position that creates deep physical connection and can lead to heightened pleasure for both partners. Great for passionate encounters.",
      },
      deepSurrender: {
        name: "Deep Surrender",
        description: "A position of trust and vulnerability for both partners. Creates a sense of letting go and being fully present in the moment together.",
      },
      aquariusFree: {
        name: "Aquarius Free",
        description: "A free-spirited and unconventional position that encourages creativity and exploration. Perfect for adventurous couples seeking something unique.",
      },
      aquariusFlow: {
        name: "Aquarius Flow",
        description: "A flowing and rhythmic position that emphasizes movement and harmony. Great for couples who enjoy dynamic and synchronized intimacy.",
      },
      capricornStability: {
        name: "Capricorn Stability",
        description: "A grounded and stable position that creates a strong foundation for deep connection. Perfect for building lasting intimacy and trust.",
      },
      cancerNurture: {
        name: "Cancer Nurture",
        description: "A nurturing and protective position that creates emotional safety and warmth. Ideal for tender moments and caring connection.",
      },
      aphroditeGrace: {
        name: "Aphrodite Grace",
        description: "An elegant and graceful position inspired by the goddess of love. Perfect for romantic and aesthetically beautiful moments of connection.",
      },
      zeusPassion: {
        name: "Zeus Passion",
        description: "A powerful and commanding position that channels divine energy and passion. Great for intense and transformative experiences.",
      },
      accordionRhythm: {
        name: "Accordion Rhythm",
        description: "A playful position with alternating rhythms and movements. Perfect for couples who enjoy musical and rhythmic intimacy.",
      },
      basketWeave: {
        name: "Basket Weave",
        description: "An intertwined position that creates intricate connection patterns. Ideal for couples who enjoy complex and engaging positions.",
      },
      budBlossom: {
        name: "Bud Blossom",
        description: "A gentle and opening position that allows gradual unfurling of intimacy. Perfect for slow and mindful connection building.",
      },
      celloSerenade: {
        name: "Cello Serenade",
        description: "An elegant and musical position that creates harmonious vibrations. Great for couples who appreciate artistic and refined intimacy.",
      },
      chairSupport: {
        name: "Chair Support",
        description: "A supported position using furniture for stability and comfort. Perfect for longer sessions and reducing physical strain.",
      },
      joystickControl: {
        name: "Joystick Control",
        description: "A playful position that gives one partner control while maintaining fun and engagement. Great for couples who enjoy power exchange.",
      },
      frogLeap: {
        name: "Frog Leap",
        description: "A dynamic and athletic position inspired by nature. Perfect for couples who enjoy active and energetic intimacy.",
      },
      roseBloom: {
        name: "Rose Bloom",
        description: "A romantic and flowering position that unfolds like a beautiful rose. Ideal for romantic and sensual moments of connection.",
      },
      starfishSpread: {
        name: "Starfish Spread",
        description: "A relaxed and open position that allows for full body contact. Perfect for laid-back and comfortable intimate experiences.",
      },
      spoonCuddle: {
        name: "Spoon Cuddle",
        description: "A cozy and intimate position perfect for cuddling and gentle connection. Great for morning intimacy and emotional bonding.",
      },
      wallLean: {
        name: "Wall Lean",
        description: "A supportive position using a wall for stability and different angles. Perfect for standing intimacy and adventurous moments.",
      },
      trainRhythm: {
        name: "Train Rhythm",
        description: "A rhythmic position that builds momentum like a train. Great for couples who enjoy building intensity and synchronized movement.",
      },
      straddleControl: {
        name: "Straddle Control",
        description: "An empowering position that gives one partner control and freedom of movement. Perfect for confident and assertive intimacy.",
      },
      scissorSync: {
        name: "Scissor Sync",
        description: "A synchronized position that requires coordination and rhythm. Ideal for couples who enjoy working together in harmony.",
      },
      ribbonTie: {
        name: "Ribbon Tie",
        description: "An artistic position that creates beautiful lines and connections. Perfect for couples who appreciate aesthetic and visual beauty.",
      },
      caramelSwirl: {
        name: "Caramel Swirl",
        description: "A sweet and swirling position that creates delicious sensations. Great for couples who enjoy indulgent and sensual experiences.",
      },
      captainCommand: {
        name: "Captain Command",
        description: "A commanding position that establishes leadership and direction. Perfect for couples who enjoy role play and power dynamics.",
      },
      nirvanaBliss: {
        name: "Nirvana Bliss",
        description: "A transcendent position that aims for spiritual and physical enlightenment. Ideal for couples seeking deeper spiritual connection.",
      },
      ecstasyHeaven: {
        name: "Ecstasy Heaven",
        description: "A heavenly position designed to reach peak pleasure and bliss. Perfect for couples seeking ultimate physical and emotional satisfaction.",
      },
      crucifixionSacred: {
        name: "Sacred Cross",
        description: "A sacred and meaningful position that creates spiritual connection. Great for couples who value deep spiritual and emotional bonding.",
      },
      lockSecure: {
        name: "Lock Secure",
        description: "A secure and safe position that creates feelings of protection and trust. Perfect for building security and emotional safety.",
      },
      submissiveTrust: {
        name: "Submissive Trust",
        description: "A trusting position that involves vulnerability and surrender. Ideal for couples exploring trust and emotional intimacy.",
      },
      whisperSecret: {
        name: "Whisper Secret",
        description: "An intimate position perfect for sharing secrets and close communication. Great for building emotional intimacy and connection.",
      },
      prisonGuard: {
        name: "Prison Guard",
        description: "A role-play position that explores power dynamics and control. Perfect for couples who enjoy dramatic and intense role playing.",
      },
      nunVow: {
        name: "Sacred Vow",
        description: "A sacred position that honors commitment and devotion. Ideal for couples celebrating their deep bond and spiritual connection.",
      },
      classicPosition: {
        name: "Classic Position",
        description: "A timeless and traditional position that never goes out of style. Perfect for couples who appreciate classic and reliable intimacy.",
      },
      selfLove: {
        name: "Self Love",
        description: "A position focused on individual pleasure and self-discovery. Great for personal exploration and understanding your own desires.",
      },
      // Additional positions 37-60
      tenderlockEmbrace: {
        name: "Tenderlock Embrace",
        description: "A secure and loving embrace that creates feelings of safety and intimacy. Perfect for deepening emotional connection.",
      },
      secretWhisper: {
        name: "Secret Whisper",
        description: "An intimate position perfect for sharing secrets and close communication. Great for building emotional intimacy.",
      },
      gentleTouch: {
        name: "Gentle Touch",
        description: "A tender and gentle position that allows for soft caresses and emotional bonding. Perfect for sensitive moments.",
      },
      fierceUnion: {
        name: "Fierce Union",
        description: "An intense and passionate position that creates powerful connection. Great for couples seeking high energy intimacy.",
      },
      intenseDrive: {
        name: "Intense Drive",
        description: "A dynamic position that builds momentum and intensity. Perfect for passionate and energetic encounters.",
      },
      blazingConnection: {
        name: "Blazing Connection",
        description: "A fiery position designed to create intense pleasure and connection. Ideal for passionate and transformative experiences.",
      },
      wildFrog: {
        name: "Wild Frog",
        description: "An adventurous and athletic position inspired by nature. Perfect for couples who enjoy active and playful intimacy.",
      },
      explorerUnion: {
        name: "Explorer Union",
        description: "An adventurous position for couples who love to discover new territories together. Great for exploration and discovery.",
      },
      freeSpirit: {
        name: "Free Spirit",
        description: "A liberated and unconventional position that encourages freedom and creativity. Perfect for open-minded couples.",
      },
      roseGarden: {
        name: "Rose Garden",
        description: "A romantic position that unfolds like flowers in a beautiful garden. Ideal for romantic and sensual moments.",
      },
      sweetCaramel: {
        name: "Sweet Caramel",
        description: "A deliciously sweet position that creates indulgent sensations. Great for couples who enjoy sensual experiences.",
      },
      loveSerenade: {
        name: "Love Serenade",
        description: "A musical and harmonious position that creates beautiful rhythms. Perfect for couples who appreciate artistic intimacy.",
      },
      gameController: {
        name: "Game Controller",
        description: "A playful position that allows one partner to take control while maintaining fun. Great for couples who enjoy power play.",
      },
      musicalRhythm: {
        name: "Musical Rhythm",
        description: "A rhythmic position with alternating beats and movements. Perfect for couples who enjoy synchronized intimacy.",
      },
      weavingPattern: {
        name: "Weaving Pattern",
        description: "An intricate position that creates complex connection patterns. Ideal for couples who enjoy detailed and engaging positions.",
      },
      divineLove: {
        name: "Divine Love",
        description: "A heavenly position inspired by divine grace and beauty. Perfect for spiritual and romantic connections.",
      },
      gracefulRibbon: {
        name: "Graceful Ribbon",
        description: "An elegant position that creates beautiful flowing lines. Great for couples who appreciate aesthetic beauty.",
      },
      refinedUnion: {
        name: "Refined Union",
        description: "A sophisticated and elegant position that embodies grace and refinement. Perfect for couples who value elegance.",
      },
      chairComfort: {
        name: "Chair Comfort",
        description: "A comfortable supported position using furniture for stability. Perfect for longer sessions and comfort.",
      },
      wallSupport: {
        name: "Wall Support",
        description: "A supportive position using walls for stability and unique angles. Great for standing intimacy and support.",
      },
      stabilityBase: {
        name: "Stability Base",
        description: "A grounded and stable position that provides a strong foundation. Perfect for building trust and security.",
      },
      powerStraddle: {
        name: "Power Straddle",
        description: "An empowering position that gives control and freedom of movement. Perfect for confident and assertive intimacy.",
      },
      syncMovement: {
        name: "Sync Movement",
        description: "A synchronized position requiring coordination and rhythm. Ideal for couples who enjoy working together in harmony.",
      },
      flowingSpread: {
        name: "Flowing Spread",
        description: "A dynamic and flowing position that allows for full body contact. Perfect for energetic and free-flowing intimacy.",
      },
    },
  },
  es: {
    appName: "Elevador de Relaciones",
    randomizer: "Aleatorio",
    library: "Biblioteca",
    autoMode: "Modo Auto",
    stop: "Parar",
    auto: "Auto",
    selecting: "Seleccionando...",
    randomPosition: "Posición Aleatoria",
    nextIn: "Siguiente en",
    autoModeTimer: "Duración de Sesión",
    noPositionsSelected: "No hay Posiciones Seleccionadas",
    noPositionsMessage: "Por favor ve a la Biblioteca para seleccionar posiciones para el aleatorizador.",
    positionLibrary: "Biblioteca de Posiciones",
    selected: "seleccionadas",
    all: "Todas",
    none: "Ninguna",
    tapToSelect: "Toca para seleccionar",
    sharePosition: "Compartir Posición",
    shareWithPartner: "¡Comparte esta posición con tu pareja o amigos!",
    share: "Compartir",
    copyText: "Copiar Texto",
    copied: "¡Copiado!",
    whatsapp: "WhatsApp",
    email: "Email",
    downloadImage: "Descargar Imagen",
    discoverNewWays: "Descubre nuevas formas de conectar con tu pareja",
    tryAppYourself: "Prueba la app tú mismo",
    language: "Idioma",
    selectLanguage: "Seleccionar Idioma",
    positions: {
      intimateEmbrace: {
        name: "Abrazo Íntimo",
        description:
          "Una posición cercana que promueve la conexión profunda y el contacto visual. Perfecta para momentos de ternura y vínculo emocional entre parejas.",
      },
      ecstaticUnion: {
        name: "Unión Extática",
        description:
          "Una posición intensa que crea una conexión física profunda y puede llevar a un placer elevado para ambos compañeros. Genial para encuentros apasionados.",
      },
      deepSurrender: {
        name: "Entrega Profunda",
        description:
          "Una posición de confianza y vulnerabilidad para ambos compañeros. Crea una sensación de dejarse llevar y estar completamente presente en el momento juntos.",
      },
      passionateConnection: {
        name: "Conexión Apasionada",
        description:
          "Una posición intensa que permite máxima intimidad y conexión física profunda. Genial para momentos apasionados y vínculo emocional.",
      },
      gentleCaress: {
        name: "Caricia Suave",
        description:
          "Una posición tierna perfecta para momentos íntimos y lentos. Se enfoca en el toque suave y la conexión emocional más que en la intensidad.",
      },
      playfulExploration: {
        name: "Exploración Juguetona",
        description:
          "Una posición divertida que fomenta la experimentación y la alegría. Perfecta para momentos alegres y descubrir nuevas sensaciones juntos.",
      },
      sensualConnection: {
        name: "Conexión Sensual",
        description:
          "Una posición que maximiza el contacto piel con piel y crea una sensación profunda de cercanía y calidez entre parejas amorosas.",
      },
    },
  },
  ca: {
    appName: "Ascensor de Relacions",
    randomizer: "Aleatori",
    library: "Biblioteca",
    autoMode: "Mode Auto",
    stop: "Aturar",
    auto: "Auto",
    selecting: "Seleccionant...",
    randomPosition: "Posició Aleatòria",
    nextIn: "Següent en",
    autoModeTimer: "Temporitzador Mode Auto",
    noPositionsSelected: "No hi ha Posicions Seleccionades",
    noPositionsMessage: "Si us plau vés a la Biblioteca per seleccionar posicions per l'aleatoritzador.",
    positionLibrary: "Biblioteca de Posicions",
    selected: "seleccionades",
    all: "Totes",
    none: "Cap",
    tapToSelect: "Toca per seleccionar",
    sharePosition: "Compartir Posició",
    shareWithPartner: "Comparteix aquesta posició amb la teva parella o amics!",
    share: "Compartir",
    copyText: "Copiar Text",
    copied: "Copiat!",
    whatsapp: "WhatsApp",
    email: "Email",
    downloadImage: "Descarregar Imatge",
    discoverNewWays: "Descobreix noves maneres de connectar amb la teva parella",
    tryAppYourself: "Prova l'app tu mateix",
    language: "Idioma",
    selectLanguage: "Seleccionar Idioma",
    positions: {
      intimateEmbrace: {
        name: "Abraçada Íntima",
        description:
          "Una posició propera que promou la connexió profunda i el contacte visual. Perfecta per moments de tendresa i vincle emocional entre parelles.",
      },
      ecstaticUnion: {
        name: "Unió Extàtica",
        description:
          "Una posició intensa que crea una connexió física profunda i pot portar a un plaer elevat per ambdós companys. Genial per trobades apassionades.",
      },
      deepSurrender: {
        name: "Entrega Profunda",
        description:
          "Una posició de confiança i vulnerabilitat per ambdós companys. Crea una sensació de deixar-se portar i estar completament present en el moment junts.",
      },
      passionateConnection: {
        name: "Connexió Apassionada",
        description:
          "Una posició intensa que permet màxima intimitat i connexió física profunda. Genial per moments apassionats i vincle emocional.",
      },
      gentleCaress: {
        name: "Carícia Suau",
        description:
          "Una posició tendra perfecta per moments íntims i lents. Es centra en el toc suau i la connexió emocional més que en la intensitat.",
      },
      playfulExploration: {
        name: "Exploració Juganera",
        description:
          "Una posició divertida que fomenta l'experimentació i l'alegria. Perfecta per moments alegres i descobrir noves sensacions junts.",
      },
      sensualConnection: {
        name: "Connexió Sensual",
        description:
          "Una posició que maximitza el contacte pell amb pell i crea una sensació profunda de proximitat i calidesa entre parelles amoroses.",
      },
    },
  },
  fr: {
    appName: "Ascenseur de Relations",
    randomizer: "Aléatoire",
    library: "Bibliothèque",
    autoMode: "Mode Auto",
    stop: "Arrêter",
    auto: "Auto",
    selecting: "Sélection...",
    randomPosition: "Position Aléatoire",
    nextIn: "Suivant dans",
    autoModeTimer: "Minuteur Mode Auto",
    noPositionsSelected: "Aucune Position Sélectionnée",
    noPositionsMessage: "Veuillez aller à la Bibliothèque pour sélectionner des positions pour le randomiseur.",
    positionLibrary: "Bibliothèque de Positions",
    selected: "sélectionnées",
    all: "Toutes",
    none: "Aucune",
    tapToSelect: "Toucher pour sélectionner",
    sharePosition: "Partager Position",
    shareWithPartner: "Partagez cette position avec votre partenaire ou vos amis!",
    share: "Partager",
    copyText: "Copier Texte",
    copied: "Copié!",
    whatsapp: "WhatsApp",
    email: "Email",
    downloadImage: "Télécharger Image",
    discoverNewWays: "Découvrez de nouvelles façons de vous connecter avec votre partenaire",
    tryAppYourself: "Essayez l'app vous-même",
    language: "Langue",
    selectLanguage: "Sélectionner Langue",
    positions: {
      intimateEmbrace: {
        name: "Étreinte Intime",
        description:
          "Une position proche qui favorise la connexion profonde et le contact visuel. Parfaite pour les moments de tendresse et de lien émotionnel entre partenaires.",
      },
      ecstaticUnion: {
        name: "Union Extatique",
        description:
          "Une position intense qui crée une connexion physique profonde et peut mener à un plaisir élevé pour les deux partenaires. Parfaite pour les rencontres passionnées.",
      },
      deepSurrender: {
        name: "Abandon Profond",
        description:
          "Une position de confiance et de vulnérabilité pour les deux partenaires. Crée une sensation de lâcher-prise et d'être complètement présent dans le moment ensemble.",
      },
      passionateConnection: {
        name: "Connexion Passionnée",
        description:
          "Une position intense qui permet une intimité maximale et une connexion physique profonde. Parfaite pour les moments passionnés et le lien émotionnel.",
      },
      gentleCaress: {
        name: "Caresse Douce",
        description:
          "Une position tendre parfaite pour les moments intimes et lents. Se concentre sur le toucher doux et la connexion émotionnelle plutôt que sur l'intensité.",
      },
      playfulExploration: {
        name: "Exploration Ludique",
        description:
          "Une position amusante qui encourage l'expérimentation et la joie. Parfaite pour les moments joyeux et découvrir de nouvelles sensations ensemble.",
      },
      sensualConnection: {
        name: "Connexion Sensuelle",
        description:
          "Une position qui maximise le contact peau contre peau et crée une sensation profonde de proximité et de chaleur entre partenaires aimants.",
      },
    },
  },
  tr: {
    appName: "İlişki Asansörü",
    randomizer: "Rastgele",
    library: "Kütüphane",
    autoMode: "Otomatik Mod",
    stop: "Durdur",
    auto: "Otomatik",
    selecting: "Seçiliyor...",
    randomPosition: "Rastgele Pozisyon",
    nextIn: "Sonraki",
    autoModeTimer: "Otomatik Mod Zamanlayıcısı",
    noPositionsSelected: "Seçili Pozisyon Yok",
    noPositionsMessage: "Lütfen rastgele seçici için pozisyonları seçmek üzere Kütüphane'ye gidin.",
    positionLibrary: "Pozisyon Kütüphanesi",
    selected: "seçili",
    all: "Hepsi",
    none: "Hiçbiri",
    tapToSelect: "Seçmek için dokunun",
    sharePosition: "Pozisyonu Paylaş",
    shareWithPartner: "Bu pozisyonu partneriniz veya arkadaşlarınızla paylaşın!",
    share: "Paylaş",
    copyText: "Metni Kopyala",
    copied: "Kopyalandı!",
    whatsapp: "WhatsApp",
    email: "E-posta",
    downloadImage: "Resmi İndir",
    discoverNewWays: "Partnerinizle bağlantı kurmanın yeni yollarını keşfedin",
    tryAppYourself: "Uygulamayı kendiniz deneyin",
    language: "Dil",
    selectLanguage: "Dil Seç",
    positions: {
      intimateEmbrace: {
        name: "Samimi Kucaklama",
        description:
          "Derin bağlantı ve göz temasını teşvik eden yakın bir pozisyon. Partnerler arasında şefkat anları ve duygusal bağ için mükemmel.",
      },
      ecstaticUnion: {
        name: "Coşkulu Birleşme",
        description:
          "Derin fiziksel bağlantı yaratan ve her iki partner için de yüksek zevke yol açabilen yoğun bir pozisyon. Tutkulu karşılaşmalar için harika.",
      },
      deepSurrender: {
        name: "Derin Teslim",
        description:
          "Her iki partner için de güven ve savunmasızlık pozisyonu. Kendini bırakma ve birlikte anda tamamen var olma hissi yaratır.",
      },
      passionateConnection: {
        name: "Tutkulu Bağlantı",
        description:
          "Maksimum yakınlık ve derin fiziksel bağlantıya izin veren yoğun bir pozisyon. Tutkulu anlar ve duygusal bağ için harika.",
      },
      gentleCaress: {
        name: "Nazik Okşama",
        description:
          "Yavaş, samimi anlar için mükemmel şefkatli bir pozisyon. Yoğunluktan ziyade nazik dokunuş ve duygusal bağlantıya odaklanır.",
      },
      playfulExploration: {
        name: "Oyuncu Keşif",
        description:
          "Deneyimi ve neşeyi teşvik eden eğlenceli bir pozisyon. Neşeli anlar ve birlikte yeni duyumlar keşfetmek için mükemmel.",
      },
      sensualConnection: {
        name: "Duyusal Bağlantı",
        description:
          "Ten tene teması maksimize eden ve sevgi dolu partnerler arasında derin yakınlık ve sıcaklık hissi yaratan bir pozisyon.",
      },
    },
  },
  de: {
    appName: "Beziehungs-Aufzug",
    randomizer: "Zufällig",
    library: "Bibliothek",
    autoMode: "Auto-Modus",
    stop: "Stopp",
    auto: "Auto",
    selecting: "Auswählen...",
    randomPosition: "Zufällige Position",
    nextIn: "Nächste in",
    autoModeTimer: "Auto-Modus Timer",
    noPositionsSelected: "Keine Positionen Ausgewählt",
    noPositionsMessage: "Bitte gehen Sie zur Bibliothek, um Positionen für den Randomizer auszuwählen.",
    positionLibrary: "Positions-Bibliothek",
    selected: "ausgewählt",
    all: "Alle",
    none: "Keine",
    tapToSelect: "Zum Auswählen tippen",
    sharePosition: "Position Teilen",
    shareWithPartner: "Teilen Sie diese Position mit Ihrem Partner oder Freunden!",
    share: "Teilen",
    copyText: "Text Kopieren",
    copied: "Kopiert!",
    whatsapp: "WhatsApp",
    email: "E-Mail",
    downloadImage: "Bild Herunterladen",
    discoverNewWays: "Entdecken Sie neue Wege, sich mit Ihrem Partner zu verbinden",
    tryAppYourself: "Probieren Sie die App selbst aus",
    language: "Sprache",
    selectLanguage: "Sprache Auswählen",
    positions: {
      intimateEmbrace: {
        name: "Intime Umarmung",
        description:
          "Eine nahe Position, die tiefe Verbindung und Augenkontakt fördert. Perfekt für Momente der Zärtlichkeit und emotionalen Bindung zwischen Partnern.",
      },
      ecstaticUnion: {
        name: "Ekstatische Vereinigung",
        description:
          "Eine intensive Position, die tiefe körperliche Verbindung schafft und zu erhöhtem Vergnügen für beide Partner führen kann. Großartig für leidenschaftliche Begegnungen.",
      },
      deepSurrender: {
        name: "Tiefe Hingabe",
        description:
          "Eine Position des Vertrauens und der Verletzlichkeit für beide Partner. Schafft ein Gefühl des Loslassens und vollständig im Moment zusammen zu sein.",
      },
      passionateConnection: {
        name: "Leidenschaftliche Verbindung",
        description:
          "Eine intensive Position, die maximale Intimität und tiefe körperliche Verbindung ermöglicht. Großartig für leidenschaftliche Momente und emotionale Bindung.",
      },
      gentleCaress: {
        name: "Sanfte Liebkosung",
        description:
          "Eine zärtliche Position, perfekt für langsame, intime Momente. Fokussiert auf sanfte Berührung und emotionale Verbindung statt auf Intensität.",
      },
      playfulExploration: {
        name: "Spielerische Erkundung",
        description:
          "Eine spaßige Position, die Experimentieren und Freude fördert. Perfekt für fröhliche Momente und das gemeinsame Entdecken neuer Empfindungen.",
      },
      sensualConnection: {
        name: "Sinnliche Verbindung",
        description:
          "Eine Position, die Haut-zu-Haut-Kontakt maximiert und ein tiefes Gefühl von Nähe und Wärme zwischen liebenden Partnern schafft.",
      },
    },
  },
  it: {
    appName: "Ascensore delle Relazioni",
    randomizer: "Casuale",
    library: "Biblioteca",
    autoMode: "Modalità Auto",
    stop: "Ferma",
    auto: "Auto",
    selecting: "Selezionando...",
    randomPosition: "Posizione Casuale",
    nextIn: "Prossima in",
    autoModeTimer: "Timer Modalità Auto",
    noPositionsSelected: "Nessuna Posizione Selezionata",
    noPositionsMessage: "Per favore vai alla Biblioteca per selezionare posizioni per il randomizzatore.",
    positionLibrary: "Biblioteca delle Posizioni",
    selected: "selezionate",
    all: "Tutte",
    none: "Nessuna",
    tapToSelect: "Tocca per selezionare",
    sharePosition: "Condividi Posizione",
    shareWithPartner: "Condividi questa posizione con il tuo partner o amici!",
    share: "Condividi",
    copyText: "Copia Testo",
    copied: "Copiato!",
    whatsapp: "WhatsApp",
    email: "Email",
    downloadImage: "Scarica Immagine",
    discoverNewWays: "Scopri nuovi modi per connetterti con il tuo partner",
    tryAppYourself: "Prova l'app tu stesso",
    language: "Lingua",
    selectLanguage: "Seleziona Lingua",
    positions: {
      intimateEmbrace: {
        name: "Abbraccio Intimo",
        description:
          "Una posizione ravvicinata che promuove connessione profonda e contatto visivo. Perfetta per momenti di tenerezza e legame emotivo tra partner.",
      },
      ecstaticUnion: {
        name: "Unione Estatica",
        description:
          "Una posizione intensa che crea connessione fisica profonda e può portare a piacere elevato per entrambi i partner. Ottima per incontri appassionati.",
      },
      deepSurrender: {
        name: "Resa Profonda",
        description:
          "Una posizione di fiducia e vulnerabilità per entrambi i partner. Crea una sensazione di lasciarsi andare ed essere completamente presenti nel momento insieme.",
      },
      passionateConnection: {
        name: "Connessione Appassionata",
        description:
          "Una posizione intensa che permette massima intimità e connessione fisica profonda. Ottima per momenti appassionati e legame emotivo.",
      },
      gentleCaress: {
        name: "Carezza Dolce",
        description:
          "Una posizione tenera perfetta per momenti intimi e lenti. Si concentra sul tocco dolce e la connessione emotiva piuttosto che sull'intensità.",
      },
      playfulExploration: {
        name: "Esplorazione Giocosa",
        description:
          "Una posizione divertente che incoraggia sperimentazione e gioia. Perfetta per momenti gioiosi e scoprire nuove sensazioni insieme.",
      },
      sensualConnection: {
        name: "Connessione Sensuale",
        description:
          "Una posizione che massimizza il contatto pelle a pelle e crea una sensazione profonda di vicinanza e calore tra partner amorevoli.",
      },
    },
  },
  pt: {
    appName: "Elevador de Relacionamentos",
    randomizer: "Aleatório",
    library: "Biblioteca",
    autoMode: "Modo Auto",
    stop: "Parar",
    auto: "Auto",
    selecting: "Selecionando...",
    randomPosition: "Posição Aleatória",
    nextIn: "Próxima em",
    autoModeTimer: "Timer Modo Auto",
    noPositionsSelected: "Nenhuma Posição Selecionada",
    noPositionsMessage: "Por favor vá à Biblioteca para selecionar posições para o aleatorizador.",
    positionLibrary: "Biblioteca de Posições",
    selected: "selecionadas",
    all: "Todas",
    none: "Nenhuma",
    tapToSelect: "Toque para selecionar",
    sharePosition: "Compartilhar Posição",
    shareWithPartner: "Compartilhe esta posição com seu parceiro ou amigos!",
    share: "Compartilhar",
    copyText: "Copiar Texto",
    copied: "Copiado!",
    whatsapp: "WhatsApp",
    email: "Email",
    downloadImage: "Baixar Imagem",
    discoverNewWays: "Descubra novas maneiras de se conectar com seu parceiro",
    tryAppYourself: "Experimente o app você mesmo",
    language: "Idioma",
    selectLanguage: "Selecionar Idioma",
    positions: {
      intimateEmbrace: {
        name: "Abraço Íntimo",
        description:
          "Uma posição próxima que promove conexão profunda e contato visual. Perfeita para momentos de ternura e vínculo emocional entre parceiros.",
      },
      ecstaticUnion: {
        name: "União Extática",
        description:
          "Uma posição intensa que cria conexão física profunda e pode levar a prazer elevado para ambos os parceiros. Ótima para encontros apaixonados.",
      },
      deepSurrender: {
        name: "Entrega Profunda",
        description:
          "Uma posição de confiança e vulnerabilidade para ambos os parceiros. Cria uma sensação de se entregar e estar completamente presente no momento juntos.",
      },
      passionateConnection: {
        name: "Conexão Apaixonada",
        description:
          "Uma posição intensa que permite máxima intimidade e conexão física profunda. Ótima para momentos apaixonados e vínculo emocional.",
      },
      gentleCaress: {
        name: "Carícia Suave",
        description:
          "Uma posição terna perfeita para momentos íntimos e lentos. Foca no toque suave e conexão emocional ao invés de intensidade.",
      },
      playfulExploration: {
        name: "Exploração Brincalhona",
        description:
          "Uma posição divertida que encoraja experimentação e alegria. Perfeita para momentos alegres e descobrir novas sensações juntos.",
      },
      sensualConnection: {
        name: "Conexão Sensual",
        description:
          "Uma posição que maximiza o contato pele com pele e cria uma sensação profunda de proximidade e calor entre parceiros amorosos.",
      },
    },
  },
}

export const getTranslation = (language: Language): Translation => {
  return translations[language] || translations.en
}

export const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.toLowerCase()

  if (browserLang.startsWith("es")) return "es"
  if (browserLang.startsWith("ca")) return "ca"
  if (browserLang.startsWith("fr")) return "fr"
  if (browserLang.startsWith("tr")) return "tr"
  if (browserLang.startsWith("de")) return "de"
  if (browserLang.startsWith("it")) return "it"
  if (browserLang.startsWith("pt")) return "pt"

  return "en"
}

export const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  ca: "Català",
  fr: "Français",
  tr: "Türkçe",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
}
