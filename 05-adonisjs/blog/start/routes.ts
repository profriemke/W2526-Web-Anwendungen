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
import hash from '@adonisjs/core/services/hash'

router.get('/edit/:id', async ({ view, params, response, session }) => {
    if (session.get('login') === undefined) {
        return response.redirect('/login')
    }
    console.log(params.id)
    const post = await db.from('post').select('*').where({ id: params.id }).first()
    if (!post) {
        return response.redirect().back()
    }
    console.log(post)
    return view.render('pages/edit', post)
})

router.post('/edit', async ({ request, response, session }) => {
    if (session.get('login') === undefined) {
        return response.redirect('/login')
    }
    const { id, title, teaser, text } = request.all()
    if (!id || !title || !teaser || !text) {
        return response.redirect().back()
    }
    const result = await db.from('post')
        .update({
            title,
            teaser,
            text
        })
        .where({
            id: id
        })

    if (!result) {
        return 'Fehler'
    }
    return response.redirect('/post/' + id)
})



router.get('/about', async ({ view }) => {
    return view.render('pages/about')
})
router.get('/register', async ({ view }) => {
    return view.render('pages/register')
})
router.post('/register', async ({ request, response, view, session }) => {
    const { firstname, lastname, login, password } = request.all()
    let error = ''
    if (!firstname) {
        error += 'Vorname fehlt. '
    }
    if (!lastname) {
        error += 'Nachname fehlt. '
    }
    if (!login) {
        error += 'Login fehlt. '
    }
    if (!password) {
        error += 'Passwort fehlt. '
    }
    if (error != '') {
        session.flash('notification', {
            type: 'error',
            message: error
        })
        return response.redirect().back()
    }
    const exists = await db.from('user')
        .select('*')
        .where({
            login: login
        })
    if (exists.length > 0) {
        return view.render('pages/register', { error: 'login bereits vergeben' })
    }
    const result = await db.table('user')
        .insert({
            firstname: firstname,
            lastname: lastname,
            login: login,
            password: await hash.make(password)
        })

    return response.redirect('/login')
})

router.get('/logout', async ({ session, response }) => {
    session.forget('login')
    session.forget('firstname')
    session.forget('lastname')
    return response.redirect('/')
})

router.get('/login', async ({ view }) => {
    return view.render('pages/login')
})

router.post('/login', async ({ request, response, session }) => {
    const { login, password } = request.all()
    if (!login || !password) {
        return response.redirect('login')
    }
    const user = await db.from('user')
        .select('*')
        .where({
            login: login
        }).first()
    console.log(user)
    if (!user) {
        console.log('kein user gefunden')
        return response.redirect('/login')
    }
    if (await hash.verify(user.password, password)) {
        console.log('user angemeldet')
        session.put('login', user.login)
        session.put('firstname', user.firstname)
        session.put('lastname', user.lastname)
        return response.redirect('/')
    }
    console.log('passwort falsch')
    return response.redirect('/login')
})


router.get('/', async ({ view, session }) => {
    const posts = await db.from('post')
        .select('*')
        .orderBy('date', 'desc')
    console.log(posts)
    return view.render('pages/home', { posts, login: session.get('login'), firstname: session.get('firstname'), lastname: session.get('lastname') })
})

router.get('/post/create', async ({ view, session, response }) => {
    if (session.get('login') === undefined) {
        return response.redirect('/login')
    }
    return view.render('pages/create')
})

router.post('/post/create', async ({ response, request, session }) => {

    if (session.get('login') === undefined) {
        return response.redirect('/login')
    }

    const { title, teaser, text } = request.all()

    if (!title || !teaser || !text) {
        return response.redirect('/post/create')
    }

    const result = await db.table('post').insert({
        title: title,
        teaser: teaser,
        text: text,
        date: new Date().toString(),
        author: session.get('login')
    })
    console.log(result)
    return response.redirect('/')
})



router.get('/post/:id', async ({ view, params, session }) => {
    console.log(params.id)
    const post = await db.from('post')
        .select('*')
        .where('id', params.id)
        .first()
    const author = await db.from('user')
        .select(['firstname', 'lastname'])
        .where('login', post.author)
        .first()

    console.log(post)
    return view.render('pages/post', { post, author, login: session.get('login') })
})





router.get('/a', async ({ session }) => {
    session.put('nachricht', 'OMM!')
    return 'gesetzt'
})

router.get('/b', async ({ session }) => {
    return session.get('nachricht')
})

router.get('/counter', async ({ session }) => {
    let counter = session.get('counter')
    console.log(counter)
    if (counter == undefined) {
        counter = 0
    }
    counter = counter + 1
    session.put('counter', counter)
    return counter
})

router.get('/password', async () => {
    const hashedPassword = await hash.make('123')
    return hashedPassword
})