// ---------- SCREEN SWITCHING ----------
function showScreen(screenId) {
  // Hide all screens
  const screens = ["screen-signup", "screen-login", "screen-dialogue", "screen-dashboard"];
  screens.forEach(id => {
    document.getElementById(id).style.display = "none";
  });
  // Show the one we want
  document.getElementById(screenId).style.display = "block";
}


// ---------- SIGNUP ----------
function handleSignUp() {
  const username = document.getElementById("signup-username").value.trim();
  const email    = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  // Basic validation
  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Save user to localStorage
  localStorage.setItem("hw-username", username);
  localStorage.setItem("hw-email", email);
  localStorage.setItem("hw-password", password);

  // Go to login screen
  showScreen("screen-login");
}


// ---------- LOGIN ----------
function handleLogin() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const savedUsername = localStorage.getItem("hw-username");
  const savedPassword = localStorage.getItem("hw-password");

  if (username === savedUsername && password === savedPassword) {
    // Start the dialogue with their actual username
    startDialogue(username);
  } else {
    alert("Incorrect username or password.");
  }
}


// ---------- DIALOGUE ----------
let dialogues = [];
let current = 0;

function startDialogue(username) {
  // Build dialogue using the real username
  dialogues = [
    { speaker: "???",      text: "You're awake!" },
    { speaker: username,   text: "Am I? My eyes are open, yet it's dark. But my body feels light." },
    { speaker: "???",      text: "You made a choice, did you not? Most people here say they made an oath." },
    { speaker: username,   text: "I did. I made an oath to become a person I can be proud of." },
    { speaker: "???",      text: "Well now's the time to prove it. Stand up! There are monsters here!" },
  ];

  current = 0;
  showScreen("screen-dialogue");
  nextDialogue();
}

function nextDialogue() {
  if (current < dialogues.length) {
    document.getElementById("dialogue-speaker").textContent = dialogues[current].speaker;
    document.getElementById("dialogue-text").textContent   = dialogues[current].text;
    current++;
  } else {
    // Dialogue done — go to dashboard
    showScreen("screen-dashboard");
  }
}