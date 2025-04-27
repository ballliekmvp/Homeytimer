const timerDisplay = document.querySelector('.timer-display');
const progressBar = document.querySelector('.progress-bar');
const buttons = document.querySelectorAll('.buttons button');
const resetButton = document.getElementById('reset-button');

let totalTime = 0; // in seconds
let timeLeft = 0; // in seconds
let timerInterval = null;

// Function to update the display
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
}

// Function to update the progress bar
function updateProgressBar() {
    if (totalTime === 0) {
        progressBar.style.width = '100%';
    } else {
        const percentage = (timeLeft / totalTime) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

// Function to start the timer
function startTimer(durationInMinutes) {
    clearInterval(timerInterval); // Clear any existing timer

    totalTime = durationInMinutes * 60;
    timeLeft = totalTime;

    updateDisplay();
    updateProgressBar();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateProgressBar();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Timer finished - maybe add an alert or visual cue
            alert('Timer finished!');
            totalTime = 0; // Reset total time for progress bar
            updateProgressBar(); // Ensure progress bar is empty
            updateDisplay(); // Ensure display is 00:00
        }
    }, 1000); // Update every 1 second
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    totalTime = 0;
    timeLeft = 0;
    updateDisplay();
    updateProgressBar();
}

// Add event listeners to the time buttons
buttons.forEach(button => {
    if (button.dataset.minutes) {
        button.addEventListener('click', () => {
            const minutes = parseInt(button.dataset.minutes);
            startTimer(minutes);
        });
    }
});

// Add event listener to the reset button
resetButton.addEventListener('click', resetTimer);

// Initial display and progress bar state
resetTimer();