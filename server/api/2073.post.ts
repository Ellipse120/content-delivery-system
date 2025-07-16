export default defineEventHandler(async (event) => {
  const data = await readBody(event)

  const res = await $fetch('https://oapi.dingtalk.com/robot/send?access_token=d7295be9352259a88d61c67f3bb8ca85cae90423c66b8d8661cf7fe80d46e5e3', {
    method: 'post',
    body: {
      msgtype: 'text',
      at: {
        isAtAll: true,
      },
      text: {
        content: `${data.text}`
      }
    }
  })

  return res
})
