// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('books.db');

const initializeDatabase = () => {
  db.serialize(() => {
    db.run('DROP TABLE IF EXISTS books');
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        genre TEXT
      )
    `);

    const books = [
      { title: 'Beyond the Horizon', author: 'Emily Johnson', genre: 'Mystery' },
      { title: 'Echoes of Eternity', author: 'Christopher Williams', genre: 'Fantasy' },
      { title: 'Whispers in the Wind', author: 'Olivia Davis', genre: 'Romance' },
      { title: 'The Forgotten Legacy', author: 'Michael Roberts', genre: 'Historical Fiction' },
      { title: 'Silent Shadows', author: 'Sophia Anderson', genre: 'Thriller' },
      { title: 'Serenade of Stars', author: 'Daniel Martinez', genre: 'Science Fiction' },
      { title: 'Enigma of the Lost City', author: 'Isabella Taylor', genre: 'Adventure' },
      { title: 'Shattered Reflections', author: 'Andrew Clark', genre: 'Drama' },
      { title: 'Ephemeral Dreams', author: 'Grace Miller', genre: 'Poetry' },
      { title: 'Midnight Whispers', author: 'David Turner', genre: 'Suspense' },
      { title: 'The Labyrinth of Lies', author: 'Victoria Lewis', genre: 'Mystery' },
      { title: 'Crimson Moon', author: 'Jonathan White', genre: 'Fantasy' },
      { title: 'Heartstrings Harmony', author: 'Ella Carter', genre: 'Romance' },
      { title: 'Chronicles of the Ages', author: 'Nathan Adams', genre: 'Historical Fiction' },
      { title: 'Fading Echoes', author: 'Sophie Wright', genre: 'Thriller' },
      { title: 'Quantum Reverie', author: 'Alex Turner', genre: 'Science Fiction' },
      { title: 'The Forbidden Quest', author: 'Madison Taylor', genre: 'Adventure' },
      { title: 'Beneath the Surface', author: 'Jacob Harris', genre: 'Drama' },
      { title: 'Whispers of the Soul', author: 'Emma White', genre: 'Poetry' },
      { title: 'Eternal Nightfall', author: 'Anthony Scott', genre: 'Suspense' },
      { title: 'The Enchanted Garden', author: 'Sophie Turner', genre: 'Fantasy' },
      { title: 'Stars Aligned', author: 'Christopher Martin', genre: 'Romance' },
      { title: 'Echoes of Destiny', author: 'Hannah Parker', genre: 'Mystery' },
      { title: 'Voyage of the Lost Ark', author: 'Benjamin Davis', genre: 'Adventure' },
      { title: 'Threads of Fate', author: 'Ava Rodriguez', genre: 'Historical Fiction' },
      { title: 'Shattered Illusions', author: 'Robert Turner', genre: 'Thriller' },
      { title: 'Neon Dreams', author: 'Lily Johnson', genre: 'Science Fiction' },
      { title: 'Journey to Avalon', author: 'Samuel White', genre: 'Fantasy' },
      { title: 'Captivating Shadows', author: 'Sophia Turner', genre: 'Romance' },
      { title: 'The Puzzling Paradox', author: 'Daniel Harris', genre: 'Mystery' },
      { title: 'Whispers in the Wilderness', author: 'Isaac Miller', genre: 'Adventure' },
      { title: 'Songs of the Siren', author: 'Olivia Turner', genre: 'Poetry' },
      { title: 'Chronicles of the Cosmos', author: 'Ethan Parker', genre: 'Science Fiction' },
      { title: 'Crimson Embrace', author: 'Victoria Turner', genre: 'Suspense' },
      { title: 'Ethereal Echoes', author: 'Emily White', genre: 'Fantasy' },
      { title: 'Shadows of the Past', author: 'Michael Harris', genre: 'Historical Fiction' },
      { title: 'Whispers in the Night', author: 'Sophie Turner', genre: 'Romance' },
      { title: 'The Vanishing Mirage', author: 'Christopher Davis', genre: 'Mystery' },
      { title: 'Quest for Eternity', author: 'Olivia Harris', genre: 'Adventure' },
      { title: 'Ripples in Time', author: 'William Turner', genre: 'Science Fiction' },
      { title: 'Dancing with Destiny', author: 'Sophia Turner', genre: 'Romance' },
      { title: 'The Enigmatic Cipher', author: 'Daniel White', genre: 'Mystery' },
      { title: 'Echoes of Avalon', author: 'Madison Turner', genre: 'Fantasy' },
      { title: 'Beyond the Veil', author: 'Alex Harris', genre: 'Suspense' },
      { title: 'Serenade of Serenity', author: 'Ella Turner', genre: 'Romance' },
      { title: 'Whispers in the Mist', author: 'Nathan Davis', genre: 'Mystery' },
      { title: 'Realm of Dreams', author: 'Sophie Turner', genre: 'Fantasy' },
      { title: 'Ephemeral Whispers', author: 'Christopher Harris', genre: 'Poetry' },
      { title: 'The Silent Symphony', author: 'Emma Turner', genre: 'Drama' },
      { title: 'Shadows of Tomorrow', author: 'Jonathan Turner', genre: 'Thriller' },
      {title : "Harry Potter and the Philosopher's Stone", author : 'J.k Rowling' , genre : 'fantasy'},
      {title : "Harry Potter and the Prisoner of Azkaban", author : 'J.k Rowling' , genre : 'fantasy'},
      {title : "Harry Potter and the Chamber of Secrets ", author : 'J.k Rowling' , genre : 'fantasy'},

    ];

    const insertStatement = db.prepare(`
      INSERT INTO books (title, author, genre) VALUES (?, ?, ?)
    `);

    books.forEach(book => {
      insertStatement.run(book.title, book.author, book.genre);
    });

    insertStatement.finalize();
  });
};

const getAllBooks = (callback) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error(err.message);
      return callback(err, null);
    }

    return callback(null, rows);
  });
};

const closeDatabase = () => {
  db.close();
};

module.exports = {
  initializeDatabase,
  getAllBooks,
  closeDatabase,
};
