class DarkModeManager {
  constructor() {
    this.isDarkMode = this.getStoredTheme();
    this.init();
  }

  init() {
    this.createToggleButton();
    this.applyTheme();
    this.updateGalleryImages();
  }

  getStoredTheme() {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  saveTheme() {
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = this.isDarkMode ? '☀️' : '🌙';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    
    const style = document.createElement('style');
    style.textContent = `
      .theme-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        background-color: var(--bg-color);
        color: var(--text-color);
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      
      .theme-toggle:active {
        transform: scale(0.95);
      }

      body.dark-mode {
        --bg-color: #0D1117;
        --card-bg: #161B22;
        --text-color: #E6EDF3;
        --nav-bg: #161B22;
        --primary-color: #6366F1;
        --primary-hover: #8B5CF6;
        --secondary-bg: #21262D;
        --border-color: #30363D;
        --hover-bg: #30363D;
        --footer-bg: #161B22;
      }

      body.dark-mode {
        background-color: var(--bg-color) !important;
        color: var(--text-color) !important;
      }

      body.dark-mode nav {
        background-color: var(--nav-bg) !important;
        border-bottom: 1px solid var(--border-color);
      }

      body.dark-mode .logo {
        color: var(--text-color) !important;
      }

      body.dark-mode .nav-links a {
        color: var(--text-color) !important;
      }

      body.dark-mode .nav-links a:hover {
        color: var(--primary-hover) !important;
        background-color: var(--hover-bg) !important;
      }

      body.dark-mode .btn-primary {
        background-color: var(--primary-color) !important;
        border-color: var(--primary-color) !important;
        color: #FFFFFF !important;
      }

      body.dark-mode .btn-primary:hover {
        background-color: var(--primary-hover) !important;
        border-color: var(--primary-hover) !important;
      }

      body.dark-mode .split-button .btn-main,
      body.dark-mode .split-button .btn-dropdown {
        background-color: var(--card-bg) !important;
        color: var(--text-color) !important;
      }

      body.dark-mode .split-button:hover .btn-main,
      body.dark-mode .split-button:hover .btn-dropdown {
        color: var(--primary-hover) !important;
        background-color: var(--hover-bg) !important;
      }

      body.dark-mode .split-button .dropdown-menu {
        background-color: var(--card-bg) !important;
        border-color: var(--primary-color) !important;
      }

      body.dark-mode .split-button .dropdown-menu a {
        color: var(--text-color) !important;
      }

      body.dark-mode .split-button .dropdown-menu a:hover {
        background-color: var(--hover-bg) !important;
        color: var(--primary-hover) !important;
      }

      body.dark-mode #home {
        background: linear-gradient(180deg, rgba(13, 17, 23, 0.8), #0D1117) !important;
      }

      body.dark-mode #features,
      body.dark-mode #devs,
      body.dark-mode #gallery {
        background-color: var(--bg-color) !important;
      }

      body.dark-mode .hero-container h1 .highlight,
      body.dark-mode .gallery-container h1 .highlight,
      body.dark-mode .devs-container h2 .highlight,
      body.dark-mode #features h2 {
        color: var(--primary-color) !important;
      }

      body.dark-mode .card {
        background-color: var(--card-bg) !important;
        border-color: var(--primary-color) !important;
        color: var(--text-color) !important;
      }

      body.dark-mode .card h3,
      body.dark-mode .card p {
        color: var(--text-color) !important;
      }

      body.dark-mode footer {
        background-color: var(--footer-bg) !important;
        color: var(--text-color) !important;
        border-top: 1px solid var(--border-color);
      }

      body.dark-mode .footer-links a {
        color: var(--text-color) !important;
      }

      body.dark-mode .footer-links a:hover {
        color: var(--primary-hover) !important;
      }

      body.dark-mode .gallery-card {
        background-color: transparent !important;
      }

      body.dark-mode .logo .highlight {
        color: var(--primary-color) !important;
      }

      body.dark-mode .logo-icon svg path {
        fill: var(--primary-color) !important;
      }
    `;
    document.head.appendChild(style);

    toggleButton.addEventListener('click', () => {
      this.toggle();
    });

    document.body.appendChild(toggleButton);
  }

  toggle() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.updateGalleryImages();
    this.saveTheme();
    
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.innerHTML = this.isDarkMode ? '☀️' : '🌙';
    }
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  updateGalleryImages() {
    const galleryImages = document.querySelectorAll('.gallery-card img');
    if (galleryImages.length === 0) return;

    galleryImages.forEach((img, index) => {
      const imageNumber = index + 1;
      if (this.isDarkMode) {
        img.src = `Screenshots/${imageNumber}-dark.png`;
        img.alt = `ViMusic Screenshot ${imageNumber} (Dark Mode)`;
      } else {
        img.src = `Screenshots/${imageNumber}.png`;
        img.alt = `ViMusic Screenshot ${imageNumber}`;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.darkModeManager = new DarkModeManager();
});

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
      const darkModeManager = window.darkModeManager;
      if (darkModeManager) {
        darkModeManager.isDarkMode = e.matches;
        darkModeManager.applyTheme();
        darkModeManager.updateGalleryImages();
      }
    }
  });
}