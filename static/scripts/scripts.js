let timer;
let countdown;
const textArea = document.getElementById("textArea");
const timerElement = document.getElementById("timer");

textArea.addEventListener("input", () => {
  clearTimeout(timer);
  clearInterval(countdown);
  timerElement.style.visibility = "hidden"; // Hide the timer initially
  timerElement.style.color = "black"; // Reset the color
  textArea.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"; // Reset the box shadow
  let timeLeft = 10; // Set the countdown time

  timer = setTimeout(() => {
    const textContent = textArea.value;
    console.log("User stopped typing");

    fetch("/user_stopped_typing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textContent }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, 10000);

  countdown = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      timerElement.style.visibility = "visible";
      timerElement.textContent = `Time remaining: ${timeLeft}`;
      if (timeLeft <= 3) {
        timerElement.style.color = "red";
        textArea.style.boxShadow = "0 0 10px red";
      } else if (timeLeft < 7) {
        timerElement.style.color = "orange";
        textArea.style.boxShadow = "0 0 10px orange";
      }
    } else {
      clearInterval(countdown);
      timerElement.textContent = "Time's up!";
      textArea.value = "";
    }
  }, 1000);
});
