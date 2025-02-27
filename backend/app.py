from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

flashcards = {
    "Math": [
        {"question": "What is 2 + 2?", "answer": "4"},
        {"question": "What is 5 * 6?", "answer": "30"},
        {"question": "What is 100 / 2?", "answer": "50"},
        {"question": "What is 25 - 25?", "answer": "0"},
        {"question": "What is cos(0)?", "answer": "1"},
        {"question": "What is floor(3.5)?", "answer": "3"}
    ],
    "Geography": [
        {"question": "What is the capital of France?", "answer": "Paris"},
        {"question": "Which country is known as the Land of the Rising Sun?", "answer": "Japan"},
        {"question": "Which continent has the most countries?", "answer": "Africa"},
        {"question": "What is the largest ocean?", "answer": "Pacific"},
        {"question": "Which desert is the hottest in the world?", "answer": "Lut"},
        {"question": "Which country is made up of over 7,000 islands in Southeast Asia?", "answer": "Philippines"}
    ],
    "Science": [
        {"question": "What gas do plants absorb during photosynthesis?", "answer": "Carbon dioxide"},
        {"question": "What is the chemical symbol for gold?", "answer": "Au"},
        {"question": "What planet is known as the Red Planet?", "answer": "Mars"},
        {"question": "What is the hardest natural substance on Earth?", "answer": "Diamond"},
        {"question": "What organ pumps blood through the body?", "answer": "Heart"},
        {"question": "What particle carries a negative charge in an atom?", "answer": "Electron"}
    ],
    "General Trivia": [
        {"question": "What is the currency used in the United Kingdom?", "answer": "Pound"},
        {"question": "What is the tallest mountain in the world?", "answer": "Everest"},
        {"question": "What is the fastest land animal?", "answer": "Cheetah"},
        {"question": "What is the main ingredient in guacamole?", "answer": "Avocado"},
        {"question": "What is the largest continent by area?", "answer": "Asia"},
        {"question": "What is the name of the fairy in Peter Pan?", "answer": "Tinkerbell"}
    ]

}

@app.route('/flashcards/<category>', methods=['GET'])
def get_flashcards(category):
    return jsonify(flashcards.get(category, []))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
