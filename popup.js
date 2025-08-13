// Select all Know More buttons
const knowMoreButtons = document.querySelectorAll('.know-more-btn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');
const form = document.getElementById('popup-form');
const popupContent = document.querySelector('.popup-content');

// Open popup
knowMoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    popup.style.display = 'flex';
  });
});

// Close popup
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  popupContent.innerHTML = `
    <span id="close-btn" class="text-2xl absolute top-2 right-4 text-gray-600 hover:text-red-500 cursor-pointer">&times;</span>
    <div class="flex flex-col items-center justify-center p-6 pt-10">
      <h2 class="text-2xl font-semibold text-green-600 mb-4 text-center">
        Thank you! Keep exploring 🚀
      </h2>
      <button onclick="document.getElementById('popup').style.display='none'" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Close
      </button>
    </div>
  `;

  // Reattach close button listener since content is replaced
  document.getElementById('close-btn').addEventListener('click', () => {
    popup.style.display = 'none';
  });
});

