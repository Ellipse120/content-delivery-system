import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().length(36)
  }).parse)

  const body = await readBody(event)
  const kv = await useKv()
  const key = ['clients-assets', id, 'assets-id']
  await kv.set(key, body)

  return await kv.get(key)
})
