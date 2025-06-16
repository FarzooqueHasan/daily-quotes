import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
    } catch (err) {
      setQuote("Could not fetch quote. Please try again.");
      setAuthor("😔");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <h1>🌟 Daily Quote</h1>
      <div className="quote-box">
        <p className="quote">“{quote}”</p>
        <p className="author">— {author}</p>
      </div>
      <button onClick={fetchQuote}>New Quote 🔁</button>
    </div>
  );
}

export default App;
