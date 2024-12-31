import bcrypt
from database import get_db_connection

def create_user(username, password, email):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO users (username, password_hash, email) 
            VALUES (%s, %s, %s)
        """, (username, hashed_password, email))
        conn.commit()
    finally:
        cursor.close()
        conn.close()
        
def authenticate_user(identifier, password):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
        SELECT id, password_hash FROM users WHERE username = %s or email = %s
        """, (identifier, identifier))
        user = cursor.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')): return user['id']
        else:
            return None
    finally:
        cursor.close()
        conn.close()

def get_user_by_id(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT id, username, email, created_at
            FROM users WHERE id = %s
        """, (user_id,))
        user = cursor.fetchone()
        return user
    finally:
        cursor.close()
        conn.close()
    
def get_user_by_username(username):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT id, username, email, created_at
            FROM users WHERE username = %s
        """, (username,))
        user = cursor.fetchone()
        return user
    finally:
        cursor.close()
        conn.close()