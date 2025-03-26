import type { KvService } from '@deno/kv'

declare global {
  // eslint-disable-next-line no-var
  var Deno: KvService
}
