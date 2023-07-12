document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  // Send message when the form is submitted
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const messageInput = document.querySelector('#message-input');
    const message = messageInput.value.trim();
    if (message !== '') {
      socket.emit('chat message', message);
      messageInput.value = '';
    }
  });

  // Receive and display messages
  socket.on('chat message', (msg) => {
    const messageList = document.querySelector('#message-list');
    const li = document.createElement('li');
    li.textContent = msg;
    messageList.appendChild(li);
    messageList.scrollTop = messageList.scrollHeight;
  });
});
// Connect to the Socket.IO server
const socket = io();

// DOM elements
const chatWindow = document.getElementById('chat-window');
const usernameContainer = document.getElementById('username-container');
const usernameInput = document.getElementById('username-input');
const loginButton = document.getElementById('login-btn');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

// Disable message input and send button initially
messageInput.disabled = true;
sendButton.disabled = true;

// Send username on login button click
loginButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    socket.emit('login', username);
    usernameContainer.style.display = 'none';
    messageInput.disabled = false;
    sendButton.disabled = false;
  }
});

// Send message on send button click
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    const username = usernameInput.value.trim();
    socket.emit('chat message', { username, message });
    messageInput.value = '';
  }
});

// Receive and display messages
socket.on('chat message', (data) => {
  const { username, message } = data;
  const messageElement = document.createElement('div');
  messageElement.textContent = `${username}: ${message}`;
  chatWindow.appendChild(messageElement);
});
// Send message on Enter key press
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevents the default behavior of adding a new line
    const message = messageInput.value.trim();
    if (message) {
      const username = usernameInput.value.trim();
      socket.emit('chat message', { username, message });
      messageInput.value = '';
    }
  }
});
