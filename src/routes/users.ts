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
    app.get('/users', async () => {
        const users = prisma.user.findMany()
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
    app.get('/users/:id', async () => {
        return {hello: 'users'}
    })
    app.put('/users/:id', async () => {
        return {hello: 'users'}
    })
    app.delete('/users/:id', async () => {
        return {hello: 'users'}
    })

}