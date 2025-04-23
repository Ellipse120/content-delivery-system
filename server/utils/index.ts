import { join } from 'node:path'
import { existsSync } from 'node:fs'

export const useRandomUUID = () => {
  return globalThis.crypto.randomUUID()
}

export const getUploadFoler = () => {
  const appConfig = useAppConfig()
  const UPLOAD_DIR = join(process.cwd(), appConfig.UPLOAD_DIR)
  return UPLOAD_DIR
}

export const getFileInfo = (filename: string): FileInfo | null => {
  const UPLOAD_DIR = getUploadFoler()

  try {
    const stats = existsSync(join(UPLOAD_DIR, filename))
    if (!stats) return null
    
    return {
      id: filename.split('.')[0]!,
      filename,
      path: `${UPLOAD_DIR}/${filename}`,
      createdAt: formatDate(new Date())
    }
  } catch {
    return null
  }
}