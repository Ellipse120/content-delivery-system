import { z } from 'zod'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import {  readdir } from 'node:fs/promises'

const appConfig = useAppConfig()
const UPLOAD_DIR = join(process.cwd(), appConfig.UPLOAD_DIR)

const getFileInfo = (filename: string): FileInfo | null => {
  try {
    const stats = existsSync(join(UPLOAD_DIR, filename))
    if (!stats) return null
    
    return {
      id: filename.split('.')[0],
      filename,
      path: `${UPLOAD_DIR}/${filename}`,
      createdAt: formatDate(new Date())
    }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const { fileId } = await getValidatedRouterParams(event, z.object({
    fileId: z.string().length(36)
  }).parse)

  const files = await readdir(UPLOAD_DIR)
  const file = files.find((f: string) => f.startsWith(fileId))
  if (!file) {
    throw createError({
      statusCode: 404,
      message: 'File not found',
    })
  }

  return getFileInfo(file)
})
