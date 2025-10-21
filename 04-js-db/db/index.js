const Database = require('better-sqlite3')

const db = new Database('./kunde.sqlite')

let ort = "Stuttgart"

const getAllKunden = db.prepare("SELECT * FROM kunde WHERE ort=? LIMIT ?")


let kunden = getAllKunden.all(ort, 3)
console.log(kunden)


 kunden = getAllKunden.all('München', 1)
console.log(kunden)

//console.log(kunden[0])

console.log(kunden[0].plz)
