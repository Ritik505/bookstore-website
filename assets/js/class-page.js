// JS for NCERT Class Pages
// Dynamically renders books for the current class page

// --- Utility: Get class number from filename (e.g., class-5.html => 5) ---
function getClassNumberFromFilename() {
  const match = window.location.pathname.match(/class-(\d+)\.html$/);
  return match ? parseInt(match[1], 10) : null;
}

// --- Populate Classes Dropdown in Header ---
function populateClassDropdown() {
  const classesMenu = document.getElementById('classesMenu');
  if (!classesMenu) return; // Guard clause
  
  const uniqueClasses = [...new Set(books.map(b => b.class))].sort((a, b) => a - b);
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

// --- Render Books for This Class ---
function renderClassBooks(classNum) {
  const grid = document.getElementById('classBooksGrid');
  if (!grid) return;
  
  const filtered = books.filter(b => b.class === classNum);
  grid.innerHTML = '';
  
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="color:#bdbdbd;font-size:1.1rem;">No books available for this class yet.</div>';
    return;
  }
  
  filtered.forEach(book => {
    grid.appendChild(createBookCard(book));
  });
}

// --- Create Book Card Element (Consistent with main.js) ---
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

  // Buy Now button
  const btn = document.createElement('button');
  btn.className = 'buy-btn';
  btn.textContent = 'Buy Now';
  
  // Use addEventListener for the click event
  btn.addEventListener('click', () => {
    // Store book info in sessionStorage and redirect to order page
    sessionStorage.setItem('selectedBook', JSON.stringify(book));
    window.location.href = 'order.html'; // This line redirects the page
  });
  footer.appendChild(btn);

  info.appendChild(footer);
  card.appendChild(info);

  return card;
}

// --- On DOMContentLoaded: Populate dropdown and render books ---
document.addEventListener('DOMContentLoaded', () => {
  populateClassDropdown();
  const classNum = getClassNumberFromFilename();
  if (classNum) {
    renderClassBooks(classNum);
  }
});