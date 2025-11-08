const input = document.getElementById('input');
const messages = document.getElementById('messages');
const voiceBtn = document.getElementById('voice-btn');

// Function to add message
function addMessage(sender, text) {
  const div = document.createElement('div');
  div.textContent = `${sender}: ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Basic rule-based assistant
function getResponse(message) {
  message = message.toLowerCase();

  if (message.includes('hello') || message.includes('hi')) return "Hello! How can I assist you today?";
  if (message.includes('time')) return `Current time is ${new Date().toLocaleTimeString()}`;
  if (message.includes('date')) return `Today's date is ${new Date().toLocaleDateString()}`;
  if (message.includes('your name')) return "I'm your Web Assistant!";
  if (message.includes('bye') || message.includes('exit')) return "Goodbye! Have a nice day!";
  
  return "Sorry, I don't understand that. Try asking something else.";
}

// Send message when Enter is pressed
input.addEventListener('keydown', function(e) {
  if(e.key === 'Enter' && input.value.trim() !== '') {
    const userMessage = input.value.trim();
    addMessage('User', userMessage);
    input.value = '';
    
    const botMessage = getResponse(userMessage);
    addMessage('Assistant', botMessage);
  }
});

// Voice recognition
voiceBtn.addEventListener('click', function() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const speech = event.results[0][0].transcript;
    input.value = speech;
    input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  };

  recognition.onerror = function() {
    alert('Voice recognition not supported or error occurred.');
  };
});
