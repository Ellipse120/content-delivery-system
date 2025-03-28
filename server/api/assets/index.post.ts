import { assertInfoSchema } from '#shared/zschema/index'

export default eventHandler(async (event) => {
  const assetInfo = await readValidatedBody(event, assertInfoSchema.parse)

  const v = {
    ...assetInfo,
    id: useRandomUUID(),
    createdAt: formatDate(new Date()),
    updatedAt: formatDate(new Date()),
  }
  const kv = await useKv()
  const key = ['assets', v.id]
  const op = kv.atomic()
  op.set(key, v)
  await op.commit()

  return await kv.get(key)
})
