const INITIAL_DIFFICULTY = 2;
const MINE_RATE = 1000;     //always in mili seconds

const GENESIS_DATA = {
    timestamp: 1,
    prevHash: "0x000",
    hash: "0x123",
    difficulty:INITIAL_DIFFICULTY,
    nonce :0,
    data: []
}
module.exports = { GENESIS_DATA,MINE_RATE };