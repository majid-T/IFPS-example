import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ipfs from "ipfs";

function App() {
  const [resourceHash, setResourceHash] = useState("hash comes here");
  const [loading, setLoading] = useState(false);
  const [fileBuffer, setFileBuffer] = useState(null);

  //Gunction to submit file to IPFS
  const submitToIPFS = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  //Function to read the file into a buffer
  const readFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target.files[0];
    console.log(file);
    const bufferdReader = new window.FileReader();
    bufferdReader.readAsArrayBuffer(file);
    bufferdReader.onloadend = () => {
      setFileBuffer(Buffer(bufferdReader.result));
      setLoading(false);
    };
  };

  //Function to get the file from IPFS by hash code
  const getFileIPFS = (e) => {
    e.preventDefault();

    setLoading(true);
  };

  return (
    <div>
      <h1>IPFS File Upload</h1>
      <form onSubmit={submitToIPFS}>
        <input type="file" onChange={readFile} />
        <input type="submit" />
      </form>
      <p>{resourceHash}</p>
      <p>{fileBuffer}</p>
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
