export const useKv = async ()=> {
  if (globalThis.Deno) {
    return globalThis.Deno.openKv();
  }

  const openKvFactory = () => import('@deno/kv')
  const { openKv } = await openKvFactory()

  return openKv('kv.db')
}
