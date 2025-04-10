import ollama from 'ollama'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const message = { role: 'user', content: query.message || 'Say Hi' }

  const response = await ollama.chat({
    model: query.modelName ?? 'llama3.2',
    messages: [message],
    stream: true
  })

  const stream = new ReadableStream({
    async pull(controller) {
      for await (const part of response) {
        if (part.done) {
          controller.close()
        }
        
        controller.enqueue(part.message.content)
      }
    },
  })
  
  return sendStream(event, stream)
})
