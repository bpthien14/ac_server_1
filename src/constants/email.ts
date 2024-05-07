import dotenv from 'dotenv'
dotenv.config()

const auth = {
  type: 'OAuth2',
  user: 'khanghero123@gmail.com',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
}

const mailoptions = {
  from: 'AC Automatic System <khanghero123@gmail.com>',
  to: 'nhkhangtt@gmail.com',
  subject: 'EMERGENCY !'
}

export { auth, mailoptions }
