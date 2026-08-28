# IgniteCalc: Ultimate Calculation Suite

## Overview

IgniteCalc is a high performance, professional-grade web application designed to provide a comprehensive suite of calculation tools. Developed using a lightweight architecture, the application emphasizes speed, precision, and visual excellence. It leverages modern web standards to deliver a premium user experience without the overhead of heavy frameworks like React.

## Key Features

### 1. Standard Calculator

Designed for day-to-day arithmetic, the standard calculator provides a clean, distraction-free interface for addition, subtraction, multiplication, and division.

### 2. Scientific Calculator

A sophisticated tool for advanced mathematical requirements. It includes support for:

- Trigonometric functions (Sine, Cosine, Tangent)
- Logarithmic operations (Base 10 and Natural Log)
- Exponential and power functions
- Mathematical constants (Pi and e)
- Statistical and miscellaneous functions (Absolute value, Square root, Random number generation)

### 3. CGPA Calculator

A specialized academic module for students to track their academic performance.

- Supports dynamic course entry (Add/Remove courses on the fly)
- Calculates Cumulative Grade Point Average based on a 5.0 scale
- Provides automated performance analysis and academic status remarks
- Mobile-responsive design for on-the-go tracking

### 4. Extreme Device Optimization

Specially engineered to provide a native-app feel on high-end mobile devices:

- **iPhone Optimization**: Native support for iPhone XR, 11, 12, 13, 14, 15, 16, and the upcoming iPhone 17 Air. Features a simulated "Dynamic Island" for a premium iOS feel.
- **Samsung Galaxy Integration**: Optimized for the S-series and A-series aspect ratios and high-refresh-rate displays.
- **PWA Ready**: Supports "Add to Home Screen" with native-style safe area insets and status bar styling.
- **Accessibility Optimized**: Compliant viewport settings ensure users can zoom if needed, meeting modern web standards.
- **Persistent Session History**: All calculations and CGPA results are automatically saved to local storage, allowing users to review their work even after closing the application.
- **Integrated Support Center**: A dedicated in-app contact module for users to report bugs or request assistance directly from the developer within IgniteCalc.

## Technical Specifications

### Architecture

The application follows a modern "Vanilla JavaScript" architecture where the logic and UI rendering are centralized within a primary script engine. This approach ensures:

- Faster initial load times
- Highly reactive user interface
- Minimized DOM manipulation outside of the rendering engine
- Over 80% of the application is driven by JavaScript logic

### Styling and Visuals

- **Tailwind CSS**: Used for foundational layout, rapid grid development, and responsive utility classes.
- **Custom CSS**: Implements advanced glassmorphism effects, smooth state transitions, and high-quality typography (Inter and Outfit fonts).
- **Responsive Web Design**: Optimized for seamless use across desktop, tablet, and mobile browsers.

## Project Structure

- `index.html`: The minimal application shell and asset loader.
- `assets/js/script.js`: The core application engine responsible for state management, calculations, and dynamic UI rendering.
- `assets/css/style.css`: The global stylesheet containing design tokens, animations, and premium glass effects.
- `images/`: Stores graphical assets including the application favicon (Flamez_Dev.png).
- `package.json`: Manages development dependencies and build scripts.

## Installation and Development

To set up the project locally for development, ensure you have Node.js installed, then follow these steps:

1. **Clone the Project**: Download the source code to your local machine.
2. **Install Dependencies**: Execute the following command in the project root:
   ```bash
   npm install
   ```
3. **Internal Development Server**: Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. **Production Build**: Generate an optimized production bundle:
   ```bash
   npm run build
   ```

## Author and Credits

- **Lead Developer**: Daniel Olutoba Iyanda
- **Project Year**: 2026
- **License**: Private / Proprietary

This project represents a commitment to high-quality software engineering and modern web design principles.
