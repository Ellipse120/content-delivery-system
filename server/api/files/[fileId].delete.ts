import { unlink, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { z } from 'zod'

const appConfig = useAppConfig()
const UPLOAD_DIR = join(process.cwd(), appConfig.UPLOAD_DIR)

export default defineEventHandler(async (event) => {
  const { fileId } = await getValidatedRouterParams(event, z.object({
      fileId: z.string().length(36)
  }).parse)

  if (!fileId) {
    throw createError({
      statusCode: 400,
      message: 'File ID is required',
    });
  }

  const files = await readdir(UPLOAD_DIR)
  const file = files.find((f: string) => f.startsWith(fileId))

  if (!file) {
    throw createError({
      statusCode: 404,
      message: 'File not found',
    })
  }

  await unlink(join(UPLOAD_DIR, file))
  return { success: true }
})
