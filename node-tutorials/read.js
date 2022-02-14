const fs = require("fs");

fs.readFile("ipl.xlsx", 'utf8' ,async (err, data) => {
    console.log(data);
})