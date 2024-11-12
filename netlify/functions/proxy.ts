import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const API_ENDPOINT = process.env.API_ENDPOINT

export const handler: Handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/proxy', '')
  const queryString = event.rawQuery ? `?${event.rawQuery}` : ''

  try {
    const response = await fetch(`${API_ENDPOINT}${path}${queryString}`, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.body ? JSON.stringify(event.body) : undefined,
    })

    const data = await response.json()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}
