import { AuthenticateUserUseCase } from "@/core/use-cases/user/authenticate";
import { InMemorieUserUseCase } from "@/infraestrutura/repositories/in-memorie/in-memorie-user-use-case";
import { hash } from 'bcryptjs';
import { describe, it, beforeEach, expect } from "vitest";

let inMemoryUser: InMemorieUserUseCase
let sut: AuthenticateUserUseCase

describe('Authenticate use case',()=>{
  beforeEach(()=>{
      inMemoryUser = new InMemorieUserUseCase()
      sut = new AuthenticateUserUseCase(inMemoryUser)
  })

  it('should be possible authenticate', async ()=> {
    
    const hashPassword = await hash('1234',6);

    await inMemoryUser.create({
      name: 'Osvaldo Ossan',
      email: 'osvaldo@gmail.com',
      password: hashPassword,
      role: 'CLIENT',
      phone: '0234'
    })

    const {user} = await sut.execute({
      email: 'osvaldo@gmail.com',
      password: '1234'
    })

    expect(user).toHaveProperty('id')

  })

  it('should not be possible authenticate with wrong password', async ()=>{
    const hashPassword = await hash('1234',6);

    await inMemoryUser.create({
      name: 'Osvaldo Ossan',
      email: 'osvaldo@gmail.com',
      password: hashPassword,
      role: 'CLIENT',
      phone: '0234'
    })

    expect(()=> sut.execute({
      email: 'osvaldo@gmail.com',
      password: '123'
    })).rejects.toBeInstanceOf(Error)

  })

  it('should not be possible authenticate with wrong password', async ()=> {
    
    const hashPassword = await hash('1234',6);
    
    await inMemoryUser.create({
      name: 'Osvaldo Ossan',
      email: 'osvaldo@gmail.com',
      password: hashPassword,
      role: 'CLIENT',
      phone: '0234'
    })

    expect(()=> sut.execute({
      email: 'osvald@gmail.com',
      password: '1234'
    })).rejects.toBeInstanceOf(Error)
  })

})