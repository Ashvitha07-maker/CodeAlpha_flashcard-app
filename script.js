// Sample flashcards data
let flashcards = [
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        answer: "4"
    },
    {
        question: "What is the color of the sky on a clear day?",
        answer: "Blue"
    }
];

let currentIndex = 0;      // Which card we're viewing (0 = first card)
let showingAnswer = false;  // Are we showing the question or answer?

// DOM elements
const cardTextElement = document.getElementById("cardText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const cardCounter = document.getElementById("cardCounter");

// Function to update the display (shows current card)
function updateDisplay() {
    const currentCard = flashcards[currentIndex];
    
    if (showingAnswer) {
        // Show the answer
        cardTextElement.textContent = currentCard.answer;
    } else {
        // Show the question
        cardTextElement.textContent = currentCard.question;
    }
    
    // Update the card counter
    cardCounter.textContent = `Card ${currentIndex + 1} / ${flashcards.length}`;
}

// Function to go to next card
function nextCard() {
    if (flashcards.length === 0) return;  // No cards to show
    
    // Move to next card, wrap around to beginning if at end
    currentIndex = (currentIndex + 1) % flashcards.length;
    showingAnswer = false;  // Always show question first on new card
    updateDisplay();
}

// Function to go to previous card
function prevCard() {
    if (flashcards.length === 0) return;
    
    // Move to previous card, wrap around to end if at beginning
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    showingAnswer = false;
    updateDisplay();
}

// Function to show/hide answer
function toggleAnswer() {
    if (flashcards.length === 0) {
        cardTextElement.textContent = "No flashcards. Add some!";
        return;
    }
    
    showingAnswer = !showingAnswer;  // Flip between true/false
    updateDisplay();
}

// Function to add a new flashcard
function addFlashcard() {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    
    // Check if inputs are empty
    if (question === "" || answer === "") {
        alert("Please enter both a question and an answer!");
        return;
    }
    
    // Add new card to array
    flashcards.push({
        question: question,
        answer: answer
    });
    
    // Clear input fields
    questionInput.value = "";
    answerInput.value = "";
    
    // If this is the first card, set current index to 0
    if (flashcards.length === 1) {
        currentIndex = 0;
        showingAnswer = false;
    }
    
    updateDisplay();
    alert("Card added successfully!");
}

// Function to edit current flashcard
function editFlashcard() {
    if (flashcards.length === 0) {
        alert("No cards to edit! Add some first.");
        return;
    }
    
    const newQuestion = questionInput.value.trim();
    const newAnswer = answerInput.value.trim();
    
    if (newQuestion === "" || newAnswer === "") {
        alert("Please enter both a new question and answer in the fields above!");
        return;
    }
    
    // Update current card
    flashcards[currentIndex] = {
        question: newQuestion,
        answer: newAnswer
    };
    
    // Clear inputs
    questionInput.value = "";
    answerInput.value = "";
    
    showingAnswer = false;
    updateDisplay();
    alert("Card edited successfully!");
}

// Function to delete current flashcard
function deleteFlashcard() {
    if (flashcards.length === 0) {
        alert("No cards to delete!");
        return;
    }
    
    // Confirm deletion
    const confirmDelete = confirm("Are you sure you want to delete this card?");
    
    if (!confirmDelete) return;
    
    // Remove current card from array
    flashcards.splice(currentIndex, 1);
    
    // Handle cases when array becomes empty
    if (flashcards.length === 0) {
        cardTextElement.textContent = "No flashcards. Add some!";
        cardCounter.textContent = "Card 0 / 0";
        showingAnswer = false;
        return;
    }
    
    // Adjust current index if we deleted the last card
    if (currentIndex >= flashcards.length) {
        currentIndex = flashcards.length - 1;
    }
    
    showingAnswer = false;
    updateDisplay();
    alert("Card deleted!");
}

// Function to handle clicking on flashcard (alternative way to show answer)
function onFlashcardClick() {
    if (flashcards.length > 0) {
        toggleAnswer();
    }
}

// Add event listeners to buttons
prevBtn.addEventListener("click", prevCard);
nextBtn.addEventListener("click", nextCard);
showAnswerBtn.addEventListener("click", toggleAnswer);
addBtn.addEventListener("click", addFlashcard);
editBtn.addEventListener("click", editFlashcard);
deleteBtn.addEventListener("click", deleteFlashcard);

// Add click listener to flashcard
document.getElementById("flashcard").addEventListener("click", onFlashcardClick);

// Initialize the app
updateDisplay();