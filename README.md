# EstudaFácil

# Project Overview

A React Native (Expo) mobile app for students to study, take quizzes, and track progress across subjects.

## Tech Stack

- **Expo** ~56.0.5 (SDK 56) — managed workflow
- **React** 19.2.3 / **React Native** 0.85.3
- **React Navigation** v7 — native-stack + bottom-tabs
- **@expo/vector-icons** (Ionicons)
- No TypeScript (plain JavaScript)
- No backend — all data is local or fetched from public APIs

## Always consult Expo v56 docs

Before writing any code, read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ — APIs change between SDK versions.

## Project structure

```
/
├── App.js                          # Root component — SafeAreaProvider + NavigationContainer + StatusBar
├── index.js                        # Entry point — registerRootComponent(App)
├── app.json                        # Expo config (name, slug, icon, orientation)
├── assets/                         # Static images (icon, splash, favicon, android icons)
└── src/
    ├── constants/
    │   └── colors.js               # COLORS theme object (primary green, secondary blue, etc.)
    ├── navigation/
    │   └── AppNavigator.js         # Bottom tabs (Início, Quiz, Matérias, Perfil) + QuizStack
    ├── screens/
    │   ├── HomeScreen.js           # QuoteCard, BannerImage, stats (Sequência, Quizzes, Matérias)
    │   ├── QuizSetupScreen.js      # Select a subject category → navigate to QuizPlay
    │   ├── QuizPlayScreen.js       # Fetches 5 questions from OpenTDB, score tracking
    │   ├── QuizResultScreen.js     # Shows score/percentage, feedback message, play again
    │   ├── MateriasScreen.js       # Subject list with favoriting, filter, annotation modal
    │   └── PerfilScreen.js         # Profile: name, turma, avatar, notifications toggle, dark mode toggle
    ├── components/
    │   ├── LoadingSpinner.js       # Full-screen ActivityIndicator + message
    │   ├── ErrorMessage.js         # Full-screen error text + retry button
    │   ├── StatCard.js             # Icon + label + value card with colored left border
    │   ├── BannerImage.js          # ImageBackground with overlay label
    │   ├── QuoteCard.js            # Italic quote + author in a card
    │   ├── QuizOption.js           # Selectable option with correct/incorrect feedback coloring
    │   └── MateriaCard.js          # Subject card showing name, progress bar, favorite toggle
    ├── hooks/
    │   └── useFetch.js             # Generic fetch hook — returns { data, loading, error, refetch }
    └── services/
        └── api.js                  # fetchQuote (quotable.io) and fetchQuizQuestions (OpenTDB)
```

## Architecture patterns

- **Navigation**: Bottom tabs are the root navigator. The Quiz tab wraps a native stack (QuizSetup → QuizPlay → QuizResult) so the tab bar is hidden during quiz flow.
- **State management**: Local `useState` only — no Redux, Context, or external state library. Each screen manages its own state.
- **Data fetching**: `useFetch` is a generic hook wrapping `fetch()` with loading/error/data states. The Quiz screen bypasses it and manages fetch manually (needs to transform response).
- **Styling**: `StyleSheet.create` in every file. All colors come from `constants/colors.js`. Pattern: green (#4CAF50) = primary/success, blue (#2196F3) = secondary, red (#F44336) = error.
- **Error handling**: Components show `<ErrorMessage>` with a retry button on fetch failures. HomeScreen has a hardcoded fallback quote if the API fails.
- **Components receive props only** — no context, no global state. Keep it that way unless there is a strong reason to change.

## Key dependencies

| Dependency | Version | Purpose |
|---|---|---|
| `expo` | ~56.0.5 | Managed Expo SDK |
| `react` | 19.2.3 | UI library |
| `react-native` | 0.85.3 | RN core |
| `@react-navigation/native` | ^7.2.5 | Navigation container |
| `@react-navigation/native-stack` | ^7.16.0 | Stack navigator |
| `@react-navigation/bottom-tabs` | ^7.16.2 | Tab navigator |
| `react-native-safe-area-context` | ~5.7.0 | Safe area insets |
| `react-native-screens` | 4.25.2 | Native screen containers |
| `@expo/vector-icons` | ^15.0.2 | Ionicons and other icon sets |
| `expo-status-bar` | ~56.0.4 | Status bar control |

## External APIs

- **Quote**: `http://api.quotable.io/random` — returns `{ content, author }`
- **Quiz**: `https://opentdb.com/api.php?amount=N&category=ID&difficulty=DIFF&type=multiple` — returns `{ results: [...] }`. Questions contain HTML entities (decoded via `decodeHTML()` utility in QuizPlayScreen).

## Commands

```bash
npm start          # Start Expo dev server
npm run android    # Start with Android emulator
npm run ios        # Start with iOS simulator
npm run web        # Start web version
```

## Coding conventions

- Functional components with `export default function ComponentName()`
- All text in Portuguese (UI labels, error messages)
- Comments in Portuguese
- No PropTypes — props are undocumented
- React hooks at top of component, effects after
- `Pressable` preferred over `TouchableOpacity`
- `elevation` for Android shadow, `shadowColor/Opacity/Radius/Offset` for iOS shadow

---

# Diretrizes de Comportamento (Karpathy Skills)

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
