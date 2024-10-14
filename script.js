// Set the countdown date and time
const countdownDate = new Date("2024-10-15T23:59:59").getTime();
const button = document.getElementById("skip-btn");
const container = document.getElementById("countdown-container");
const buttonMoveThreshold = 85; // Distance at which the button moves
const noobAid = true; // Set to false to disable noob aid
const startingNoobAidProbability = 169; // 1/p probability of noob aid
let noobAidProbability = startingNoobAidProbability;
let noobAidRandom = 0; // Random number for noob aid
let countingDown = false; // Prevents multiple countdowns
const startTime = new Date().getTime();

// Update the countdown every 1 second
const countdownInterval = setInterval(() => {
    let currTime = new Date().getTime();
    let timeAlive = Math.floor((currTime - startTime) / 1000);
    // console.log(timeAlive);

    if (timeAlive > 60) {
        noobAidProbability = Math.max(1, startingNoobAidProbability - Math.floor((timeAlive - 60) / 2));
    }
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    if (distance > 0) {
        document.getElementById("countdown").innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else { // If the countdown is finished... do nothing lol
        document.getElementById("countdown").innerHTML =
            `-${Math.abs(days)}d ${Math.abs(hours)}h ${Math.abs(minutes)}m ${Math.abs(seconds)}s`;
    }

    // Thats what WOULD have happened after the countdown if we were to be sane
    // if (distance < 0) {
    //     clearInterval(countdownInterval);
    //     document.getElementById("countdown").innerHTML = "Event Started!";
    //     showMainContent();
    // }
    // Sadly for agmon... we are not sane.

}, 1000);

// Handle "Skip Countdown" button click
button.addEventListener("click", () => {
    clearInterval(countdownInterval);
    showMainContent();
});

// Show the main content and hide the countdown
function showMainContent() {
    document.getElementById("countdown-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("invisible-text").style.display = "none";
}

// Make the button run away when the mouse gets close
container.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(mouseX - buttonX, 2) + Math.pow(mouseY - buttonY, 2)
    );

    if (distance < buttonMoveThreshold) {
        moveButton();
    }
});

// Move the button to a random position within the container
function moveButton() {
    let currTime = new Date().getTime();
    let timeAlive = Math.floor((currTime - startTime) / 1000);

    if (noobAid) {
        if (noobAidRandom === 1) {
            document.getElementById("skip-btn").innerHTML = "Catching my breath...";
            if (!countingDown) {
                countingDown = true;
                setTimeout(() => {
                    noobAidRandom = 0;
                    if (timeAlive > 120) {
                        document.getElementById("skip-btn").innerHTML = "I'ts at the top right side.";
                    } else {
                        document.getElementById("skip-btn").innerHTML = "Skip Countdown";
                    }
                    countingDown = false;
                }, 500);
            }
            return;
        }
        noobAidRandom = Math.round(Math.random() * noobAidProbability);
        // console.log(noobAidRandom);
    }
    const containerRect = container.getBoundingClientRect();

    const randomX = Math.random() * (containerRect.width - button.offsetWidth);
    const randomY = Math.random() * (containerRect.height - button.offsetHeight);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}


