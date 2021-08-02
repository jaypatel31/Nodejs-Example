const EventEmitter = require('events');

const customEmitter = new EventEmitter()

customEmitter.on('response',(name,id)=>{
    console.log(`Data Recieved of ${name} with ${id}`)
})

customEmitter.on('response',()=>{
    console.log(`Data Recieved2`)
})

customEmitter.emit('response','Jay',49);