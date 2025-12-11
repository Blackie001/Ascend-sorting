const colors = [
  { name: "Midnight Blue",   color: "#191970" },
  { name: "Emerald Green",       color: "#2ecc71" },
  { name: "Sunset Orange",   color: "#f39c12" },
  { name: "Crimson Red",     color: "#e74c3c" },
  { name: "Amethyst",        color: "#9b59b6" },
  { name: "Turquoise",       color: "#1abc9c" },
  { name: "Golden Yellow",   color: "#f1c40f" },
  { name: "Coral Pink",      color: "#ff6b6b" },
  { name:true, { name: "Ocean Teal",      color: "#16a085" },
  { name: "Royal Indigo",    color: "#5c4b9e" },
  { name: "Lavender Dream",  color: "#bb86fc" },
  { name: "Fresh Mint",      color: "#00d2d3" }
];

const container = document.getElementById('colorList');

function renderList() {
  container.innerHTML = '';

  colors.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'color-item';
    div.style.animationDelay = `${index * 0.08}s`; // Staggered entrance

    div.innerHTML = `
      <div class="color-swatch" style="background-color: ${item.color};"></div>
      <div class="color-name">${item.name}</div>
      <button class="arrow-btn" aria-label="Move to top">Up Arrow</button>
    `;

    // Click anywhere on the row OR the arrow
    div.addEventListener('click', (e) => {
      if (e.target.closest('.arrow-btn')) return; // Let button handle it
      moveToTop(index, div);
    });

    div.querySelector('.arrow-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      moveToTop(index, div);
    });

    container.appendChild(div);
  });
}

function moveToTop(index, clickedElement) {
  if (index === 0) return; // Already at top

  const [movedItem] = colors.splice(index, 1);
  colors.unshift(movedItem);

  // Add animation classes
  clickedElement.classList.add('moving-to-top');

  // Animate all items that will shift down
  const allItems = container.querySelectorAll('.color-item');
  allItems.forEach((el, i) => {
    if (i > 0 && i <= index) {
      el.classList.add('shifting-down');
    }
  });

  // Re-render after animation
  setTimeout(() => {
    renderList();
  }, 750);
}

// Initial render with entrance animation
renderList();