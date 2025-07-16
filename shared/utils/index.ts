import { format } from 'date-fns'

export const formatDate = (date: Date | string | number, formatter = 'yyyy-MM-dd\'T\'HH:mm:ss') => {
  // const v = new Date(date)

  return format(date, formatter)
}
