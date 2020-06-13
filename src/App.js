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
  const [loadingMsg, setLoadingMsg] = useState("");
  const [fileBuffer, setFileBuffer] = useState(null);
  const [srcIpfs, setSrcIpfs] = useState("local");
  const [resUrl, setResUrl] = useState("http://localhost:8080/ipfs/");
  const [imgUrl, setImageUrl] = useState("./ipfs.png");

  //Function to submit file to IPFS
  const submitToIPFSLocal = async (e) => {
    e.preventDefault();

    if (!fileBuffer) {
      setLoadingMsg("Please select a file");
      return;
    }
    setLoading(true);
    setLoadingMsg("File is being uploaded to IPFS");

    if (srcIpfs === "local") {
      for await (const result of ipfsLocal.add(fileBuffer)) {
        setResourceHash(result.path);
        setLoading(false);
        setLoadingMsg("Data stored succesfully on IPFS with above hash");
      }
    } else if (srcIpfs === "infura") {
      for await (const result of ipfsInfura.add(fileBuffer)) {
        setResourceHash(result.path);
        setLoading(false);
        setLoadingMsg("Data stored succesfully on IPFS with above hash");
      }
    } else {
      console.log("else");
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

  //Toggle IPFS network
  const toggleIpfsNetwork = () => {
    if (srcIpfs === "local") {
      setSrcIpfs("infura");
      setResUrl("https://ipfs.io/ipfs/");
      setImageUrl("./infura.jpg");
    } else {
      setSrcIpfs("local");
      setResUrl("http://localhost:8080/ipfs/");
      setImageUrl("./ipfs.png");
    }
  };

  return (
    <div className="App">
      <h1>IPFS File Upload</h1>
      <h2>You are on network {srcIpfs}</h2>
      <div>
        <img src={imgUrl} className="networkImage" alt="ss-images" />
      </div>
      <div className="center">
        <h2>Switch network</h2>
        <input type="checkbox" name="" onClick={toggleIpfsNetwork} />
      </div>
      <hr />
      <input type="file" onChange={readFile} />

      <hr />

      <p>{resourceHash}</p>
      <hr />
      <div>
        {loading && <span>Loading...</span>}
        <p>{loadingMsg}</p>
        <button className="appBtn" type="button" onClick={submitToIPFSLocal}>
          Upload to IPFS
        </button>
        {resourceHash && (
          <a
            href={`${resUrl}${resourceHash}`}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <button className="appBtn">
              <i className="fas fa-download" />
              Download From IPFS network
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
