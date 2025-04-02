import { format } from 'date-fns'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

export const formatDate = (date: Date | string | number, formatter = 'yyyy-MM-dd\'T\'HH:mm:ss') => {
  // const v = new Date(date)

  return format(date, formatter)
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
