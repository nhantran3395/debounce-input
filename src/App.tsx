import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { debounce } from "lodash";

import "./App.css";

const SUGGESTIONS_URL = "https://random-word-api.herokuapp.com/word?number=10";

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const getSuggestions = useCallback(async function (query: string) {
    if (!query) {
      return;
    }

    const res = await fetch(SUGGESTIONS_URL);
    const data = await res.json();
    console.log({ query, data });
    setSuggestions(data);
  }, []);

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 500),
    [getSuggestions],
  );

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;
    setQuery(newQuery);
    getSuggestionsDebounce(newQuery);
  }

  return (
    <main>
      <h2>Search input debounce</h2>
      <section>
        <input type={"text"} onChange={onInputChange} value={query} />
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
