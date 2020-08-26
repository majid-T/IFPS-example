# IPFS sample project using react

This is a simple demonstration on how to hash a file, then store its hash on public blockchain (here
ehthereum) and store the original file on IPFS. Later we can use that hash to retrive the file from IPFS.

![Lab screenshot](/screenshot.png)

Some notes:

Note: if using localhosted IPFS remember to allow CORS on config file in .ipfs directory

```javascript
   "API": {
    "HTTPHeaders": {
      "Access-Control-Allow-Origin": [
        "*"
      ]
    }
  },
```

## If using local IPFS

If you are trying to use local IPFS you should donwload and run ipfs daemon before connectiong to it.

---

### Technologies and tools used in this project

- [Solidity] (https://solidity.readthedocs.io/en/v0.7.0/) - Programing language for Ethereum.
- [ReactJS](https://reactjs.org/) - Frontend javascript library
- [Bootstrap](https://getbootstrap.com/) - CSS library for responsive mobile first design
