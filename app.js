import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCibbS1ZCx5oFmijeYapvaZ-6b_2SeAYfk",
  authDomain: "edtech-website-2f884.firebaseapp.com",
  projectId: "edtech-website-2f884",
  storageBucket: "edtech-website-2f884.appspot.com",
  messagingSenderId: "780823921064",
  appId: "1:780823921064:web:9c42bf03b70164a4de9d9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => { // Use DOMContentLoaded instead of window.onload
  const loginBtn = document.getElementById("loginBtn");
  const loginBtnMobile = document.getElementById("loginBtnMobile");
  const authModal = document.getElementById("authModal");
  const toggleForm = document.getElementById("toggleForm");
  const submitBtn = document.getElementById("submitBtn");
  const formTitle = document.getElementById("formTitle");
  const closeModal = document.getElementById("closeModal");

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const passwordError = document.getElementById("passwordError");
  const userDropdown = document.getElementById("userDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  let isLogin = true;

  // Switch to Login or Register form
  function switchToLogin() {
    fullName.classList.add("hidden");
    confirmPassword.classList.add("hidden");
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    toggleForm.textContent = "New user? Register here";
  }

  function switchToRegister() {
    fullName.classList.remove("hidden");
    confirmPassword.classList.remove("hidden");
    formTitle.textContent = "Register";
    submitBtn.textContent = "Register";
    toggleForm.textContent = "Already have an account? Login";
  }

  // Show error message
  function showError(msg) {
    passwordError.textContent = msg;
    passwordError.classList.remove("hidden");
    password.classList.add("border-red-500");
    setTimeout(() => {
      passwordError.classList.add("hidden");
      password.classList.remove("border-red-500");
    }, 3000);
  }

  // Open modal
  function openModal() {
    if (authModal) {
      authModal.classList.remove("hidden");
      isLogin ? switchToLogin() : switchToRegister();
    }
  }

  // Handle login button clicks
  loginBtn?.addEventListener("click", (e) => {
    if (loginBtn.textContent !== "Login") {
      userDropdown?.classList.toggle("hidden");
    } else {
      openModal();
    }
  });

  loginBtnMobile?.addEventListener("click", openModal);

  // Toggle between Login and Register
  toggleForm?.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    isLogin ? switchToLogin() : switchToRegister();
  });

  // Close modal
  closeModal?.addEventListener("click", () => {
    if (authModal) {
      authModal.classList.add("hidden");
      console.log("Close button clicked"); // Debug log
    }
  });

  // Handle form submission
  submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = fullName.value.trim();
    const userEmail = email.value.trim();
    const userPass = password.value.trim();
    const userConfirm = confirmPassword.value.trim();

    passwordError.classList.add("hidden");
    password.classList.remove("border-red-500");

    if (!isLogin) {
      if (userPass.length < 6) {
        showError("Password must be at least 6 characters");
        return;
      }
      if (userPass !== userConfirm) {
        showError("Passwords do not match");
        return;
      }
    }

    try {
      const res = isLogin
        ? await signInWithEmailAndPassword(auth, userEmail, userPass)
        : await createUserWithEmailAndPassword(auth, userEmail, userPass);

      if (!isLogin) alert(`✅ Welcome ${name || "User"}!`);
      setUser(res.user);
      authModal.classList.add("hidden");
      email.value = "";
      password.value = "";
      if (!isLogin) {
        fullName.value = "";
        confirmPassword.value = "";
      }
    } catch (err) {
      showError("❌ " + err.message);
    }
  });

  // Set user state
  function setUser(user) {
    loginBtn.textContent = user.email.split("@")[0] || "Profile";
    loginBtn.classList.remove("bg-orange-500");
    loginBtn.classList.add("bg-green-600", "text-white");
    userDropdown?.classList.remove("hidden");
  }

  // Logout functionality
  logoutBtn?.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        loginBtn.textContent = "Login";
        loginBtn.classList.remove("bg-green-600", "text-white");
        loginBtn.classList.add("bg-orange-500");
        userDropdown?.classList.add("hidden");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!loginBtn.contains(e.target) && !userDropdown?.contains(e.target)) {
      userDropdown?.classList.add("hidden");
    }
    if (e.target === authModal) {
      authModal.classList.add("hidden");
    }
  });

  // Check auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      loginBtn.textContent = "Login";
      loginBtn.classList.remove("bg-green-600", "text-white");
      loginBtn.classList.add("bg-orange-500");
      userDropdown?.classList.add("hidden");
    }
  });
});