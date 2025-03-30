import 'dotenv/config'
import {z} from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev','production']).default('dev')
})

const _env = envSchema.safeParse(process.env)


if(_env.success === false)
{
    console.log('Invoiroinment inválid', _env.error.format())
    throw new Error('Invoiroinment inválid')
}

export const env = _env.data