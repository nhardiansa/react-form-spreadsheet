import CommitmentForm from '@/components/custom/commitment-form'
import Header from '@/components/custom/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/iltizamat')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <Header />
      <div className="flex items-center justify-center px-4 py-12">
        <CommitmentForm />
      </div>
    </main>
  )
}
