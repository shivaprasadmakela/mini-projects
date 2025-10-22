import React from "react";

function Greeting({ name }) {
  return (
    <h3>
      {name ? `Hello, ${name}! 👋` : "Type your name above to get a greeting!"}
    </h3>
  );
}

export default Greeting;
