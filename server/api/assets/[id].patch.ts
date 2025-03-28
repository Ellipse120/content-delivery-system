import { z } from 'zod'
import { assertInfoSchema } from '#shared/zschema/index'

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
        id: z.string().length(36)
  }).parse)
  
  const assetInfo = await readValidatedBody(event, assertInfoSchema.parse)

  const key = ['assets', id]
  const kv = await useKv()
  const op = kv.atomic()
  op.set(key, assetInfo)
  await op.commit()

  return await kv.get(key)
})
