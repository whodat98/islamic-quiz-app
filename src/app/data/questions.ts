export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const questions: Question[] = [
  // Quran (40 Fragen)
  {
    id: 1,
    category: "Quran",
    question: "In welcher Sure wird die Schlacht von Badr erwähnt?",
    options: ["Al-Baqara", "Al-Anfal", "Al-Imran", "An-Nisa"],
    correctAnswer: 1,
    explanation: "Sure Al-Anfal (8) behandelt die Schlacht von Badr."
  },
  {
    id: 2,
    category: "Quran",
    question: "Wie viele Sajda-Verse (Niederwerfungsverse) gibt es im Quran?",
    options: ["10", "14", "15", "18"],
    correctAnswer: 2,
    explanation: "Es gibt 15 Sajda-Verse im Quran."
  },
  {
    id: 3,
    category: "Quran",
    question: "Welche Sure wird als 'Umm al-Kitab' bezeichnet?",
    options: ["Al-Fatiha", "Al-Baqara", "Yasin", "Al-Ikhlas"],
    correctAnswer: 0,
    explanation: "Al-Fatiha wird als 'Mutter des Buches' bezeichnet."
  },
  {
    id: 4,
    category: "Quran",
    question: "In welcher Sure wird die Geschichte von Ashab al-Kahf (Leute der Höhle) erzählt?",
    options: ["Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha"],
    correctAnswer: 1,
    explanation: "Sure Al-Kahf (18) erzählt diese Geschichte."
  },
  {
    id: 5,
    category: "Quran",
    question: "Welche Sure beginnt nicht mit 'Bismillah'?",
    options: ["At-Tawba", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
    correctAnswer: 0,
    explanation: "Sure At-Tawba (9) ist die einzige Sure ohne Bismillah am Anfang."
  },
  {
    id: 6,
    category: "Quran",
    question: "Wie viele Mal wird das Wort 'Allah' im Quran erwähnt?",
    options: ["2698", "2699", "2700", "2800"],
    correctAnswer: 0,
    explanation: "Das Wort 'Allah' wird 2698 Mal erwähnt."
  },
  {
    id: 7,
    category: "Quran",
    question: "Welche Sure wird als 'Herz des Quran' bezeichnet?",
    options: ["Al-Fatiha", "Yasin", "Al-Mulk", "Ar-Rahman"],
    correctAnswer: 1,
    explanation: "Sure Yasin (36) wird als Herz des Quran bezeichnet."
  },
  {
    id: 8,
    category: "Quran",
    question: "In welchem Juz' befindet sich Sure Al-Kahf?",
    options: ["13", "14", "15", "16"],
    correctAnswer: 2,
    explanation: "Sure Al-Kahf befindet sich hauptsächlich in Juz' 15."
  },
  {
    id: 9,
    category: "Quran",
    question: "Welche Sure wird 'As-Sajda' genannt?",
    options: ["Sure 15", "Sure 22", "Sure 32", "Sure 41"],
    correctAnswer: 2,
    explanation: "Sure 32 heißt As-Sajda."
  },
  {
    id: 10,
    category: "Quran",
    question: "Wie viele Propheten werden namentlich im Quran erwähnt?",
    options: ["20", "25", "28", "30"],
    correctAnswer: 1,
    explanation: "25 Propheten werden namentlich erwähnt."
  },
  {
    id: 11,
    category: "Quran",
    question: "Welche Sure wurde komplett in Mekka UND in Medina offenbart?",
    options: ["Al-Fatiha", "Al-Baqara", "Al-Hajj", "An-Nisa"],
    correctAnswer: 2,
    explanation: "Sure Al-Hajj enthält sowohl mekkanische als auch medinensische Verse."
  },
  {
    id: 12,
    category: "Quran",
    question: "Wie lautet der letzte offenbarte Vers des Quran?",
    options: ["Al-Baqara 2:281", "Al-Maidah 5:3", "An-Nasr 110:3", "At-Tawba 9:128"],
    correctAnswer: 0,
    explanation: "Al-Baqara 2:281 wird als letzter offenbarter Vers betrachtet."
  },
  {
    id: 13,
    category: "Quran",
    question: "Welche Sure enthält zwei Bismillah?",
    options: ["Al-Fatiha", "An-Naml", "Al-Baqara", "Al-Kahf"],
    correctAnswer: 1,
    explanation: "An-Naml enthält Bismillah am Anfang und in Vers 30."
  },
  {
    id: 14,
    category: "Quran",
    question: "Wie viele Suren beginnen mit 'Alif Lam Mim'?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "6 Suren beginnen mit diesen Buchstaben."
  },
  {
    id: 15,
    category: "Quran",
    question: "Welcher Prophet wird am häufigsten im Quran erwähnt?",
    options: ["Ibrahim", "Muhammad", "Musa", "Isa"],
    correctAnswer: 2,
    explanation: "Prophet Musa (Moses) wird am häufigsten erwähnt."
  },
  {
    id: 16,
    category: "Quran",
    question: "Wie viele Verse hat die längste Sure (Al-Baqara)?",
    options: ["276", "286", "296", "300"],
    correctAnswer: 1,
    explanation: "Al-Baqara hat 286 Verse."
  },
  {
    id: 17,
    category: "Quran",
    question: "Welche Sure wird auch 'Al-Fustat' (das Zelt) genannt?",
    options: ["Ar-Rahman", "Al-Waqi'a", "Al-Mulk", "Al-Hadid"],
    correctAnswer: 0,
    explanation: "Ar-Rahman wird auch Al-Fustat genannt."
  },
  {
    id: 18,
    category: "Quran",
    question: "In welcher Sure wird Ayat al-Kursi erwähnt?",
    options: ["Al-Fatiha", "Al-Baqara", "Al-Imran", "An-Nisa"],
    correctAnswer: 1,
    explanation: "Ayat al-Kursi ist Vers 255 in Sure Al-Baqara."
  },
  {
    id: 19,
    category: "Quran",
    question: "Wie viele Suren im Quran tragen Namen von Propheten?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "6 Suren tragen Prophetennamen: Yunus, Hud, Yusuf, Ibrahim, Muhammad, Nuh."
  },
  {
    id: 20,
    category: "Quran",
    question: "Welche Sure wird als 'Al-Mu'minun' bezeichnet?",
    options: ["Sure 22", "Sure 23", "Sure 24", "Sure 25"],
    correctAnswer: 1,
    explanation: "Sure 23 heißt Al-Mu'minun (Die Gläubigen)."
  },
  {
    id: 21,
    category: "Quran",
    question: "In welcher Sure wird die Schöpfung der Himmel und der Erde in sechs Tagen erwähnt?",
    options: ["Al-A'raf", "Yunus", "Hud", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Dies wird in mehreren Suren erwähnt."
  },
  {
    id: 22,
    category: "Quran",
    question: "Welche Sure ist nach einem Insekt benannt?",
    options: ["An-Nahl (Biene)", "An-Naml (Ameise)", "Al-'Ankabut (Spinne)", "Alle genannten"],
    correctAnswer: 3,
    explanation: "An-Nahl, An-Naml und Al-'Ankabut sind nach Insekten benannt."
  },
  {
    id: 23,
    category: "Quran",
    question: "Wie viele Juz' (Teile) hat der Quran?",
    options: ["20", "25", "30", "40"],
    correctAnswer: 2,
    explanation: "Der Quran ist in 30 Juz' eingeteilt."
  },
  {
    id: 24,
    category: "Quran",
    question: "Welche Sure wird als 'Al-Munajat' (die flüsternde Frau) bezeichnet?",
    options: ["Al-Mujadila", "Al-Mumtahana", "Al-Mumtahina", "Al-Hashr"],
    correctAnswer: 0,
    explanation: "Sure Al-Mujadila (58) wird so genannt."
  },
  {
    id: 25,
    category: "Quran",
    question: "In welcher Sure wird der Prophet ﷺ direkt mit 'Ya Ayyuha an-Nabi' angesprochen?",
    options: ["Al-Anfal", "Al-Ahzab", "At-Talaq", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Der Prophet wird in mehreren Suren so angesprochen."
  },
  {
    id: 26,
    category: "Quran",
    question: "Welche Sure enthält den Vers über das Fasten (Ramadan)?",
    options: ["Al-Baqara", "Al-Imran", "An-Nisa", "Al-Maidah"],
    correctAnswer: 0,
    explanation: "Die Fastenverse sind in Sure Al-Baqara (2:183-187)."
  },
  {
    id: 27,
    category: "Quran",
    question: "Wie heißt die kürzeste Sure im Quran?",
    options: ["Al-Ikhlas", "Al-Kawthar", "Al-Asr", "An-Nasr"],
    correctAnswer: 1,
    explanation: "Al-Kawthar (108) ist die kürzeste Sure mit 3 Versen."
  },
  {
    id: 28,
    category: "Quran",
    question: "Welche Sure wird 'Al-Hawariyyun' genannt?",
    options: ["Al-Imran", "Maryam", "Al-Maidah", "As-Saff"],
    correctAnswer: 3,
    explanation: "Sure As-Saff wird so genannt (die Jünger)."
  },
  {
    id: 29,
    category: "Quran",
    question: "In welcher Sure wird die Geschichte von Dhul-Qarnayn erwähnt?",
    options: ["Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha"],
    correctAnswer: 1,
    explanation: "Die Geschichte von Dhul-Qarnayn ist in Sure Al-Kahf."
  },
  {
    id: 30,
    category: "Quran",
    question: "Welche Sure wurde während der Mi'raj offenbart?",
    options: ["Al-Isra", "An-Najm", "Al-Qadr", "Al-Baqara (letzte 2 Verse)"],
    correctAnswer: 3,
    explanation: "Die letzten zwei Verse von Al-Baqara wurden während Mi'raj offenbart."
  },
  {
    id: 31,
    category: "Quran",
    question: "Wie viele Mal wird das Wort 'Jannah' (Paradies) im Quran erwähnt?",
    options: ["77", "88", "99", "144"],
    correctAnswer: 0,
    explanation: "Das Wort Jannah wird 77 Mal erwähnt."
  },
  {
    id: 32,
    category: "Quran",
    question: "Welche Sure enthält den längsten Vers im Quran?",
    options: ["Al-Baqara", "Al-Imran", "An-Nisa", "Al-Maidah"],
    correctAnswer: 0,
    explanation: "Al-Baqara 2:282 (Ayat al-Dayn) ist der längste Vers."
  },
  {
    id: 33,
    category: "Quran",
    question: "Wie viele Suren beginnen mit 'Qul' (Sag)?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "5 Suren beginnen mit 'Qul'."
  },
  {
    id: 34,
    category: "Quran",
    question: "In welcher Sure wird die Schlacht von Uhud erwähnt?",
    options: ["Al-Baqara", "Al-Imran", "Al-Anfal", "At-Tawba"],
    correctAnswer: 1,
    explanation: "Sure Al-Imran erwähnt die Schlacht von Uhud."
  },
  {
    id: 35,
    category: "Quran",
    question: "Welche Sure wird 'Banu Isra'il' genannt?",
    options: ["Al-Isra", "Al-Baqara", "Al-Imran", "Al-A'raf"],
    correctAnswer: 0,
    explanation: "Sure Al-Isra (17) wird auch Banu Isra'il genannt."
  },
  {
    id: 36,
    category: "Quran",
    question: "Wie viele Mal wird das Gebet (Salah) im Quran erwähnt?",
    options: ["67", "77", "82", "99"],
    correctAnswer: 2,
    explanation: "Das Gebet wird 82 Mal erwähnt."
  },
  {
    id: 37,
    category: "Quran",
    question: "Welche Sure endet mit 'Rabb al-Falaq'?",
    options: ["Al-Ikhlas", "Al-Falaq", "An-Nas", "Al-Kawthar"],
    correctAnswer: 1,
    explanation: "Sure Al-Falaq (113) endet mit diesem Ausdruck."
  },
  {
    id: 38,
    category: "Quran",
    question: "In welcher Sure wird die Teilung des Mondes erwähnt?",
    options: ["Al-Qamar", "Ar-Rahman", "Al-Waqi'a", "Al-Mulk"],
    correctAnswer: 0,
    explanation: "Sure Al-Qamar (54) erwähnt die Mondspaltung."
  },
  {
    id: 39,
    category: "Quran",
    question: "Welche Sure behandelt die Regelungen der Scheidung (Talaq)?",
    options: ["An-Nisa", "At-Talaq", "Al-Baqara", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Alle drei Suren behandeln Scheidungsregelungen."
  },
  {
    id: 40,
    category: "Quran",
    question: "Wie viele 'Manzil' (Abschnitte für wöchentliches Lesen) gibt es im Quran?",
    options: ["5", "7", "10", "14"],
    correctAnswer: 1,
    explanation: "Der Quran ist in 7 Manzil für wöchentliches Lesen eingeteilt."
  },

  // Hadith (40 Fragen)
  {
    id: 41,
    category: "Hadith",
    question: "Wer gilt als der zuverlässigste Hadith-Sammler?",
    options: ["Imam Bukhari", "Imam Muslim", "Imam Tirmidhi", "Imam Abu Dawud"],
    correctAnswer: 0,
    explanation: "Imam Bukhari's Sammlung gilt als die authentischste."
  },
  {
    id: 42,
    category: "Hadith",
    question: "Wie viele Hadithe enthält Sahih al-Bukhari ungefähr (ohne Wiederholungen)?",
    options: ["2602", "7563", "4000", "9000"],
    correctAnswer: 0,
    explanation: "Ohne Wiederholungen enthält es ca. 2602 Hadithe."
  },
  {
    id: 43,
    category: "Hadith",
    question: "Was bedeutet 'Isnad' in der Hadith-Wissenschaft?",
    options: ["Der Text des Hadith", "Die Überliefererkette", "Der Kommentar", "Die Authentizität"],
    correctAnswer: 1,
    explanation: "Isnad ist die Überliefererkette eines Hadith."
  },
  {
    id: 44,
    category: "Hadith",
    question: "Welcher Gefährte überlieferte die meisten Hadithe?",
    options: ["Abu Bakr", "Umar ibn al-Khattab", "Abu Huraira", "Ali ibn Abi Talib"],
    correctAnswer: 2,
    explanation: "Abu Huraira überlieferte über 5000 Hadithe."
  },
  {
    id: 45,
    category: "Hadith",
    question: "Was ist ein 'Hadith Qudsi'?",
    options: ["Ein sehr authentischer Hadith", "Worte Allahs in der Bedeutung des Propheten", "Ein schwacher Hadith", "Ein erfundener Hadith"],
    correctAnswer: 1,
    explanation: "Hadith Qudsi sind göttliche Worte, aber nicht Teil des Quran."
  },
  {
    id: 46,
    category: "Hadith",
    question: "Wie viele Hauptwerke (Kutub as-Sitta) der Hadith-Literatur gibt es?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    explanation: "Es gibt 6 kanonische Hadith-Sammlungen."
  },
  {
    id: 47,
    category: "Hadith",
    question: "Was bedeutet 'Maudu' in der Hadith-Klassifikation?",
    options: ["Authentisch", "Gut", "Schwach", "Erfunden/Gefälscht"],
    correctAnswer: 3,
    explanation: "Maudu' bedeutet erfunden oder gefälscht."
  },
  {
    id: 48,
    category: "Hadith",
    question: "Wer war der Lehrer von Imam Bukhari?",
    options: ["Imam Ahmad", "Ishaq ibn Rahawayh", "Imam Malik", "Imam Shafi'i"],
    correctAnswer: 1,
    explanation: "Ishaq ibn Rahawayh war einer seiner Hauptlehrer."
  },
  {
    id: 49,
    category: "Hadith",
    question: "Was ist ein 'Mursal' Hadith?",
    options: ["Mit vollständiger Kette", "Ohne Gefährten in der Kette", "Mit schwachen Überlieferern", "Sehr kurzer Hadith"],
    correctAnswer: 1,
    explanation: "Mursal ist ein Hadith, bei dem der Gefährte fehlt."
  },
  {
    id: 50,
    category: "Hadith",
    question: "In welchem Jahrhundert lebte Imam Bukhari?",
    options: ["1. Jahrhundert", "2. Jahrhundert", "3. Jahrhundert", "4. Jahrhundert"],
    correctAnswer: 2,
    explanation: "Imam Bukhari lebte im 3. Jahrhundert nach Hijra (194-256 AH)."
  },
  {
    id: 51,
    category: "Hadith",
    question: "Was ist die Bedeutung von 'Matn' in der Hadith-Terminologie?",
    options: ["Die Überliefererkette", "Der Haupttext des Hadith", "Der Kommentar", "Die Zeit der Überlieferung"],
    correctAnswer: 1,
    explanation: "Matn ist der eigentliche Text/Inhalt des Hadith."
  },
  {
    id: 52,
    category: "Hadith",
    question: "Welche Gefährtin überlieferte die meisten Hadithe?",
    options: ["Khadija", "Aisha", "Fatima", "Hafsa"],
    correctAnswer: 1,
    explanation: "Aisha (ra) überlieferte über 2000 Hadithe."
  },
  {
    id: 53,
    category: "Hadith",
    question: "Was bedeutet 'Hassan' in der Hadith-Klassifikation?",
    options: ["Schwach", "Gut/Akzeptabel", "Sehr authentisch", "Erfunden"],
    correctAnswer: 1,
    explanation: "Hassan bedeutet 'gut' oder 'akzeptabel'."
  },
  {
    id: 54,
    category: "Hadith",
    question: "Wer schrieb 'Musnad Ahmad'?",
    options: ["Imam Ahmad ibn Hanbal", "Imam Malik", "Imam Shafi'i", "Imam Abu Hanifa"],
    correctAnswer: 0,
    explanation: "Imam Ahmad ibn Hanbal sammelte über 27.000 Hadithe im Musnad."
  },
  {
    id: 55,
    category: "Hadith",
    question: "Was ist ein 'Mutawatir' Hadith?",
    options: ["Von einer Person überliefert", "Von vielen Überlieferern, sodass Fälschung unmöglich ist", "Ein schwacher Hadith", "Ein langer Hadith"],
    correctAnswer: 1,
    explanation: "Mutawatir bedeutet Überlieferung durch so viele Personen, dass Fälschung ausgeschlossen ist."
  },
  {
    id: 56,
    category: "Hadith",
    question: "Wie heißt das berühmte Werk von Imam Muslim?",
    options: ["Sahih Muslim", "Jami' at-Tirmidhi", "Sunan an-Nasa'i", "Musnad Ahmad"],
    correctAnswer: 0,
    explanation: "Sein Hauptwerk heißt 'Sahih Muslim'."
  },
  {
    id: 57,
    category: "Hadith",
    question: "Was bedeutet 'Da'if' in der Hadith-Klassifikation?",
    options: ["Authentisch", "Gut", "Schwach", "Erfunden"],
    correctAnswer: 2,
    explanation: "Da'if bedeutet schwach."
  },
  {
    id: 58,
    category: "Hadith",
    question: "Wer ist bekannt für sein Werk 'Sunan'?",
    options: ["Abu Dawud", "Ibn Majah", "An-Nasa'i", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Alle drei haben Werke mit dem Titel 'Sunan' verfasst."
  },
  {
    id: 59,
    category: "Hadith",
    question: "Was ist 'Ilm al-Rijal'?",
    options: ["Wissenschaft der Hadith-Überlieferer", "Wissenschaft der Rechtsprechung", "Wissenschaft des Tafsir", "Wissenschaft der Aqidah"],
    correctAnswer: 0,
    explanation: "Ilm al-Rijal ist die Wissenschaft der Überlieferer-Biographien."
  },
  {
    id: 60,
    category: "Hadith",
    question: "Wie viele Hadithe enthält Muwatta Imam Malik ungefähr?",
    options: ["500", "1000", "1720", "3000"],
    correctAnswer: 2,
    explanation: "Muwatta enthält ca. 1720 Hadithe."
  },
  {
    id: 61,
    category: "Hadith",
    question: "Was bedeutet 'Sahih' in der Hadith-Terminologie?",
    options: ["Schwach", "Gut", "Authentisch/Gesund", "Erfunden"],
    correctAnswer: 2,
    explanation: "Sahih bedeutet authentisch oder gesund."
  },
  {
    id: 62,
    category: "Hadith",
    question: "Welcher Gelehrte wird als 'Amir al-Mu'minin fil-Hadith' bezeichnet?",
    options: ["Imam Bukhari", "Imam Muslim", "Imam Ahmad", "Shu'bah ibn al-Hajjaj"],
    correctAnswer: 3,
    explanation: "Shu'bah erhielt diesen ehrenvollen Titel."
  },
  {
    id: 63,
    category: "Hadith",
    question: "Was ist ein 'Gharib' Hadith?",
    options: ["Von nur einem Überlieferer", "Von vielen Überlieferern", "Ein langer Hadith", "Ein kurzer Hadith"],
    correctAnswer: 0,
    explanation: "Gharib bedeutet, von nur einem Überlieferer überliefert."
  },
  {
    id: 64,
    category: "Hadith",
    question: "Wer schrieb 'Jami' at-Tirmidhi'?",
    options: ["Imam Tirmidhi", "Imam Bukhari", "Imam Muslim", "Imam Abu Dawud"],
    correctAnswer: 0,
    explanation: "Imam at-Tirmidhi verfasste das Jami'."
  },
  {
    id: 65,
    category: "Hadith",
    question: "Was ist 'Riwayah' in der Hadith-Wissenschaft?",
    options: ["Überlieferung", "Verständnis", "Kommentar", "Kritik"],
    correctAnswer: 0,
    explanation: "Riwayah bedeutet Überlieferung/Transmission."
  },
  {
    id: 66,
    category: "Hadith",
    question: "Wie viele Hauptkategorien von Hadith gibt es basierend auf Authentizität?",
    options: ["2", "3", "5", "7"],
    correctAnswer: 2,
    explanation: "Sahih, Hassan, Da'if, Maudu', und andere Unterkategorien."
  },
  {
    id: 67,
    category: "Hadith",
    question: "Was bedeutet 'Musnad' in der Hadith-Literatur?",
    options: ["Eine Sammlung nach Gefährten geordnet", "Eine Sammlung nach Themen", "Schwache Hadithe", "Kurze Hadithe"],
    correctAnswer: 0,
    explanation: "Musnad ist nach Gefährten organisiert."
  },
  {
    id: 68,
    category: "Hadith",
    question: "Wer ist als 'Faqih al-Muhaddithun' bekannt?",
    options: ["Imam Bukhari", "Imam Muslim", "Imam Shafi'i", "Sufyan ath-Thawri"],
    correctAnswer: 3,
    explanation: "Sufyan ath-Thawri war bekannt als Faqih unter den Hadith-Gelehrten."
  },
  {
    id: 69,
    category: "Hadith",
    question: "Was ist ein 'Munqati' Hadith?",
    options: ["Mit vollständiger Kette", "Mit Unterbrechung in der Kette", "Mit schwachen Überlieferern", "Sehr kurz"],
    correctAnswer: 1,
    explanation: "Munqati' hat eine Unterbrechung in der Überliefererkette."
  },
  {
    id: 70,
    category: "Hadith",
    question: "Welches Werk gilt als erste systematische Hadith-Sammlung?",
    options: ["Sahih Bukhari", "Muwatta Malik", "Musnad Ahmad", "Sahih Muslim"],
    correctAnswer: 1,
    explanation: "Muwatta Imam Malik ist eine der frühesten systematischen Sammlungen."
  },
  {
    id: 71,
    category: "Hadith",
    question: "Was bedeutet 'Jarh wa Ta'dil'?",
    options: ["Kritik und Bestätigung von Überlieferern", "Sammlung von Hadithen", "Interpretation", "Kommentar"],
    correctAnswer: 0,
    explanation: "Jarh wa Ta'dil ist die Wissenschaft der Überlieferer-Kritik."
  },
  {
    id: 72,
    category: "Hadith",
    question: "Wie viele Hadithe hat Imam Bukhari aus etwa 600.000 für sein Sahih ausgewählt?",
    options: ["2602", "4000", "7397", "10000"],
    correctAnswer: 2,
    explanation: "Er wählte ca. 7397 Hadithe (mit Wiederholungen)."
  },
  {
    id: 73,
    category: "Hadith",
    question: "Was ist 'Tadlis' in der Hadith-Terminologie?",
    options: ["Authentizität", "Verschleierung/Täuschung in der Überlieferung", "Vollständigkeit", "Kürze"],
    correctAnswer: 1,
    explanation: "Tadlis ist die Verschleierung von Mängeln in der Kette."
  },
  {
    id: 74,
    category: "Hadith",
    question: "Welcher Imam ist bekannt für seine Strenge bei der Hadith-Authentifizierung?",
    options: ["Imam Bukhari", "Imam Tirmidhi", "Imam Ibn Majah", "Imam Abu Dawud"],
    correctAnswer: 0,
    explanation: "Imam Bukhari war sehr streng in seinen Kriterien."
  },
  {
    id: 75,
    category: "Hadith",
    question: "Was ist ein 'Mu'allaq' Hadith?",
    options: ["Mit vollständiger Kette", "Mit weggelassenen Überlieferern am Anfang", "Mit schwachen Überlieferern", "Sehr lang"],
    correctAnswer: 1,
    explanation: "Mu'allaq hat eine Lücke am Anfang der Kette."
  },
  {
    id: 76,
    category: "Hadith",
    question: "Wer schrieb 'Sunan an-Nasa'i'?",
    options: ["Imam an-Nasa'i", "Imam Bukhari", "Imam Muslim", "Imam Ahmad"],
    correctAnswer: 0,
    explanation: "Imam an-Nasa'i verfasste dieses Werk."
  },
  {
    id: 77,
    category: "Hadith",
    question: "Was bedeutet 'Athar'?",
    options: ["Aussage des Propheten", "Aussage der Gefährten", "Aussage der Tabi'in", "Aussage von Gelehrten"],
    correctAnswer: 1,
    explanation: "Athar bezieht sich auf Aussagen der Gefährten."
  },
  {
    id: 78,
    category: "Hadith",
    question: "Wie heißt das kleinere Werk von Imam an-Nasa'i?",
    options: ["As-Sunan as-Sughra", "Al-Mujtaba", "Beide sind korrekt", "As-Sunan al-Kubra"],
    correctAnswer: 2,
    explanation: "Sein kleineres Werk hat beide Namen."
  },
  {
    id: 79,
    category: "Hadith",
    question: "Was ist ein 'Maqtu' Hadith?",
    options: ["Aussage des Propheten", "Aussage eines Gefährten", "Aussage eines Tabi'i", "Erfundener Hadith"],
    correctAnswer: 1,
    explanation: "Maqtu' ist eine Aussage eines Gefährten (nicht vom Propheten)."
  },
  {
    id: 80,
    category: "Hadith",
    question: "Welcher der Kutub as-Sitta wird als am wenigsten authentisch angesehen?",
    options: ["Sahih Bukhari", "Sahih Muslim", "Sunan Ibn Majah", "Jami' at-Tirmidhi"],
    correctAnswer: 2,
    explanation: "Sunan Ibn Majah enthält mehr schwache Hadithe als die anderen."
  },

  // Fiqh (40 Fragen)
  {
    id: 81,
    category: "Fiqh",
    question: "Was sind die vier Hauptquellen des islamischen Rechts (Usul al-Fiqh)?",
    options: ["Quran, Sunnah, Ijma, Qiyas", "Quran, Hadith, Logik, Tradition", "Quran, Sunnah, Vernunft, Gewohnheit", "Nur Quran und Sunnah"],
    correctAnswer: 0,
    explanation: "Die vier Hauptquellen sind Quran, Sunnah, Ijma (Konsens) und Qiyas (Analogie)."
  },
  {
    id: 82,
    category: "Fiqh",
    question: "Wie viele Rechtsschulen (Madhahib) des sunnitischen Islam gibt es heute hauptsächlich?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Es gibt vier: Hanafi, Maliki, Shafi'i und Hanbali."
  },
  {
    id: 83,
    category: "Fiqh",
    question: "Wer gründete die Hanafi-Rechtsschule?",
    options: ["Imam Abu Hanifa", "Imam Malik", "Imam Shafi'i", "Imam Ahmad"],
    correctAnswer: 0,
    explanation: "Imam Abu Hanifa (699-767 CE) gründete die Hanafi-Schule."
  },
  {
    id: 84,
    category: "Fiqh",
    question: "Was bedeutet 'Ijma' in Usul al-Fiqh?",
    options: ["Analogie", "Konsens der Gelehrten", "Eigenständige Rechtsfindung", "Öffentliches Interesse"],
    correctAnswer: 1,
    explanation: "Ijma ist der Konsens der Gelehrten."
  },
  {
    id: 85,
    category: "Fiqh",
    question: "Was ist 'Qiyas' in der islamischen Rechtsprechung?",
    options: ["Konsens", "Analogie/Analogieschluss", "Öffentliches Interesse", "Gewohnheit"],
    correctAnswer: 1,
    explanation: "Qiyas ist der Analogieschluss."
  },
  {
    id: 86,
    category: "Fiqh",
    question: "Welche Handlung ist 'Fard' im islamischen Recht?",
    options: ["Empfohlen", "Verpflichtend", "Erlaubt", "Verpönt"],
    correctAnswer: 1,
    explanation: "Fard bedeutet obligatorisch/verpflichtend."
  },
  {
    id: 87,
    category: "Fiqh",
    question: "Was bedeutet 'Makruh' in der islamischen Rechtsterminologie?",
    options: ["Verboten", "Verpönt/Unerwünscht", "Erlaubt", "Empfohlen"],
    correctAnswer: 1,
    explanation: "Makruh bedeutet verpönt oder unerwünscht."
  },
  {
    id: 88,
    category: "Fiqh",
    question: "Wie viele Arten von Fard gibt es?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "Fard al-Ayn (individuelle Pflicht) und Fard al-Kifaya (kollektive Pflicht)."
  },
  {
    id: 89,
    category: "Fiqh",
    question: "Was ist 'Ijtihad' in der islamischen Rechtsprechung?",
    options: ["Konsens", "Eigenständige Rechtsfindung", "Analogie", "Tradition"],
    correctAnswer: 1,
    explanation: "Ijtihad ist die eigenständige Rechtsfindung qualifizierter Gelehrter."
  },
  {
    id: 90,
    category: "Fiqh",
    question: "Welche Madhab ist am weitesten verbreitet?",
    options: ["Hanafi", "Maliki", "Shafi'i", "Hanbali"],
    correctAnswer: 0,
    explanation: "Die Hanafi-Schule hat die meisten Anhänger weltweit."
  },
  {
    id: 91,
    category: "Fiqh",
    question: "Was bedeutet 'Mubah' in der islamischen Rechtsterminologie?",
    options: ["Verboten", "Verpflichtend", "Erlaubt/Neutral", "Empfohlen"],
    correctAnswer: 2,
    explanation: "Mubah bedeutet erlaubt oder neutral."
  },
  {
    id: 92,
    category: "Fiqh",
    question: "Wer schrieb 'Al-Muwatta', eines der frühesten Fiqh-Werke?",
    options: ["Imam Malik", "Imam Shafi'i", "Imam Abu Hanifa", "Imam Ahmad"],
    correctAnswer: 0,
    explanation: "Imam Malik schrieb Al-Muwatta."
  },
  {
    id: 93,
    category: "Fiqh",
    question: "Was ist 'Istihsan' in der Hanafi-Schule?",
    options: ["Konsens", "Juristische Präferenz", "Analogie", "Öffentliches Interesse"],
    correctAnswer: 1,
    explanation: "Istihsan ist die juristische Präferenz."
  },
  {
    id: 94,
    category: "Fiqh",
    question: "Was bedeutet 'Taqlid'?",
    options: ["Eigenständige Rechtsfindung", "Folgen einer Rechtsschule", "Konsens", "Analogie"],
    correctAnswer: 1,
    explanation: "Taqlid ist das Folgen der Meinung eines Gelehrten oder einer Schule."
  },
  {
    id: 95,
    category: "Fiqh",
    question: "Welches Werk schrieb Imam Shafi'i über Rechtsmethodologie?",
    options: ["Al-Muwatta", "Ar-Risala", "Al-Umm", "Al-Muhalla"],
    correctAnswer: 1,
    explanation: "Ar-Risala ist sein Werk über Usul al-Fiqh."
  },
  {
    id: 96,
    category: "Fiqh",
    question: "Was ist 'Maslaha Mursala'?",
    options: ["Öffentliches Interesse ohne spezifischen Text", "Konsens", "Analogie", "Gewohnheit"],
    correctAnswer: 0,
    explanation: "Maslaha Mursala ist das öffentliche Interesse."
  },
  {
    id: 97,
    category: "Fiqh",
    question: "Wie viele Hauptkategorien von Handlungen (Ahkam) gibt es im Fiqh?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "Fard, Mustahabb, Mubah, Makruh, Haram."
  },
  {
    id: 98,
    category: "Fiqh",
    question: "Was bedeutet 'Mustahabb' (auch Mandub)?",
    options: ["Verboten", "Verpflichtend", "Empfohlen", "Erlaubt"],
    correctAnswer: 2,
    explanation: "Mustahabb bedeutet empfohlen."
  },
  {
    id: 99,
    category: "Fiqh",
    question: "Welche Madhab verwendet 'Istislah' als Quelle?",
    options: ["Hanafi", "Maliki", "Shafi'i", "Hanbali"],
    correctAnswer: 1,
    explanation: "Die Maliki-Schule verwendet Istislah (öffentliches Interesse)."
  },
  {
    id: 100,
    category: "Fiqh",
    question: "Was ist 'Sadd adh-Dhara'i'?",
    options: ["Blockierung von Mitteln zum Bösen", "Öffnung von Wegen", "Konsens", "Analogie"],
    correctAnswer: 0,
    explanation: "Sadd adh-Dhara'i bedeutet Blockierung von Mitteln, die zu Verbotenem führen."
  },
  {
    id: 101,
    category: "Fiqh",
    question: "In welcher Stadt wurde die Maliki-Schule hauptsächlich entwickelt?",
    options: ["Mekka", "Medina", "Kufa", "Bagdad"],
    correctAnswer: 1,
    explanation: "Die Maliki-Schule entwickelte sich in Medina."
  },
  {
    id: 102,
    category: "Fiqh",
    question: "Was ist ein 'Mujtahid'?",
    options: ["Student", "Qualifizierter Rechtsgelehrter für Ijtihad", "Richter", "Prediger"],
    correctAnswer: 1,
    explanation: "Ein Mujtahid ist befähigt, eigenständige Rechtsfindung zu betreiben."
  },
  {
    id: 103,
    category: "Fiqh",
    question: "Welche Madhab betont am stärksten den Hadith?",
    options: ["Hanafi", "Maliki", "Shafi'i", "Hanbali"],
    correctAnswer: 3,
    explanation: "Die Hanbali-Schule ist bekannt für ihre starke Betonung des Hadith."
  },
  {
    id: 104,
    category: "Fiqh",
    question: "Was bedeutet 'Naskh' in Usul al-Fiqh?",
    options: ["Bestätigung", "Aufhebung/Abrogation", "Wiederholung", "Verstärkung"],
    correctAnswer: 1,
    explanation: "Naskh ist die Aufhebung einer Regelung durch eine spätere."
  },
  {
    id: 105,
    category: "Fiqh",
    question: "Welches ist das Hauptwerk von Imam Abu Hanifa's Schülern?",
    options: ["Al-Mabsut", "Al-Hidaya", "Al-Mukhtasar", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Seine Schüler schrieben viele wichtige Werke."
  },
  {
    id: 106,
    category: "Fiqh",
    question: "Was ist 'Urf' in der islamischen Rechtsprechung?",
    options: ["Konsens", "Gewohnheit/Brauch", "Analogie", "Öffentliches Interesse"],
    correctAnswer: 1,
    explanation: "Urf ist die Gewohnheit oder der Brauch."
  },
  {
    id: 107,
    category: "Fiqh",
    question: "Wie heißt das berühmte Fiqh-Werk der Shafi'i-Schule von Imam Nawawi?",
    options: ["Al-Majmu'", "Minhaj at-Talibin", "Beide sind korrekt", "Al-Umm"],
    correctAnswer: 2,
    explanation: "Imam Nawawi schrieb beide wichtigen Werke."
  },
  {
    id: 108,
    category: "Fiqh",
    question: "Was bedeutet 'Fatwa'?",
    options: ["Gerichtsurteil", "Rechtsgutachten", "Konsens", "Analogie"],
    correctAnswer: 1,
    explanation: "Eine Fatwa ist ein Rechtsgutachten."
  },
  {
    id: 109,
    category: "Fiqh",
    question: "Welche Madhab ist in Nordafrika am verbreitetsten?",
    options: ["Hanafi", "Maliki", "Shafi'i", "Hanbali"],
    correctAnswer: 1,
    explanation: "Die Maliki-Schule dominiert in Nordafrika."
  },
  {
    id: 110,
    category: "Fiqh",
    question: "Was ist 'Istishab' in Usul al-Fiqh?",
    options: ["Neue Regelung", "Beibehaltung des Status quo", "Änderung", "Aufhebung"],
    correctAnswer: 1,
    explanation: "Istishab bedeutet Beibehaltung der ursprünglichen Regel."
  },
  {
    id: 111,
    category: "Fiqh",
    question: "Wer war der berühmteste Schüler von Imam Abu Hanifa?",
    options: ["Imam Muhammad ash-Shaybani", "Imam Abu Yusuf", "Beide waren gleich berühmt", "Imam Malik"],
    correctAnswer: 2,
    explanation: "Abu Yusuf und Muhammad ash-Shaybani waren seine berühmtesten Schüler."
  },
  {
    id: 112,
    category: "Fiqh",
    question: "Was ist der Unterschied zwischen 'Haram' und 'Makruh Tahriman'?",
    options: ["Kein Unterschied", "Haram ist strenger", "Makruh Tahriman ist schlimmer", "Nur terminologisch"],
    correctAnswer: 3,
    explanation: "Makruh Tahriman ist praktisch wie Haram, aber terminologisch anders."
  },
  {
    id: 113,
    category: "Fiqh",
    question: "Welches ist das Hauptwerk von Imam Ahmad ibn Hanbal in Fiqh?",
    options: ["Al-Mughni", "Al-Musnad", "Al-Muharrar", "Al-Insaf"],
    correctAnswer: 1,
    explanation: "Al-Musnad ist sein Hauptwerk (enthält Hadithe, Basis für Fiqh)."
  },
  {
    id: 114,
    category: "Fiqh",
    question: "Was bedeutet 'Dalil' in Usul al-Fiqh?",
    options: ["Beweis/Quelle", "Meinung", "Zweifel", "Tradition"],
    correctAnswer: 0,
    explanation: "Dalil bedeutet Beweis oder Rechtsquelle."
  },
  {
    id: 115,
    category: "Fiqh",
    question: "Welche Madhab ist in Südostasien am verbreitetsten?",
    options: ["Hanafi", "Maliki", "Shafi'i", "Hanbali"],
    correctAnswer: 2,
    explanation: "Die Shafi'i-Schule dominiert in Südostasien."
  },
  {
    id: 116,
    category: "Fiqh",
    question: "Was ist 'Maqasid ash-Shari'ah'?",
    options: ["Rechtsmethodik", "Ziele und Absichten der Scharia", "Konsens", "Analogie"],
    correctAnswer: 1,
    explanation: "Maqasid ash-Shari'ah sind die höheren Ziele der Scharia."
  },
  {
    id: 117,
    category: "Fiqh",
    question: "Wie viele essentielle Maqasid (Ziele) identifiziert die klassische Lehre?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 1,
    explanation: "Fünf: Religion, Leben, Verstand, Nachkommenschaft, Besitz."
  },
  {
    id: 118,
    category: "Fiqh",
    question: "Was ist 'Ikhtilaf'?",
    options: ["Einigkeit", "Meinungsverschiedenheit", "Konsens", "Beweis"],
    correctAnswer: 1,
    explanation: "Ikhtilaf bedeutet Meinungsverschiedenheit unter Gelehrten."
  },
  {
    id: 119,
    category: "Fiqh",
    question: "Wer schrieb 'Al-Umm' in der Shafi'i-Schule?",
    options: ["Imam Shafi'i selbst", "Imam Nawawi", "Al-Ghazali", "Ar-Rafi'i"],
    correctAnswer: 0,
    explanation: "Imam Shafi'i schrieb Al-Umm."
  },
  {
    id: 120,
    category: "Fiqh",
    question: "Was bedeutet 'Tahrim'?",
    options: ["Erlaubnis", "Verbot", "Empfehlung", "Neutralität"],
    correctAnswer: 1,
    explanation: "Tahrim bedeutet Verbot."
  },

  // Seerah (30 Fragen)
  {
    id: 121,
    category: "Seerah",
    question: "In welchem Jahr wurde der Prophet Muhammad ﷺ geboren?",
    options: ["570 n.Chr.", "571 n.Chr.", "572 n.Chr.", "580 n.Chr."],
    correctAnswer: 0,
    explanation: "Der Prophet ﷺ wurde ca. 570 n.Chr. (Jahr des Elefanten) geboren."
  },
  {
    id: 122,
    category: "Seerah",
    question: "Wie hieß die Amme des Propheten ﷺ?",
    options: ["Halima as-Sa'diyah", "Umm Ayman", "Thuwaybah", "Fatima"],
    correctAnswer: 0,
    explanation: "Halima as-Sa'diyah säugte den Propheten ﷺ."
  },
  {
    id: 123,
    category: "Seerah",
    question: "Wie alt war der Prophet ﷺ bei der ersten Offenbarung?",
    options: ["35", "38", "40", "43"],
    correctAnswer: 2,
    explanation: "Er war 40 Jahre alt."
  },
  {
    id: 124,
    category: "Seerah",
    question: "In welcher Höhle erhielt der Prophet ﷺ die erste Offenbarung?",
    options: ["Hira", "Thawr", "Uhud", "Quba"],
    correctAnswer: 0,
    explanation: "In der Höhle Hira auf dem Berg an-Nur."
  },
  {
    id: 125,
    category: "Seerah",
    question: "Wer war der erste Mann, der den Islam annahm?",
    options: ["Umar ibn al-Khattab", "Abu Bakr as-Siddiq", "Uthman ibn Affan", "Ali ibn Abi Talib"],
    correctAnswer: 1,
    explanation: "Abu Bakr as-Siddiq war der erste erwachsene Mann."
  },
  {
    id: 126,
    category: "Seerah",
    question: "Wie lange dauerte die mekkanische Periode?",
    options: ["10 Jahre", "13 Jahre", "15 Jahre", "20 Jahre"],
    correctAnswer: 1,
    explanation: "Die mekkanische Periode dauerte 13 Jahre."
  },
  {
    id: 127,
    category: "Seerah",
    question: "Welches Jahr wird als 'Jahr der Trauer' bezeichnet?",
    options: ["Das 9. Jahr der Prophetenschaft", "Das 10. Jahr der Prophetenschaft", "Das 11. Jahr der Prophetenschaft", "Das 12. Jahr der Prophetenschaft"],
    correctAnswer: 1,
    explanation: "Das 10. Jahr, als Khadija und Abu Talib starben."
  },
  {
    id: 128,
    category: "Seerah",
    question: "In welches Jahr fand die Hijra (Auswanderung) nach Medina statt?",
    options: ["620 n.Chr.", "621 n.Chr.", "622 n.Chr.", "623 n.Chr."],
    correctAnswer: 2,
    explanation: "Die Hijra war 622 n.Chr."
  },
  {
    id: 129,
    category: "Seerah",
    question: "Welcher Gefährte begleitete den Propheten ﷺ während der Hijra?",
    options: ["Umar", "Abu Bakr", "Uthman", "Ali"],
    correctAnswer: 1,
    explanation: "Abu Bakr begleitete ihn."
  },
  {
    id: 130,
    category: "Seerah",
    question: "In welcher Höhle versteckten sich der Prophet ﷺ und Abu Bakr während der Hijra?",
    options: ["Hira", "Thawr", "Uhud", "Arafat"],
    correctAnswer: 1,
    explanation: "In der Höhle Thawr."
  },
  {
    id: 131,
    category: "Seerah",
    question: "Wie viele große Schlachten führte der Prophet ﷺ persönlich an?",
    options: ["9", "17", "27", "37"],
    correctAnswer: 2,
    explanation: "Er führte 27 Expeditionen (Ghazwat) an."
  },
  {
    id: 132,
    category: "Seerah",
    question: "Wann fand die Schlacht von Badr statt?",
    options: ["2 AH", "3 AH", "4 AH", "5 AH"],
    correctAnswer: 0,
    explanation: "Die Schlacht von Badr war im Jahr 2 nach Hijra."
  },
  {
    id: 133,
    category: "Seerah",
    question: "Wie viele Muslime nahmen an der Schlacht von Badr teil?",
    options: ["313", "700", "1000", "3000"],
    correctAnswer: 0,
    explanation: "313 Muslime kämpften bei Badr."
  },
  {
    id: 134,
    category: "Seerah",
    question: "Wann fand die Schlacht von Uhud statt?",
    options: ["2 AH", "3 AH", "4 AH", "5 AH"],
    correctAnswer: 1,
    explanation: "Uhud war im Jahr 3 nach Hijra."
  },
  {
    id: 135,
    category: "Seerah",
    question: "Wer führte die Mekkaner in der Schlacht von Uhud an?",
    options: ["Abu Sufyan", "Abu Jahl", "Khalid ibn al-Walid", "Safwan ibn Umayyah"],
    correctAnswer: 0,
    explanation: "Abu Sufyan führte die Mekkaner an."
  },
  {
    id: 136,
    category: "Seerah",
    question: "Wann fand die Schlacht am Graben (al-Khandaq) statt?",
    options: ["3 AH", "4 AH", "5 AH", "6 AH"],
    correctAnswer: 2,
    explanation: "Al-Khandaq war im Jahr 5 nach Hijra."
  },
  {
    id: 137,
    category: "Seerah",
    question: "Wer schlug vor, einen Graben um Medina zu graben?",
    options: ["Umar ibn al-Khattab", "Salman al-Farsi", "Abu Bakr", "Ali ibn Abi Talib"],
    correctAnswer: 1,
    explanation: "Salman al-Farsi schlug diese persische Kriegstaktik vor."
  },
  {
    id: 138,
    category: "Seerah",
    question: "In welchem Jahr fand der Vertrag von Hudaybiyyah statt?",
    options: ["5 AH", "6 AH", "7 AH", "8 AH"],
    correctAnswer: 1,
    explanation: "Hudaybiyyah war im Jahr 6 nach Hijra."
  },
  {
    id: 139,
    category: "Seerah",
    question: "Wann wurde Mekka friedlich erobert?",
    options: ["6 AH", "7 AH", "8 AH", "9 AH"],
    correctAnswer: 2,
    explanation: "Mekka wurde im Jahr 8 nach Hijra erobert."
  },
  {
    id: 140,
    category: "Seerah",
    question: "Wie viele Muslime nahmen an der Eroberung Mekkas teil?",
    options: ["1.000", "5.000", "10.000", "15.000"],
    correctAnswer: 2,
    explanation: "Etwa 10.000 Muslime nahmen daran teil."
  },
  {
    id: 141,
    category: "Seerah",
    question: "Wann fand die Schlacht von Hunayn statt?",
    options: ["7 AH", "8 AH", "9 AH", "10 AH"],
    correctAnswer: 1,
    explanation: "Hunayn fand kurz nach der Eroberung Mekkas im Jahr 8 AH statt."
  },
  {
    id: 142,
    category: "Seerah",
    question: "Wann fand die Abschiedspilgerfahrt (Hajjat al-Wada) statt?",
    options: ["8 AH", "9 AH", "10 AH", "11 AH"],
    correctAnswer: 2,
    explanation: "Die Abschiedspilgerfahrt war im Jahr 10 nach Hijra."
  },
  {
    id: 143,
    category: "Seerah",
    question: "Wie viele Kinder hatte der Prophet ﷺ?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "Er hatte 7 Kinder: 3 Söhne und 4 Töchter."
  },
  {
    id: 144,
    category: "Seerah",
    question: "Wie hieß der einzige Sohn des Propheten ﷺ, der das Säuglingsalter überlebte?",
    options: ["Qasim", "Abdullah", "Ibrahim", "Keiner überlebte"],
    correctAnswer: 3,
    explanation: "Alle seine Söhne starben im Kindesalter."
  },
  {
    id: 145,
    category: "Seerah",
    question: "Wer war die erste Ehefrau des Propheten ﷺ?",
    options: ["Aisha", "Khadija", "Hafsa", "Sawda"],
    correctAnswer: 1,
    explanation: "Khadija bint Khuwaylid war seine erste Frau."
  },
  {
    id: 146,
    category: "Seerah",
    question: "Wie alt war der Prophet ﷺ bei seinem Tod?",
    options: ["60", "61", "62", "63"],
    correctAnswer: 3,
    explanation: "Er starb im Alter von 63 Jahren."
  },
  {
    id: 147,
    category: "Seerah",
    question: "In welchem Monat starb der Prophet ﷺ?",
    options: ["Muharram", "Safar", "Rabi' al-Awwal", "Ramadan"],
    correctAnswer: 2,
    explanation: "Er starb im Rabi' al-Awwal."
  },
  {
    id: 148,
    category: "Seerah",
    question: "Wo wurde der Prophet ﷺ begraben?",
    options: ["In Mekka", "In seinem Haus in Medina", "Auf dem Baqi-Friedhof", "In der Propheten-Moschee"],
    correctAnswer: 1,
    explanation: "Er wurde in dem Raum begraben, in dem er starb (Aishas Raum)."
  },
  {
    id: 149,
    category: "Seerah",
    question: "Welcher Gefährte wurde nach dem Tod des Propheten ﷺ zum ersten Kalifen gewählt?",
    options: ["Umar ibn al-Khattab", "Abu Bakr as-Siddiq", "Uthman ibn Affan", "Ali ibn Abi Talib"],
    correctAnswer: 1,
    explanation: "Abu Bakr wurde der erste Kalif."
  },
  {
    id: 150,
    category: "Seerah",
    question: "Wie viele Ehefrauen hatte der Prophet ﷺ insgesamt?",
    options: ["9", "11", "13", "15"],
    correctAnswer: 1,
    explanation: "Der Prophet ﷺ hatte 11 Ehefrauen."
  },

  // Islamische Geschichte (30 Fragen)
  {
    id: 151,
    category: "Geschichte",
    question: "Wer war der zweite rechtgeleitete Kalif?",
    options: ["Abu Bakr", "Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib"],
    correctAnswer: 1,
    explanation: "Umar ibn al-Khattab war der zweite Kalif."
  },
  {
    id: 152,
    category: "Geschichte",
    question: "Wie lange dauerte das Kalifat von Abu Bakr?",
    options: ["1 Jahr", "2 Jahre", "3 Jahre", "4 Jahre"],
    correctAnswer: 1,
    explanation: "Abu Bakr war etwa 2 Jahre Kalif (632-634)."
  },
  {
    id: 153,
    category: "Geschichte",
    question: "Welcher Kalif wurde ermordet, während er den Quran rezitierte?",
    options: ["Abu Bakr", "Umar", "Uthman", "Ali"],
    correctAnswer: 2,
    explanation: "Uthman wurde während des Quran-Lesens ermordet."
  },
  {
    id: 154,
    category: "Geschichte",
    question: "Wann begann das Umayyaden-Kalifat?",
    options: ["632 CE", "644 CE", "656 CE", "661 CE"],
    correctAnswer: 3,
    explanation: "Das Umayyaden-Kalifat begann 661 CE."
  },
  {
    id: 155,
    category: "Geschichte",
    question: "Wer war der Gründer der Umayyaden-Dynastie?",
    options: ["Muawiya I", "Umar II", "Abd al-Malik", "Marwan I"],
    correctAnswer: 0,
    explanation: "Muawiya I gründete die Umayyaden-Dynastie."
  },
  {
    id: 156,
    category: "Geschichte",
    question: "Welche Stadt wurde zur Hauptstadt der Umayyaden?",
    options: ["Mekka", "Medina", "Damaskus", "Bagdad"],
    correctAnswer: 2,
    explanation: "Damaskus wurde die Hauptstadt."
  },
  {
    id: 157,
    category: "Geschichte",
    question: "Wann begann das Abbasiden-Kalifat?",
    options: ["711 CE", "732 CE", "750 CE", "800 CE"],
    correctAnswer: 2,
    explanation: "Das Abbasiden-Kalifat begann 750 CE."
  },
  {
    id: 158,
    category: "Geschichte",
    question: "Welche Stadt wurde zur Hauptstadt der Abbasiden?",
    options: ["Damaskus", "Bagdad", "Kairo", "Córdoba"],
    correctAnswer: 1,
    explanation: "Bagdad wurde 762 CE zur Hauptstadt."
  },
  {
    id: 159,
    category: "Geschichte",
    question: "Wer gründete das Abbasiden-Kalifat?",
    options: ["Abu al-Abbas as-Saffah", "Al-Mansur", "Harun ar-Rashid", "Al-Ma'mun"],
    correctAnswer: 0,
    explanation: "Abu al-Abbas as-Saffah war der erste Abbasiden-Kalif."
  },
  {
    id: 160,
    category: "Geschichte",
    question: "Welcher Abbasiden-Kalif gründete das 'Haus der Weisheit' (Bayt al-Hikma) in Bagdad?",
    options: ["Al-Mansur", "Harun ar-Rashid", "Al-Ma'mun", "Al-Mutawakkil"],
    correctAnswer: 2,
    explanation: "Kalif Al-Ma'mun gründete das berühmte Gelehrtenzentrum Bayt al-Hikma, wo islamische Wissenschaften und Übersetzungen blühten."
  },
  {
    id: 161,
    category: "Geschichte",
    question: "Wann eroberten die Muslime Spanien (Al-Andalus)?",
    options: ["632 CE", "661 CE", "711 CE", "750 CE"],
    correctAnswer: 2,
    explanation: "Die muslimische Eroberung begann 711 CE."
  },
  {
    id: 162,
    category: "Geschichte",
    question: "Wer führte die muslimische Eroberung Spaniens an?",
    options: ["Musa ibn Nusayr", "Tariq ibn Ziyad", "Beide zusammen", "Abd ar-Rahman"],
    correctAnswer: 2,
    explanation: "Tariq ibn Ziyad begann die Eroberung, Musa ibn Nusayr folgte."
  },
  {
    id: 163,
    category: "Geschichte",
    question: "Wie lange dauerte die muslimische Herrschaft in Spanien?",
    options: ["Etwa 400 Jahre", "Etwa 600 Jahre", "Etwa 800 Jahre", "Etwa 1000 Jahre"],
    correctAnswer: 2,
    explanation: "Die muslimische Herrschaft dauerte fast 800 Jahre (711-1492)."
  },
  {
    id: 164,
    category: "Geschichte",
    question: "Wann fiel Granada, das letzte muslimische Königreich in Spanien?",
    options: ["1212", "1348", "1453", "1492"],
    correctAnswer: 3,
    explanation: "Granada fiel 1492."
  },
  {
    id: 165,
    category: "Geschichte",
    question: "Wer gründete die Fatimiden-Dynastie?",
    options: ["Ubayd Allah al-Mahdi", "Al-Mu'izz", "Al-Hakim", "Al-Mustansir"],
    correctAnswer: 0,
    explanation: "Ubayd Allah al-Mahdi gründete die Dynastie 909 CE."
  },
  {
    id: 166,
    category: "Geschichte",
    question: "Welche Stadt gründeten die Fatimiden als ihre Hauptstadt?",
    options: ["Damaskus", "Bagdad", "Kairo", "Medina"],
    correctAnswer: 2,
    explanation: "Al-Qahira (Kairo) wurde 969 CE gegründet."
  },
  {
    id: 167,
    category: "Geschichte",
    question: "Wann begann das Osmanische Reich?",
    options: ["1099", "1258", "1299", "1453"],
    correctAnswer: 2,
    explanation: "Das Osmanische Reich begann ca. 1299."
  },
  {
    id: 168,
    category: "Geschichte",
    question: "Wer eroberte Konstantinopel für die Osmanen?",
    options: ["Osman I", "Orhan", "Mehmed II", "Suleiman der Prächtige"],
    correctAnswer: 2,
    explanation: "Sultan Mehmed II eroberte Konstantinopel 1453."
  },
  {
    id: 169,
    category: "Geschichte",
    question: "Wann fiel Bagdad an die Mongolen?",
    options: ["1099", "1187", "1258", "1453"],
    correctAnswer: 2,
    explanation: "Bagdad fiel 1258 an Hulagu Khan."
  },
  {
    id: 170,
    category: "Geschichte",
    question: "Welcher muslimische Herrscher besiegte die Kreuzfahrer in der Schlacht von Hattin?",
    options: ["Nur ad-Din", "Saladin (Salah ad-Din)", "Baibars", "Qutuz"],
    correctAnswer: 1,
    explanation: "Saladin besiegte die Kreuzfahrer 1187."
  },
  {
    id: 171,
    category: "Geschichte",
    question: "Wann begann der Erste Kreuzzug?",
    options: ["1066", "1095", "1099", "1187"],
    correctAnswer: 1,
    explanation: "Der Erste Kreuzzug begann 1095/1096."
  },
  {
    id: 172,
    category: "Geschichte",
    question: "Wer war der berühmteste Gelehrte des 'Goldenen Zeitalters' des Islam?",
    options: ["Ibn Sina (Avicenna)", "Al-Biruni", "Al-Khwarizmi", "Alle waren sehr bedeutend"],
    correctAnswer: 3,
    explanation: "Alle waren herausragende Gelehrte ihrer Zeit."
  },
  {
    id: 173,
    category: "Geschichte",
    question: "Welcher muslimische Gelehrte gilt als Vater der Algebra?",
    options: ["Ibn Sina", "Al-Biruni", "Al-Khwarizmi", "Al-Kindi"],
    correctAnswer: 2,
    explanation: "Al-Khwarizmi entwickelte die Algebra."
  },
  {
    id: 174,
    category: "Geschichte",
    question: "Wann wurde die Al-Azhar-Universität in Kairo gegründet?",
    options: ["970 CE", "1000 CE", "1100 CE", "1200 CE"],
    correctAnswer: 0,
    explanation: "Al-Azhar wurde 970 CE gegründet."
  },
  {
    id: 175,
    category: "Geschichte",
    question: "Welches muslimische Reich war im 16. Jahrhundert am mächtigsten?",
    options: ["Safaviden", "Moguln", "Osmanen", "Alle waren sehr mächtig"],
    correctAnswer: 3,
    explanation: "Im 16. Jh. waren alle drei Reiche mächtig (Gunpowder Empires)."
  },
  {
    id: 176,
    category: "Geschichte",
    question: "Welcher Mogul-Herrscher war bekannt für seine Toleranzpolitik und den Dialog zwischen Religionen?",
    options: ["Akbar", "Shah Jahan", "Aurangzeb", "Babur"],
    correctAnswer: 0,
    explanation: "Kaiser Akbar der Große förderte den interreligiösen Dialog und die Toleranz im Mogulreich."
  },
  {
    id: 177,
    category: "Geschichte",
    question: "Wer war der osmanische Sultan, der das längste Kalifat führte?",
    options: ["Mehmed II", "Suleiman der Prächtige", "Abdülhamid II", "Selim I"],
    correctAnswer: 1,
    explanation: "Suleiman der Prächtige regierte 46 Jahre (1520-1566) und führte das Osmanische Reich zu seiner größten Ausdehnung."
  },
  {
    id: 178,
    category: "Geschichte",
    question: "Welche Schlacht stoppte die muslimische Expansion nach Europa im Jahr 732?",
    options: ["Schlacht von Tours", "Schlacht von Wien", "Schlacht von Hattin", "Schlacht von Manzikert"],
    correctAnswer: 0,
    explanation: "Die Schlacht von Tours (732) stoppte die Expansion nach Westeuropa."
  },
  {
    id: 179,
    category: "Geschichte",
    question: "Wer war der letzte der vier rechtgeleiteten Kalifen?",
    options: ["Abu Bakr", "Umar", "Uthman", "Ali"],
    correctAnswer: 3,
    explanation: "Ali ibn Abi Talib war der vierte und letzte rechtgeleitete Kalif."
  },
  {
    id: 180,
    category: "Geschichte",
    question: "Welcher Mamluken-Sultan besiegte die Mongolen in der Schlacht von Ain Jalut?",
    options: ["Baibars", "Qutuz", "Saladin", "Al-Ashraf Khalil"],
    correctAnswer: 1,
    explanation: "Sultan Qutuz besiegte die Mongolen 1260."
  },

  // Aqidah (20 Fragen)
  {
    id: 181,
    category: "Aqidah",
    question: "Was sind die sechs Säulen des Iman (Glauben)?",
    options: [
      "Allah, Engel, Bücher, Propheten, Jüngster Tag, Qadar",
      "Shahada, Salah, Zakat, Sawm, Hajj, Jihad",
      "Quran, Sunnah, Ijma, Qiyas, Istihsan, Maslaha",
      "Tawhid, Risalah, Akhirah, Qadar, Adl, Imamat"
    ],
    correctAnswer: 0,
    explanation: "Die sechs Säulen des Iman sind: Glaube an Allah, Engel, Bücher, Propheten, Jüngsten Tag und Qadar."
  },
  {
    id: 182,
    category: "Aqidah",
    question: "Was bedeutet 'Tawhid'?",
    options: ["Prophetenschaft", "Einheit/Einzigkeit Allahs", "Glaube", "Bestimmung"],
    correctAnswer: 1,
    explanation: "Tawhid ist der Glaube an die Einheit und Einzigkeit Allahs."
  },
  {
    id: 183,
    category: "Aqidah",
    question: "Wie viele Hauptkategorien von Tawhid gibt es?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    explanation: "Tawhid ar-Rububiyyah, Tawhid al-Uluhiyyah, Tawhid al-Asma wa-s-Sifat."
  },
  {
    id: 184,
    category: "Aqidah",
    question: "Was ist 'Tawhid ar-Rububiyyah'?",
    options: [
      "Einzigkeit in Anbetung",
      "Einzigkeit in Herrschaft/Schöpfung",
      "Einzigkeit in Namen und Attributen",
      "Glaube an Propheten"
    ],
    correctAnswer: 1,
    explanation: "Tawhid ar-Rububiyyah ist der Glaube an Allahs Einzigkeit als Schöpfer und Erhalter."
  },
  {
    id: 185,
    category: "Aqidah",
    question: "Was ist 'Shirk'?",
    options: ["Unglaube", "Beigesellung/Götzendienst", "Heuchelei", "Zweifel"],
    correctAnswer: 1,
    explanation: "Shirk ist die Beigesellung von Partnern zu Allah."
  },
  {
    id: 186,
    category: "Aqidah",
    question: "Wie viele Engel werden namentlich im Quran erwähnt?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "Jibril (Gabriel) und Mikail (Michael) werden namentlich erwähnt."
  },
  {
    id: 187,
    category: "Aqidah",
    question: "Welcher Engel ist für die Offenbarung verantwortlich?",
    options: ["Mikail", "Jibril", "Israfil", "Azrail"],
    correctAnswer: 1,
    explanation: "Jibril (Gabriel) überbrachte die Offenbarungen."
  },
  {
    id: 188,
    category: "Aqidah",
    question: "Welcher Engel wird die Posaune am Jüngsten Tag blasen?",
    options: ["Jibril", "Mikail", "Israfil", "Azrail"],
    correctAnswer: 2,
    explanation: "Israfil wird die Posaune blasen."
  },
  {
    id: 189,
    category: "Aqidah",
    question: "Wie viele offenbarte Bücher erwähnt der Islam?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "Tawrat (Thora), Zabur (Psalmen), Injil (Evangelium), Quran."
  },
  {
    id: 190,
    category: "Aqidah",
    question: "Welches Buch wurde Prophet Dawud (David) offenbart?",
    options: ["Tawrat", "Zabur", "Injil", "Suhuf"],
    correctAnswer: 1,
    explanation: "Zabur (Psalmen) wurde Dawud offenbart."
  },
  {
    id: 191,
    category: "Aqidah",
    question: "Was ist 'Al-Qadr' (oder Al-Qada wal-Qadar)?",
    options: ["Prophetenschaft", "Göttliche Bestimmung/Vorherbestimmung", "Auferstehung", "Engel"],
    correctAnswer: 1,
    explanation: "Al-Qadr ist der Glaube an die göttliche Vorherbestimmung."
  },
  {
    id: 192,
    category: "Aqidah",
    question: "Wie viele Stufen hat der Glaube an Al-Qadr?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Wissen, Aufschreiben, Wille, Schöpfung."
  },
  {
    id: 193,
    category: "Aqidah",
    question: "Was ist 'Yawm al-Qiyamah'?",
    options: ["Tag der Schöpfung", "Tag der Auferstehung", "Tag der Offenbarung", "Tag des Gebets"],
    correctAnswer: 1,
    explanation: "Yawm al-Qiyamah ist der Tag der Auferstehung/Jüngster Tag."
  },
  {
    id: 194,
    category: "Aqidah",
    question: "Was ist 'Barzakh'?",
    options: [
      "Das Paradies",
      "Die Hölle",
      "Die Zwischenwelt zwischen Tod und Auferstehung",
      "Die Brücke über die Hölle"
    ],
    correctAnswer: 2,
    explanation: "Barzakh ist die Zwischenwelt nach dem Tod bis zur Auferstehung."
  },
  {
    id: 195,
    category: "Aqidah",
    question: "Was ist 'As-Sirat'?",
    options: [
      "Der gerade Weg",
      "Die Brücke über die Hölle am Jüngsten Tag",
      "Das Paradies",
      "Die Waage der Taten"
    ],
    correctAnswer: 1,
    explanation: "As-Sirat ist die Brücke, die jeder am Jüngsten Tag überqueren muss."
  },
  {
    id: 196,
    category: "Aqidah",
    question: "Was sind die 'Asma al-Husna'?",
    options: [
      "Die Engel",
      "Die schönsten Namen Allahs",
      "Die Propheten",
      "Die offenbarten Bücher"
    ],
    correctAnswer: 1,
    explanation: "Asma al-Husna sind die 99 schönsten Namen Allahs."
  },
  {
    id: 197,
    category: "Aqidah",
    question: "Wie viele der schönsten Namen Allahs gibt es traditionell?",
    options: ["77", "88", "99", "100"],
    correctAnswer: 2,
    explanation: "Traditionell werden 99 Namen Allahs gezählt."
  },
  {
    id: 198,
    category: "Aqidah",
    question: "Was bedeutet 'Kufr'?",
    options: ["Glaube", "Unglaube/Ablehnung", "Heuchelei", "Zweifel"],
    correctAnswer: 1,
    explanation: "Kufr bedeutet Unglaube oder Ablehnung des Glaubens."
  },
  {
    id: 199,
    category: "Aqidah",
    question: "Was ist 'Nifaq'?",
    options: ["Glaube", "Unglaube", "Heuchelei", "Beigesellung"],
    correctAnswer: 2,
    explanation: "Nifaq ist Heuchelei."
  },
  {
    id: 200,
    category: "Aqidah",
    question: "Was ist 'Iman Mufassal'?",
    options: [
      "Einfaches Glaubensbekenntnis",
      "Detailliertes Glaubensbekenntnis",
      "Kurzes Gebet",
      "Name einer Sura"
    ],
    correctAnswer: 1,
    explanation: "Iman Mufassal ist das detaillierte Glaubensbekenntnis mit allen sechs Säulen."
  },

  // Zusätzliche Quran-Fragen (17 Fragen: 201-217)
  {
    id: 201,
    category: "Quran",
    question: "Welche Sure wird als 'die Braut des Quran' bezeichnet?",
    options: ["Ar-Rahman", "Yasin", "Al-Mulk", "Al-Waqi'a"],
    correctAnswer: 0,
    explanation: "Sure Ar-Rahman wird als 'Braut des Quran' bezeichnet."
  },
  {
    id: 202,
    category: "Quran",
    question: "Wie viele Verse enthält Sure Yasin?",
    options: ["73", "83", "93", "103"],
    correctAnswer: 1,
    explanation: "Sure Yasin hat 83 Verse."
  },
  {
    id: 203,
    category: "Quran",
    question: "In welcher Sure wird die Geschichte von Talut (Saul) erwähnt?",
    options: ["Al-Baqara", "Al-Imran", "An-Nisa", "Al-Maidah"],
    correctAnswer: 0,
    explanation: "Die Geschichte von Talut ist in Sure Al-Baqara."
  },
  {
    id: 204,
    category: "Quran",
    question: "Welche Sure enthält die Verse über die Scheidungswartezeit (Iddah)?",
    options: ["An-Nisa", "At-Talaq", "Al-Baqara", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Alle drei Suren behandeln Iddah-Regelungen."
  },
  {
    id: 205,
    category: "Quran",
    question: "Wie viele Mal wird Prophet Ibrahim (Abraham) im Quran erwähnt?",
    options: ["59 Mal", "69 Mal", "79 Mal", "89 Mal"],
    correctAnswer: 1,
    explanation: "Prophet Ibrahim wird 69 Mal erwähnt."
  },
  {
    id: 206,
    category: "Quran",
    question: "Welche Sure wird auch 'Al-Fara'id' (die Pflichten) genannt?",
    options: ["An-Nisa", "Al-Baqara", "Al-Maidah", "At-Tawba"],
    correctAnswer: 0,
    explanation: "Sure An-Nisa wird wegen der Erbschaftsgesetze so genannt."
  },
  {
    id: 207,
    category: "Quran",
    question: "In welcher Sure wird die Geschichte von Luqman dem Weisen erzählt?",
    options: ["Luqman", "Al-Kahf", "Maryam", "Ta-Ha"],
    correctAnswer: 0,
    explanation: "Sure Luqman (31) erzählt seine Geschichte und Weisheiten."
  },
  {
    id: 208,
    category: "Quran",
    question: "Wie viele Suren im Quran sind nach Frauen benannt?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    explanation: "Zwei Suren: Maryam und An-Nisa (die Frauen)."
  },
  {
    id: 209,
    category: "Quran",
    question: "Welche Sure enthält den Vers 'Lakum dinukum wa liya din' (Euch eure Religion und mir meine)?",
    options: ["Al-Kafirun", "Al-Ikhlas", "Al-Falaq", "An-Nas"],
    correctAnswer: 0,
    explanation: "Dies ist Vers 6 in Sure Al-Kafirun (109)."
  },
  {
    id: 210,
    category: "Quran",
    question: "In welcher Sure werden die Namen aller fünf täglichen Gebete erwähnt?",
    options: ["Al-Baqara", "Hud", "Al-Isra", "An-Nur"],
    correctAnswer: 1,
    explanation: "Sure Hud erwähnt alle Gebetszeiten zusammen."
  },
  {
    id: 211,
    category: "Quran",
    question: "Welche Sure beginnt mit dem Buchstaben 'Qaf'?",
    options: ["Sure 50 (Qaf)", "Sure 40", "Sure 60", "Sure 70"],
    correctAnswer: 0,
    explanation: "Sure 50 heißt Qaf und beginnt mit diesem Buchstaben."
  },
  {
    id: 212,
    category: "Quran",
    question: "Wie viele Verse gibt es im gesamten Quran ungefähr?",
    options: ["6236", "6346", "6456", "6566"],
    correctAnswer: 0,
    explanation: "Der Quran hat etwa 6236 Verse (die Zählung variiert leicht)."
  },
  {
    id: 213,
    category: "Quran",
    question: "Welche Sure wird 'Al-Musabbihat' genannt?",
    options: ["Al-Hadid", "Al-Hashr", "As-Saff", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Suren die mit 'Sabbaha' oder 'Yusabbihu' beginnen werden so genannt."
  },
  {
    id: 214,
    category: "Quran",
    question: "In welcher Sure wird die Geschichte von Musa und Khidr erzählt?",
    options: ["Al-Kahf", "Ta-Ha", "Al-Qasas", "Ash-Shu'ara"],
    correctAnswer: 0,
    explanation: "Sure Al-Kahf (18) erzählt diese Geschichte."
  },
  {
    id: 215,
    category: "Quran",
    question: "Welche Sure enthält die Geschichte von den Leuten des Gartens (Ashab al-Jannah)?",
    options: ["Al-Qalam", "Yasin", "Al-Mulk", "Al-Haqqah"],
    correctAnswer: 0,
    explanation: "Sure Al-Qalam (68) erzählt diese Geschichte."
  },
  {
    id: 216,
    category: "Quran",
    question: "Wie viele Mal kommt das Wort 'Dunya' (weltliches Leben) im Quran vor?",
    options: ["115 Mal", "125 Mal", "135 Mal", "145 Mal"],
    correctAnswer: 0,
    explanation: "Das Wort 'Dunya' kommt 115 Mal vor."
  },
  {
    id: 217,
    category: "Quran",
    question: "Welche Sure wird als 'Umm al-Qura' (Mutter der Städte) betrachtet?",
    options: ["Al-Fatiha", "Al-Baqara", "Al-An'am", "Yasin"],
    correctAnswer: 2,
    explanation: "Sure Al-An'am wird manchmal so bezeichnet wegen ihrer umfassenden Inhalte."
  },

  // Zusätzliche Hadith-Fragen (17 Fragen: 218-234)
  {
    id: 218,
    category: "Hadith",
    question: "Wie viele Hadithe überlieferte Abdullah ibn Umar?",
    options: ["Über 1000", "Über 1500", "Über 2000", "Über 2630"],
    correctAnswer: 3,
    explanation: "Abdullah ibn Umar überlieferte über 2630 Hadithe."
  },
  {
    id: 219,
    category: "Hadith",
    question: "Was ist ein 'Marfu' Hadith?",
    options: ["Vom Propheten ﷺ", "Von einem Gefährten", "Von einem Tabi'i", "Von einem Gelehrten"],
    correctAnswer: 0,
    explanation: "Marfu' ist ein Hadith, der direkt zum Propheten ﷺ zurückgeht."
  },
  {
    id: 220,
    category: "Hadith",
    question: "Wer sammelte 'Sunan Ibn Majah'?",
    options: ["Ibn Majah al-Qazwini", "Imam Muslim", "Imam Bukhari", "Imam Ahmad"],
    correctAnswer: 0,
    explanation: "Muhammad ibn Yazid ibn Majah sammelte dieses Werk."
  },
  {
    id: 221,
    category: "Hadith",
    question: "Was bedeutet 'Mawquf' in der Hadith-Klassifikation?",
    options: ["Vom Propheten", "Von einem Gefährten gestoppt", "Schwacher Hadith", "Langer Hadith"],
    correctAnswer: 1,
    explanation: "Mawquf ist eine Aussage/Handlung eines Gefährten."
  },
  {
    id: 222,
    category: "Hadith",
    question: "Welcher Gelehrte schrieb 'Mishkat al-Masabih'?",
    options: ["Al-Baghawi", "Al-Tabrizi", "Ibn Hajar", "An-Nawawi"],
    correctAnswer: 1,
    explanation: "Muhammad ibn Abdullah al-Khatib al-Tabrizi verfasste dieses Werk."
  },
  {
    id: 223,
    category: "Hadith",
    question: "Was ist ein 'Aziz' Hadith?",
    options: ["Von einem Überlieferer", "Von zwei Überlieferern", "Von drei Überlieferern", "Von vielen Überlieferern"],
    correctAnswer: 1,
    explanation: "Aziz bedeutet, von mindestens zwei Überlieferern in jeder Stufe."
  },
  {
    id: 224,
    category: "Hadith",
    question: "Wer ist bekannt als 'Huffaz al-Hadith'?",
    options: ["Hadith-Meister/Bewahrer", "Hadith-Sammler", "Hadith-Schreiber", "Hadith-Lehrer"],
    correctAnswer: 0,
    explanation: "Huffaz sind Meister die tausende Hadithe auswendig kennen."
  },
  {
    id: 225,
    category: "Hadith",
    question: "Welches Werk schrieb Ibn Hajar al-Asqalani als Kommentar zu Sahih Bukhari?",
    options: ["Fath al-Bari", "Umdat al-Qari", "Irshad as-Sari", "Sharh Muslim"],
    correctAnswer: 0,
    explanation: "Fath al-Bari ist sein monumentaler Kommentar zu Sahih Bukhari."
  },
  {
    id: 226,
    category: "Hadith",
    question: "Was bedeutet 'Marasil' in der Hadith-Wissenschaft?",
    options: ["Vollständige Ketten", "Pluralform von Mursal", "Starke Hadithe", "Kurze Hadithe"],
    correctAnswer: 1,
    explanation: "Marasil ist die Pluralform von Mursal."
  },
  {
    id: 227,
    category: "Hadith",
    question: "Wer schrieb 'Riyad as-Salihin'?",
    options: ["Imam Nawawi", "Ibn Kathir", "Al-Ghazali", "Ibn Taymiyyah"],
    correctAnswer: 0,
    explanation: "Imam Nawawi verfasste diese beliebte Hadith-Sammlung."
  },
  {
    id: 228,
    category: "Hadith",
    question: "Was ist 'Takhrij al-Hadith'?",
    options: ["Hadith-Kommentar", "Hadith-Quellennachweis", "Hadith-Übersetzung", "Hadith-Auswendiglernen"],
    correctAnswer: 1,
    explanation: "Takhrij ist die Identifizierung und Dokumentation der Hadith-Quellen."
  },
  {
    id: 229,
    category: "Hadith",
    question: "Welcher Gefährte wird als 'Bahr al-Ilm' (Ozean des Wissens) bezeichnet?",
    options: ["Abu Huraira", "Abdullah ibn Abbas", "Abdullah ibn Mas'ud", "Anas ibn Malik"],
    correctAnswer: 1,
    explanation: "Ibn Abbas erhielt diesen Titel wegen seines enormen Wissens."
  },
  {
    id: 230,
    category: "Hadith",
    question: "Was ist ein 'Shadhdh' Hadith?",
    options: ["Sehr starker Hadith", "Anomaler/abweichender Hadith", "Kurzer Hadith", "Langer Hadith"],
    correctAnswer: 1,
    explanation: "Shadhdh ist ein Hadith der von vertrauenswürdigen Quellen abweicht."
  },
  {
    id: 231,
    category: "Hadith",
    question: "Wie viele Jahre verbrachte Imam Bukhari mit der Sammlung seines Sahih?",
    options: ["10 Jahre", "13 Jahre", "16 Jahre", "20 Jahre"],
    correctAnswer: 2,
    explanation: "Er arbeitete etwa 16 Jahre an seinem Sahih."
  },
  {
    id: 232,
    category: "Hadith",
    question: "Was bedeutet 'Munkar' in der Hadith-Klassifikation?",
    options: ["Akzeptiert", "Abgelehnt/verworfen", "Neutral", "Stark"],
    correctAnswer: 1,
    explanation: "Munkar ist ein verworfener Hadith von schwachen Überlieferern."
  },
  {
    id: 233,
    category: "Hadith",
    question: "Wer schrieb 'Bulugh al-Maram'?",
    options: ["Ibn Hajar al-Asqalani", "Imam Nawawi", "Ibn Kathir", "As-Suyuti"],
    correctAnswer: 0,
    explanation: "Ibn Hajar al-Asqalani verfasste dieses Fiqh-Hadith-Werk."
  },
  {
    id: 234,
    category: "Hadith",
    question: "Was ist 'Ilal al-Hadith'?",
    options: ["Hadith-Defekte/Mängel", "Hadith-Stärken", "Hadith-Länge", "Hadith-Themen"],
    correctAnswer: 0,
    explanation: "Ilal al-Hadith ist die Wissenschaft der verborgenen Hadith-Defekte."
  },

  // Zusätzliche Fiqh-Fragen (17 Fragen: 235-251)
  {
    id: 235,
    category: "Fiqh",
    question: "Was ist 'Siyasa Shar'iyya'?",
    options: ["Religiöse Politik", "Islamische Governance", "Rechtsordnung", "Alle genannten"],
    correctAnswer: 3,
    explanation: "Siyasa Shar'iyya umfasst islamische Governance und Rechtsverwaltung."
  },
  {
    id: 236,
    category: "Fiqh",
    question: "Was bedeutet 'Takhyir' in Fiqh?",
    options: ["Verpflichtung", "Wahlfreiheit zwischen Optionen", "Verbot", "Empfehlung"],
    correctAnswer: 1,
    explanation: "Takhyir ist das Recht zu wählen zwischen zulässigen Optionen."
  },
  {
    id: 237,
    category: "Fiqh",
    question: "Wer schrieb 'Al-Mughni', ein wichtiges Hanbali-Werk?",
    options: ["Ibn Qudama al-Maqdisi", "Imam Ahmad", "Ibn Taymiyyah", "Ibn al-Qayyim"],
    correctAnswer: 0,
    explanation: "Ibn Qudama al-Maqdisi schrieb dieses umfassende Werk."
  },
  {
    id: 238,
    category: "Fiqh",
    question: "Was ist 'Nazariyyat adh-Dhara'i'?",
    options: ["Theorie der Mittel", "Theorie der Ziele", "Theorie der Quellen", "Theorie der Beweise"],
    correctAnswer: 0,
    explanation: "Die Theorie der Mittel behandelt Wege die zu Verbotenem führen."
  },
  {
    id: 239,
    category: "Fiqh",
    question: "Was bedeutet 'Ta'zir' im islamischen Strafrecht?",
    options: ["Festgelegte Strafe", "Ermessensstrafe", "Keine Strafe", "Todesstrafe"],
    correctAnswer: 1,
    explanation: "Ta'zir ist eine Ermessensstrafe für Vergehen ohne fixe Strafe."
  },
  {
    id: 240,
    category: "Fiqh",
    question: "Was ist 'Hadd' im islamischen Recht?",
    options: ["Empfohlene Handlung", "Festgelegte göttliche Strafe", "Zivilstrafe", "Warnung"],
    correctAnswer: 1,
    explanation: "Hadd (Plural: Hudud) sind festgelegte göttliche Strafen."
  },
  {
    id: 241,
    category: "Fiqh",
    question: "Welche Madhab ist in der Türkei am verbreitetsten?",
    options: ["Hanafi", "Maliki", "Shafi'i", "Hanbali"],
    correctAnswer: 0,
    explanation: "Die Hanafi-Schule dominiert in der Türkei."
  },
  {
    id: 242,
    category: "Fiqh",
    question: "Was ist 'Qisas' im islamischen Recht?",
    options: ["Zakat", "Wiedervergeltung", "Fasten", "Gebet"],
    correctAnswer: 1,
    explanation: "Qisas ist das Gesetz der Wiedervergeltung."
  },
  {
    id: 243,
    category: "Fiqh",
    question: "Was bedeutet 'Diyya' in Fiqh?",
    options: ["Gebet", "Blutgeld/Entschädigung", "Fasten", "Pilgerfahrt"],
    correctAnswer: 1,
    explanation: "Diyya ist Blutgeld als Entschädigung für Tötung/Verletzung."
  },
  {
    id: 244,
    category: "Fiqh",
    question: "Wer schrieb 'Bidayat al-Mujtahid'?",
    options: ["Ibn Rushd (Averroes)", "Imam Malik", "Imam Shafi'i", "Al-Ghazali"],
    correctAnswer: 0,
    explanation: "Ibn Rushd (Averroes) schrieb dieses vergleichende Fiqh-Werk."
  },
  {
    id: 245,
    category: "Fiqh",
    question: "Was ist 'Waqf' im islamischen Recht?",
    options: ["Steuer", "Religiöse Stiftung", "Darlehen", "Verkauf"],
    correctAnswer: 1,
    explanation: "Waqf ist eine dauerhafte religiöse/wohltätige Stiftung."
  },
  {
    id: 246,
    category: "Fiqh",
    question: "Was bedeutet 'Khul'' im Familienrecht?",
    options: ["Heirat", "Scheidung auf Wunsch der Frau", "Erbschaft", "Vormundschaft"],
    correctAnswer: 1,
    explanation: "Khul' ist die Scheidung auf Initiative der Frau gegen Entschädigung."
  },
  {
    id: 247,
    category: "Fiqh",
    question: "Was ist 'Riba al-Fadl'?",
    options: ["Zinsen bei Darlehen", "Überschuss bei Tauschgeschäften", "Keine Zinsen", "Spende"],
    correctAnswer: 1,
    explanation: "Riba al-Fadl ist der verbotene Überschuss beim Tausch ähnlicher Güter."
  },
  {
    id: 248,
    category: "Fiqh",
    question: "Was ist 'Ijarah' im islamischen Handelsrecht?",
    options: ["Verkauf", "Miete/Leasing", "Schenkung", "Darlehen"],
    correctAnswer: 1,
    explanation: "Ijarah ist ein Miet- oder Leasingvertrag."
  },
  {
    id: 249,
    category: "Fiqh",
    question: "Was bedeutet 'Mudarabah'?",
    options: ["Partnerschaft mit Kapital und Arbeit", "Verkauf", "Miete", "Schenkung"],
    correctAnswer: 0,
    explanation: "Mudarabah ist eine Partnerschaft wo einer Kapital und der andere Arbeit beisteuert."
  },
  {
    id: 250,
    category: "Fiqh",
    question: "Was ist 'Musharakah'?",
    options: ["Einzelbesitz", "Gemeinsame Partnerschaft", "Verkauf", "Miete"],
    correctAnswer: 1,
    explanation: "Musharakah ist eine Partnerschaft wo alle Partner Kapital beisteuern."
  },
  {
    id: 251,
    category: "Fiqh",
    question: "Was bedeutet 'Bay' al-Salam'?",
    options: ["Barkauf", "Vorauszahlung für spätere Lieferung", "Kreditkauf", "Tausch"],
    correctAnswer: 1,
    explanation: "Salam ist ein Vertrag mit Vorauszahlung für spätere Warenlieferung."
  },

  // Zusätzliche Seerah-Fragen (17 Fragen: 252-268)
  {
    id: 252,
    category: "Seerah",
    question: "Wie hieß der Großvater des Propheten ﷺ?",
    options: ["Abdul Muttalib", "Abu Talib", "Abdullah", "Abu Lahab"],
    correctAnswer: 0,
    explanation: "Abdul Muttalib ibn Hashim war sein Großvater."
  },
  {
    id: 253,
    category: "Seerah",
    question: "In welchem Monat wurde der Prophet ﷺ geboren?",
    options: ["Muharram", "Safar", "Rabi al-Awwal", "Ramadan"],
    correctAnswer: 2,
    explanation: "Der Prophet ﷺ wurde im Monat Rabi al-Awwal geboren."
  },
  {
    id: 254,
    category: "Seerah",
    question: "Wie alt war Khadija (ra) als sie den Propheten ﷺ heiratete?",
    options: ["35 Jahre", "40 Jahre", "45 Jahre", "50 Jahre"],
    correctAnswer: 1,
    explanation: "Khadija (ra) war etwa 40 Jahre alt."
  },
  {
    id: 255,
    category: "Seerah",
    question: "Wie viele Kinder hatte der Prophet ﷺ?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "Er hatte 7 Kinder: 3 Söhne (Qasim, Abdullah, Ibrahim) und 4 Töchter."
  },
  {
    id: 256,
    category: "Seerah",
    question: "Wer war 'Al-Amin' (der Vertrauenswürdige)?",
    options: ["Abu Bakr", "Umar", "Der Prophet Muhammad ﷺ", "Uthman"],
    correctAnswer: 2,
    explanation: "Der Prophet ﷺ war bekannt als Al-Amin schon vor der Offenbarung."
  },
  {
    id: 257,
    category: "Seerah",
    question: "In welchem Jahr fand der Vertrag von Hudaybiyyah statt?",
    options: ["5 AH", "6 AH", "7 AH", "8 AH"],
    correctAnswer: 1,
    explanation: "Der Vertrag von Hudaybiyyah war im Jahr 6 nach Hijra."
  },
  {
    id: 258,
    category: "Seerah",
    question: "Wann wurde Mekka erobert?",
    options: ["6 AH", "7 AH", "8 AH", "9 AH"],
    correctAnswer: 2,
    explanation: "Die friedliche Eroberung Mekkas war im Jahr 8 AH."
  },
  {
    id: 259,
    category: "Seerah",
    question: "Wie viele Umrah-Pilgerfahrten vollzog der Prophet ﷺ?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Der Prophet ﷺ vollzog 4 Umrah-Pilgerfahrten."
  },
  {
    id: 260,
    category: "Seerah",
    question: "Wie viele Hajj-Pilgerfahrten vollzog der Prophet ﷺ nach der Hijra?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    explanation: "Er vollzog eine Hajj nach der Hijra (die Abschiedspilgerfahrt)."
  },
  {
    id: 261,
    category: "Seerah",
    question: "Welcher Gefährte wird als 'Sayf Allah al-Maslul' (das gezogene Schwert Allahs) bezeichnet?",
    options: ["Ali ibn Abi Talib", "Hamza", "Khalid ibn al-Walid", "Umar ibn al-Khattab"],
    correctAnswer: 2,
    explanation: "Khalid ibn al-Walid erhielt diesen ehrenvollen Titel vom Propheten ﷺ."
  },
  {
    id: 262,
    category: "Seerah",
    question: "Wer war die erste Märtyrerin im Islam?",
    options: ["Khadija", "Fatima", "Sumayya bint Khayyat", "Asiya"],
    correctAnswer: 2,
    explanation: "Sumayya bint Khayyat war die erste Märtyrerin."
  },
  {
    id: 263,
    category: "Seerah",
    question: "Wie hieß das Pferd des Propheten ﷺ?",
    options: ["Sakb", "Buraq", "Qaswa", "Adba"],
    correctAnswer: 0,
    explanation: "Sakb war eines seiner bekannten Pferde."
  },
  {
    id: 264,
    category: "Seerah",
    question: "Wie hieß die Kamelstute des Propheten ﷺ?",
    options: ["Qaswa", "Sakb", "Buraq", "Adba"],
    correctAnswer: 0,
    explanation: "Al-Qaswa war seine berühmte Kamelstute."
  },
  {
    id: 265,
    category: "Seerah",
    question: "Wer war der Dichter des Propheten ﷺ?",
    options: ["Hassan ibn Thabit", "Ka'b ibn Zuhayr", "Abdullah ibn Rawaha", "Labid"],
    correctAnswer: 0,
    explanation: "Hassan ibn Thabit war der offizielle Dichter des Propheten ﷺ."
  },
  {
    id: 266,
    category: "Seerah",
    question: "In welchem Jahr starb der Prophet ﷺ?",
    options: ["10 AH", "11 AH", "12 AH", "13 AH"],
    correctAnswer: 1,
    explanation: "Der Prophet ﷺ starb im Jahr 11 nach Hijra (632 n.Chr.)."
  },
  {
    id: 267,
    category: "Seerah",
    question: "Wie alt war der Prophet ﷺ beim Tod?",
    options: ["61 Jahre", "62 Jahre", "63 Jahre", "64 Jahre"],
    correctAnswer: 2,
    explanation: "Er starb im Alter von 63 Jahren."
  },
  {
    id: 268,
    category: "Seerah",
    question: "Wer leitete das Begräbnisgebet für den Propheten ﷺ?",
    options: ["Abu Bakr", "Umar", "Ali", "Jeder Gläubige einzeln"],
    correctAnswer: 3,
    explanation: "Es gab keinen Imam; jeder betete einzeln für ihn."
  },

  // Zusätzliche Geschichte-Fragen (16 Fragen: 269-284)
  {
    id: 269,
    category: "Geschichte",
    question: "Wer war der erste Kalif nach dem Propheten ﷺ?",
    options: ["Umar ibn al-Khattab", "Abu Bakr as-Siddiq", "Uthman ibn Affan", "Ali ibn Abi Talib"],
    correctAnswer: 1,
    explanation: "Abu Bakr as-Siddiq war der erste rechtgeleitete Kalif."
  },
  {
    id: 270,
    category: "Geschichte",
    question: "Wie lange regierte Abu Bakr (ra)?",
    options: ["1 Jahr", "2 Jahre", "3 Jahre", "4 Jahre"],
    correctAnswer: 1,
    explanation: "Abu Bakr regierte etwa 2 Jahre (632-634 n.Chr.)."
  },
  {
    id: 271,
    category: "Geschichte",
    question: "Wer ordnete die Sammlung des Quran in einem Buch an?",
    options: ["Prophet Muhammad ﷺ", "Abu Bakr", "Umar", "Uthman"],
    correctAnswer: 1,
    explanation: "Abu Bakr ordnete die erste Sammlung nach dem Tod des Propheten ﷺ an."
  },
  {
    id: 272,
    category: "Geschichte",
    question: "Wer standardisierte die Quran-Kopien und sandte sie in die Provinzen?",
    options: ["Abu Bakr", "Umar", "Uthman", "Ali"],
    correctAnswer: 2,
    explanation: "Kalif Uthman standardisierte den Quran und verbreitete Kopien."
  },
  {
    id: 273,
    category: "Geschichte",
    question: "Wie lange regierte Umar ibn al-Khattab (ra)?",
    options: ["5 Jahre", "8 Jahre", "10 Jahre", "12 Jahre"],
    correctAnswer: 2,
    explanation: "Umar regierte etwa 10 Jahre (634-644 n.Chr.)."
  },
  {
    id: 274,
    category: "Geschichte",
    question: "Wer eroberte Jerusalem während der islamischen Expansion?",
    options: ["Abu Bakr", "Umar ibn al-Khattab", "Uthman", "Khalid ibn al-Walid"],
    correctAnswer: 1,
    explanation: "Kalif Umar eroberte Jerusalem friedlich im Jahr 637 n.Chr."
  },
  {
    id: 275,
    category: "Geschichte",
    question: "In welchem Jahr fand die Schlacht von Yarmouk statt?",
    options: ["634 n.Chr.", "636 n.Chr.", "638 n.Chr.", "640 n.Chr."],
    correctAnswer: 1,
    explanation: "Die Schlacht von Yarmouk gegen das Byzantinische Reich war 636 n.Chr."
  },
  {
    id: 276,
    category: "Geschichte",
    question: "Welcher General eroberte Ägypten für den Islam?",
    options: ["Khalid ibn al-Walid", "Amr ibn al-As", "Sa'd ibn Abi Waqqas", "Abu Ubayda"],
    correctAnswer: 1,
    explanation: "Amr ibn al-As eroberte Ägypten 639-642 n.Chr."
  },
  {
    id: 277,
    category: "Geschichte",
    question: "Wer gründete die Umayyaden-Dynastie?",
    options: ["Muawiya ibn Abi Sufyan", "Yazid ibn Muawiya", "Marwan ibn al-Hakam", "Abdul Malik"],
    correctAnswer: 0,
    explanation: "Muawiya ibn Abi Sufyan gründete die Umayyaden-Dynastie 661 n.Chr."
  },
  {
    id: 278,
    category: "Geschichte",
    question: "Wo war die Hauptstadt der Umayyaden?",
    options: ["Mekka", "Medina", "Damaskus", "Bagdad"],
    correctAnswer: 2,
    explanation: "Damaskus war die Hauptstadt des Umayyaden-Kalifats."
  },
  {
    id: 279,
    category: "Geschichte",
    question: "Wer gründete die Abbasiden-Dynastie?",
    options: ["Abu al-Abbas as-Saffah", "Al-Mansur", "Harun ar-Rashid", "Al-Ma'mun"],
    correctAnswer: 0,
    explanation: "Abu al-Abbas as-Saffah gründete die Abbasiden 750 n.Chr."
  },
  {
    id: 280,
    category: "Geschichte",
    question: "Welcher abbasidische Kalif baute Bagdad?",
    options: ["As-Saffah", "Al-Mansur", "Harun ar-Rashid", "Al-Ma'mun"],
    correctAnswer: 1,
    explanation: "Al-Mansur gründete Bagdad 762 n.Chr."
  },
  {
    id: 281,
    category: "Geschichte",
    question: "Wann fand die Schlacht von Tours/Poitiers statt?",
    options: ["632 n.Chr.", "711 n.Chr.", "732 n.Chr.", "750 n.Chr."],
    correctAnswer: 2,
    explanation: "Die Schlacht von Tours war 732 n.Chr. in Frankreich."
  },
  {
    id: 282,
    category: "Geschichte",
    question: "Wer eroberte Spanien (Al-Andalus) für den Islam?",
    options: ["Musa ibn Nusayr", "Tariq ibn Ziyad", "Beide zusammen", "Abdul Rahman"],
    correctAnswer: 2,
    explanation: "Tariq ibn Ziyad und Musa ibn Nusayr eroberten Spanien 711-714 n.Chr."
  },
  {
    id: 283,
    category: "Geschichte",
    question: "Wie lange blieben die Muslime in Spanien?",
    options: ["500 Jahre", "600 Jahre", "Fast 800 Jahre", "1000 Jahre"],
    correctAnswer: 2,
    explanation: "Die islamische Herrschaft in Spanien dauerte von 711-1492 (fast 800 Jahre)."
  },
  {
    id: 284,
    category: "Geschichte",
    question: "Wer war der berühmteste Herrscher von Al-Andalus?",
    options: ["Abdul Rahman I", "Abdul Rahman III", "Al-Hakam II", "Al-Mansur"],
    correctAnswer: 1,
    explanation: "Abdul Rahman III erreichte den Höhepunkt der Macht in Al-Andalus."
  },

  // Zusätzliche Aqidah-Fragen (16 Fragen: 285-300)
  {
    id: 285,
    category: "Aqidah",
    question: "Was ist 'Tawhid ar-Rububiyyah'?",
    options: [
      "Einheit in der Anbetung",
      "Einheit in der Herrschaft/Schöpfung",
      "Einheit in Namen und Eigenschaften",
      "Keine dieser Optionen"
    ],
    correctAnswer: 1,
    explanation: "Tawhid ar-Rububiyyah ist der Glaube an Allah als einzigen Herrn und Schöpfer."
  },
  {
    id: 286,
    category: "Aqidah",
    question: "Was ist 'Tawhid al-Uluhiyyah'?",
    options: [
      "Einheit in der Anbetung",
      "Einheit in der Herrschaft",
      "Einheit in Namen",
      "Keine dieser Optionen"
    ],
    correctAnswer: 0,
    explanation: "Tawhid al-Uluhiyyah ist die aufrichtige Anbetung Allahs allein."
  },
  {
    id: 287,
    category: "Aqidah",
    question: "Was ist 'Tawhid al-Asma wa-s-Sifat'?",
    options: [
      "Einheit in der Anbetung",
      "Einheit in der Herrschaft",
      "Einheit in Namen und Eigenschaften",
      "Keine dieser Optionen"
    ],
    correctAnswer: 2,
    explanation: "Dies ist der Glaube an Allahs einzigartige Namen und Eigenschaften."
  },
  {
    id: 288,
    category: "Aqidah",
    question: "Wie viele 'schöne Namen' (Asma al-Husna) hat Allah?",
    options: ["77", "88", "99", "100"],
    correctAnswer: 2,
    explanation: "Allah hat 99 schöne Namen."
  },
  {
    id: 289,
    category: "Aqidah",
    question: "Was ist 'Qadar'?",
    options: ["Göttliche Vorherbestimmung", "Freier Wille", "Schicksal allein", "Zufall"],
    correctAnswer: 0,
    explanation: "Qadar ist die göttliche Vorherbestimmung - der 6. Glaubenspfeiler."
  },
  {
    id: 290,
    category: "Aqidah",
    question: "Wie viele Stufen hat der Qadar?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    explanation: "Vier Stufen: Wissen, Niederschrift, Wille, Schöpfung."
  },
  {
    id: 291,
    category: "Aqidah",
    question: "Was bedeutet 'Al-Qadar wal-Qadr'?",
    options: [
      "Beide bedeuten Vorherbestimmung",
      "Qadar ist Maß, Qadr ist Macht",
      "Beide sind gleich",
      "Keine Verbindung"
    ],
    correctAnswer: 1,
    explanation: "Beide beziehen sich auf göttliche Vorherbestimmung und Macht."
  },
  {
    id: 292,
    category: "Aqidah",
    question: "Was ist 'Barzakh'?",
    options: [
      "Das Paradies",
      "Die Hölle",
      "Der Zwischenbereich zwischen Tod und Auferstehung",
      "Das Diesseits"
    ],
    correctAnswer: 2,
    explanation: "Barzakh ist die Zwischenwelt zwischen Tod und Auferstehung."
  },
  {
    id: 293,
    category: "Aqidah",
    question: "Was sind die zwei Engel die im Grab befragen?",
    options: ["Jibril und Mikail", "Munkar und Nakir", "Israfil und Azrail", "Ridwan und Malik"],
    correctAnswer: 1,
    explanation: "Munkar und Nakir befragen die Toten im Grab."
  },
  {
    id: 294,
    category: "Aqidah",
    question: "Was ist 'Yawm al-Qiyamah'?",
    options: ["Tag der Schöpfung", "Tag der Auferstehung", "Tag der Geburt", "Tag des Todes"],
    correctAnswer: 1,
    explanation: "Yawm al-Qiyamah ist der Tag der Auferstehung."
  },
  {
    id: 295,
    category: "Aqidah",
    question: "Was ist 'Al-Mizan'?",
    options: ["Die Brücke", "Die Waage der Taten", "Das Buch", "Das Paradies"],
    correctAnswer: 1,
    explanation: "Al-Mizan ist die Waage womit die Taten gewogen werden."
  },
  {
    id: 296,
    category: "Aqidah",
    question: "Was ist 'As-Sirat'?",
    options: ["Die Waage", "Die Brücke über die Hölle", "Das Buch", "Der Thron"],
    correctAnswer: 1,
    explanation: "As-Sirat ist die Brücke über die Hölle zum Paradies."
  },
  {
    id: 297,
    category: "Aqidah",
    question: "Wie viele große Zeichen (Ashrat as-Sa'ah) gibt es vor dem Jüngsten Tag?",
    options: ["5", "7", "10", "12"],
    correctAnswer: 2,
    explanation: "Es gibt 10 große Zeichen vor dem Jüngsten Tag."
  },
  {
    id: 298,
    category: "Aqidah",
    question: "Was ist 'Al-Mahdi'?",
    options: [
      "Ein Prophet",
      "Ein rechtgeleiteter Führer am Ende der Zeit",
      "Ein Engel",
      "Ein Buch"
    ],
    correctAnswer: 1,
    explanation: "Al-Mahdi ist der erwartete rechtgeleitete Führer vor dem Ende der Zeit."
  },
  {
    id: 299,
    category: "Aqidah",
    question: "Was ist 'Dajjal'?",
    options: [
      "Ein rechtgeleiteter Führer",
      "Der falsche Messias/Antichrist",
      "Ein Engel",
      "Ein Prophet"
    ],
    correctAnswer: 1,
    explanation: "Ad-Dajjal ist der falsche Messias, ein großes Zeichen vor dem Jüngsten Tag."
  },
  {
    id: 300,
    category: "Aqidah",
    question: "Wer wird gegen den Dajjal kämpfen und ihn besiegen?",
    options: [
      "Al-Mahdi",
      "Prophet Isa (Jesus)",
      "Ein Engel",
      "Die Gläubigen gemeinsam"
    ],
    correctAnswer: 1,
    explanation: "Prophet Isa (Jesus) wird zurückkehren und den Dajjal besiegen."
  }
];

export const categories = ["Alle", "Quran", "Hadith", "Fiqh", "Seerah", "Geschichte", "Aqidah"];
