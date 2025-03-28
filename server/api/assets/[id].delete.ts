import { z } from 'zod'

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().length(36)
  }).parse);

  // todo
  return id
})
