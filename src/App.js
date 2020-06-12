import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
// import ipfs from "ipfs";

const ipfsClient = require("ipfs-http-client");
// Configs to use local host for upload
const ipfsLocal = ipfsClient("http://localhost:5001");
// Configs to use infura for upload
const ipfsInfura = ipfsClient("https://ipfs.infura.io:5001");

function App() {
  const [resourceHash, setResourceHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Msg comes here..");
  const [fileBuffer, setFileBuffer] = useState(null);

  //Function to submit file to IPFS
  const submitToIPFSLocal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMsg("File is being uploaded to IPFS");

    for await (const result of ipfsLocal.add(fileBuffer)) {
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

    const bufferdReader = new window.FileReader();
    bufferdReader.readAsArrayBuffer(file);
    bufferdReader.onloadend = () => {
      setFileBuffer(Buffer(bufferdReader.result));
      setLoading(false);
      setLoadingMsg("File read complete");
    };
  };

  //Function to get the file from IPFS by hash code
  const getFileIPFS = async (e) => {
    e.preventDefault();

    setLoading(true);
    setLoadingMsg("Geting file from IPFS");
  };

  return (
    <div>
      <h1>IPFS File Upload</h1>
      <form onSubmit={submitToIPFSLocal}>
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

        <img
          src={`http://localhost:8080/ipfs/${resourceHash}`}
          alt="images-images"
        />

        <a
          href={`http://localhost:8080/ipfs/${resourceHash}`}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <button>
            <i className="fas fa-download" />
            Download From Local
          </button>
        </a>
      </div>
    </div>
  );
}
//          href={`https://ipfs.io/ipfs/${resourceHash}`}

export default App;
