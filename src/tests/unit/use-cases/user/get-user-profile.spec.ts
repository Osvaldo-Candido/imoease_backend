import { GetUserProfileUseCase } from "@/core/use-cases/user/get-user-profile";
import { InMemorieUserUseCase } from "@/infraestrutura/repositories/in-memorie/in-memorie-user-use-case";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryUser: InMemorieUserUseCase
let sut:GetUserProfileUseCase

describe('Get profile use case',()=>{

  beforeEach(()=> {
    inMemoryUser = new InMemorieUserUseCase()
    sut = new GetUserProfileUseCase(inMemoryUser)
  })

  it('Should find user by id', async ()=>{
        await inMemoryUser.create({
          id: 'user-1',
          name: 'Ossan',
          email: 'ossan@gmail.com',
          password: '123',
          role: 'CLIENT',
          phone: '93862850*'
        })

        const {user} = await sut.execute({userId: 'user-1'})

        expect(user.email).toEqual(expect.any(String))
        expect(inMemoryUser.items).toHaveLength(1)
  })

  it('should not be possible find user with wrong id', async ()=> {
      await inMemoryUser.create({
          id: 'user-1',
          name: 'Ossan',
          email: 'ossan@gmail.com',
          password: '123',
          role: 'CLIENT',
          phone: '93862850*'
      })

      await expect(()=> 
        sut.execute({userId: 'user-2'})
      ).rejects.toBeInstanceOf(Error)
  })

 
})
