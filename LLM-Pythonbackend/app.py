from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime


from chat import initialize_chat_model
from database import get_db_connection, get_chat_history_from_db, save_to_chat_history, initialize_relationship, get_relationship_value, update_relationship_value, ensure_relationship_table_exists
from users import create_user, authenticate_user

import re

app = Flask(__name__)
model = initialize_chat_model()

CORS(app, origins=["http://localhost:5173"])

@app.route("/chat", methods=["POST"])
def chat():
    #parse user input from the resquest
    data = request.get_json()
    user_id = data.get("user_id")
    user_input = data.get("message")
    
    if not user_id or not user_input or not user_input.strip():
        return jsonify({"Error" : "Message is required"}), 400
    
    try:
        #
        initialize_relationship(user_id)
        #Fetch chat history
        history = get_chat_history_from_db()
        chat_session = model.start_chat(history=history)
        
        #Get evaluation
        evaluation_response = chat_session.send_message(
            f"Evaluate the input: {user_input}"
        )
        rank, reason = parse_evaluation(evaluation_response.text)
        
        update_relationship_value(user_id, rank)
        
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
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON body"}), 400
        
        identifier = data.get('username') or data.get('email')
        if not identifier or not data.get('password'):
            return jsonify({"error": "Missing required fields: username/email and password"}), 400
        
        if authenticate_user(identifier, data['password']):
            return jsonify({"message": "User authenticated"}), 200
        else:
            return jsonify({"error": "Invalid username/email or password"}), 401
    
    except Exception as e:
        return jsonify({"error": f"An error occured: {str(e)}"}), 500
    
    
@app.route("/get-relationship", methods=["POST"])
def relationship():
    data = request.get_json()
    user_id = data.get("user_id")
    character_name = data.get("character_name", "Todd Cunningham")
    
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    try: 
        relationship_value = get_relationship_value(user_id, character_name)
        if relationship_value is None:
            return jsonify ({"error": "No relationship found for this user"}), 404
        return jsonify({
            "character_name": character_name, "relationship_value": relationship_value}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
def parse_evaluation(evaluation_text):
    rank_match = re.search(r"Rank: (-?\d+)", evaluation_text)
    reason_match = re.search(r"Reason: (.+)", evaluation_text)
    
    if rank_match and reason_match:
        rank = int(rank_match.group(1))
        reason = reason_match.group(1)
        return rank, reason
    else:
        return None, "Evaluation format is incorrect"

if __name__== "__main__":
    ensure_relationship_table_exists()
    app.run(debug=True, port=5280)
