const Emitter = require('events');
const { inherits } = require('util');

// const myEmitter = new Emitter();

// myEmitter.on('somename',(data) => {
//     console.log(data);
// })

// myEmitter.emit('somename',{
//     name:'Jay'
// });


class Auth extends Emitter {
    register(username){
        console.log(`Registered succesfully...`);
        this.emit('registerd',username)
    }
}

const auth = new Auth()
//Listner


auth.on('registerd',(data)=>{
    console.log(`Email Sent Successfully to ${data}`);
})

auth.on('registerd',(data)=>{
    console.log(`Welcome ${data}`);
})

auth.register('Jay');