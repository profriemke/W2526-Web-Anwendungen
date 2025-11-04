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

router.get('/post/:id', async ({ view, params })=>{
    console.log(params.id)
    const post = await db.from('post')
                         .select('*')
                         .where('id', params.id)
                         .first()
    console.log(post)
    return view.render('pages/post', {post})
})





router.post('/post/create', async ({ response, request })=>{
   
    const { title, teaser, text } = request.all()

    if(!title || !teaser || !text){
        return response.redirect('/post/create')
    }

    const result = await db.table('post').insert({
        title: title,
        teaser: teaser,
        text: text,
        date: new Date().toString(),
        author: 'omm'
    })
    console.log(result)
    return response.redirect('/')
})





router.get('/a', async ({ session })=>{
    session.put('nachricht', 'OMM!')
    return 'gesetzt'
})

router.get('/b', async ({ session})=>{
    return session.get('nachricht')
})
router.get('/counter', async ({ session })=>{
    let counter = session.get('counter')
    console.log(counter)
    if(counter == undefined){
        counter =0
    }
    counter = counter +1
    session.put('counter', counter)
    return counter
})