export const formatDate = (date: Date| string | number) => {
  const v = new Date(date)

  return v.toLocaleString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}
