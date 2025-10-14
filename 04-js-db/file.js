const fs = require('fs')
let data = fs.readFileSync('ein_text.txt')
console.log(data.toString())