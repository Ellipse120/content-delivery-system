import { z } from 'zod'

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, z.object({
      id: z.string().length(36)
    }).parse)
    const kv = await useKv()
    const key = ['assets', id]
  
    return await kv.get(key)
})
