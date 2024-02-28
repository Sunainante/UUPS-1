const { ethers ,JsonRpcProvider} = require("ethers");
require('dotenv').config();

const PRIVATE_KEY = '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';
const CONTRACT_ADDRESS = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';


// import the ABI of contractV1
const { abi} = require("./artifacts/contracts/contractV2.sol/contractV2.json");

// create a provider and signer to connect to the network
const provider = new JsonRpcProvider('http://127.0.0.1:8545/');
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// create an instance of the upgradeable contract
const contractV1Instance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const getnumber = async () => {
    let b = await contractV1Instance.getValue();
    console.log("it is b");
    console.log(parseInt(b));
    const tx = await contractV1Instance.increaseValue(8825)
    await tx.wait();
    let a = await contractV1Instance.getValue();
    console.log("it is a");
    console.log(parseInt(a));
    return b;


}
const main = async () => {
    let b = await contractV1Instance.getValue();
    console.log(parseInt(b));
    const tx = await contractV1Instance.increaseValue(8825)
    await tx.wait();
    let a = await contractV1Instance.getValue();
    console.log(parseInt(a));
}
//main()

const express = require('express');
const app = express();

app.get('/111',async (req,res,next)=>{
    await getnumber();
    
    res.status(200).json({
        message : 'you are admin',
        df : "hi"
    });

});

app.get('/222',async (req,res,next)=>{
    await getnumber();
    
    res.status(200).json({
        message : 'you are minter',
        df : "hi"
    });

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});