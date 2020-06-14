import React, { useState, useEffect } from "react";
import axios from "axios";

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("api/values/current");
      setValues(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("api/values/all");
      setSeenIndexes(result.data);
    };

    fetchData();
  }, []);

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(", ");
  }

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I Calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index,
    });

    setIndex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        ></input>
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;
