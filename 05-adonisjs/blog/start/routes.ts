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

router.get('/', async ({ view})=>{
    const posts = await db.from('post')
                          .select('*')
                          .orderBy('date', 'desc')
    console.log(posts)
    return view.render('pages/home', { posts })
})

router.get('/post/create', async ({ view })=>{
    return view.render('pages/create')
})

router.post('/post/create', async ({ response, request })=>{
   
    const { title, teaser, text } = request.all()
    // Wunder

    return response.redirect('/')
})