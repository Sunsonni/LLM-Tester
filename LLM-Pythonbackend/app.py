from flask import Flask, request, jsonify
from chat import initialize_chat_model
from flask_cors import CORS
from database import get_db_connection, get_chat_history_from_db, save_to_chat_history
from users import create_user, authenticate_user
import re

app = Flask(__name__)
model = initialize_chat_model()

CORS(app, origins=["http://localhost:5173"])

@app.route("/chat", methods=["POST"])
def chat():
    #parse user input from the resquest
    data = request.get_json()
    user_input = data.get("message")
    
    if not user_input or not user_input.strip():
        return jsonify({"Error" : "Message is required"}), 400
    
    try:
        #Fetch chat history
        history = get_chat_history_from_db()
        chat_session = model.start_chat(history=history)
        
        #Get evaluation
        evaluation_response = chat_session.send_message(
            f"Evaluate the input: {user_input}"
        )
        rank, reason = parse_evaluation(evaluation_response.text)
        
        #save user input and model response
        save_to_chat_history("user", [user_input])
        save_to_chat_history("model", [evaluation_response.text])
        
        #return response as JSON
        return jsonify({"response": evaluation_response.text, "history": history}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
@app.route("/chat-history", methods=["GET"])       
def get_chat_history():
    try:
        history = get_chat_history_from_db()
        return jsonify({"history": history}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@app.route("/create-new-user", methods=["POST"])
def create_new_user():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    try: 
        create_user(username, password, email)
        return jsonify({"message": "User created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": f"An error occured {str(e)}"}), 500
    
@app.route("/check-user", methods=["POST"])
def check_user():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    username = data.get('username')
    password = data.get('password')
    
    if authenticate_user(username, password):
        return jsonify({"message": "User authenticated"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    
def parse_evaluation(evaluation_text):
    rank_match = re.search(r"Rank: (\d+)", evaluation_text)
    reason_match = re.search(r"Reason: (.+)", evaluation_text)
    
    if rank_match and reason_match:
        rank = int(rank_match.group(1))
        reason = reason_match.group(1)
        return rank, reason
    else:
        return None, "Evaluation format is incorrect"
        

if __name__== "__main__":
    app.run(debug=True, port=5280)
