import React, { useState } from "react";
import Greeting from "./Greeting";

function Greet() {
  const [name, setName] = useState("");

  const handleClear = () => setName("");

  return (
    <div style={{ padding: "20px" }} className="centerMainDiv">
      <h2>💬 Greeting with Props</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        className="input-field"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleClear}>Clear</button>

      <p>Character count: {name.length}</p>

      <Greeting name={name} />
    </div>
  );
}

export default Greet;
