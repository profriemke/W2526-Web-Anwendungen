const person = {
    vorname: 'Meta',
    nachname: 'Meier',
    alter: 25,
    write: function(){
        console.log(`Vorname: ${this.vorname}, Nachname: ${this.nachname} und bin ${this.alter} Jahre alt.`)
        return ''
    }
}

person.alter = 26

console.log(person.alter)
console.log(person.write())