import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { patrimonioRoutes } from './routes/patrimonios';
import 'dotenv/config'
// import { authRoutes } from './routes/auth';
// import { uploadRoutes } from './routes/upload';
import { resolve } from 'path';

const app = fastify()

// app.register(require('@fastify/static'), {
//   root: resolve(__dirname, '../uploads'),
//   prefix: '/uploads'
// })

app.register(cors, {
  origin: true
})

// app.register(jwt, {
//   secret: 'spacetime'
// }) 

app.register(patrimonioRoutes)
// app.register(authRoutes)
// app.register(uploadRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🐱‍👤 Https server running on https://localhost:3333')
  })
