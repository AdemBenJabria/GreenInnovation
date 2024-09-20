// src/env.js
(function(window) {
    window.__env = window.__env || {};
  
    // Variables d'environnement injectées par Render lors du build
    window.__env.geminiApiKey = '%GEMINI_API_KEY%';
  }(this));
  