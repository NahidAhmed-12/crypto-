<div align="center">
  <h1 style="margin-top: 10px;">CryptoVerse | Real-Time Crypto Tracker</h1>
</div>

![Project Screenshot](./public/readmeimg/crypto.avif)

<div align="center">

  [![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![CoinGecko](https://img.shields.io/badge/CoinGecko-8BC53F?style=for-the-badge&logo=coingecko&logoColor=white)](https://www.coingecko.com/en/api)
  [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)

  <h3>🚀 <a href="https://crypto-10.vercel.app/">View Live Website</a></h3>
</div>

---

## 📖 About The Project

**CryptoVerse** is a modern cryptocurrency tracking application designed to provide users with real-time market data. Built with **React.js** and styled with **Tailwind CSS**, it offers a seamless interface to monitor crypto prices, market caps, and trends.

The application is built with **Resilience** in mind. It integrates the **CoinGecko API** for live data but includes a smart **Fallback Mechanism (Demo Mode)** that switches to mock data instantly if the API rate limit is reached, ensuring the UI never breaks.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React.js](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Gradients, Glassmorphism, Responsive Grid)
- **Data Source:** [CoinGecko API](https://www.coingecko.com/en/api)
- **Routing:** `react-router-dom` (Dynamic Routing for details)
- **Icons:** `react-icons`
- **State Management:** `useState`, `useEffect`, `useMemo`

---

## ✨ Key Features

- **🛡️ Smart API Fallback:** Automatically detects API failures or rate limits and seamlessly switches to **Demo Mode** using cached mock data.
- **🔍 Instant Search:** Real-time filtering logic using `useMemo` allows users to find coins by name or symbol instantly.
- **⚡ "Load More" Pagination:** Custom pagination logic to load coins incrementally for better performance and user experience.
- **🎨 Modern UI/UX:**
  - Fully Responsive Grid Layout (Mobile to Desktop).
  - Glassmorphism effects (`backdrop-blur`).
  - Interactive Hover States & Animations.
- **📊 Detailed Insights:** Supports routing to a `DetailsView` modal for in-depth analysis of specific cryptocurrencies.

---

## 📂 Core Logic Overview

The main functionality is handled in `Main.jsx`:

1.  **Data Fetching:** Async function fetches data from CoinGecko. If it catches an error (e.g., 429 Too Many Requests), it triggers `setUsingMockData(true)` to render safe fallback data.
2.  **Optimized Filtering:** The search bar uses `useMemo` to filter the coin list without causing unnecessary re-renders.
3.  **Dynamic Rendering:** The grid adapts based on `visibleCount`, allowing the "Load More" feature to append data dynamically.

---

## 💻 Getting Started

Follow the instructions below to run this project locally on your machine.

### Prerequisites
Make sure you have **Node.js** installed.

### Installation Steps

**1. Clone the repository**
```bash
https://github.com/NahidAhmed-12/crypto-.git
```

**2. Navigate to project directory**
```bash
cd your-repo-name
```

**3. Install Dependencies**
```bash
npm install
# or if you use yarn
yarn install
```

**4. Start the Development Server**
```bash
npm start
# or
yarn start
```

The application will open automatically at `http://localhost:3000`.

---

## 📂 Folder Structure

```
src/
├── assets/             # Images (screenshot.avif, Nahid.avif)
├── pages/              # All Components & Pages
│   ├── Main.jsx        # Main Hero section with 3D animation
│   ├── Navbar.jsx      # Responsive Navigation
│   ├── Footer.jsx      # Footer section
│   └── ...             # Other page components
├── App.js              # Main Component & Routes
└── index.css           # Global Styles & Tailwind Directives
```

---


## 📬 Contact Me

Feel free to reach out for collaborations or just a friendly hello!

- **Email:** [your-email@gmail.com](mailto:your-email@gmail.com)
- **LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- **GitHub:** [github.com/yourusername](https://github.com/yourusername)

---

<div align="center">
  <p>Made with ❤️ by <b>Nahid</b></p>
  <p>⭐️ If you like this crypto tracker, please give it a star!</p>
</div>
