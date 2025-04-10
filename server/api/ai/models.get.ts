import ollama from 'ollama'

export default defineEventHandler(async () => {
  const response = await ollama.list()

  return response
})
