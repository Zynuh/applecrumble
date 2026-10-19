import type {
  Learner,
  Lesson,
  LessonProgress,
  Module,
  Subject,
  WeeklyActivity,
} from "@/lib/domain";

export const learner: Learner = {
  id: "learner-mira",
  displayName: "Mira",
  currentGradeEstimate: 8.4,
  targetGrade: 13,
  streakDays: 6,
  weeklyGoalMinutes: 180,
  weeklyMinutesDone: 95,
};

export const subjects: Subject[] = [
  {
    slug: "mathematik",
    name: "Mathematik",
    tagline: "Vom sicheren Rechnen bis zur Analysis",
    description:
      "Lücken schließen, Muster erkennen und Schritt für Schritt bis zum Abitur-Niveau aufbauen.",
    icon: "calculator",
    currentGradeFocus: 8,
    targetGrade: 13,
  },
  {
    slug: "deutsch",
    name: "Deutsch",
    tagline: "Lesen, schreiben, argumentieren",
    description:
      "Texte verstehen, Sprache präzise nutzen und eigene Argumente klar aufbauen.",
    icon: "book",
    currentGradeFocus: 7,
    targetGrade: 13,
  },
  {
    slug: "englisch",
    name: "Englisch",
    tagline: "Wortschatz, Grammatik, Ausdruck",
    description:
      "Vom Alltagswortschatz zu sicherem Schreiben und Sprechen auf Oberstufen-Niveau.",
    icon: "globe",
    currentGradeFocus: 6,
    targetGrade: 13,
  },
  {
    slug: "physik",
    name: "Physik",
    tagline: "Phänomene verstehen, Modelle nutzen",
    description:
      "Beobachten, erklären und rechnen – von Kräften bis zu Feldern und Wellen.",
    icon: "atom",
    currentGradeFocus: 8,
    targetGrade: 13,
  },
];

export const modules: Module[] = [
  {
    id: "math-foundations",
    subjectSlug: "mathematik",
    title: "Sichere Grundlagen",
    gradeBand: "Klasse 5–7",
    summary: "Zahlenräume, Terme und Gleichungen so festigen, dass später nichts wackelt.",
    lessonIds: ["math-fractions", "math-percent", "math-linear"],
  },
  {
    id: "math-functions",
    subjectSlug: "mathematik",
    title: "Funktionen verstehen",
    gradeBand: "Klasse 8–10",
    summary: "Zusammenhänge als Graphen und Gleichungen lesen – und selbst aufstellen.",
    lessonIds: ["math-linear-fn", "math-quadratic", "math-checkpoint-fn"],
  },
  {
    id: "math-analysis",
    subjectSlug: "mathematik",
    title: "Weg zur Analysis",
    gradeBand: "Klasse 11–13",
    summary: "Grenzwerte, Ableitungen und das große Bild für die Oberstufe.",
    lessonIds: ["math-limits", "math-derivatives"],
  },
  {
    id: "german-reading",
    subjectSlug: "deutsch",
    title: "Texte knacken",
    gradeBand: "Klasse 7–9",
    summary: "Kernaussagen finden, Sprache beobachten, Wirkung benennen.",
    lessonIds: ["de-main-idea", "de-style"],
  },
  {
    id: "german-argument",
    subjectSlug: "deutsch",
    title: "Argumentieren",
    gradeBand: "Klasse 10–13",
    summary: "Standpunkte strukturieren und sprachlich überzeugend vertreten.",
    lessonIds: ["de-claim", "de-commentary"],
  },
  {
    id: "en-core",
    subjectSlug: "englisch",
    title: "Core English",
    gradeBand: "Klasse 6–9",
    summary: "Zeiten, Satzbau und aktiver Wortschatz für den Alltag und die Schule.",
    lessonIds: ["en-tenses", "en-vocab"],
  },
  {
    id: "en-advanced",
    subjectSlug: "englisch",
    title: "Upper level",
    gradeBand: "Klasse 10–13",
    summary: "Texte analysieren und eigene Texte klar, idiomatisch und sicher schreiben.",
    lessonIds: ["en-essay"],
  },
  {
    id: "phy-motion",
    subjectSlug: "physik",
    title: "Bewegung und Kraft",
    gradeBand: "Klasse 8–10",
    summary: "Alltagsphänomene mit einfachen Modellen und Formeln erklären.",
    lessonIds: ["phy-force", "phy-energy"],
  },
];

export const lessons: Lesson[] = [
  {
    id: "math-fractions",
    subjectSlug: "mathematik",
    moduleId: "math-foundations",
    title: "Brüche als Anteile",
    kind: "intro",
    durationMinutes: 18,
    summary: "Brüche als Teile eines Ganzen lesen und vergleichen.",
    content: {
      heading: "Ein Bruch beschreibt einen Anteil",
      paragraphs: [
        "Der Zähler sagt, wie viele Teile du nimmst. Der Nenner sagt, in wie viele gleiche Teile das Ganze geteilt ist.",
        "Zwei Brüche lassen sich vergleichen, wenn du sie auf denselben Nenner bringst – oder als Dezimalzahl denkst.",
      ],
      example: {
        prompt: "Welche Zahl ist größer: 3/4 oder 5/8?",
        hint: "Bringe beide auf Achtel: 3/4 = 6/8.",
      },
    },
  },
  {
    id: "math-percent",
    subjectSlug: "mathematik",
    moduleId: "math-foundations",
    title: "Prozentrechnen im Alltag",
    kind: "practice",
    durationMinutes: 22,
    summary: "Rabatte, Steigerungen und Anteile in Prozent übersetzen.",
    content: {
      heading: "Prozent ist ein Hundertstel",
      paragraphs: [
        "1 % bedeutet 1 von 100. Viele Aufgaben werden klarer, wenn du zuerst den Grundwert bestimmst.",
        "Erhöhung und Rabatt sind dasselbe Muster: Anteil vom Ganzen, dann addieren oder abziehen.",
      ],
      example: {
        prompt: "Ein Buch kostet 24 € und ist 25 % reduziert. Was zahlst du?",
        hint: "25 % von 24 € sind 6 €.",
      },
    },
  },
  {
    id: "math-linear",
    subjectSlug: "mathematik",
    moduleId: "math-foundations",
    title: "Lineare Gleichungen lösen",
    kind: "checkpoint",
    durationMinutes: 20,
    summary: "Äquivalenzumformungen sicher anwenden.",
    content: {
      heading: "Was du auf einer Seite tust, tust du auf beiden",
      paragraphs: [
        "Ziel ist x allein auf einer Seite. Addieren, subtrahieren, multiplizieren und dividieren halten die Gleichung im Gleichgewicht.",
        "Prüfe am Ende durch Einsetzen, ob die Lösung stimmt.",
      ],
      example: {
        prompt: "Löse 3x − 5 = 10.",
        hint: "Zuerst +5, dann durch 3 teilen.",
      },
    },
  },
  {
    id: "math-linear-fn",
    subjectSlug: "mathematik",
    moduleId: "math-functions",
    title: "Lineare Funktionen lesen",
    kind: "intro",
    durationMinutes: 24,
    summary: "Steigung, y-Achsenabschnitt und Graph verbinden.",
    content: {
      heading: "y = mx + b erzählt zwei Dinge",
      paragraphs: [
        "m ist die Steigung: Wie stark steigt oder fällt die Gerade? b ist der Schnittpunkt mit der y-Achse.",
        "Wenn du zwei Punkte kennst, kannst du die Steigung als Höhenunterschied durch Horizontalunterschied berechnen.",
      ],
      example: {
        prompt: "Welche Steigung hat die Gerade durch (0|2) und (4|10)?",
        hint: "Δy / Δx = 8 / 4.",
      },
    },
  },
  {
    id: "math-quadratic",
    subjectSlug: "mathematik",
    moduleId: "math-functions",
    title: "Parabeln und Scheitelpunkt",
    kind: "practice",
    durationMinutes: 26,
    summary: "Quadratische Funktionen als Bewegung und Form verstehen.",
    content: {
      heading: "Eine Parabel hat einen tiefsten oder höchsten Punkt",
      paragraphs: [
        "Der Scheitelpunkt zeigt Extremwert und Symmetrieachse. Die Normalform ax² + bx + c lässt sich in die Scheitelpunktform umschreiben.",
        "Das Vorzeichen von a entscheidet, ob die Parabel nach oben oder unten öffnet.",
      ],
      example: {
        prompt: "Öffnet f(x) = −2x² + 8x nach oben oder unten?",
        hint: "Schau auf a = −2.",
      },
    },
  },
  {
    id: "math-checkpoint-fn",
    subjectSlug: "mathematik",
    moduleId: "math-functions",
    title: "Checkpoint: Funktionen",
    kind: "checkpoint",
    durationMinutes: 16,
    summary: "Prüfen, ob Graph, Gleichung und Situation zusammenpassen.",
    content: {
      heading: "Drei Sprachen, eine Idee",
      paragraphs: [
        "Funktionen erscheinen als Tabelle, Graph und Gleichung. Wer zwischen diesen Darstellungen wechseln kann, hat den Kern verstanden.",
        "Dieser Checkpoint ist als visuelle Station gedacht – echte Aufgaben folgen mit der späteren KI-Schicht.",
      ],
    },
  },
  {
    id: "math-limits",
    subjectSlug: "mathematik",
    moduleId: "math-analysis",
    title: "Annähern ohne Ankommen",
    kind: "intro",
    durationMinutes: 28,
    summary: "Grenzwerte als Idee, bevor Formeln kommen.",
    content: {
      heading: "Was passiert, wenn x immer näher an eine Stelle rückt?",
      paragraphs: [
        "Ein Grenzwert beschreibt das Ziel einer Annäherung – nicht unbedingt den Funktionswert an der Stelle selbst.",
        "Diese Idee ist das Fundament für Steigungen in einem Punkt.",
      ],
    },
  },
  {
    id: "math-derivatives",
    subjectSlug: "mathematik",
    moduleId: "math-analysis",
    title: "Ableitung als lokale Steigung",
    kind: "practice",
    durationMinutes: 30,
    summary: "Von der Sekante zur Tangente.",
    content: {
      heading: "Die Ableitung ist eine Steigung im Punkt",
      paragraphs: [
        "Zwei Punkte auf dem Graphen ergeben eine Sekante. Rückt der zweite Punkt näher, wird daraus die Tangente.",
        "Später lernst du Rechenregeln. Hier geht es um das Bild: lokale Änderungsrate.",
      ],
    },
  },
  {
    id: "de-main-idea",
    subjectSlug: "deutsch",
    moduleId: "german-reading",
    title: "Kernaussage finden",
    kind: "intro",
    durationMinutes: 16,
    summary: "Zwischen Detail und Aussage unterscheiden.",
    content: {
      heading: "Was bleibt, wenn du den Text in einem Satz sagst?",
      paragraphs: [
        "Details stützen. Die Kernaussage ist die Haltung oder Information, um die der Text kreist.",
        "Markiere Wiederholungen, Kontraste und den Schluss – dort liegt oft der Kern.",
      ],
    },
  },
  {
    id: "de-style",
    subjectSlug: "deutsch",
    moduleId: "german-reading",
    title: "Sprache und Wirkung",
    kind: "practice",
    durationMinutes: 20,
    summary: "Stilmittel erkennen und ihre Wirkung benennen.",
    content: {
      heading: "Nicht nur was, sondern wie",
      paragraphs: [
        "Bilder, Wiederholungen und Satzrhythmus steuern, wie ein Text wirkt.",
        "Nenne zuerst das Mittel, dann die Wirkung auf Leserinnen und Leser.",
      ],
    },
  },
  {
    id: "de-claim",
    subjectSlug: "deutsch",
    moduleId: "german-argument",
    title: "Behauptung, Grund, Beispiel",
    kind: "intro",
    durationMinutes: 18,
    summary: "Argumente in drei klaren Schritten bauen.",
    content: {
      heading: "Ein Argument braucht ein Gerüst",
      paragraphs: [
        "Behauptung sagt, was gilt. Der Grund erklärt warum. Das Beispiel macht es greifbar.",
        "Ohne Grund bleibt eine Meinung. Ohne Beispiel bleibt sie oft blass.",
      ],
    },
  },
  {
    id: "de-commentary",
    subjectSlug: "deutsch",
    moduleId: "german-argument",
    title: "Kommentar skizzieren",
    kind: "practice",
    durationMinutes: 24,
    summary: "Einen Standpunkt für die Oberstufe vorbereiten.",
    content: {
      heading: "Position, Blickwinkel, Sprache",
      paragraphs: [
        "Ein Kommentar bezieht Stellung, kennt Gegenargumente und bleibt sprachlich kontrolliert.",
        "Diese Station zeigt den Aufbau. Die KI-Feedback-Schleife kommt später.",
      ],
    },
  },
  {
    id: "en-tenses",
    subjectSlug: "englisch",
    moduleId: "en-core",
    title: "Present, past, future",
    kind: "intro",
    durationMinutes: 18,
    summary: "Zeiten als Blick auf die Zeitachse, nicht als Liste.",
    content: {
      heading: "Tenses are viewpoints",
      paragraphs: [
        "Simple forms skizzieren Fakten und Gewohnheiten. Progressive forms zeigen Verlauf.",
        "Wähle zuerst die Zeit auf der Achse, dann die Form.",
      ],
    },
  },
  {
    id: "en-vocab",
    subjectSlug: "englisch",
    moduleId: "en-core",
    title: "Wortschatz im Kontext",
    kind: "practice",
    durationMinutes: 15,
    summary: "Wörter in Mini-Szenen statt isolierter Listen.",
    content: {
      heading: "Wörter bleiben, wenn sie eine Szene haben",
      paragraphs: [
        "Lerne Kollokationen: make a decision, take a break, raise a question.",
        "Ein Satz mit Bild im Kopf ist besser als fünf lose Vokabeln.",
      ],
    },
  },
  {
    id: "en-essay",
    subjectSlug: "englisch",
    moduleId: "en-advanced",
    title: "Essay structure",
    kind: "intro",
    durationMinutes: 22,
    summary: "Einleitung, Körper, Schluss auf Oberstufen-Niveau.",
    content: {
      heading: "Clarity beats decoration",
      paragraphs: [
        "Ein Essay führt eine These durch Absätze mit je einer klaren Idee.",
        "Verbinde Gedanken mit Signposting, nicht mit Füllwörtern.",
      ],
    },
  },
  {
    id: "phy-force",
    subjectSlug: "physik",
    moduleId: "phy-motion",
    title: "Kräfte sichtbar machen",
    kind: "intro",
    durationMinutes: 20,
    summary: "Kräfte als Pfeile und Wechselwirkungen.",
    content: {
      heading: "Kräfte kommen paarweise",
      paragraphs: [
        "Ein Pfeil zeigt Richtung und Stärke. Kräfte ändern Bewegungszustand, sie sind keine Dinge im Objekt.",
        "Zeichne zuerst alle Kräfte, dann rechne.",
      ],
    },
  },
  {
    id: "phy-energy",
    subjectSlug: "physik",
    moduleId: "phy-motion",
    title: "Energieformen wechseln",
    kind: "practice",
    durationMinutes: 22,
    summary: "Lage, Bewegung und Arbeit in Alltagsszenen.",
    content: {
      heading: "Energie verschwindet nicht, sie wechselt die Form",
      paragraphs: [
        "Ein Fahrrad bergauf speichert Lageenergie. Bergab wird daraus Bewegung – plus Reibungswärme.",
        "Bilanzieren hilft mehr als einzelne Formeln auswendig.",
      ],
    },
  },
];

export const lessonProgress: LessonProgress[] = [
  { lessonId: "math-fractions", status: "completed", scorePercent: 92, completedAt: "2026-10-14" },
  { lessonId: "math-percent", status: "completed", scorePercent: 81, completedAt: "2026-10-16" },
  { lessonId: "math-linear", status: "current" },
  { lessonId: "de-main-idea", status: "completed", scorePercent: 88, completedAt: "2026-10-15" },
  { lessonId: "de-style", status: "current" },
  { lessonId: "en-tenses", status: "current" },
];

export const weeklyActivity: WeeklyActivity[] = [
  { day: "Mo", minutes: 20 },
  { day: "Di", minutes: 0 },
  { day: "Mi", minutes: 25 },
  { day: "Do", minutes: 18 },
  { day: "Fr", minutes: 12 },
  { day: "Sa", minutes: 20 },
  { day: "So", minutes: 0 },
];
