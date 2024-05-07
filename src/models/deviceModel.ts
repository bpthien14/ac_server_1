import mongoose, { Document, Schema } from 'mongoose'

import { BRAND, MODE, STATUS, FANSPEED } from '@/constants/enum'

interface IProfile {
  temp: number
  fan: FANSPEED
}

export interface IDevice extends Document {
  userId: string
  name: string
  status: STATUS
  fan: FANSPEED
  temp: number
  brand: BRAND
  currentProfile: MODE
  profile: {
    [key in MODE]: IProfile
  }
  envTemp: number
  humidity: number
}

const deviceSchema = new Schema<IDevice>({
  userId: String,
  name: {
    type: String,
    required: function () {
      return this.name.trim()
    }
  },
  status: {
    type: String,
    default: STATUS.OFF
  },
  fan: {
    type: String,
    default: FANSPEED.NONE
  },
  temp: {
    type: Number,
    default: -1
  },
  brand: String,
  currentProfile: {
    type: String,
    default: MODE.DEFAULT
  },
  envTemp: {
    type: Number,
    default: -1
  },
  humidity: {
    type: Number,
    default: -1
  },
  profile: {
    MOISTURING: {
      temp: Number,
      fan: String
    },
    COOLING: {
      temp: Number,
      fan: String
    },
    DEFAULT: {
      temp: Number,
      fan: String
    }
  }
})

const DeviceModel = mongoose.model<IDevice>('devices', deviceSchema)

export default DeviceModel
