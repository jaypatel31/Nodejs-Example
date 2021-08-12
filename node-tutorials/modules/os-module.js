const os = require('os');

console.log('Os type: ',os.type());

console.log('Os platform: ',os.platform());

console.log('CPU architecture: ',os.arch());

console.log('CPU Details: ',os.cpus());

console.log('Free Memory: ',os.freemem());

console.log('Total Memory: ',os.totalmem());

console.log(`Running since: ${(os.uptime()*0.00027778)} hr`);




