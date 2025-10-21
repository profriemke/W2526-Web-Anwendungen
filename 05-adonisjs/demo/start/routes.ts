/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

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
    return view.render('pages/nutzerausgabe', {vorname, nachname})
})