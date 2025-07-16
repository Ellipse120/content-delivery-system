export default defineEventHandler(async (event) => {
  const data = await readBody(event)

  const config = useRuntimeConfig()
  const res = await $fetch(`https://oapi.dingtalk.com/robot/send?access_token=${config.dingdingWebhooksAccessToken}`, {
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
