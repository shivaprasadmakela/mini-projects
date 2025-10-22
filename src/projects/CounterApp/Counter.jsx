import { useState } from "react";


function CounterAPP(){
    const [count, setCount] = useState(0)

    function decrease() {
        if (count === 0) return;

        setCount(count -1)
    }

    return (
        <>
        <div className="centerMainDiv">
        <h1>Counter APP {count}</h1>
        <div>
            <button onClick={() => setCount(count + 1)}>Increase +</button>
            <button onClick={decrease}>Decrease -</button>
            {
                count === 0 && (
                    <h5>ok start again..!!!</h5>
                )
            }
        </div>
        </div>
        </>
    )   
}

export default CounterAPP;