export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event)

  // const interval = setInterval(async () => {
  //   await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`)
  // }, 3000)

  await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`)

  eventStream.onClosed(async () => {
    // clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
