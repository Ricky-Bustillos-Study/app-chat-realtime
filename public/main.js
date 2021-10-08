var socket = io('http://localhost:3000');

const messagesCard = document.getElementById('messages');

function renderMessage(message) {
  messagesCard.insertAdjacentHTML('afterbegin', `
    <p class="card-text my-1">
      <span class="small text-secondary">${message.time}</span><span class="fw-bold"> ${message.username} </span>
      <span> ${message.message} </span>
    </p>
  `);
  messagesCard.scrollTop = messagesCard.scrollHeight;
}

function renderServerMessage(message) {
  messagesCard.insertAdjacentHTML('afterbegin', `
    <p class="card-text my-1">
      <span class="small text-secondary">${message.time}</span><span class="fw-bold text-primary"> ${message.username} </span>
      <span class="muted"> ${message.message} </span>
    </p>
  `);
  messagesCard.scrollTop = messagesCard.scrollHeight;
}

socket.on('serverMessage', message => {
  renderServerMessage(message);
});

socket.on('previousMessages', messages => {
  for (let message of messages) {
    renderMessage(message);
  }
})

socket.on('receivedMessage', message => {
  renderMessage(message);
});


const chatForm = document.getElementById('chat');

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const username = e.target.elements.username.value;
  const message = e.target.elements.message.value;

  // If both username and message are filled
  if (username && message) {
    var messageObject = {
      username: username,
      message: message
    };

    socket.emit('chatMessage', messageObject);  // Send message object to server

    e.target.elements.message.value = '';
    e.target.elements.message.focus();
  }
});