import ollama from 'ollama'

export default defineEventHandler(() => {
  ollama.abort()
  return 'Ollama aborted'
})
