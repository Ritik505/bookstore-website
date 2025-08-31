// Main JS for Premium NCERT Book Store
// Handles: dropdown, featured books, all books, filtering, search, navigation

// --- Utility: Get unique classes from books data ---
function getUniqueClasses(books) {
  const classes = books.map(b => b.class);
  return [...new Set(classes)].sort((a, b) => a - b);
}

// --- Populate Classes Dropdown in Header and Filter ---
function populateClassDropdown() {
  const classesMenu = document.getElementById('classesMenu');
  const classFilter = document.getElementById('classFilter');
  const uniqueClasses = getUniqueClasses(books);

  // Header dropdown
  if (classesMenu) {
    classesMenu.innerHTML = '';
    uniqueClasses.forEach(cls => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `class-${cls}.html`;
      a.textContent = `Class ${cls}`;
      li.appendChild(a);
      classesMenu.appendChild(li);
    });
  }

  // Filter dropdown
  if (classFilter) {
    classFilter.innerHTML = '<option value="all">All Classes</option>';
    uniqueClasses.forEach(cls => {
      const opt = document.createElement('option');
      opt.value = cls;
      opt.textContent = `Class ${cls}`;
      classFilter.appendChild(opt);
    });
  }
}

// --- Render Featured Books (first 4 by rating) ---
function renderFeaturedBooks() {
  const grid = document.getElementById('featuredBooksGrid');
  if (!grid) return;

  // Sort by rating, pick top 4
  const featured = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  grid.innerHTML = '';
  featured.forEach(book => {
    grid.appendChild(createBookCard(book));
  });
}

// --- Render All Books (with optional filter) ---
function renderAllBooks(filterClass = 'all', searchTerm = '') {
  const grid = document.getElementById('allBooksGrid');
  if (!grid) return;

  let filtered = books;
  if (filterClass !== 'all') {
    filtered = filtered.filter(b => b.class == filterClass);
  }
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term)
    );
  }

  grid.innerHTML = '';
  filtered.forEach(book => {
    grid.appendChild(createBookCard(book));
  });
}

// --- Create Book Card Element ---
function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'book-card';

  // Book cover wrapper
  const coverWrapper = document.createElement('div');
  coverWrapper.className = 'book-cover-wrapper';

  // Book cover image
  const img = document.createElement('img');
  img.src = book.cover;
  img.alt = `${book.title} cover`;
  img.className = 'book-cover';
  coverWrapper.appendChild(img);
  card.appendChild(coverWrapper);

  // Book info section
  const info = document.createElement('div');
  info.className = 'book-info';

  // Title
  const title = document.createElement('h3');
  title.className = 'book-title';
  title.textContent = book.title;
  info.appendChild(title);

  // Class and Subject
  const bookClass = document.createElement('p');
  bookClass.className = 'book-class';
  bookClass.textContent = `Class: ${book.class} | Subject: ${book.subject}`;
  info.appendChild(bookClass);

  // Book footer with price and button
  const footer = document.createElement('div');
  footer.className = 'book-footer';

  // Price
  const price = document.createElement('div');
  price.className = 'book-price';
  price.textContent = `₹${book.price}`;
  footer.appendChild(price);

  // Buy Now button - Corrected element and event handling
  const btn = document.createElement('button');
  btn.className = 'buy-btn';
  btn.textContent = 'Buy Now';
  btn.addEventListener('click', () => {
    // Store book info in sessionStorage and redirect to order page
    sessionStorage.setItem('selectedBook', JSON.stringify(book));
    window.location.href = 'order.html';
  });
  footer.appendChild(btn);

  info.appendChild(footer);
  card.appendChild(info);

  return card;
}

// --- Event Listeners for Filtering and Search ---
document.addEventListener('DOMContentLoaded', () => {
  populateClassDropdown();
  renderFeaturedBooks();
  renderAllBooks();

  // Filter by class
  const classFilter = document.getElementById('classFilter');
  if (classFilter) {
    classFilter.addEventListener('change', e => {
      renderAllBooks(e.target.value, document.getElementById('globalSearch').value);
    });
  }

  // Live search
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      renderAllBooks(classFilter ? classFilter.value : 'all', e.target.value);
    });
  }
});

// --- Lenis Smooth Scroll Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});