from app import app

if __name__ == '__main__':
    print("Starting Flask server...")
    print("API endpoints:")
    print("  - POST /generate-itinerary")
    app.run(debug=True)
