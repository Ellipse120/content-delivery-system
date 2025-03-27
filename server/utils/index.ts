export const useRandomUUID = () => {
  return globalThis.crypto.randomUUID()
}
