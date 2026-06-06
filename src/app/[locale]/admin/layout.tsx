import { cookies } from 'next/headers'
import { redirect } from '@/i18n/routing'
import { verifySession } from '@/lib/session'
import { AdminLayout } from '@/components/admin/admin-layout'

export default async function AdminRootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value

  if (!sessionToken) {
    redirect({ href: '/admin/login', locale })
    return
  }

  const session = verifySession(sessionToken)

  if (!session) {
    redirect({ href: '/admin/login', locale })
    return
  }

  return <AdminLayout admin={{ name: session.name, email: session.email }}>{children}</AdminLayout>
}
