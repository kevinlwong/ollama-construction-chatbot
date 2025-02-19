<template>
  <div class="chat-container">
    <!-- <div class="chat-header">Chat with {{ model }}</div> -->
    <div class="chat-header">How can I help?</div>
    <!-- Chat Messages (Including Thinking Process) -->
    <div class="chat-messages">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.sender">
        <template v-if="msg.type === 'thinking'">
          <div class="thinking-message">
            <button class="toggle-thinking" @click="toggleThinking(index)">
              {{ msg.expanded ? "Hide Thinking" : "Show Thinking" }}
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
      <textarea v-model="userInput" placeholder="Ask WeekendAI" @keyup.enter="sendMessage"
        @keydown.enter.prevent="sendMessage"></textarea>
      <button @click="sendMessage">Send</button>
    </div>
  </div>

</template>

<script>
export default {
  props: ["model"],
  data() {
    return {
      userInput: "",
      messages: [],
      isThinking: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const messageToSend = this.userInput;
      console.log(messageToSend)
      this.userInput = "";
      this.messages.push({ sender: "user", text: messageToSend });

      this.isThinking = false;

      try {
        // Do not Delete
        //Render backend service: https://ollama-construction-chatbot.onrender.com
        //Local: "http://localhost:5000/chat"
        const response = await fetch("https://ollama-construction-chatbot.onrender.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: this.model, message: messageToSend }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let finalResponse = "";
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
        this.messages.push({
          sender: "bot",
          text: "Error: Couldn't get a response.",
        });
      }

    },

    addThinkingToChat(text) {
      this.messages.push({
        sender: "bot",
        type: "thinking",
        text,
        expanded: false,
      });
    },
    toggleThinking(index) {
      this.messages[index].expanded = !this.messages[index].expanded;
    },
    displayMessageLetterByLetter(text) {
      let index = 0;
      let displayedText = "";

      const interval = setInterval(() => {
        if (index < text.length) {
          displayedText += text[index];
          if (
            this.messages.length === 0 ||
            this.messages[this.messages.length - 1].sender !== "bot"
          ) {
            this.messages.push({ sender: "bot", text: displayedText });
          } else {
            this.messages[this.messages.length - 1].text = displayedText;
          }
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
    },
  },
};
</script>

<style>
.chat-container {
  width: 1200px;
  margin: auto;
  max-width: 1200px;
  min-width: 320px;
  background: #fff;
  /* flex-direction: column; */
  /* border-radius: 10px; */
  overflow: hidden;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
}

.chat-header {
  background: white;
  padding: 10px;
  color: #646464;
  font-size: 40px;
  font-family: Inter;
  text-align: center;
}

/* Chat Messages */
.chat-messages {
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  background: #fff;
  color: white;
  border-radius: 5px;
  margin: 10px;
}

.user {
  text-align: right;
  color: #646464;
}

.bot {
  text-align: left;
  color: rgb(101, 41, 149);
}

.message-text {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 10px;
  background: #C5E0F3;
  margin: 5px;
}

/* Thinking Message Styling */
.thinking-message {
  background: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  color: #646464;
  width: fit-content;
}

.thinking-text {
  color: #87afff;
  font-style: italic;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
}

/*  Toggle Button */
.toggle-thinking {
  background: #fff;
  color: #646464;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 8px;
  margin-bottom: 5px;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.toggle-thinking:hover {
  background: #646464;
  color: #fff;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
  /* Stronger shadow */
  border: none;
}

.toggle-thinking:active {
  transform: scale(0.95);
}

.toggle-thinking:focus {
  outline: none;
}

.chat-input {
  display: flex;
  padding: 10px;
  background: #fff;
  outline: none;
  align-items: center;
  gap: 10px;
}

.chat-input textarea {
  flex-grow: 1;
  /* min-width: 200px; */
  /* max-width: 100%; */
  text-align: left;
  padding: 10px;
  border: 1px solid #646464;
  background: #fff;
  color: #646464;
  border-radius: 45px;
  outline: none;
  font-family: Inter;
  font-size: large;
  /* overflow-wrap: break-word; */
  align-content: baseline;
  resize: vertical;
  max-height: 150px;
  min-height: 43.2px;
}

.chat-input textarea:placeholder-shown {
  align-content: center;
}

.chat-input button {
  width: 80px;
  height: 64.8px;
  padding: 12px 20px;
  margin-left: 10px;
  background: #fff;
  color: #646464;
  border: 1px solid #646464;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  display: flex;
}

.chat-input button:hover {
  background: #646464;
  color: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);

}

/* Responsive Design */
@media (max-width: 1320px) {
  .chat-container {
    width: 900px;
  }

  .chat-header {
    font-size: 36px;
  }

  .chat-messages {
    height: 500px;
  }

  .chat-input input {
    padding: 10px;
  }

  .chat-input button {
    padding: 10px 15px;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .chat-container {
    width: 650px;
  }

  .chat-header {
    font-size: 30px;
  }

  .chat-messages {
    height: 450px;
  }

  .chat-input textarea {
    padding: 10px;
    font-size: medium;
  }

  .chat-input button {
    padding: 10px 15px;
    font-size: medium;
  }
}

@media (max-width: 768px) {
  .chat-container {
    width: 350px;
  }

  .chat-header {
    font-size: 22px;
    padding: 15px;
  }

  .chat-messages {
    height: 300px;
    font-size: small;
  }

  .chat-input input {
    padding: 8px;
    font-size: 14px;
  }

  .chat-input textarea {
    font-size: small;
  }

  .chat-input button {
    padding: 8px 12px;
    font-size: small;
  }
}

@media (max-width: 480px) {
  .chat-container {
    width: 100%;
    border-radius: 0;
  }

  .chat-header {
    font-size: 20px;
  }

  .chat-messages {
    height: 180px;
    padding: 5px;
  }

  .chat-input {
    flex-direction: column;
    gap: 5px;
  }

  .chat-input input {
    width: 100%;
    padding: 8px;
  }

  .chat-input button {
    width: 100%;
    padding: 8px;
  }
}
</style>
