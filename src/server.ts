import fastify from "fastify";

export const app = fastify()


app.listen({
  port: 5432,
  host: '0.0.0.0'
},()=> {
  console.log('✨ Server is running!')
})