// import ipfsHttpClient from "ipfs-http-client";

// const ipfs = ipfsHttpClient("http://127.0.0.1:5001/");

const ipfsApi = require("ipfs-api");
const ipfs = new ipfsApi("localhost", "5001", { protocol: "http" });
export default ipfs;
