import os
import sqlite3
conn = sqlite3.connect('notes.db')
cursor = conn.cursor()
cursor.execute("SELECT filename FROM notes")
print(cursor.fetchall())
conn.close()

from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, render_template, redirect, url_for, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

# --- Flask App Setup ---
app = Flask(__name__)
CORS(app)
app.secret_key = "yoursecretkey"  # Change this to a secure random value

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Database Initialization ---
def init_db():
    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()

    # Notes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            semester INTEGER,
            filename TEXT,
            originalname TEXT,
            uploader TEXT,
            date_uploaded TEXT
        )
    ''')

    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    ''')

    conn.commit()
    conn.close()

init_db()

# --- Routes ---

# Home page (notes list)
@app.route('/')
def notes_page():
    return render_template('website1.html')

# Upload page
@app.route('/upload_page')
def upload_page():
    return render_template('upload.html')

# Login page
@app.route('/login')
def login_page():
    return render_template('login.html')

# Register page
@app.route('/register')
def register_page():
    return render_template('register.html')

# Register API
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = generate_password_hash(data.get('password'))

    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        return jsonify({'success': True})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'error': 'Username already exists'})
    finally:
        conn.close()

# Login API
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    cursor.execute('SELECT password FROM users WHERE username = ?', (username,))
    row = cursor.fetchone()
    conn.close()

    if row and check_password_hash(row[0], password):
        session['username'] = username
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Invalid username or password'})

# Logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('notes_page'))

# Check login status
@app.route('/check_login')
def check_login():
    return jsonify({'logged_in': 'username' in session, 'username': session.get('username')})

# Upload notes
@app.route('/upload', methods=['POST'])
def upload_note():
    if 'username' not in session:
        return jsonify({'success': False, 'error': 'Not logged in'}), 403

    title = request.form.get('title')
    semester = request.form.get('semester')
    uploader = session['username']
    file = request.files.get('file')

    if not file:
        return jsonify({'success': False, 'error': 'No file uploaded'}), 400

    filename = f"{int(datetime.now().timestamp())}_{file.filename}"
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO notes (title, semester, filename, originalname, uploader, date_uploaded)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (title, semester, filename, file.filename, uploader, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    conn.commit()
    conn.close()

    return jsonify({'success': True})

# Get all notes
@app.route('/notes')
def get_notes():
    conn = sqlite3.connect('notes.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM notes ORDER BY date_uploaded DESC')
    rows = cursor.fetchall()
    conn.close()

    notes = []
    for row in rows:
        notes.append({
            'id': row[0],
            'title': row[1],
            'semester': row[2],
            'filename': row[3],
            'originalname': row[4],
            'uploader': row[5],
            'date_uploaded': row[6]
        })

    return jsonify(notes)

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(os.path.abspath(app.config['UPLOAD_FOLDER']), filename, as_attachment=True)

# --- Run App ---
if __name__ == '__main__':
    app.run(debug=True)
