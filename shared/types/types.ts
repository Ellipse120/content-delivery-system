import type { KvService } from '@deno/kv'

declare global {
  // eslint-disable-next-line no-var
  var Deno: KvService
}

export type ClientInfo = {
  id: string
  name?: string
  createdAt: Date | string
  updatedAt: Date | string
}
