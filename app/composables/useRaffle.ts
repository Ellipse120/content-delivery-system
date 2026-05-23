export interface User {
  id: string
  name: string
  phone: string
  jobId?: string
}

export interface Prize {
  id: string
  level: string
  name: string
  count: number
}

export const useRaffle = () => {
  // Global Shared States via useState
  const users = useState<User[]>('raffle_users', () => [])
  const prizes = useState<Prize[]>('raffle_prizes', () => [])
  const currentPrizeId = useState<string>('raffle_current_prize_id', () => '')
  const winners = useState<Record<string, User[]>>('raffle_winners', () => ({}))

  // Actions
  const addUser = (user: Omit<User, 'id'>) => {
    users.value.push({ ...user, id: crypto.randomUUID() })
  }

  const importUsers = (newUsers: Omit<User, 'id'>[]) => {
    const formatted = newUsers.map(u => ({ ...u, id: crypto.randomUUID() }))
    users.value = [...users.value, ...formatted]
  }

  const draw = (count: number) => {
    if (!currentPrizeId.value) return []

    // Filter out already picked winners
    const allWinnerIds = Object.values(winners.value).flat().map(u => u.id)
    const pool = users.value.filter(u => !allWinnerIds.includes(u.id))

    if (pool.length < count) return []

    const picked: User[] = []
    const tempPool = [...pool]

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * tempPool.length)
      const [removed] = tempPool.splice(randomIndex, 1)
      picked.push(removed)
    }

    // Update winners map reactively
    if (!winners.value[currentPrizeId.value]) {
      winners.value[currentPrizeId.value] = []
    }
    winners.value[currentPrizeId.value].push(...picked)

    return picked
  }

  return {
    users,
    prizes,
    currentPrizeId,
    winners,
    addUser,
    importUsers,
    draw,
  }
}
