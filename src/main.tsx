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
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Initialize AOS (Animate On Scroll) library with custom settings
 * - duration: 800ms for each animation
 * - once: false -> animations will trigger every time element comes into view
 * - mirror: true -> animations can play in reverse when scrolling up
 * - offset: 120px -> animation starts when element is 120px from viewport edge
 * - easing: smooth cubic easing for natural-feeling animations
 */
AOS.init({
  duration: 800,
  once: false,
  mirror: true,
  offset: 120,
  easing: 'ease-out-cubic'
});

// Find and verify the root element where React will be mounted
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Create and render the React application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
