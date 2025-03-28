import type { ClientInfo } from '#shared/types/types'

export default eventHandler(async (event) => {
  const id = useRandomUUID()
  const kv = await useKv()

  const key = ['client', id]
  const v = await kv.get(key)

  if (!v.value) {
    const now = formatDate(new Date())

    const clientInfo: ClientInfo = {
      id,
      location: '',
      online: true,
      assets: [],
      createdAt: now,
      updatedAt: now,
    }

    await kv.set(key, clientInfo)
  }

  return sendRedirect(event, `/${id}`)
})
