// Countdown timer functionality
function startTimer(duration, display, callback) {
  let timer = duration,
    minutes,
    seconds;
  const interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = "EXPIRED";
      if (typeof callback === "function") {
        callback();
      }
    }
  }, 1000);

  return interval;
}

window.onload = function () {
  // Set timer to 3 minutes 23 seconds (203 seconds)
  const initialTime = 203;
  const display = document.querySelector("#countdown");
  let timerInterval = startTimer(initialTime, display, function () {
    document.getElementById("redeem-btn").disabled = true;
    document.getElementById("redeem-btn").classList.add("opacity-50");
  });

  // Get elements
  const redeemBtn = document.getElementById("redeem-btn");
  const beatsAnimation = document.getElementById("beats-animation");
  const invoice = document.getElementById("invoice");
  const invoiceCountdown = document.getElementById("invoice-countdown");

  // Add click animation to redeem button
  redeemBtn.addEventListener("click", function () {
    // Show beats animation
    beatsAnimation.classList.add("active");

    // After 3 seconds, hide animation and show invoice
    setTimeout(function () {
      beatsAnimation.classList.remove("active");
      document.getElementById("redeem-section").style.display = "none";
      invoice.style.display = "block";

      // Start invoice timer (3 minutes 15 seconds = 195 seconds)
      startTimer(195, invoiceCountdown, function () {
        // Optional: do something when invoice timer expires
      });

      // Scroll to invoice
      invoice.scrollIntoView({ behavior: "smooth" });
    }, 3000);
  });
};
