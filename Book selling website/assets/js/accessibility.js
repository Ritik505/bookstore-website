// Accessibility Menu Logic
// Floating button opens a sidebar with font size, contrast, and dark mode options

// --- Create Accessibility Button and Sidebar ---
const accMenu = document.getElementById('accessibility-menu');
accMenu.innerHTML = `
  <button id="accBtn" aria-label="Open accessibility menu" style="background: var(--color-accent); color: #fff; border-radius: 50%; width: 56px; height: 56px; border: none; font-size: 2rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.18);">A</button>
  <div id="accSidebar" style="display:none; position:fixed; bottom:80px; right:2rem; background:var(--color-card); color:#fff; border-radius:1rem; box-shadow:0 4px 24px rgba(0,0,0,0.18); padding:1.5rem; min-width:220px; z-index:2100;">
    <h3 style="margin-top:0;">Accessibility</h3>
    <div style="margin-bottom:1rem;">
      <label>Font Size:</label><br>
      <button id="fontInc" style="margin:0 0.5rem 0 0;">A+</button>
      <button id="fontDec">A-</button>
    </div>
    <div style="margin-bottom:1rem;">
      <label>Contrast:</label><br>
      <button id="contrastToggle">High Contrast</button>
    </div>
    <div>
      <label>Theme:</label><br>
      <button id="darkToggle">Toggle Dark Mode</button>
    </div>
  </div>
`;

// --- State ---
let fontSize = 16;
let highContrast = false;
let darkMode = false;

// --- Button Event Listeners ---
const accBtn = document.getElementById('accBtn');
const accSidebar = document.getElementById('accSidebar');
accBtn.onclick = () => {
  accSidebar.style.display = accSidebar.style.display === 'none' ? 'block' : 'none';
};

document.getElementById('fontInc').onclick = () => {
  fontSize = Math.min(fontSize + 2, 24);
  document.documentElement.style.fontSize = fontSize + 'px';
};
document.getElementById('fontDec').onclick = () => {
  fontSize = Math.max(fontSize - 2, 12);
  document.documentElement.style.fontSize = fontSize + 'px';
};
document.getElementById('contrastToggle').onclick = () => {
  highContrast = !highContrast;
  if (highContrast) {
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
  } else {
    document.body.style.background = '';
    document.body.style.color = '';
  }
};
document.getElementById('darkToggle').onclick = () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};

// --- Optional: Close sidebar on outside click ---
document.addEventListener('click', (e) => {
  if (!accMenu.contains(e.target) && accSidebar.style.display === 'block') {
    accSidebar.style.display = 'none';
  }
});
