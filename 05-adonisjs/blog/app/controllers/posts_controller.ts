import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'

export default class PostsController {
    public async index({ view, session }: HttpContext) {

        const posts = await db.from('post')
            .select('*')
            .orderBy('date', 'desc')
        console.log(posts)
        return view.render('pages/home', { posts, login: session.get('login'), firstname: session.get('firstname'), lastname: session.get('lastname') })
    }

    public async edit({ session, params, response, view }: HttpContext) {
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
    }
    public async create({ session, request, response}:HttpContext) {

        if (session.get('login') === undefined) {
            return response.redirect('/login')
        }

        const { title, teaser, text } = request.all()
        const image = request.file('image',  {size: '5mb', extnames: ['jpg', 'png']})
        if(image == undefined || !image.isValid){
            return response.redirect('/post/create') 
        }

        if (!title || !teaser || !text) {
            return response.redirect('/post/create')
        }

        const key = `${cuid()}.${image.extname}`
        console.log('Key: '+key)
        await image.moveToDisk(key, 'fs')
        console.log(await drive.use('fs').getUrl(key))


        const result = await db.table('post').insert({
            title: title,
            teaser: teaser,
            text: text,
            date: new Date().toString(),
            author: session.get('login'),
            image: key
        })
        console.log(result)
        return response.redirect('/')
    }
}
