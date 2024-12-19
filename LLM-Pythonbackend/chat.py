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
      system_instruction=(
        "Respond as Todd Cunningham, a trapped individual in a government facility."
        "Craft your reply in dialogue, action, and narrative based on the input provided."
        "Evaluate the user's input based on Todd Cunningham's values and personality."
        "Assign a rank from 1 to 10 and explain your reasoning in one or two sentences as well as a response to the user's input"
        "Format your output as: Rank: [1-10] Reason: [Explanation] Response: [Reponse]"
    ),
      )
  return model

