let currentCategory = '';
let currentFlashcardIndex = 0;
let correctAnswers = 0;
let categories = {};  

const API_BASE_URL = "/api";

async function fetchFlashcards(category) {
    try {
        const response = await fetch(`${API_BASE_URL}/flashcards/${category}`);
        if (!response.ok) {
            throw new Error("Could not fetch flashcards");
        }
        categories[category] = await response.json();
    } catch (error) {
        console.error("Error fetching flashcards:", error);
        categories[category] = [];  
    }
}

window.startCategory = startCategory;
async function startCategory(category) {
    console.log("Button clicked, category:", category); 
    currentCategory = category;
    currentFlashcardIndex = 0;
    correctAnswers = 0;

    document.getElementById('category-container').style.display = 'none';
    document.getElementById('flashcard-container').style.display = 'block';
    document.getElementById('quiz-results-container').style.display = 'none';

    await fetchFlashcards(category);
    loadFlashcard();
}

function loadFlashcard() {
    if (!categories[currentCategory] || categories[currentCategory].length === 0) {
        document.getElementById('flashcard-question').textContent = "No flashcards available.";
        document.getElementById('flip-button').style.display = "none";
        return;
    }

    const flashcard = categories[currentCategory][currentFlashcardIndex];
    document.getElementById('flashcard-question').textContent = flashcard.question;
    document.getElementById('answer-input').value = '';
    document.getElementById('flip-button').textContent = 'Show Answer';
    document.getElementById('flip-button').onclick = function() {
        flipCard(flashcard.answer);
    };
    document.getElementById('feedback').textContent = ''; // Clear previous feedback
}

function flipCard(answer) {
    const userAnswer = document.getElementById('answer-input').value.trim();
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Correct!';
        correctAnswers++;
    } else {
        document.getElementById('feedback').textContent = `Incorrect! The correct answer is: ${answer}`;
    }

    document.getElementById('flip-button').textContent = 'Next';
    document.getElementById('flip-button').onclick = function() {
        nextFlashcard();
    };
}

function nextFlashcard() {
    if (currentFlashcardIndex < categories[currentCategory].length - 1) {
        currentFlashcardIndex++;
        loadFlashcard();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById('flashcard-container').style.display = 'none';
    document.getElementById('quiz-results-container').style.display = 'block';
    
    const totalFlashcards = categories[currentCategory].length;
    document.getElementById('quiz-results').textContent = 
        `You answered ${correctAnswers} out of ${totalFlashcards} correctly!`;
}

function goBack() {
    document.getElementById('category-container').style.display = 'block';
    document.getElementById('flashcard-container').style.display = 'none';
    document.getElementById('quiz-results-container').style.display = 'none';
    correctAnswers = 0;  // Reset for the next quiz
}
