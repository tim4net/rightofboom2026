"""
Intentionally Vulnerable Flask App for Right of Boom 2026 Demo
================================================================
WARNING: This app contains deliberate security vulnerabilities for educational purposes.
NEVER deploy this in production or on internet-accessible systems.

Vulnerabilities included:
- SQL Injection (login, search)
- Command Injection (ping utility)
- Path Traversal (file viewer)
- XSS (user comments)
- Hardcoded credentials
- Verbose error messages
"""

import os
import sqlite3
import subprocess
import logging
from datetime import datetime
from flask import Flask, request, render_template_string, jsonify, g

app = Flask(__name__)
app.secret_key = 'super_secret_key_123'  # Intentional: hardcoded secret

# Configure detailed logging for SIEM demo
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s - %(message)s',
    handlers=[
        logging.FileHandler('/var/log/app/access.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger('vulnerable-app')

DATABASE = '/data/users.db'

# HTML Templates (inline for simplicity)
BASE_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>AcmeCorp Internal Portal</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        input, button { padding: 10px; margin: 5px; }
        button { background: #007bff; color: white; border: none; cursor: pointer; border-radius: 4px; }
        button:hover { background: #0056b3; }
        .error { color: red; background: #ffe0e0; padding: 10px; border-radius: 4px; }
        .success { color: green; background: #e0ffe0; padding: 10px; border-radius: 4px; }
        pre { background: #f0f0f0; padding: 10px; overflow-x: auto; }
        .nav { margin-bottom: 20px; }
        .nav a { margin-right: 15px; color: #007bff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/search">Search</a>
            <a href="/ping">Network Tools</a>
            <a href="/files">File Viewer</a>
            <a href="/comments">Comments</a>
        </div>
        {{ content }}
    </div>
</body>
</html>
"""

def get_db():
    """Get database connection."""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    """Initialize database with sample data."""
    os.makedirs(os.path.dirname(DATABASE), exist_ok=True)
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY, username TEXT, password TEXT,
                  email TEXT, role TEXT, api_key TEXT)''')

    c.execute('''CREATE TABLE IF NOT EXISTS comments
                 (id INTEGER PRIMARY KEY, username TEXT, comment TEXT, created_at TEXT)''')

    c.execute('''CREATE TABLE IF NOT EXISTS secrets
                 (id INTEGER PRIMARY KEY, name TEXT, value TEXT)''')

    # Sample users with weak/hardcoded passwords
    users = [
        ('admin', 'admin123', 'admin@acmecorp.local', 'admin', 'sk-admin-secret-key-12345'),
        ('jsmith', 'password', 'jsmith@acmecorp.local', 'user', 'sk-user-key-67890'),
        ('developer', 'dev123', 'dev@acmecorp.local', 'developer', 'sk-dev-key-abcde'),
    ]

    for user in users:
        c.execute('INSERT OR IGNORE INTO users VALUES (NULL, ?, ?, ?, ?, ?)', user)

    # Some "secrets" to find
    secrets = [
        ('aws_access_key', 'AKIAIOSFODNN7EXAMPLE'),
        ('database_password', 'SuperSecretDBPass!'),
        ('jwt_secret', 'my-jwt-signing-secret-never-share'),
    ]

    for secret in secrets:
        c.execute('INSERT OR IGNORE INTO secrets VALUES (NULL, ?, ?)', secret)

    conn.commit()
    conn.close()
    logger.info("Database initialized with sample data")

@app.route('/')
def home():
    logger.info(f"Home page accessed from {request.remote_addr}")
    content = """
    <h1>Welcome to AcmeCorp Internal Portal</h1>
    <p>This is the internal employee portal. Please log in to access resources.</p>
    <p><strong>System Status:</strong> All systems operational</p>
    """
    return render_template_string(BASE_TEMPLATE, content=content)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """VULNERABLE: SQL Injection in login."""
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')

        logger.info(f"Login attempt for user: {username} from {request.remote_addr}")

        # VULNERABLE: Direct string concatenation in SQL
        db = get_db()
        query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
        logger.debug(f"Executing query: {query}")  # Intentionally verbose

        try:
            result = db.execute(query).fetchone()
            if result:
                logger.warning(f"Successful login: {username}")
                content = f"""
                <h1>Login Successful</h1>
                <div class="success">Welcome back, {result['username']}!</div>
                <p>Role: {result['role']}</p>
                <p>Email: {result['email']}</p>
                <p>API Key: {result['api_key']}</p>
                """
            else:
                logger.warning(f"Failed login attempt for: {username}")
                content = """
                <h1>Login Failed</h1>
                <div class="error">Invalid username or password</div>
                <a href="/login">Try again</a>
                """
        except Exception as e:
            # VULNERABLE: Verbose error message
            logger.error(f"Database error: {str(e)}")
            content = f"""
            <h1>Error</h1>
            <div class="error">Database error: {str(e)}</div>
            <pre>Query: {query}</pre>
            """

        return render_template_string(BASE_TEMPLATE, content=content)

    content = """
    <h1>Login</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>
    """
    return render_template_string(BASE_TEMPLATE, content=content)

@app.route('/search')
def search():
    """VULNERABLE: SQL Injection in search."""
    query = request.args.get('q', '')

    logger.info(f"Search query: {query} from {request.remote_addr}")

    if not query:
        content = """
        <h1>User Search</h1>
        <form method="GET">
            <input type="text" name="q" placeholder="Search users..." required>
            <button type="submit">Search</button>
        </form>
        """
        return render_template_string(BASE_TEMPLATE, content=content)

    # VULNERABLE: Direct string concatenation
    db = get_db()
    sql = f"SELECT username, email, role FROM users WHERE username LIKE '%{query}%'"
    logger.debug(f"Search SQL: {sql}")

    try:
        results = db.execute(sql).fetchall()
        result_html = "<table border='1' style='width:100%'><tr><th>Username</th><th>Email</th><th>Role</th></tr>"
        for row in results:
            result_html += f"<tr><td>{row['username']}</td><td>{row['email']}</td><td>{row['role']}</td></tr>"
        result_html += "</table>"

        content = f"""
        <h1>Search Results for "{query}"</h1>
        {result_html if results else '<p>No results found</p>'}
        <br><a href="/search">New search</a>
        """
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        content = f"""
        <h1>Search Error</h1>
        <div class="error">Error: {str(e)}</div>
        <pre>Query was: {sql}</pre>
        """

    return render_template_string(BASE_TEMPLATE, content=content)

@app.route('/ping', methods=['GET', 'POST'])
def ping():
    """VULNERABLE: Command Injection."""
    if request.method == 'POST':
        host = request.form.get('host', '')

        logger.info(f"Ping request for: {host} from {request.remote_addr}")

        # VULNERABLE: Direct command execution with user input
        try:
            cmd = f"ping -c 2 {host}"
            logger.debug(f"Executing command: {cmd}")
            result = subprocess.check_output(cmd, shell=True, stderr=subprocess.STDOUT, timeout=10)
            output = result.decode()
            logger.info(f"Ping successful: {host}")
        except subprocess.CalledProcessError as e:
            output = e.output.decode()
            logger.warning(f"Ping failed: {host} - {output}")
        except subprocess.TimeoutExpired:
            output = "Command timed out"
            logger.warning(f"Ping timeout: {host}")
        except Exception as e:
            output = f"Error: {str(e)}"
            logger.error(f"Ping error: {str(e)}")

        content = f"""
        <h1>Network Tools - Ping</h1>
        <form method="POST">
            <input type="text" name="host" placeholder="Host to ping" value="{host}">
            <button type="submit">Ping</button>
        </form>
        <h3>Result:</h3>
        <pre>{output}</pre>
        """
        return render_template_string(BASE_TEMPLATE, content=content)

    content = """
    <h1>Network Tools - Ping</h1>
    <form method="POST">
        <input type="text" name="host" placeholder="Host to ping (e.g., 8.8.8.8)">
        <button type="submit">Ping</button>
    </form>
    """
    return render_template_string(BASE_TEMPLATE, content=content)

@app.route('/files')
def files():
    """VULNERABLE: Path Traversal."""
    filename = request.args.get('name', '')

    logger.info(f"File request: {filename} from {request.remote_addr}")

    if not filename:
        content = """
        <h1>Internal File Viewer</h1>
        <form method="GET">
            <input type="text" name="name" placeholder="Filename (e.g., readme.txt)">
            <button type="submit">View File</button>
        </form>
        <p>Available files: readme.txt, config.txt, notes.txt</p>
        """
        return render_template_string(BASE_TEMPLATE, content=content)

    # VULNERABLE: No path sanitization
    try:
        filepath = f"/data/files/{filename}"
        logger.debug(f"Reading file: {filepath}")
        with open(filepath, 'r') as f:
            file_content = f.read()

        logger.info(f"File read successfully: {filename}")
        content = f"""
        <h1>File: {filename}</h1>
        <pre>{file_content}</pre>
        <a href="/files">Back</a>
        """
    except FileNotFoundError:
        logger.warning(f"File not found: {filename}")
        content = f"""
        <h1>File Not Found</h1>
        <div class="error">File '{filename}' not found</div>
        <a href="/files">Back</a>
        """
    except Exception as e:
        logger.error(f"File read error: {str(e)}")
        content = f"""
        <h1>Error Reading File</h1>
        <div class="error">Error: {str(e)}</div>
        <p>Attempted path: /data/files/{filename}</p>
        """

    return render_template_string(BASE_TEMPLATE, content=content)

@app.route('/comments', methods=['GET', 'POST'])
def comments():
    """VULNERABLE: Stored XSS."""
    db = get_db()

    if request.method == 'POST':
        username = request.form.get('username', 'anonymous')
        comment = request.form.get('comment', '')

        logger.info(f"New comment from {username}: {comment[:50]}...")

        # VULNERABLE: No input sanitization - stored XSS
        db.execute(
            "INSERT INTO comments (username, comment, created_at) VALUES (?, ?, ?)",
            (username, comment, datetime.now().isoformat())
        )
        db.commit()

    comments_list = db.execute("SELECT * FROM comments ORDER BY id DESC LIMIT 20").fetchall()

    comments_html = ""
    for c in comments_list:
        # VULNERABLE: No output encoding - reflected XSS
        comments_html += f"""
        <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; border-radius: 4px;">
            <strong>{c['username']}</strong> <small>({c['created_at']})</small>
            <p>{c['comment']}</p>
        </div>
        """

    content = f"""
    <h1>Employee Comments</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Your name">
        <textarea name="comment" placeholder="Your comment" rows="3" style="width: 100%"></textarea><br>
        <button type="submit">Post Comment</button>
    </form>
    <h2>Recent Comments</h2>
    {comments_html if comments_html else '<p>No comments yet</p>'}
    """
    return render_template_string(BASE_TEMPLATE, content=content)

@app.route('/api/users')
def api_users():
    """API endpoint - returns user data."""
    logger.info(f"API /users accessed from {request.remote_addr}")
    db = get_db()
    users = db.execute("SELECT id, username, email, role FROM users").fetchall()
    return jsonify([dict(u) for u in users])

@app.route('/api/health')
def health():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "database": "connected"
    })

@app.route('/robots.txt')
def robots():
    """Intentionally reveals hidden paths."""
    return """User-agent: *
Disallow: /admin
Disallow: /backup
Disallow: /api/internal
Disallow: /debug
"""

@app.route('/debug')
def debug():
    """VULNERABLE: Debug endpoint exposing system info."""
    logger.warning(f"Debug endpoint accessed from {request.remote_addr}")

    import platform
    env_vars = {k: v for k, v in os.environ.items() if 'secret' not in k.lower()}

    content = f"""
    <h1>Debug Information</h1>
    <h2>System</h2>
    <pre>
Platform: {platform.platform()}
Python: {platform.python_version()}
User: {os.getenv('USER', 'unknown')}
Working Dir: {os.getcwd()}
    </pre>
    <h2>Environment Variables</h2>
    <pre>{env_vars}</pre>
    """
    return render_template_string(BASE_TEMPLATE, content=content)

if __name__ == '__main__':
    # Ensure log directory exists
    os.makedirs('/var/log/app', exist_ok=True)
    os.makedirs('/data/files', exist_ok=True)

    # Create sample files
    with open('/data/files/readme.txt', 'w') as f:
        f.write("Welcome to AcmeCorp Internal Portal\nVersion 1.0.0\n")
    with open('/data/files/config.txt', 'w') as f:
        f.write("# Configuration\nDEBUG=true\nDB_HOST=localhost\n")
    with open('/data/files/notes.txt', 'w') as f:
        f.write("TODO:\n- Fix SQL injection in login\n- Add rate limiting\n- Enable HTTPS\n")

    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)  # VULNERABLE: Debug mode in production
