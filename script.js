const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
let rocketY; // Vertical position of the rocket
let rocketX; // Horizontal position of the rocket
let countdown = 10;
let timer;
let isLaunching = false;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rocket properties
const rocketWidth = 50;
const rocketHeight = 150; // Rocket height

// Rocket drawing function (simple rectangle)
function drawRocket() {
    ctx.fillStyle = '#ff6600'; // Rocket body color
    ctx.fillRect(rocketX, rocketY, rocketWidth, rocketHeight);
}

// Countdown timer function
function startCountdown() {
    if (isLaunching) return;

    isLaunching = true;
    timer = setInterval(() => {
        countdown--;
        timerDisplay.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(timer);
            startLaunch();
        }
    }, 1000);
}

// Launch the rocket
function startLaunch() {
    const launchInterval = setInterval(() => {
        rocketY -= 5; // Move the rocket upwards
        
        if (rocketY <= -rocketHeight) {
            clearInterval(launchInterval); // Stop when the rocket leaves the canvas
        }
        
        // Redraw everything
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawRocket();
    }, 20);
}

// Event listener to start the countdown
startBtn.addEventListener('click', () => {
    startCountdown();
    startBtn.disabled = true; // Disable button after start
});

// Initialize rocket position at the center
rocketX = canvas.width / 2 - rocketWidth / 2;
rocketY = canvas.height / 2 - rocketHeight / 2;

// Initial drawing
drawRocket();
