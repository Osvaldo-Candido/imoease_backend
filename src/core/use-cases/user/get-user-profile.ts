import { UserRepository } from "@/core/interfaces/user-repository";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {

  constructor(private userRepository: UserRepository){}
  
  async execute(data: GetUserProfileUseCaseRequest ): Promise<GetUserProfileUseCaseResponse>{
    const user = await this.userRepository.findById(data.userId)

    if(!user)
    {
      throw new Error('There is not this user')
    }

    return {user}
  }
}