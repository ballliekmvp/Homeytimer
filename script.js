const timerContainer = document.querySelector('.timer-container'); // Get container for fullscreen
const timerDisplay = document.querySelector('.timer-display');
const progressBar = document.querySelector('.progress-bar');
const presetButtons = document.querySelectorAll('.buttons button[data-minutes]'); // Select only preset buttons
const resetButton = document.getElementById('reset-button');
const customTimeInput = document.getElementById('custom-time-input');
const setCustomButton = document.getElementById('set-custom-button');
const fullscreenButton = document.getElementById('fullscreen-button');

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
        // When timer is reset or not started, show bar as full or empty depending on desired initial state
        // Let's keep it full on reset, like the screenshot initial state implies
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = '#8bc34a'; // Green color
    } else if (timeLeft === 0) {
         progressBar.style.width = '0%'; // Empty when time is up
    }
    else {
        const percentage = (timeLeft / totalTime) * 100;
        progressBar.style.width = `${percentage}%`;

        // Optional: Change color as it gets low
        if (percentage < 20) {
             progressBar.style.backgroundColor = '#ff9800'; // Orange
        } else {
             progressBar.style.backgroundColor = '#8bc34a'; // Green
        }
    }
}

// Function to start the timer
function startTimer(durationInSeconds) {
    clearInterval(timerInterval); // Clear any existing timer

    totalTime = durationInSeconds;
    timeLeft = totalTime;

    updateDisplay();
    updateProgressBar();

    if (timeLeft <= 0) {
         // If duration is 0 or negative, just reset
         resetTimer();
         return;
    }

    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateProgressBar();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Timer finished
            console.log('Timer finished!'); // Use console log instead of alert
            // Maybe add a visual cue to the UI instead of alert
             progressBar.style.width = '0%'; // Ensure bar is empty
             progressBar.style.backgroundColor = '#f44336'; // Red color on finish
        }
    }, 1000); // Update every 1 second
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    totalTime = 0;
    timeLeft = 0;
    updateDisplay();
    updateProgressBar(); // This will set bar to 100%
    customTimeInput.value = ''; // Clear custom input field
}

// --- Event Listeners ---

// Add event listeners to the preset time buttons
presetButtons.forEach(button => {
    button.addEventListener('click', () => {
        const minutes = parseInt(button.dataset.minutes);
        startTimer(minutes * 60); // Start timer with seconds
    });
});

// Add event listener to the reset button
resetButton.addEventListener('click', resetTimer);

// Add event listener for the set custom time button
setCustomButton.addEventListener('click', () => {
    const minutes = parseInt(customTimeInput.value);

    // Validate input
    if (!isNaN(minutes) && minutes > 0) {
        startTimer(minutes * 60); // Start timer with seconds
    } else {
        alert('Please enter a valid number of minutes (greater than 0).');
        customTimeInput.value = ''; // Clear invalid input
    }
});


// Add event listener for the fullscreen button
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        // If not in fullscreen, request fullscreen for the container
        if (timerContainer.requestFullscreen) {
            timerContainer.requestFullscreen();
        } else if (timerContainer.mozRequestFullScreen) { /* Firefox */
            timerContainer.mozRequestFullScreen();
        } else if (timerContainer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            timerContainer.webkitRequestFullscreen();
        } else if (timerContainer.msRequestFullscreen) { /* IE/Edge */
            timerContainer.msRequestFullscreen();
        }
    } else {
        // If in fullscreen, exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
});


// Initial display and progress bar state
resetTimer(); // Set initial state to 00:00 and full bar
