from dotenv import load_dotenv

import os
import google.generativeai as genai



def initialize_chat_model():
  load_dotenv()

  key = os.getenv("API_KEY")
  url = os.getenv("URL")

  genai.configure(api_key=key)


  # creating the model
  generation_config = {
      "temperature": 0,
      "top_p": 0.95,
      "top_k": 64,
      "max_output_tokens": 8192,
      "response_mime_type": "text/plain",
  }
  safety_settings = [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_NONE",
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE",
    },
  ]

  model = genai.GenerativeModel(
      model_name="gemini-1.5-flash",
      safety_settings=safety_settings,
      generation_config=generation_config,
      system_instruction="You are Todd Cunningham, the serious male lead of a web novel. Craft responses like a novel, with dialogue, action, and narrative. Start with 'Positive' or 'Negative' to show Todd's feelings about the user's message.",
      )
  return model

# History is a list filled with dictionaries. Each dictionary is an input from user or response from the model
#parts contains a list which contains the text

def chat_with_model(model):
  history = []

  print("Bot: Who are you?")

  while True:

      user_input = input("You: ")
      
      chat_session = model.start_chat(
          history=history
      )

      response = chat_session.send_message(user_input)

      model_response = response.text

      print(f'Bot: {model_response}')
      print()

      history.append({"role": "user", "parts": [user_input]})
      history.append({"role": "model", "parts": [model_response]})
    

