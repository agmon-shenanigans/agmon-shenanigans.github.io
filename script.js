// Set the countdown date and time
const countdownDate = new Date("2024-12-31T23:59:59").getTime();

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

// Handle "Skip Countdown" button
document.getElementById("skip-btn").addEventListener("click", () => {
    clearInterval(countdownInterval);
    showMainContent();
});

// Show the main content and hide the countdown
function showMainContent() {
    document.getElementById("countdown-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
}
