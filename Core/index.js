const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const request = require('request');
const Blockchain = require('./blockchain');
const Pubsub = require('./publicsubscribe');

const app = express();
const blockchain = new Blockchain();
const pubsub = new Pubsub({blockchain})
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(()=>pubsub.broadcastChain(),1000);

app.use(bodyParser.json());
app.get("/api/blocks",(req,res)=>{
    res.json(blockchain.chain)
});

app.post("/api/mine",(req,res)=>{
    const {data} = req.body;

    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('api/blocks')
});

const synChains=()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},
    (error,response,body)=>{
        if(!error && response.statusCode === 200){
            const rootChin = JSON.parse(body);
            console.log('Replace chain on sink with',rootChin)
            blockchain.replaceChain(rootChin)
        }
    })
}

let PEER_PORT;

if(process.env.GENERATE_PEER_CODE==='true'){
    PEER_PORT=DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const PORT=PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>{
    console.log(`listening to PORT : ${PORT}`);
    synChains();
});