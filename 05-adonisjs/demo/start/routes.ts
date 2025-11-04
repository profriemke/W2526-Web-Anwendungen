/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

let counter = 0

const votes = {
    spitze: 0,
    geht: 0,
    weg: 0
}


router.get('/kunden', async () => {

 const kunden = await db.from('kunde')
                        .select('*')
                        .where({ort:'Stuttgart', autofarbe:'white'})
                        .limit(10)
 return kunden
})

router.get('/vote', async ({ view })=>{
    return view.render('pages/vote')
})

router.post('/vote', async ({ view, request })=>{

    const vote = request.input('vote')
    
    if(vote === 'spitze'){
        votes.spitze++
    }
    if(vote === 'geht'){
        votes.geht++
    }
    if(vote === 'weg'){
        votes.weg++
    }
    return view.render('pages/vote_result', { votes })
})

router.get('/counter', async ({ view }) => {
    counter ++
    return view. render('pages/counter.edge', {counter})

})

router.get('/', async ({ view }) => {
   // console.log(await view.render('pages/home.edge'))
    return view.render('pages/home.edge', 
           {name: 'Horst', tier1: 'Elefant', tier2:'Maus', faecher:['Mathe', 'Phyisk', 'Sport', 'Lebensweisheiten']})
})

router.get('/omm', async () => {
    const zielgruppe = 'Studis'
    return 'Hallo ' + zielgruppe
})

router.get('/data', async (ctx) => {
    return ctx

})

router.get('/nutzer', async ({view})=>{
    return view.render('pages/nutzerformular')
})

router.post('/nutzer/ausgabe', async ({ view, request})=>{
    const vorname = request.input('vorname')
    const nachname = request.input('nachname')
    /*
    if(!vorname){
        return 'Fehler: Vorname fehlt'
    }
    if(!nachname){
        return 'Fehler: Nachname fehlt'
    } */
    return view.render('pages/nutzerausgabe', {vorname, nachname})
})