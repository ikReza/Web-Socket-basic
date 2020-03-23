import React, { useState, useEffect } from "react";
import socketIoClient from "socket.io-client";

function App() {
  const [response, setResponse] = useState(false);
  const [endpoint] = useState("http://localhost:4001");

  useEffect(() => {
    const socket = socketIoClient(endpoint);
    socket.on("FromApi", data => {
      setResponse(data);
    });
  }, [endpoint]);

  return (
    <div>
      {response ? (
        <p>
          The temperature in Dhaka is: {((response - 32) * (5 / 9)).toFixed(2)}{" "}
          °C
        </p>
      ) : (
        <p>Loading. .. ...</p>
      )}
    </div>
  );
}

export default App;
