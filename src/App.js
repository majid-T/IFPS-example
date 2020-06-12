import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ipfs from "ipfs";

function App() {
  const [resourceHash, setResourceHash] = useState("sss");
  const [loading, setLoading] = useState(false);

  const submitToIPFS = (e) => {
    e.preventDefault();
    setLoading(true);
  };
  const readFile = (e) => {
    e.preventDefault();
  };
  const getFileIPFS = (e) => {
    e.preventDefault();

    setLoading(true);
  };

  return (
    <div>
      <h1>IPFS File Upload</h1>
      <h2>
        For demostration purposes this application will work with images only.
      </h2>
      <form onSubmit={submitToIPFS}>
        <input type="file" onChange={readFile} />
        <input type="submit" />
      </form>
      <p>{resourceHash}</p>
      <hr />
      <input type="text" placeholder="File hash to get form IPFS" />
      <button type="button" onClick={getFileIPFS}>
        Get file
      </button>
      <div>{loading && <span>Loading...</span>}</div>
    </div>
  );
}

export default App;
