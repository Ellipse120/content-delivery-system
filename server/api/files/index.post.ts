
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

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

  await writeFile(join(getUploadFoler(), filename), file.data)

  return getFileInfo(filename)
})
