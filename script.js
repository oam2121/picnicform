// Show payment details based on the selected option
function showPaymentDetails() {
    const paymentOption = document.getElementById("paymentOption").value;
    const cashDetails = document.getElementById("cashDetails");
    const upiDetails = document.getElementById("upiDetails");
    const packageSelected = document.getElementById("package").value;
  
    // Determine the amount to pay based on the selected package
    let amount = 0;
    if (packageSelected.includes("Relax Package (Adult)")) {
      amount = 999;
    } else if (packageSelected.includes("Relax Package (Kid)")) {
      amount = 799;
    } else if (packageSelected.includes("Delight Package (Adult)")) {
      amount = 1799;
    } else if (packageSelected.includes("Delight Package (Kid)")) {
      amount = 1599;
    }
  
    // Update the UI based on the selected payment option
    if (paymentOption === "Cash") {
      cashDetails.style.display = "block";
      upiDetails.style.display = "none";
    } else if (paymentOption === "UPI") {
      cashDetails.style.display = "none";
      upiDetails.style.display = "block";
      document.getElementById("amountToPay").innerText = `Amount: ₹${amount}`;
    } else {
      cashDetails.style.display = "none";
      upiDetails.style.display = "none";
    }
  }
  
  // Handle form submission
  document.getElementById("multiStepForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Collect form data into an object
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
  
    // Replace this URL with your actual Google Apps Script URL
    const googleAppsScriptURL =
      "https://script.google.com/macros/s/AKfycbztpxJuESn9VxKyz9P7rYcKf3W9wmTiKd771_w8go7SQZMC9Sx4D99efTxCG5IjcKQNww/exec";
  
    try {
      // Send form data to Google Apps Script
      const response = await fetch(googleAppsScriptURL, {
        method: "POST",
        body: new URLSearchParams(formObject),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
  
      if (response.ok) {
        // Hide the form and navigate to the "Thank You" section
        const formSections = document.querySelectorAll(".form-section");
        formSections.forEach((section) => {
          section.style.display = "none"; // Hide all form sections
        });
        document.getElementById("thankYouSection").style.display = "block"; // Show the Thank You section
      } else {
        alert("There was an issue submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  });
  
  // Navigation logic for moving to the next section
  function nextSection(section) {
    const current = document.querySelector(".form-section.active"); // Get the current active section
    const next = document.getElementById(`section${section}`); // Get the next section
    current.classList.remove("active");
    current.style.display = "none"; // Hide current section
    next.classList.add("active");
    next.style.display = "block"; // Show next section
  }
  
  // Navigation logic for moving to the previous section
  function prevSection(section) {
    const current = document.querySelector(".form-section.active"); // Get the current active section
    const prev = document.getElementById(`section${section}`); // Get the previous section
    current.classList.remove("active");
    current.style.display = "none"; // Hide current section
    prev.classList.add("active");
    prev.style.display = "block"; // Show previous section
  }
  