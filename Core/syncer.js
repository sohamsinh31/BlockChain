const Blockchain = require('./blockchain');
const Pubsub = require('./publicsubscribe');
const request = require('request');

const blockchain = new Blockchain();
const pubsub = new Pubsub({blockchain})
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

setTimeout(()=>pubsub.broadcastChain(),1000);

const synChains=()=>{
    request({url:`${ROOT_NODE_ADDRESS}/api/core/blocks`},
    (error,response,body)=>{
        if(!error && response.statusCode === 200){
            const rootChin = JSON.parse(body);
            console.log('Replace chain on sink with',rootChin)
            blockchain.replaceChain(rootChin)
        }
    })
}

module.exports = synChains;