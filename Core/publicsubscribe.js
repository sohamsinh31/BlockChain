const redis = require('redis')

const CHANNELS = {
    TEST:'TEST'
}
class pubsub {
    constructor(){
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subcribe(CHANNELS.TEST);

        this.subscriber.on('message',(channel,message)=>this.handleMessage(channel,message))

        
    }
    handleMessage(channel,message){
        console.log(`message recieved.channel : ${channel} Message : ${message}`)
    }

}

const checkPubSub = new pubsub();
setTimeout(
    ()=> checkPubSub.publisher.publish(CHANNELS.TEST,"Hello"),
    1000
);