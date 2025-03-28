export default eventHandler(async () => {
  const kv = await useKv()
  const entries = kv.list({
    prefix: ['assets'],
  })

  const values = []
  for await (const entry of entries) {
    values.push(entry)
  }

  return values
})
