import { BRAND, FANSPEED, MODE, STATUS } from '@/constants/enum'

interface SendSignalRequest {
  userId: string
  deviceId: string
  temp: number
  fan: FANSPEED
  status: STATUS
  profile: MODE
  brand: BRAND
}

export default SendSignalRequest
