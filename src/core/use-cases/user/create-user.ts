import { UserRepository } from "@/core/interfaces/user-repository";
import { User, UserRole } from "@prisma/client";
import { hash, compare } from "bcryptjs";

interface CreateUserUseCaseRequest {
  email: string  
  password: string
  name: string
  role: UserRole
  phone: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository){}
  
  async execute(data: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse>
  { 
      const findUserWithSameEmail = await this.userRepository.findByEmail(data.email)
      
      if(findUserWithSameEmail)
      {
        throw new Error('This email is already')
      }

      const hash_password = await hash(data.password, 6)

      const user = await this.userRepository.create({
        name: data.name,
        email: data.email,
        password: hash_password,
        phone: data.phone ?? null,
        role: data.role ?? 'CLIENT',
      })

      return { user } 
  }

}