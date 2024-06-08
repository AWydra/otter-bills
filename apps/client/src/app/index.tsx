import React from "react";
import "./styles.css";

function App(): JSX.Element {
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Kitchen Sink</span>
      </h1>
      <p className="description">
        Built With Turborepo
        {" & "}
        Vite
      </p>
    </div>
  );
}

export default App;
