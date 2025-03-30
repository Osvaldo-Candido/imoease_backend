import { UserRepository } from "@/core/interfaces/user-repository";
import { User } from "@prisma/client";
import { hash, compare } from "bcryptjs";

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
} 

interface AuthenticateUserUseCaseResponse {
  user: User
}

export class AuthenticateUserUseCase {
  
  constructor(private userRepository: UserRepository){}
  
  async execute(data: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse>{
    const user = await this.userRepository.findByEmail(data.email)

    if(!user)
    {
      throw new Error('Email or password wrong')
    }

    const isPasswordRight = await compare(data.password, user.password)

    if(!isPasswordRight)
    {
      throw new Error('Email or password wrong')
    }

    return {user}
  }
}