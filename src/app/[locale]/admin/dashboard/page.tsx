import { DashboardClient } from './dashboard-client'

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <DashboardClient locale={locale as 'ar' | 'fr'} />
}
