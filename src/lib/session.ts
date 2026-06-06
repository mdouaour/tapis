import { createHmac } from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'tapis-admin-secret-change-in-production'
const SESSION_DURATION = 24 * 60 * 60 * 1000

export function signSession(adminId: string, email: string, name: string): string {
  const expiry = Date.now() + SESSION_DURATION
  const payload = JSON.stringify({ adminId, email, name, expiry })
  const hmac = createHmac('sha256', ADMIN_SECRET)
    .update(payload)
    .digest('hex')
  return Buffer.from(JSON.stringify({ payload, hmac })).toString('base64url')
}

export function verifySession(token: string): { adminId: string; email: string; name: string } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString())
    const { payload, hmac: signature } = decoded
    const expectedHmac = createHmac('sha256', ADMIN_SECRET)
      .update(payload)
      .digest('hex')
    if (signature !== expectedHmac) return null
    const data = JSON.parse(payload)
    if (Date.now() > data.expiry) return null
    return { adminId: data.adminId, email: data.email, name: data.name }
  } catch {
    return null
  }
}
