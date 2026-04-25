# Architecture - Tjermin Marketplace

Tjermin Marketplace is a high-end, premium e-commerce platform built with modern web technologies. This document outlines the technical architecture, state management patterns, and project structure.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: 
  - [Redux Toolkit](https://redux-toolkit.js.org/) (Global UI State & Shopping Cart)
  - [Redux Persist](https://github.com/rt2zz/redux-persist) (Local Storage Persistence)
  - [TanStack Query v5](https://tanstack.com/query/latest) (Server State & API Caching)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
  - [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Custom animations & complex layouts)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Data Source**: [FakeStoreAPI](https://fakestoreapi.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 📂 Project Structure

The project follows a modular and clean architecture:

```text
src/
├── app/                  # Next.js App Router (Pages & Routes)
├── components/           # UI Components
│   ├── common/           # Reusable Atomic Components (Buttons, Inputs, Cards)
│   ├── layout/           # Global Layout Elements (Header, Footer)
│   └── sections/         # Feature-specific Page Sections (Hero, Product Grid, Filters)
├── constants/            # Static Data, Menu Configurations, and Labels
├── hooks/                # Custom React Hooks (useMediaQuery, useProductFilters)
├── lib/                  # Library configurations (Axios instance)
├── providers/            # React Context Providers (QueryProvider, ReduxProvider)
├── services/             # API Service Layer (productService)
├── store/                # Redux Toolkit Slices & Store Configuration
└── types/                # TypeScript Interfaces & Types
```

---

## 🧠 State Management Strategy

We use a hybrid approach to manage state efficiently:

### 1. Server State (TanStack Query)
Handles all asynchronous data fetching, caching, and background synchronization.
- **Key usage**: Fetching products, category lists, and search suggestions.
- **Benefits**: Automatic re-fetching, loading states, and reduced API calls via caching.

### 2. Client State (Redux Toolkit)
Handles global UI states and persistent data.
- **App Slice**: Global search query and initialization state.
- **Cart Slice**: Shopping cart items, quantities, and totals. Persisted to `localStorage` via `redux-persist`.
- **Price/Category Slices**: Temporary filtering states derived from API data.

---

## 🛠 Key Features Implementation

### Global Search & Suggestions
- **Logic**: Real-time filtering on the Home page combined with an autocomplete dropdown in the Header.
- **Navigation**: Search results use `useQuery` to fetch suggestions and provide direct links to product detail pages.

### Product Filtering System
- **Categories**: Dynamic category generation based on available products.
- **Price Range**: Advanced range filtering (Min-Max) calculated dynamically from the product dataset.
- **Sorting**: Multi-criteria sorting (Price High-Low / Low-High).

### Shopping Cart
- **Persistence**: Cart items survive page refreshes.
- **Optimistic UI**: Quantity updates and removals reflect instantly in the UI.

### Responsive Design
- Custom breakpoints and a mobile-first approach.
- Optimized layouts for Grid (2/3 columns) and List views.

---

## ⚡ Performance Optimizations

- **Image Optimization**: Utilizing Next.js `next/image` for automatic resizing, lazy loading, and WebP support.
- **Code Splitting**: Native Next.js dynamic routing.
- **Memoization**: Using `useMemo` for complex filtering calculations to prevent unnecessary re-renders.

---

## 🤝 Contribution Guidelines

1. **Naming Convention**: Use PascalCase for components and camelCase for hooks/utilities.
2. **Atomic Design**: Keep components small and focused.
3. **Type Safety**: Always define TypeScript interfaces for new data structures.
