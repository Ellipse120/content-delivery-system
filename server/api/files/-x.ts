import { mkdir, unlink, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

const appConfig = useAppConfig()
const UPLOAD_DIR = join(process.cwd(), appConfig.UPLOAD_DIR)

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
   mkdir(UPLOAD_DIR, { recursive: true })
}

const getFileInfo = (filename: string): FileInfo | null => {
  try {
    const stats = existsSync(join(UPLOAD_DIR, filename))
    if (!stats) return null
    return {
      id: filename.split('.')[0],
      filename,
      path: `/uploads/files/${filename}`,
      createdAt: formatDate(new Date())
    }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  console.log(isMethod(event, "GET"))
  console.log(1, event.method, query)
  setResponseHeader(event, "content-type", "application/json");

  // GET - List files or get single file
  if (isMethod(event, "GET")) {

    const fileId = query.id as string
    if (fileId) {
      const files = await readdir(UPLOAD_DIR)
      const file = files.find((f: string) => f.startsWith(fileId))
      if (!file) {
        throw createError({
          statusCode: 404,
          message: "File not found",
        })
      }
      return getFileInfo(file)
    }

    const files = await readdir(UPLOAD_DIR)
    return files.map(getFileInfo).filter(Boolean)
  }

  // POST - Upload new file
  if (isMethod(event, "POST")) {
    const formData = await readMultipartFormData(event)
    if (!formData?.length) {
      throw createError({
        statusCode: 400,
        message: "No file provided",
      })
    }

    const file = formData[0]
    const fileId = randomUUID()
    const ext = file.filename?.split(".").pop() || ""
    const filename = `${fileId}.${ext}`

    await writeFile(join(UPLOAD_DIR, filename), file.data)

    return getFileInfo(filename)
  }

  // DELETE - Remove file
  if (isMethod(event, "DELETE")) {
    const fileId = query.id as string
    console.log(fileId, " =fileId")

    if (!fileId) {
      throw createError({
        statusCode: 400,
        message: "File ID is required",
      })
    }

    const files = await readdir(UPLOAD_DIR)
    const file = files.find((f: string) => f.startsWith(fileId))

    if (!file) {
      throw createError({
        statusCode: 404,
        message: "File not found",
      })
    }

    await unlink(join(UPLOAD_DIR, file))
    return { success: true }
  }

  throw createError({
    statusCode: 405,
    message: "Method not allowed",
  })
}) 