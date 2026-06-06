import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { adminLoginSchema } from '@/lib/validations'
import { signSession } from '@/lib/session'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = adminLoginSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'بيانات الدخول غير صالحة',
          details: validation.error.flatten(),
        },
        { status: 400 }
      )
    }

    const { email, password } = validation.data
    const supabase = createAdminClient()

    // Fetch admin by email
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, name, password_hash')
      .eq('email', email)
      .single()

    if (adminError || !admin) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Compare password hash using Node.js crypto (SHA-256)
    const passwordHash = hashPassword(password)
    if (admin.password_hash !== passwordHash) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Create signed session cookie
    const sessionToken = signSession(admin.id, admin.email, admin.name)

    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })

    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم. الرجاء المحاولة مرة أخرى.' },
      { status: 500 }
    )
  }
}
