import mysql.connector
from dotenv import load_dotenv
import os



def get_db_connection():
    load_dotenv()
    return mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )
    
def get_chat_history_from_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT role, parts FROM chat_history ORDER BY `timestamp` ASC")
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

def save_to_chat_history(role, message_parts):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO chat_history (role, parts) VALUES (%s, %s)", (role, "|".join(message_parts))
    )
    conn.commit()
    cursor.close()
    conn.close()