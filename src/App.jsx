import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(false);

  const fetchQuote = async () => {
    setError(false);
    try {
      const res = await fetch("https://api.quotable.io/random");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      setError(true);
      setQuote("Something went wrong. Please try again.");
      setAuthor("😔");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <h1>💬 Daily Quote</h1>
      <div className="quote-box">
        <p className="quote">{quote}</p>
        <p className="author">— {author}</p>
      </div>
      <button onClick={fetchQuote}>New Quote 🔁</button>
    </div>
  );
}

export default App;