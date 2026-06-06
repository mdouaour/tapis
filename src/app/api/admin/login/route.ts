import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { adminLoginSchema } from '@/lib/validations'
import { signSession } from '@/lib/session'

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

    // Verify password using pgcrypto RPC function
    const { data: isValid, error: rpcError } = await supabase.rpc(
      'verify_admin_password',
      {
        admin_email: email,
        password_attempt: password,
      }
    )

    if (rpcError || !isValid) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      )
    }

    // Fetch admin details
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('id, email, name')
      .eq('email', email)
      .single()

    if (adminError || !admin) {
      return NextResponse.json(
        { error: 'حدث خطأ في تحميل بيانات المسؤول' },
        { status: 500 }
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
