# TripEase
# An AI-Powered Travel Planner

An intelligent travel planning web app that generates personalized itineraries using Google’s Gemini API. Built with React (frontend) and Flask (backend), this tool helps users create custom travel plans based on their interests, budget, and duration.

## Features

- Personalized trip planning with AI
- Input preferences like destination, budget, travel type, and interests
- Real-time itinerary generation using Gemini API
- Clean and responsive UI (React + TailwindCSS)
- Backend API built with Flask

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, ShadCN/UI
- **Backend**: Flask, Flask-CORS
- **AI Engine**: Google Gemini API (`google-generativeai`)
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

## Folder Structure

ai-travel-planner/ ├── frontend/             # React frontend (generated via v0.dev or custom) │   └── src/ │       ├── components/ │       ├── pages/ │       └── App.jsx ├── backend/ │   ├── app.py            # Flask backend │   ├── .env              # Contains GEMINI_API_KEY │   └── requirements.txt ├── README.md

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner

2. Backend Setup (Flask)

cd backend
python -m venv venv
source venv/bin/activate    # or venv\Scripts\activate on Windows
pip install -r requirements.txt

Create a .env file:

GEMINI_API_KEY=your_google_api_key_here

Run the server:

python app.py

3. Frontend Setup (React)

cd frontend
npm install
npm start

Sample Prompt to Gemini API

> "Create a 3-day travel itinerary for Rome, Italy focused on food and culture, suitable for a couple on a moderate budget."



Contributing

Pull requests are welcome. For major changes, please open an issue first.
