import { Request, Response } from 'express'

import LinkDeviceRequest from '@/models/requests/linkDeviceRequest'
import deviceService from '@/services/deviceService'

import { isLinkRequestValid, isSendSignalRequest, isSetDeviceRequestValid } from '@/utils/validateRequest'
import SetDeviceRequest from '@/models/requests/setDeviceRequest'
import SendSignalRequest from '@/models/requests/sendSignalRequest'
import StatsResponse from '@/models/responses/statsResponse'

const getAllDevices = async (_: Request, res: Response) => {
  try {
    const deviceList = await deviceService.getDeviceList()
    console.log(deviceList)
    res.json(deviceList)
  } catch (error) {
    if (error instanceof Error) res.status(500).send({ error: error.message })
  }
}

const getSingleDevice = async (req: Request, res: Response) => {
  const deviceId: string = req.params.id

  try {
    const device = await deviceService.getSingleDevice(deviceId)
    res.json(device)
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

const linkNewDevice = async (req: Request, res: Response) => {
  try {
    const newDevice = <LinkDeviceRequest>req.body
    if (!isLinkRequestValid(newDevice)) throw Error('Missing field(s)')
    await deviceService.createNewDevice(newDevice)
    res.json({ message: 'Successfully linked new device' })
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

const powerDevice = async (req: Request, res: Response) => {
  try {
    const setDeviceRequest = <SetDeviceRequest>req.body
    setDeviceRequest.deviceId = req.params.id
    if (!isSetDeviceRequestValid(setDeviceRequest)) throw Error('Missing field(s)')
      await deviceService.setDevice(setDeviceRequest)
    res.json({ message: 'Successfully set device' })
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

const sendSignal = async (req: Request, res: Response) => {
  try {
    const sendSignalRequest = <SendSignalRequest>req.body
    sendSignalRequest.deviceId = req.params.id
    if (!isSendSignalRequest(sendSignalRequest)) throw Error('Missing field(s)')

      await deviceService.sendSignal(sendSignalRequest)
    res.json({ message: 'Successfully send signal' })
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

const getStats = async (req: Request, res: Response) => {
  try {
    const stats: StatsResponse | undefined = await deviceService.getStats(req.params.id)
    res.json(stats)
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

const testController = async (req: Request, res: Response) => {
  try {
    await deviceService.sendEmergencyMail('hello123')
    res.send('OK')
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ message: error.message })
  }
}

export default { getAllDevices, getSingleDevice, linkNewDevice, powerDevice, sendSignal, getStats, testController }
