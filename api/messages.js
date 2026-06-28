import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const SPREADSHEET_ID = '1BautXMmoDytrZnOBh0m_mQ7Fc0_ZvMc2Lq-tvgkhCic'

export default async function handler(req, res) {
  console.log('KEY存在:', !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
  console.log('KEY前10字:', process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.substring(0, 10))
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sheets = google.sheets({ version: 'v4', auth })

  if (req.method === 'GET') {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:B',
    })
    return res.status(200).json(response.data.values || [])
  }

  if (req.method === 'POST') {
    const { name, wishes } = req.body
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:B',
      valueInputOption: 'RAW',
      requestBody: { values: [[name, wishes]] },
    })
    return res.status(200).json({ success: true })
  }
}