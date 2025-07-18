/**
 * 查找医生Code-2073可否预约, 并发送钉钉消息推送
 *  */

type R = {
  msg: string
  remainNum: number
}

type SchedulingTypeItemDetail = {
  scheduleId: string
  startTime: string
  endTime: string
  amount: string
  remainNum: number
  address: string
  extendParam: string
  timeRange: string
  departmentCode: string
  departmentName: string
  secondDepartmentCode: string
  secondDepartmentName: string
  showAppointmentAlternateFlag: unknown
  scheduleResourceTags: []
}

type SchedulingType = {
  scheduleType: string
  scheduleTypeName: string
  detailList: SchedulingTypeItemDetail[]
}

type BranchItem = {
  branchCode: string
  branchName: string
  branchAddress: string
  haveSourceNumber: boolean
  schedulingTypeList: SchedulingType[]
}

type ResponseItemFromUnknown = {
  scheduleDate: string
  branchList: BranchItem[]
}

type ResponseFromUnknown = {
  data?: ResponseItemFromUnknown[]
  msg?: string
}

const sendNotifyToDingTalk = async (data: R) => {
  await $fetch('/api/2073', {
    method: 'POST',
    body: {
      text: `【🧑🏻‍⚕️-2073】: ${data.msg}, 剩余【${data.remainNum}】`,
    },
  })
}

const targetDate = '2025-07-28'
const HOST_URL = 'https://h5.wdjky.com/gw/palm-hospital-appointment-resource-scheduling-list'
const header1 = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
  'appid': 'af310138c4a6471dbc402a60f9f230c0',
  'cache-control': 'no-cache',
  'channelcode': '210101',
  'content-type': 'application/json',
  'lightappcode': '430108',
  'pragma': 'no-cache',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'timestamp': '1751596212586',
  'token': '',
  'user-traceid': '175159621258699883571',
  'cookie': 'acw_tc=0a47329a17515960565847106e007a9013598d2ed59889221bb519cab566f5',
  'Referer': 'https://h5.wdjky.com/healthcloud-smart-service-vue3/outpatient/appointment/schedule?channelCode=210101&hospitalId=b535012fb265470283f4dffcbafaff64&showBottom=home&branchCode=10001&secondDeptCode=3300&resourceType=1&resourceCode=2073&scheduleType=1&scheduleTypeCodeList=7&v=20250701173224&code=041BZ50w38Glb53Fht2w3RXQiY0BZ50f',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const header2 = {
  'accept': 'application/json, text/plain, */*',
  'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
  'appid': 'af310138c4a6471dbc402a60f9f230c0',
  'cache-control': 'no-cache',
  'channelcode': '210101',
  'content-type': 'application/json',
  'lightappcode': '430108',
  'pragma': 'no-cache',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'timestamp': '1752327793708',
  'token': 'e88d81792445433eb787d1b4a2fabd05',
  'user-traceid': '175232779370892493456',
  'cookie': 'acw_tc=0a47329c17523275136075901e0068b10e6269fbd969f82a63241adf60e249',
  'Referer': 'https://h5.wdjky.com/healthcloud-smart-service-vue3/outpatient/appointment/schedule?channelCode=210101&hospitalId=b535012fb265470283f4dffcbafaff64&showBottom=home&branchCode=10001&secondDeptCode=3300&resourceType=1&resourceCode=2073&scheduleType=1&scheduleTypeCodeList=7&v=20250711165619',
}

const body1 = {
  channelCode: '210101',
  hospitalId: 'b535012fb265470283f4dffcbafaff64',
  accountId: 'f8bedc5e1f624b4184b2f54da0068a38',
  userId: '395dc1c7184a4931973e650aa6f8222a',
  openId: null,
  todayNumber: '30',
  secondDeptCode: '3300',
  resourceType: '1',
  resourceCode: '2073',
  scheduleTypeCodeList: [
    '7',
  ],
  userFamilyId: '',
  medicalCardId: '',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const body2 = {
  channelCode: '210101',
  hospitalId: 'b535012fb265470283f4dffcbafaff64',
  accountId: '3dac6188d5684848bfc55b8b9f075ce7',
  userId: 'ca42001c650047a8859eb53463d670c9',
  openId: 'oq8KwuNUbpOOnBwv1Xi2KGKVF8aw',
  todayNumber: '30',
  secondDeptCode: '3300',
  resourceType: '1',
  resourceCode: '2073',
  scheduleTypeCodeList: [
    '7',
  ],
  userFamilyId: '87c491801fce458dbf7c1732a1b9e591',
  medicalCardId: 'e828d597b1bf431a9b3343121c75a27b',
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const header = {
    ...header1,
    token: config.hospitalToken,
  }

  const r: ResponseFromUnknown = await $fetch(HOST_URL, {
    method: 'post',
    headers: header,
    body: body1,
  })

  if (!('data' in r)) {
    await sendNotifyToDingTalk({
      msg: r.msg || 'token失效',
      remainNum: 0,
    })

    return {
      msg: r.msg || '接口出错了',
    }
  }

  const targetResponse: BranchItem[] = r?.data?.find((i: ResponseItemFromUnknown) => i.scheduleDate === targetDate)?.branchList || []
  const [morning, afternoon] = targetResponse[0].schedulingTypeList[0].detailList
  const isMorningAvailable = morning?.remainNum > 0
  const isAfternoonAvailable = afternoon?.remainNum > 0

  if (isMorningAvailable) {
    const r = { msg: '上午可约', remainNum: morning?.remainNum }
    await sendNotifyToDingTalk(r)
    return r
  }

  if (isAfternoonAvailable) {
    const r = { msg: '下午可约', remainNum: afternoon?.remainNum }
    await sendNotifyToDingTalk(r)
    return r
  }

  // await sendNotifyToDingTalk({
  //   msg: '不可约',
  //   remainNum: 0,
  // })

  return {
    msg: '不可约',
    remainNum: 0,
  }
})
