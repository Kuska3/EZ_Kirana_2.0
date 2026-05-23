# 🥦 Ez Kirana 2.0

[![React Version](https://img.shields.io/badge/react-v19.2.6-green?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![Vite Version](https://img.shields.io/badge/vite-v8.0.12-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-v4.3.0-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/framer--motion-v12.40.0-ff0055?logo=framer&logoColor=white&style=flat-square)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

**Ez Kirana 2.0** is a premium, high-fidelity grocery quick-commerce web application inspired by leading Indian quick-commerce startups (like Blinkit, Zepto, and Instamart). It delivers a state-of-the-art shopping experience with sleek glassmorphism designs, fluid micro-animations, comprehensive filters, a premium checkout wizard, and a fully functional seller partner portal.

Built entirely using **React 19**, **Tailwind CSS v4 (PostCSS)**, **Framer Motion 12**, and global React contexts for seamless real-time state synchronization, Ez Kirana 2.0 is designed to wow developers and shoppers alike.

---

## ✨ Features & Highlights

### ⚡ Lightning-Fast Quick-Commerce UI/UX
* **Vibrant HSL Palette**: Hand-curated grocery-green accents, harmonious borders, and modern typography (Google Fonts Outfit/Inter integration).
* **Glassmorphic Navigation**: Sticky transparent header with real-time fuzzy search suggestions, responsive sidebar drawer, dynamic cart count badge bounces, and profile indicators.
* **Responsive Layouts**: Designed mobile-first, rendering flawlessly on phones, tablets, and wide desktop screens.

### 🏪 Global State Architecture
* **State synchronization**: No heavy, bloated third-party state managers. Powered natively by modular React Context Providers:
  * `CartContext` - Dynamic addition/removal, real-time quantity modifiers, coupon calculations, and item listings.
  * `WishlistContext` - Double-tap additions, floating saves, and seamless cart transfer triggers.
  * `ThemeContext` - Fluid, system-wide dark/light theme switching with instant color adaptation.

### 🛒 Premium Multi-Step Checkout Wizard
* **Step 1: Address Manager** - Select from interactive saved cards or slide open a validated "Add New Address" sheet.
* **Step 2: Scheduling** - Choose tailored delivery time windows (e.g. *10-Min Rush Delivery*, *Evening Slot*).
* **Step 3: Interactive Payment Gateway** - Simulates realistic modern payment flows:
  * *UPI QR & Apps* - Supports GooglePay, PhonePe, and Paytm details.
  * *Credit/Debit Cards* - Beautiful interactive virtual card layout with keying animations and CVV input flip-cards.
  * *Cash on Delivery (COD)* / *Wallets*.
* **Step 4: Success Celebration** - Triggers physics-driven full-screen particle confetti (`canvas-confetti`) and launches a **Live Order Tracker Map Simulator** with real-time delivery progress counters.

### 👨‍💼 Merchant Hub / Seller Dashboard
A full inventory portal demonstrating end-to-end seller capabilities:
* **Interactive Catalog Uploads** - Form validations, price ledger configurations, custom description boards, and preset product image selectors.
* **Real-Time Card Previewer** - High-fidelity representation of how the product card appears to consumers in the marketplace, updating dynamically as you type.
* **Stock Toggle Switches** - Instantly switch product status between `IN STOCK` (Add button enabled) and `SOLD OUT` (disabled badge) across all client pages in real time.

---

## 🛠️ Technology Stack

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **React 19** | Core Architecture | Functional components, state synchronization, Custom Context hooks |
| **Vite 8** | Build Tooling | Instant Hot Module Replacement (HMR) and ultra-fast dev server builds |
| **Tailwind CSS v4** | UI Styling | CSS custom property bindings, premium utilities, HSL transitions |
| **Framer Motion 12** | Animations | Page routing transitions (`AnimatePresence`), hover scales, drawer slides |
| **Lucide React** | Icon Suite | Modern SVG line icons mapped contextually to category badges |
| **Canvas Confetti** | Celebrations | Physics-based particle rendering on successful transactions |
| **React Router DOM v7** | Routing | Advanced, nested client-side route tracking and navigation |

---

## 📂 Project Structure

```text
ez-kirana-2.0/
├── public/                 # Static assets
└── src/
    ├── components/         # Reusable presentation components
    │   ├── Footer.jsx      # Premium detailed footer with links & newsletter signup
    │   ├── Navbar.jsx      # Sticky glassmorphic header with search suggestions & badge alerts
    │   ├── ProductCard.jsx # Smooth hover scale card with quick-adds & saving percentages
    │   ├── Skeleton.jsx    # Fluid content loader shells for listings
    │   └── Toast.jsx       # Custom slide-in notifications stack
    ├── context/            # Global state stores
    │   ├── CartContext.jsx      # Cart modifier logic, custom inventory additions
    │   ├── WishlistContext.jsx  # Interactive saving lists
    │   └── ThemeContext.jsx     # Dark & Light mode system
    ├── data/
    │   └── products.js     # Over 40+ curated products (Nutrient breakdowns, ratings, descriptions)
    ├── pages/              # High-Fidelity Page views
    │   ├── Auth.jsx             # Glassmorphic Login/Register validation forms
    │   ├── CartPage.jsx         # Detailed item list, quantity controls, promo coupons
    │   ├── Checkout.jsx         # 4-stage wizard (Address, Slot, Flip Card payment,Confetti)
    │   ├── Home.jsx             # Hero slider, circular category rings, savings deal grids, reviews
    │   ├── OrderSuccess.jsx     # Confetti celebration, simulated live delivery tracker map
    │   ├── ProductDetails.jsx   # Zoom-on-hover gallery, details tabs, related carousels
    │   ├── Products.jsx         # Grid lists, price ranges, rating filters, active search tags
    │   ├── Profile.jsx          # Dashboard containing statistics, saved addresses, order history
    │   └── VendorDashboard.jsx  # Merchant panel, dynamic SKU uploads, live card preview, inventory toggles
    ├── App.jsx             # Client-side router layout & framer motion animations
    ├── main.jsx            # Application entrypoint
    └── index.css           # Global typography, scrollbars, utility styles
```

---

## 🚀 Getting Started

Follow these step-by-step instructions to run the project locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org) (v18.x or above recommended) and `npm` installed.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ez-kirana-2.0.git
   ```

2. **Navigate into the Directory**
   ```bash
   cd ez-kirana-2.0
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Launch the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` to see the application in action.

5. **Build for Production**
   ```bash
   npm run build
   ```
   This generates a highly optimized static bundle inside the `/dist` directory, fully ready for deployment to Vercel, Netlify, or GitHub Pages.

---

## 🎨 UI & Page Showcases

To give your GitHub visitors an immediate sense of the app's premium feel, here are the main layouts you can view:

### 🏠 Customer Portal View
* **Aesthetic Home Landing**: Animated hero banners with sliding promotion campaigns, smooth circular grocery badges, and super-saver sales grids.
* **Product Catalog**: Live search engine that instantly parses titles, categories, and descriptions with interactive sidebar filter accordions.
* **Interactive Detail Galleries**: Dynamic zoom hover effects over high-resolution products, listing packaging sizes, dietary tags, and related products carousel.

### 💳 Transaction Flow
* **Interactive Checkout**: Visual address picker sheets, scheduling options, and a beautiful virtual debit card that flips in 3D as you enter the CVV code.
* **Success Celebration**: Live shipment progress indicator bar updating via timed intervals along with a simulated Google-style map tracker.

### 📈 Vendor Portal View
* **Live Catalog & SKU Uploader**: Add custom inventory stock, type labels, select category associations, paste product URLs (or click preset presets), and watch it preview instantly on a real-time card before uploading to the live catalogue.
* **Synchronized Switches**: Instantly toggle `IN STOCK` / `SOLD OUT` states to watch it updates in customer-facing views instantly.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Made with ❤️ for a modern quick-commerce era.*
