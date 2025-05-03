# TravelAI - AI-Powered Travel Planner

This project is a travel planning web application that uses AI to generate personalized travel itineraries.

## Project Structure

- Frontend: Next.js with React, Tailwind CSS, and shadcn/ui components
- Backend: Flask API with Google Generative AI integration

## Setup Instructions

### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Create a virtual environment:
\`\`\`bash
python -m venv venv
\`\`\`

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

4. Create a `.env` file with your API keys:
\`\`\`
GOOGLE_API_KEY=your_google_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
\`\`\`

5. Run the Flask server:
\`\`\`bash
python server.py
\`\`\`

The backend will run on [http://localhost:5000](http://localhost:5000).

## Features

- User authentication
- Trip planning with AI-generated itineraries
- Save and manage trips
- Responsive design for mobile and desktop

## API Endpoints

- `POST /generate-itinerary`: Generate a travel itinerary based on user preferences
  - Request body: `{ destination, duration, budget, interests }`
  - Response: `{ itinerary }`

## Environment Variables

### Frontend
- `GITHUB_ID`: GitHub OAuth client ID
- `GITHUB_SECRET`: GitHub OAuth client secret
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `DATABASE_URL`: PostgreSQL database URL

### Backend
- `GOOGLE_API_KEY`: Google Generative AI API key
- `OPENWEATHER_API_KEY`: OpenWeather API key
