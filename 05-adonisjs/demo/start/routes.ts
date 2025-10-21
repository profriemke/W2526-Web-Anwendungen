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
    return view.render('pages/home.edge', {name: 'Horst', tier1: 'Elefant', tier2:'Maus', faecher:[]})
})

router.get('/omm', async () => {
    const zielgruppe = 'Studis'
    return 'Hallo ' + zielgruppe
})

router.get('/data', async (ctx) => {
    return ctx

})