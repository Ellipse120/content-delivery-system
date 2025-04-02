
import { readdir } from 'node:fs/promises'
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

export default defineEventHandler(async () => {
  const files = await readdir(UPLOAD_DIR)
  return files.map(getFileInfo).filter(Boolean)
})
