import { CreateUserUseCase } from '@/core/use-cases/user/create-user'
import { InMemorieUserUseCase } from '@/infraestrutura/repositories/in-memorie/in-memorie-user-use-case'
import {describe, it, beforeEach, expect} from 'vitest'

let inMemoryUser: InMemorieUserUseCase
let sut: CreateUserUseCase

describe('Create user use case',()=> {
  beforeEach(()=> {
        inMemoryUser = new InMemorieUserUseCase()
        sut = new CreateUserUseCase(inMemoryUser)
  })

  it('should be possible create user', async ()=>{

    const {user} = await sut.execute({
          name: 'João',
          email: 'ossan@gmail.com',
          phone: '9',
          password: '1234',
          role: 'CLIENT'
    }) 

    expect(user).toHaveProperty('id')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be possible create two user with same emails', async ()=> {
    await inMemoryUser.create({
          name: 'Osvaldo Ossan',
          email: 'osvaldo@gmail.com',
          password: '1234',
          role: 'CLIENT',
          phone: '0234'
    })

    await expect(()=> sut.execute({
          name: 'Osvaldo Ossan',
          email: 'osvaldo@gmail.com',
          password: '1234',
          role: 'CLIENT',
          phone: '0234'
    })).rejects.toBeInstanceOf(Error)
  })
})