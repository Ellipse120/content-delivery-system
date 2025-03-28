import type { KvService } from '@deno/kv'

declare global {
  // eslint-disable-next-line no-var
  var Deno: KvService
}

export type ClientInfo = {
  id: string
  name?: string
  location?: string | null
  online: boolean
  assets?: string[]
  createdAt: Date | string
  updatedAt: Date | string
}

export type AssetInfo = {
  id: string
  name: string
  description?: string | null
  videoUrl?: string[]
  imgUrl?: string[]
  expirationDate?: Date | string
  valid: boolean
  createdAt: Date | string | null
  updatedAt: Date | string | null
}
