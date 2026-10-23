# Photo Gallery Web App

A clean, responsive Photo Gallery Web Application built with **React** and **Tailwind CSS** for the **Celebrare Frontend Intern Pre-Screening Assignment**.

---

## 🚀 Features

- **API Photo Fetching**: Automatically fetches 30 curated photos on load from the [Lorem Picsum API](https://picsum.photos/v2/list?limit=30).
- **Custom React Hook**: Encapsulates data fetching, loading, and error handling inside a reusable `useFetchPhotos` hook.
- **Responsive Grid**:
  - **Desktop**: 4 columns (`lg:grid-cols-4`)
  - **Tablet**: 2 columns (`md:grid-cols-2`)
  - **Mobile**: 1 column (`grid-cols-1`)
- **Author Search**: Instant, case-insensitive client-side search by author name without reloading or making redundant API calls. Displays a "No photos found" message if there are no matches.
- **Favorites Management via `useReducer`**:
  - Toggle photos as favorites with an interactive heart icon (filled for favorites, outlined otherwise).
  - State managed strictly via a pure `useReducer` action (`TOGGLE_FAVORITE`).
  - Saved and persisted across browser sessions in `localStorage` with safe error-handling.
- **Optimized Performance**:
  - `useCallback` memoizes the search input handler.
  - `useMemo` caches filtered photos to avoid redundant calculations when toggling favorites.

---

## 📁 Project Structure

```text
src/
├── components/
│   └── PhotoCard.jsx        # Presentation component for individual photo cards
├── hooks/
│   └── useFetchPhotos.js    # Custom hook handling API fetch, loading & error states
├── App.jsx                  # Main gallery container, search, reducer & memoization
├── index.css                # Tailwind CSS imports
└── main.jsx                 # Application entry point
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Running

1. **Clone the repository or navigate to the project directory**:
   ```bash
   cd "Photo Gallery Web App"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 💡 Tech Stack

- **React 19** (Functional Components, Hooks)
- **Vite** (Next-generation frontend tooling)
- **Tailwind CSS v4** (Utility-first responsive styling)
