/**
 * Application Entry Point
 * This file initializes and renders the React application.
 * It sets up:
 * 1. The root React component
 * 2. Animation library (AOS - Animate On Scroll)
 * 3. Global styles
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Import AOS styles
import 'aos/dist/aos.css';

// Initialize AOS asynchronously
const initAOS = async () => {
  const AOS = (await import('aos')).default;
  AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 120,
    easing: 'ease-out-cubic'
  });
};

// Initialize AOS
initAOS().catch(console.error);

// Find and verify the root element where React will be mounted
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Create and render the React application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
