import { z } from 'zod'

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().length(36)
  }).parse)

  const clientInfo = await readValidatedBody(event, z.object({
    id: z.string().optional().default(() => globalThis.crypto.randomUUID()),
    createdAt: z.string().default(Date),
    updatedAt: z.string().default(Date),
  }).parse)

  const kv = await useKv()
  const op = kv.atomic()
  op.set(['client', id, clientInfo.id], clientInfo)
  await op.commit()

  return clientInfo
})
