let zeug = ['Baum', 'Blume', 'Katze', 'HdM']

console.log(zeug[2])

console.table(zeug)

console.log(zeug.length)
zeug.push('Regen')
zeug.unshift('Nebel')

for(let i=0; i<zeug.length; i++){
    console.log(zeug[i])
}