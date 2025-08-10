const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Set up file storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create SQLite DB
const db = new sqlite3.Database('database.db', (err) => {
  if (err) console.error(err);
  console.log('Connected to SQLite database.');
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    semester INTEGER,
    filename TEXT,
    originalname TEXT,
    uploader TEXT,
    date_uploaded TEXT
  )
`);

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const { title, semester, uploader } = req.body;
  const file = req.file;

  db.run(
    `INSERT INTO notes (title, semester, filename, originalname, uploader, date_uploaded) 
     VALUES (?, ?, ?, ?, ?, datetime('now'))`,
    [title, semester, file.filename, file.originalname, uploader || 'Unknown'],
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ success: true, id: this.lastID });
      }
    }
  );
});

// Get all notes
app.get('/notes', (req, res) => {
  db.all(`SELECT * FROM notes ORDER BY date_uploaded DESC`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
});

// Download file
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
