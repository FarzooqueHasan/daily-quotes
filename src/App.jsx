import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [apiFailed, setApiFailed] = useState(false);

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();

      if (data[0]?.q && data[0]?.a) {
        setQuote(data[0].q);
        setAuthor(data[0].a);
        setApiFailed(false);
      } else {
        throw new Error("Invalid data");
      }
    } catch (err) {
      setQuote("Success is not in what you have, but who you are.");
      setAuthor("Bo Bennett");
      setApiFailed(true);
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
        {apiFailed && (
          <p className="fallback-note">
            ⚠️ We couldn’t fetch from the API, so here’s a quote from us.
          </p>
        )}
      </div>
      <button onClick={fetchQuote}>New Quote 🔁</button>
    </div>
  );
}

export default App;
