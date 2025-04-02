import { readdir } from 'node:fs/promises'

export default defineEventHandler(async () => {
  const files = await readdir(getUploadFoler())
  return files.map(getFileInfo).filter(Boolean)
})
