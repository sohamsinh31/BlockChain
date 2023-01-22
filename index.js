const bodyParser = require('body-parser');
const { response } = require('express');
const request = require('request');
const express = require('express');

const app = express();
const core = require("./Core/index");
const DEFAULT_PORT = 3000;
const synChains = require("./Core/syncer")

app.use(bodyParser.json());
app.use('/api/Core',core)
app.get("/blocks",(req,res)=>{
    res.json(blockchain.chain)
});

app.post("/mine",(req,res)=>{
    const {data} = req.body;

    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/blocks')
});
let PEER_PORT;

if(process.env.GENERATE_PEER_CODE==='true'){
    PEER_PORT=DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const PORT=PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>{
    console.log(`listening to PORT : ${PORT}`);
    synChains();
});