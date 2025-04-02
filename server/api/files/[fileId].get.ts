import { z } from 'zod'
import {  readdir } from 'node:fs/promises'

export default defineEventHandler(async (event) => {
  const { fileId } = await getValidatedRouterParams(event, z.object({
    fileId: z.string().length(36)
  }).parse)

  const files = await readdir(getUploadFoler())
  const file = files.find((f: string) => f.startsWith(fileId))
  if (!file) {
    throw createError({
      statusCode: 404,
      message: 'File not found',
    })
  }

  return getFileInfo(file)
})
