import type { ClientInfo } from '#shared/types/types';

export default eventHandler(async (event) => {
  const id = useRandomUUID()
  const kv = await useKv()

  const key = ['client', id]
  const v = await kv.get(key)

  if (!v.value) {
    const now = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })

    const clientInfo: ClientInfo = {
      id,
      createdAt: now,
      updatedAt: now,
    }

    await kv.set(key, clientInfo)
  }

  return sendRedirect(event, `/${id}`)
})
