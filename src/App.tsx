import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";

import "./App.css";

const SUGGESTIONS_URL = "https://random-word-api.herokuapp.com/word?number=10";

function App() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

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

  useEffect(() => {
    getSuggestionsDebounce(query);
  }, [getSuggestionsDebounce, query]);

  return (
    <main>
      <h2>Search input debounce</h2>
      <section>
        <input type={"text"} onChange={onInputChange} />
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
