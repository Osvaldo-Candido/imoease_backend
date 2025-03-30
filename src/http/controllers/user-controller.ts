import { FastifyRequest, FastifyReply } from "fastify";
import { createUserSchema } from "@/schemas/user";

class UserController {
  create(request: FastifyRequest, reply: FastifyReply){
    try {
      const dataValidate = createUserSchema.parse(request.body)
    } catch (error) {
      
    }
  }
}