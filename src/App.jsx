import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("A fallback quote will show if the real one fails.");
  const [author, setAuthor] = useState("Fallback Author");

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      if (data[0]?.q && data[0]?.a) {
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } else {
        throw new Error("Missing quote");
      }
    } catch (error) {
      setQuote("“Even if the quote isn't visible, remember: effort always counts.”");
      setAuthor("ChatGPT");
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