import { z } from 'zod'

export const clientInfoSchema = z.object({
    id: z.string().optional().default(() => useRandomUUID()),
    name: z.string().trim().min(2),
    location: z.string().trim().optional(),
    online: z.boolean().default(true),
    assets: z.array(z.string()).optional(),
    createdAt: z.string().default(() => formatDate(new Date())),
    updatedAt: z.string().default(() => formatDate(new Date())),
})

export const assertInfoSchema = z.object({
    id: z.string().optional().default(() => useRandomUUID()),
    name: z.string().trim().min(2),
    description: z.string().trim().optional(),
    videoUrl: z.string().optional(),
    imgUrl: z.string().optional(),
    // videoUrl: z.array(z.string()).optional().default(() => []),
    // imgUrl: z.array(z.string()).optional().default(() => []),
    expirationDate: z.optional(z.union([z.coerce.date(), z.string()])),
    valid: z.boolean().default(true),
    createdAt: z.string().default(() => formatDate(new Date())),
    updatedAt: z.string().default(() => formatDate(new Date())),
})
