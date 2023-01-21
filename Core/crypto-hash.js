const crypto = require ('crypto')

const cryptoHash = (...inputs ) => {         //multiple inputs
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(''));
    return hash.digest('hex');
};

result = cryptoHash("Hello" , "world");
module.exports=cryptoHash;
// console.log(result);