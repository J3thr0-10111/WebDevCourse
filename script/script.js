
// DOM Elements
const homePage = document.getElementById('home-page');
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const htmlPage = document.getElementById('html-page');
const cssPage = document.getElementById('css-page');
const javascriptPage = document.getElementById('javascript-page');

// Navigation Links
const homeLink = document.getElementById('home-link');
const htmlLink = document.getElementById('html-link');
const cssLink = document.getElementById('css-link');
const jsLink = document.getElementById('js-link');

// Auth Buttons
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');
const startLearningBtn = document.getElementById('start-learning-btn');

// Auth Forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Course Buttons
const courseButtons = document.querySelectorAll('[data-course]');

// Image Data (simulating JSON file)
const imageData = {
    logo: "💻",
    html: "#e34c26",
    css: "#264de4",
    javascript: "#f0db4f"
};

// User Data Storage (simulating file storage)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Function to show a specific page and hide others
function showPage(page) {
    // Hide all pages
    const pages = [homePage, loginPage, registerPage, htmlPage, cssPage, javascriptPage];
    pages.forEach(p => p.classList.add('hidden'));
    
    // Show the requested page
    page.classList.remove('hidden');
}

// Function to generate a unique user ID
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Function to handle user registration
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if username already exists
    if (users.find(user => user.username === username)) {
        alert('Username already exists!');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateUserId(),
        username: username,
        phone: phone,
        password: password // In a real app, this would be hashed
    };
    
    // Save user to "storage"
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set as current user
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Registration successful! You are now logged in.');
    showPage(homePage);
    
    // Update UI for logged in user
    updateAuthUI();
}

// Function to handle user login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Login successful!');
        showPage(homePage);
        
        // Update UI for logged in user
        updateAuthUI();
    } else {
        alert('Invalid username or password!');
    }
}

// Function to update UI based on authentication status
function updateAuthUI() {
    if (currentUser) {
        // User is logged in
        loginBtn.textContent = `Logout (${currentUser.username})`;
        registerBtn.classList.add('hidden');
        
        // Change login button to logout functionality
        loginBtn.onclick = function() {
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            showPage(homePage);
        };
    } else {
        // User is not logged in
        loginBtn.textContent = 'Login';
        registerBtn.classList.remove('hidden');
        
        // Reset login button functionality
        loginBtn.onclick = function() {
            showPage(loginPage);
        };
    }
}

// Event Listeners for Navigation
homeLink.addEventListener('click', () => showPage(homePage));
htmlLink.addEventListener('click', () => {
    if (currentUser) {
        showPage(htmlPage);
    } else {
        alert('Please login to access course content');
        showPage(loginPage);
    }
});
cssLink.addEventListener('click', () => {
    if (currentUser) {
        showPage(cssPage);
    } else {
        alert('Please login to access course content');
        showPage(loginPage);
    }
});
jsLink.addEventListener('click', () => {
    if (currentUser) {
        showPage(javascriptPage);
    } else {
        alert('Please login to access course content');
        showPage(loginPage);
    }
});

// Event Listeners for Auth Buttons
loginBtn.addEventListener('click', () => {
    if (currentUser) {
        // Logout functionality
        currentUser = null;
        localStorage.removeItem('currentUser');
        updateAuthUI();
    } else {
        showPage(loginPage);
    }
});
registerBtn.addEventListener('click', () => showPage(registerPage));
showLogin.addEventListener('click', () => showPage(loginPage));
showRegister.addEventListener('click', () => showPage(registerPage));
startLearningBtn.addEventListener('click', () => {
    if (currentUser) {
        showPage(htmlPage);
    } else {
        showPage(registerPage);
    }
});

// Event Listeners for Course Buttons
courseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const course = button.getAttribute('data-course');
        
        if (currentUser) {
            switch(course) {
                case 'html':
                    showPage(htmlPage);
                    break;
                case 'css':
                    showPage(cssPage);
                    break;
                case 'javascript':
                    showPage(javascriptPage);
                    break;
            }
        } else {
            alert('Please login to access course content');
            showPage(loginPage);
        }
    });
});

// Event Listeners for Forms
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showPage(homePage);
    updateAuthUI();
    
    // Set course images based on imageData
    document.querySelectorAll('.course-image').forEach((img, index) => {
        const colors = [imageData.html, imageData.css, imageData.javascript];
        img.style.backgroundColor = colors[index];
    });
});
