import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const SPREADSHEET_ID = '1ZbYzwPbvBBQ-1bzTUmqHVifmefT_pUq3G-HANzB3wCY'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'POST') {
    const sheets = google.sheets({ version: 'v4', auth })
    const {
      joinStatus, name, statistics, email,
      arrivalDate, arrivalTime, arrivalInfoStatus, arrivalInfoContent,
      departureDate, departureTime, departureInfoStatus, departureInfoContent,
      allergyStatus, allergyContent, needStatus, needContent, journeyStatus
    } = req.body

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:Q',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          joinStatus, name, statistics, email,
          arrivalDate, arrivalTime, arrivalInfoStatus, arrivalInfoContent,
          departureDate, departureTime, departureInfoStatus, departureInfoContent,
          allergyStatus, allergyContent, needStatus, needContent, journeyStatus
        ]]
      },
    })
    return res.status(200).json({ success: true })
  }
}