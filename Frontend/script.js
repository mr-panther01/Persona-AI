const personaButtons = document.querySelectorAll('.persona-btn');
const chatLog = document.getElementById('chatLog');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

let activePersona = 'kshitij_mishra';

personaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    personaButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activePersona = button.dataset.persona;
    appendSystemMessage(`Persona changed to ${button.textContent}.`);
  });
});

messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage('You', message, 'user');
  messageInput.value = '';
  appendMessage('Agent', 'Thinking...', 'agent', true);

  try {
    const responseText = await sendMessageToBackend(message, activePersona);
    replaceLastAgentMessage(responseText);
  } catch (error) {
    replaceLastAgentMessage('Unable to get a response. Please check your backend connection.');
    console.error(error);
  }
});

function appendMessage(sender, text, type, isPending = false) {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message chat-${type}`;

  const label = document.createElement('div');
  label.className = 'chat-label';
  label.textContent = sender;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;

  messageElement.appendChild(label);
  messageElement.appendChild(bubble);
  if (isPending) {
    messageElement.dataset.pending = 'true';
  }

  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function replaceLastAgentMessage(text) {
  const pendingMessage = chatLog.querySelector('[data-pending="true"]');
  if (pendingMessage) {
    pendingMessage.removeAttribute('data-pending');
    pendingMessage.querySelector('.chat-bubble').textContent = text;
  } else {
    appendMessage('Agent', text, 'agent');
  }
  chatLog.scrollTop = chatLog.scrollHeight;
}

function appendSystemMessage(text) {
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message chat-agent';
  messageElement.style.opacity = '0.8';

  const label = document.createElement('div');
  label.className = 'chat-label';
  label.textContent = 'System';

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;

  messageElement.appendChild(label);
  messageElement.appendChild(bubble);
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessageToBackend(message, persona) {
  const response = await fetch('https://persona-ai-74ri.onrender.com/api/respond', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, persona }),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }

  const data = await response.json();
  return data.reply || 'No reply received.';
}
