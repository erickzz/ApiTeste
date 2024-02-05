import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { PostsRoutes } from './routes/posts'
import { usersRoutes } from './routes/users'

const app = Fastify({
    logger: true
});

app.register(cors, {
    origin: '*'
});

app.register(PostsRoutes);
app.register(usersRoutes);

  app.listen({port: 3000}, (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
  })