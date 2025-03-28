import { z } from 'zod'
import { clientInfoSchema } from '#shared/zschema/index'

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().length(36)
  }).parse)

  const clientInfo = await readValidatedBody(event, clientInfoSchema.parse)

  const kv = await useKv()
  const op = kv.atomic()
  op.set(['client', id, clientInfo.id], clientInfo)
  await op.commit()

  return clientInfo
})
