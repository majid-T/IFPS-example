import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
// import ipfs from "ipfs";

const ipfsClient = require("ipfs-http-client");
// Getting CORS error on this client
// const ipfs = ipfsClient("http://localhost:5001");
// Temp using infura for dev
const ipfs = ipfsClient("https://ipfs.infura.io:5001");

function App() {
  const [resourceHash, setResourceHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Msg comes here..");
  const [fileBuffer, setFileBuffer] = useState(null);

  //Function to submit file to IPFS
  const submitToIPFS = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMsg("File is being uploaded to IPFS");

    for await (const result of ipfs.add(fileBuffer)) {
      setResourceHash(result.path);
      setLoading(false);
      setLoadingMsg("Data stored succesfully on IPFS with above hash");
    }
  };

  //Function to read the file into a buffer
  const readFile = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMsg("File is being read to a buffer");

    const file = e.target.files[0];
    // console.log(file);
    const bufferdReader = new window.FileReader();
    bufferdReader.readAsArrayBuffer(file);
    bufferdReader.onloadend = () => {
      setFileBuffer(Buffer(bufferdReader.result));
      setLoading(false);
      setLoadingMsg("File read complete");
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
      <hr />
      <input type="text" placeholder="File hash to get form IPFS" />
      <button type="button" onClick={getFileIPFS}>
        Get file
      </button>
      <div>
        {loading && <span>Loading...</span>}
        <p>{loadingMsg}</p>
      </div>
    </div>
  );
}

export default App;
