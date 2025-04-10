import mysql.connector
from dotenv import load_dotenv
import os



def get_db_connection():
    load_dotenv()
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )
        return conn
    except mysql.connector.Error as e:
        raise RuntimeError(f"Failed to connect to database: {str(e)}")
    
def ensure_table_exists():
    #Create chat_history table if it does not exist
    conn =  get_db_connection()
    cursor = conn.cursor()
    try: 
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS chat_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                role VARCHAR(50) NOT NULL,
                user_id INT NOT NULL,
                parts TEXT NOT NULL,
                `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)
        conn.commit()
    finally: 
        cursor.close()
        conn.close()   
    
def get_chat_history_from_db(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
                       SELECT role, parts FROM chat_history WHERE user_id = %s ORDER BY `timestamp` ASC
                    """, (user_id,))
        history = cursor.fetchall()
    
        formatted_history = [
            {"role": row["role"], "parts": row["parts"].split("|")} for row in history
        ]
        return formatted_history
    except Exception as e:
        raise RuntimeError(f"Database error: {str(e)}")
    
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

def save_to_chat_history(user_id, role, message_parts):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO chat_history (user_id, role, parts) VALUES (%s, %s, %s)", (user_id, role, "|".join(message_parts))
    )
    conn.commit()
    cursor.close()
    conn.close()
    
def ensure_relationship_table_exists():
    conn = get_db_connection()
    cursor = conn.cursor()
    try: 
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS relationship_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                character_name VARCHAR(50) NOT NULL DEFAULT 'Todd Cunningham',
                relationship_value INT NOT NULL DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE (user_id, character_name)
            )
        """)
        conn.commit()
    finally: 
        cursor.close()
        conn.close()
        
def initialize_relationship(user_id, character_name="Todd Cunningham"):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT IGNORE INTO relationship_items (user_id, character_name)
        VALUES (%s, %s)
        """, (user_id, character_name))
        conn.commit()
    finally:
        cursor.close()
        conn.close()
    
def update_relationship_value(user_id, value_change, character_name="Todd Cunningham"):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE relationship_items
            SET relationship_value = relationship_value + %s
            WHERE user_id = %s AND character_name = %s
        """, (value_change, user_id, character_name))
        conn.commit()
    finally:
        cursor.close()
        conn.close()
            
def get_relationship_value(user_id, character_name="Todd Cunningham"):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
        SELECT relationship_value
        FROM relationship_items
        WHERE user_id = %s AND character_name = %s
        """, (user_id, character_name))
        result = cursor.fetchone()
        return result["relationship_value"] if result else None
    finally:
        cursor.close()
        conn.close()
            