const {GENESIS_DATA} = require("./config");
const cryptoHash = require("./crypto-hash");//hii

class Block{
    constructor({timestamp,prevHash,hash,data ,nonce , difficulty }){ 
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash = prevBlock.hash;
        const {difficulty} = prevBlock;

        let nonce = 0;
        do{
            nonce++;
            timestamp=Date.now();
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty)
        }while(hash.substring(0,difficulty) !== "0".repeat(difficulty));
        return new this({
            timestamp , 
            prevHash , 
            data ,
            difficulty ,
            nonce ,
            hash,
        });
    }
}  

const block1 = new Block({timestamp :"2/09/22",
    hash : '0xacb',
    prevHash : '0xc12',
    data : 'hello',
    });
// const block2 = new Block("03/09/22","0xc12","123","Hello world");
// console.log(block1,block2);

//genesis block call
// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineBlock({prevBlock : block1 ,data : "block2"});
// console.log(result);

module.exports = Block;
