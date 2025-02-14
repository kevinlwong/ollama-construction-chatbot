<template>
    <div class="chat-container">
      <div class="chat-header">Chat with {{ model }}</div>
  
      <!-- ✅ Chat Messages (Including Thinking Process) -->
      <div class="chat-messages">
        <div v-for="(msg, index) in messages" :key="index" :class="msg.sender">
          <template v-if="msg.type === 'thinking'">
            <div class="thinking-message">
              <button class="toggle-thinking" @click="toggleThinking(index)">
                {{ msg.expanded ? 'Hide Thinking' : 'Show Thinking' }}
              </button>
              <p v-if="msg.expanded" class="thinking-text">{{ msg.text }}</p>
            </div>
          </template>
          <template v-else>
            <span class="message-text">{{ msg.text }}</span>
          </template>
        </div>
      </div>
  
      <!-- Chat Input Box -->
      <div class="chat-input">
        <input
          v-model="userInput"
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['model'],
    data() {
      return {
        userInput: '',
        messages: [],
        isThinking: false,
      };
    },
    methods: {
      async sendMessage() {
        if (!this.userInput.trim()) return;
  
        this.messages.push({ sender: 'user', text: this.userInput });
        this.isThinking = false;
  
        try {
          const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: this.model, message: this.userInput }),
          });
  
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let finalResponse = '';
          let hasThinking = false;
  
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
  
            const chunk = decoder.decode(value);
            const lines = chunk.trim().split("\n");
  
            lines.forEach((line) => {
              try {
                const parsed = JSON.parse(line);
  
                if (parsed.type === "thinking") {
                  hasThinking = true;
                  this.addThinkingToChat(parsed.text);
                } else if (parsed.type === "final") {
                  this.isThinking = false;
                  this.displayMessageLetterByLetter(parsed.text);
                }
              } catch (error) {
                console.error("Error parsing streaming data:", error);
              }
            });
          }
  
          if (!hasThinking) {
            this.isThinking = false;
          }
  
        } catch (error) {
          console.error("Chatbot API error:", error);
          this.messages.push({ sender: 'bot', text: "Error: Couldn't get a response." });
        }
  
        this.userInput = '';
      },
      addThinkingToChat(text) {
        this.messages.push({ sender: 'bot', type: 'thinking', text, expanded: false });
      },
      toggleThinking(index) {
        this.messages[index].expanded = !this.messages[index].expanded;
      },
      displayMessageLetterByLetter(text) {
        let index = 0;
        let displayedText = '';
  
        const interval = setInterval(() => {
          if (index < text.length) {
            displayedText += text[index];
            if (this.messages.length === 0 || this.messages[this.messages.length - 1].sender !== 'bot') {
              this.messages.push({ sender: 'bot', text: displayedText });
            } else {
              this.messages[this.messages.length - 1].text = displayedText;
            }
            index++;
          } else {
            clearInterval(interval);
          }
        }, 30);
      }
    }
  };
  </script>
  
  <style>
  .chat-container {
    width: 500px;
    margin: auto;
    background: #2e2e2e;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .chat-header {
    background: #007bff;
    padding: 10px;
    color: white;
    font-size: 18px;
    text-align: center;
  }
  
  /* ✅ Chat Messages */
  .chat-messages {
    height: 300px;
    overflow-y: auto;
    padding: 10px;
    background: #1e1e1e;
    color: white;
    border-radius: 5px;
    margin: 10px;
  }
  
  .user {
    text-align: right;
    color: lightblue;
  }
  
  .bot {
    text-align: left;
    color: lightgreen;
  }
  
  .message-text {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    margin: 5px;
  }
  
  /* ✅ Thinking Message Styling */
  .thinking-message {
    background: #333;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .thinking-text {
    color: #ffc107;
    font-style: italic;
    white-space: pre-line;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-height: 200px;
    overflow-y: auto;
  }
  
  /* ✅ Toggle Button */
  .toggle-thinking {
    background: #444;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  
  .toggle-thinking:hover {
    background: #007bff;
  }
  
  .chat-input {
    display: flex;
    padding: 10px;
    background: #333;
  }
  
  .chat-input input {
    flex-grow: 1;
    padding: 10px;
    border: none;
    background: #444;
    color: white;
    border-radius: 5px;
  }
  
  .chat-input button {
    padding: 10px 15px;
    margin-left: 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  