import { FastifyInstance, FastifyRequest } from "fastify"
import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt'

interface User {
    id: string
    name: string
    email: string
    password: string
}

export const usersRoutes = async (app:FastifyInstance) => {
    app.get('/users', async (request: FastifyRequest<{ Querystring: { name?: string } }>) => {
        if(request.query.name) {
            const users = await prisma.user.findMany({
                where: {
                    name: {
                        contains: request.query.name as string
                    }
                }
            })
            return users
        }
        const users = prisma.user.findMany();
        return users

    })

    app.post('/users', async (request: FastifyRequest<{Body:User}>) => {
        const {name,email,password} = request.body
       const cryptedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: cryptedPassword
            }
        })
        return user
    })
    app.get('/users/:id', async (request: FastifyRequest<{ Params: { id: string } }>) => {
        const id = request.params.id
        const user = prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    })
    app.put('/users/:id', async (request: FastifyRequest<{Body:User,Params:{id:string}}>) => {
        const id = request.params.id
        const {name,email,password} = request.body
        const user = prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password
            }
        })
        return user
    })
    app.delete('/users/:id', async (request:FastifyRequest<{Params:{id:string}}>) => {
        const id = request.params.id
        const deletePosts = prisma.post.deleteMany({
            where: {
                authorId: id
            }
        })
        const deleteUser = prisma.user.delete({
            where: {
                id
            }
        })
        const transaction = await prisma.$transaction([deletePosts, deleteUser])
        return transaction
    })

}