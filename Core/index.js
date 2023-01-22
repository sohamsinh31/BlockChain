const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain');
const Pubsub = require('./publicsubscribe');

const route = express.Router()
const blockchain = new Blockchain();
const pubsub = new Pubsub({blockchain})
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(()=>pubsub.broadcastChain(),1000);

route.get("/blocks",(req,res)=>{
    res.json(blockchain.chain)
});

route.post("/mine",(req,res)=>{
    const {data} = req.body;

    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.json(blockchain.chain);
});


module.exports = route;