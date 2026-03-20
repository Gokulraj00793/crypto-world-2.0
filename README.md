# crypto-world-2.0
<img width="1908" height="1027" alt="image" src="https://github.com/user-attachments/assets/54a96b3a-0239-49e6-b60d-c496bb7eedd0" />

project link - https://crypto-world-20.netlify.app/
#  CryptoPulse - Real-Time Market Terminal

CryptoPulse is a high-performance, institutional-grade cryptocurrency dashboard built with React. It provides real-time market data, advanced search filtering, and a persistent personal watchlist, all wrapped in a premium "Bento-style" glassmorphic UI.

---

## 🛠 Tech Stack

| Library/Framework | Purpose | Why Chosen? |
| :--- | :--- | :--- |
| **React (Vite)** | Core Framework | Vite provides an exceptionally fast development environment and optimized production builds compared to CRA. |
| **Tailwind CSS** | Styling | Enables rapid UI development with a utility-first approach. Crucial for implementing the complex "Glassmorphism" and Dark Mode. |
| **Framer Motion** | Animations | Used for professional-grade micro-interactions, spring-based layout transitions, and the Bento Grid animations. |
| **Lucide React** | Iconography | A lightweight, beautiful icon set that perfectly fits the modern fintech aesthetic. |
| **Headless UI** | Accessible Components | Used for the Modal system to ensure high accessibility (WAI-ARIA) without sacrificing custom styling. |
| **Axios** | Data Fetching | Provides a cleaner API than Fetch, with built-in support for interceptors (used here for Rate Limit handling). |
| **Context API** | State Management | Ideal for this scale of application to manage global themes, market data, and watchlist persistence without the boilerplate of Redux. |

---

## Setup Instructions

Follow these steps to run the project locally on your machine:

1. **Install Node.js**: Ensure you have [Node.js](https://nodejs.org/) (LTS version recommended) installed.
2. **Clone/Download**: Extract the project files into a folder.
3. **Open Terminal**: Navigate to the `crypto_dash` directory.
4. **Install Dependencies**:
   ```bash
   npm install
   ```
5. **Start Development Server**:
   ```bash
   npm run dev
   ```
6. **View the App**: Open your browser to the local URL provided in the terminal (usually `http://localhost:5173`).

---

## Trade-offs & Future Improvements

### Shortcuts Taken:
- **API Rate Limiting**: Since we are using the free tier of the CoinGecko API, there is a strict rate limit. I implemented a basic interceptor to catch `429` errors, but in a production environment, a backend proxy with caching (Redis) would be preferred to serve data to many users.
- **Client-Side Filtering**: Search filtering is done on the client-side for speed. For thousands of assets, this would move to server-side pagination and search.

### Future Improvements:
- **Advanced Charts**: I would integrate `Recharts` or `Lightweight Charts` to show historical price data instead of the current static CSS sparklines.
- **Authentication**: Implementing Firebase or Auth0 would allow users to sync their watchlist across multiple devices instead of relying solely on `localStorage`.
- **WebSocket Integration**: Moving from REST polling to WebSockets (e.g., via Binance API) for truly "tick-by-tick" price updates.
- **Unit Testing**: Adding Vitest and React Testing Library to ensure the reliability of the custom `useLocalStorage` hook and context logic.

---

**Developed by [Gokulraj](https://github.com/Gokulraj00793)**
