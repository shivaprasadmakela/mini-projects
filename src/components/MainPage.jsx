import { useState } from "react";
import "../commonStyles.scss";

function MainPage() {
  const [same, setSame] = useState(false);
  const [input, setInput] = useState("");
  const projectData = [
    {
        "name" : "To do",
        "link" : "/nde"
    },
    {
        "name" : "Task Now",
        "link" : "/nde"
    }
  ]

  function handlecheckSameName(value) {
    if (value === "Hello World") {
      setSame(true);
      localStorage.setItem("same",true)
    } else {
      setSame(false);
    }
  }

  return (
    <div>
      {!same ? (
        <div>
          <p>Please Type "Hello World"</p>
          <input
            type="text"
            className="input-field"
            placeholder="Don’t be shy, type something 👀"
            value={input}
            onChange={(event) => {
              const value = event.target.value;
              setInput(value);
              handlecheckSameName(value);
            }}
          />
        </div>
      ) : (
        <div>
          <h1>The Art</h1>
          {
            projectData.map((item)=> (
                <div>
                    <h3>{item.name}</h3>
                   </div> 
            ))
          }
        </div>
      )}
    </div>
  );
}

export default MainPage;
