import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { patrimonioRoutes } from './routes/patrimonios';
import 'dotenv/config'
import { usersRoutes } from './routes/users';
import { loginRoutes } from './routes/login';
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

app.register(jwt, {
  secret: "abdfab asdb asdbUD Q9JIOVC MNV W QB287123 bab j"
}) 

app.register(usersRoutes)
app.register(patrimonioRoutes)
app.register(loginRoutes)

app
  .listen({port: 3333})
  .then(() => {
    console.log('🐱‍👤 Https server running on https://localhost:3333')
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })