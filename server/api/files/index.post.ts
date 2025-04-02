
import { writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

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
  const formData = await readMultipartFormData(event)
  if (!formData?.length) {
    throw createError({
      statusCode: 400,
      message: 'No file provided',
    })
  }

  const file = formData[0]
  const fileId = useRandomUUID()
  const ext = file.filename?.split(".").pop() || ""
  const filename = `${fileId}.${ext}`

  await writeFile(join(UPLOAD_DIR, filename), file.data)

  return getFileInfo(filename)
})
