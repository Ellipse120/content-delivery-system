export default eventHandler(async (event) => {
  const id = globalThis.crypto.randomUUID()
  const kv = await useKv()

  const key = ['client', id]
  const v = await kv.get(key)

  if (!v.value) {
    const clientInfo = {
      id,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    }
    await kv.set(key, clientInfo)
  }

  return sendRedirect(event, `/${id}`)
})
