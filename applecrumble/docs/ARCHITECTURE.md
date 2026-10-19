# Crumble – Architekturentscheidungen

Stand: visuelles Grundgerüst ohne Datenbank und ohne KI.

## Zielbild

Crumble führt Lernende von einem individuellen Standort bis zum Niveau der 13. Klasse. Fächer sind austauschbare Kataloge mit Modulen und Lektionen. Diagnose, Adaptive Pfade und OpenAI folgen später hinter derselben Schnittstelle.

## Schichtentrennung

| Schicht | Ort | Rolle |
| --- | --- | --- |
| Domain | `lib/domain.ts` | Stabile Typen für Fach, Modul, Lektion, Lernstand |
| Katalog | `lib/catalog.ts` | Lesezugriff für UI. Derzeit Beispieldaten, später Supabase |
| Beispieldaten | `lib/mock-data.ts` | Fester Demo-Bestand, kein Fetch |
| UI | `app/`, `components/` | Seiten und Präsentation |

Seiten importieren nur `catalog`, nicht `mock-data` (Ausnahme: `generateStaticParams` nutzt die Listen, bis ein Daten-Provider das übernimmt).

## Routing

- `/` Marketing-Landing
- `/dashboard`, `/subjects`, `/subjects/[slug]`, `/learn/[lessonId]`, `/progress` in der Route Group `(app)` mit gemeinsamer Navigation
- Dynamische Segmente werden über `generateStaticParams` vorgerendert, passend zu `cacheComponents` in Next.js 16
- URL-abhängiges Rendern (`params`) liegt in `/learn/[lessonId]` und `/subjects/[slug]` hinter einer Suspense-Grenze, damit Client-Navigation sofort einen Fallback zeigen kann

## UI-System

- shadcn/ui (Base UI / Nova), Tailwind v4, Lucide
- Design-Tokens in `app/globals.css`: dunkler Modus mit sehr dunklem Cyan und abgestimmten Cyan-Primary-/Secondary-Tönen; heller Modus mit hellen Pink-/Lila-Flächen und passenden Lila-/Pink-Akzenten. Die Schriftfamilie ist Ubuntu.
- `ContinueLearningButton` leitet immer auf die aktuelle oder nächste offene Lektion
- Das Account-Menü bündelt Sprachpriorität, Dark-/Light-Mode, frei wählbare Vordergrund- und Hintergrundfarben sowie die Abmeldung. Der Darkmode mit sehr dunklem Cyan als Hintergrund ist der Standard; benutzerdefinierte Vordergrund- und Hintergrundfarben werden pro Modus lokal im Browser gespeichert. Da es noch keine Authentifizierung gibt, führt „Abmelden“ im Prototyp zurück zur Landingpage und beendet keine Server-Session.
- Oberflächensprachen sind Deutsch (`de`), Englisch (`en`) und Katalanisch (`ca`). Die Prioritätsliste wird über den Sprachwähler sortiert und in `localStorage` als `crumble-language-priority` gespeichert; die höchstpriorisierte Sprache ist aktiv, fehlende Übersetzungen fallen in Listenreihenfolge auf die nächste Sprache zurück. Die Auswahl wird nach der initialen Hydration angewendet, damit sie nicht mit der statisch gerenderten deutschen Ausgangsansicht kollidiert.
- Prozentwerte der Fortschrittsanzeigen verwenden dieselbe aktive Locale auf Server und Client, damit Zahlformatierung und Hydration konsistent bleiben.
- Die Oberfläche nutzt `lib/i18n.ts` und `components/i18n/locale-provider.tsx` statt einer zusätzlichen i18n-Abhängigkeit. Der aktive Sprachcode wird auch auf `document.documentElement.lang` gesetzt. Demo-Lerninhalte bleiben in ihrer redaktionellen Ausgangssprache und werden nicht automatisch übersetzt.

## Bewusst nicht in diesem Schritt

- Supabase, Auth, OpenAI
- Echte Aufgabenauswertung
- Persistenter Lernstand
- Zusätzliche UI-Bibliotheken
