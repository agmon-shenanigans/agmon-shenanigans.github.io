// Set the countdown date and time
const countdownDate = new Date("2024-12-31T23:59:59").getTime();
const button = document.getElementById("skip-btn");
const container = document.getElementById("countdown-container");
const buttonMoveThreshold = 100; // Distance at which the button moves

// Update the countdown every 1 second
const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById("countdown").innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Event Started!";
        showMainContent();
    }
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
    const containerRect = container.getBoundingClientRect();

    const randomX = Math.random() * (containerRect.width - button.offsetWidth);
    const randomY = Math.random() * (containerRect.height - button.offsetHeight);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}
