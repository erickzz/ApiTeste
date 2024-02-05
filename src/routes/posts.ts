import { FastifyInstance, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma"

interface Post {
    id: string
    title: string
    content: string
    authorId: string
}

export const PostsRoutes = async (app: FastifyInstance) => {
    app.get('/posts', async () => {
        const posts = await prisma.post.findMany()
        return posts
    })

    app.post('/posts', async (request: FastifyRequest<{Body:Post}>) => {
        const {title,content,authorId} = request.body
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: 'f1ab9893-3e4b-4a9c-a725-47dce6905b2d'
            }
        })
        return post
    })
    
    app.get('/posts/:id', async (request:FastifyRequest<{Params:{id:string}}>, reply) => {
        const id = request.params.id
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })
        return post

    })
    app.put('/posts/:id', async (request:FastifyRequest<{Params:{id:string},Body:Post}>, reply) => {
        const id = request.params.id
        const {title,content,authorId} = request.body
        const post = await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
                authorId
            }
        })
        return post
    })
    app.delete('/posts/:id', async (request:FastifyRequest<{Params:{id:string}}>, reply) => {
        const id = request.params.id
        const post = await prisma.post.delete({
            where: {
                id
            }
        })
        return post
    })
}