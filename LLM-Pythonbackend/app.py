from flask import Flask, request, jsonify
from chat import initialize_chat_model
from flask_cors import CORS

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
        #start a chat session and get the response
        chat_session = model.start_chat(history=[])
        response = chat_session.send_message(user_input)
        
        #return response as JSON
        return jsonify({"response": response.text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        

if __name__== "__main__":
    app.run(debug=True, port=5280)
