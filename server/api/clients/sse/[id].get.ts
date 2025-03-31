import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().length(36)
  }).parse)

  // watch kv collection changes, then send stream
  const kv = await useKv()
  const key = ['clients-assets', id, 'assets-id']

  const stream = kv.watch([key]).getReader()
  setHeader(event, 'content-type', 'text/event-stream')

  const body = new ReadableStream({
    async start(controller) {
      while (true) {
        try { 
          if ((await stream.read()).done) {
            return
          }

          const m = (await kv.get(key)).value
          const chunk = `data: ${JSON.stringify(m)}\n\n`
          controller.enqueue(new TextEncoder().encode(chunk))
        } catch (e) {
          console.error(`Error: ${id}`, e)
        }
      }
    },
    cancel() {
      stream.cancel()
    }
  })

  return sendStream(event, body)
})
