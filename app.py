from flask import Flask, request, jsonify
import openai
import os
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allows frontend to access backend from different origin

openai.api_key = os.getenv("OPENAI_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(city):
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
        res = requests.get(url)
        if res.status_code == 200:
            data = res.json()
            return f"{data['weather'][0]['description'].capitalize()}, {data['main']['temp']}°C"
        return "Weather data not available"
    except Exception as e:
        return str(e)

@app.route('/generate-itinerary', methods=['POST'])
def generate_itinerary():
    data = request.json
    destination = data.get('destination')
    duration = data.get('duration')
    budget = data.get('budget')
    interests = data.get('interests')

    weather = get_weather(destination)

    prompt = (
        f"Current weather in {destination} is {weather}. "
        f"Plan a {duration}-day travel itinerary to {destination} for a person with a budget of {budget} dollars. "
        f"Their interests include {interests}. Suggest accommodations, top attractions, local transport, and must-try foods."
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
            temperature=0.7
        )
        itinerary = response['choices'][0]['message']['content']
        return jsonify({'itinerary': itinerary})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
