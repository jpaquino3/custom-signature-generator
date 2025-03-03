import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Wrap the App component as a web component
const WebComponent = reactToWebComponent(App, React, ReactDOM);

// Register the custom element (note: custom element names must contain a hyphen)
customElements.define('signature-generator', WebComponent);

// Optionally, remove the traditional mounting if you only want to use the web component
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

reportWebVitals();
