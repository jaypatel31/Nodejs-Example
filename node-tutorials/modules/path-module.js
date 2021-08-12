const path = require('path');

console.log("Dir name : " + path.basename(__filename));
console.log("File Name : " + path.dirname(__filename));
console.log("Ext Name : " + path.extname(__filename));
console.log("Parse : " + path.parse(__filename));
console.log("Join : " + path.join(__dirname,'order','app.js'));