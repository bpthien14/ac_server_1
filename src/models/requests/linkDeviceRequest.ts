import { BRAND, MODE, FANSPEED } from '@/constants/enum'

interface LinkDeviceRequest {
  userId: string
  name: string
  brand: BRAND
  profile: {
    [key in MODE]: {
      temp: number
      fan: FANSPEED
    }
  }
}

export default LinkDeviceRequest
