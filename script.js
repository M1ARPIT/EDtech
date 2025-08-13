const edtechForm = document.getElementById("edtech-form");
const formSelect = document.getElementById("sector");

// Scroll to form and pre-select sector on CTA button click
const ctaButtons = document.querySelectorAll(".cta-button");
ctaButtons.forEach(button => {
  button.addEventListener("click", () => {
    const formSection = document.getElementById("contact-form");
    const sectionId = button.getAttribute("data-section");

    // Scroll to form
    formSection.scrollIntoView({ behavior: "smooth" });

    // Pre-select sector in dropdown
    if (sectionId && formSelect) {
      formSelect.value = sectionId;
    }
  });
});

// ✅ Use edtechForm instead of form
if (edtechForm) {
  edtechForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitButton = edtechForm.querySelector(".form-submit-button");
    const mobileInput = edtechForm.querySelector("#mobile");

    // Basic mobile number validation
    if (mobileInput && !/^[0-9]{10}$/.test(mobileInput.value)) {
      mobileInput.focus();
      mobileInput.style.borderColor = "#dc3545";
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner"></span> Submitting...';

    // Simulate form submission delay
    setTimeout(() => {
      const formContainer = document.querySelector(".form-container");
      formContainer.innerHTML = `
        <h2>📬 Thank You!</h2>
        <p>Your message has been submitted. We'll get back to you soon!</p>
      `;
    }, 1500);
  });
}
