import { useState } from "react";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Set your backend API URL here
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:10000";  // Adjust URL if required

  const handleSend = async () => {
    if (!userMessage.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setReply(data.reply);  // Display the response
    } catch (err) {
      setReply("❌ Error talking to backend!");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💬 AI Homework Helper</h1>
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Ask your homework question here..."
          rows="4"
          style={{ width: "80%", padding: "10px", fontSize: "16px" }}
        />
        <br />
        <button onClick={handleSend} style={{ fontSize: "18px", marginTop: "10px" }}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
        <p style={{ marginTop: "30px", color: "#00FF99" }}>
          {reply && <strong>AI says:</strong>} {reply}
        </p>
      </header>
    </div>
  );
}

export default App;
