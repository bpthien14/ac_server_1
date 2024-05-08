import { MODE } from '@/constants/enum'
import LinkDeviceRequest from '@/models/requests/linkDeviceRequest'
import SendSignalRequest from '@/models/requests/sendSignalRequest'
import SetDeviceRequest from '@/models/requests/setDeviceRequest'

export const isLinkRequestValid = (request: LinkDeviceRequest): boolean => {
  if (request.name == undefined) return false
  if (request.brand == undefined) return false
  if (request.userId == undefined) return false

  if (request.profile != undefined) {
    for (const mode of Object.values(MODE)) {
      if (request.profile[mode] != undefined) {
        if (request.profile[mode].fan == undefined) return false
        if (request.profile[mode].temp == undefined) return false
      } else return false
    }
  } else return false

  return true
}

export const isSetDeviceRequestValid = (request: SetDeviceRequest): boolean => {
  console.log(request)
  if (request.deviceId == undefined) return false
  if (request.userId == undefined) return false
  return true
}

export const isSendSignalRequest = (request: SendSignalRequest): boolean => {
  if (request.deviceId == undefined) return false
  if (request.temp == undefined) return false
  if (request.userId == undefined) return false
  if (request.fan == undefined) return false
  if (request.status == undefined) return false
  if (request.profile == undefined) return false
  return true
}
