import { UserRepository } from "@/core/interfaces/user-repository";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemorieUserUseCase implements UserRepository {

  public items: User [] = []

  async findById(userId: string) {
     return this.items.find((item) => item.id === userId) ?? null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if(!user)
    {
      return null
    }

    return user
  }

  async  create(data: Prisma.UserCreateInput) {
        const user = {
          id: data.id ?? randomUUID(),        
          email: data.email,     
          password: data.password,  
          name: data.name,      
          role: data.role ?? 'CLIENT',      
          phone: data.phone ?? null,
          createdAt: new Date(),    
          updatedAt: new Date()
        }

        this.items.push(user)

        return user
  }

}