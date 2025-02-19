

# **Ollama Construction Chatbot**

## **Overview**
The **Ollama Construction Chatbot** is an AI-powered assistant designed to enhance **construction project management** by leveraging **multi-model AI processing**. It integrates **Ollama** to dynamically switch between **DeepSeek R1, Qwen2.5**, and other models, optimizing workflows across different construction phases: **Pre-construction (Precon), Construction (Con), and Post-construction (Postcon).**

The chatbot provides **real-time responses**, **markdown-rendered explanations**, and **structured technical insights** to assist construction professionals with planning, execution, and risk assessment.

---

## **Features**
 **Multi-Model AI Processing** – Uses **DeepSeek R1, Qwen2.5**, and other models dynamically for different construction phases.  
 **Real-Time Streaming** – Displays chatbot responses **letter-by-letter** with a smooth animation.  
 **Thinking Phase Visualization** – Keeps AI reasoning visible with an expandable/collapsible **"Thinking..."** message.  
 **Markdown Rendering** – Provides structured explanations for **technical content**, improving clarity.  
 **Modern UI Design** – Inspired by **ChatGPT, Gemini, and Claude**, ensuring a seamless user experience.  
 **Dynamic Model Selection** – Allows switching models based on project requirements.  
 **Vue.js + Electron** – Built as a **desktop-friendly** application with responsive UI.  
 **Scalable Backend API** – Communicates efficiently with **Ollama’s local AI model server** for low-latency interactions.  
 **Custom AI Model Training (Upcoming)** – Fetching data from **general contractors** and **construction firms** to **fine-tune AI models** using **Ollama** and **advanced prompt engineering**.

---

## **Tech Stack**
- **Frontend:** Vue.js, HTML, CSS (Tailwind)  
- **Backend:** Node.js, Express  
- **AI Models:** DeepSeek R1, Qwen2.5 (via Ollama)  
- **UI Framework:** Electron (for desktop app)  
- **Data Processing:** Ollama fine-tuning, JSON APIs  

---

## **How It Works**
1. **Select a Construction Phase** → Precon, Con, or Postcon.  
2. **Chat with the AI** → Ask questions related to construction planning, execution, or post-project evaluation.  
3. **Real-Time AI Responses** → Responses appear **letter-by-letter** for a smooth experience.  
4. **Expandable "Thinking" Phase** → AI reasoning remains accessible for better transparency.  
5. **Markdown Rendering** → Technical explanations are formatted properly.  

---

## **Installation & Setup**
### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/ollama-construction-chatbot.git
cd ollama-construction-chatbot
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the Application**
```sh
npm run dev
```

### **4. Start Ollama Model Server**
```sh
ollama serve
```

---

## **Upcoming Enhancements**
 **Training Custom AI Models** – Using real-world construction data for **fine-tuned AI responses**.  
 **Cloud Integration** – Expanding capabilities for **remote data storage and analysis**.  
 **Advanced Risk Prediction** – AI-powered insights for **budgeting, safety risks, and resource allocation**.  

---

## **Contributors**
- **Kevin Wong** – Full-Stack Developer
- **Joshua Casuga** - Full Stack Developer  

---

## **License**
This project is **open-source** under the **MIT License**.  

