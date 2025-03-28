import { assertInfoSchema } from '#shared/zschema/index'

export default eventHandler(async (event) => {
  const assetInfo: AssetInfo = await readValidatedBody(event, assertInfoSchema.parse)

  const kv = await useKv()
  const key = ['assets', assetInfo.id]
  const op = kv.atomic()
  op.set(key, assetInfo)
  await op.commit()

  return assetInfo
})
