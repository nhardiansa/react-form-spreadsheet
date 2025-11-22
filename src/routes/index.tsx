import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='font-bold text-3xl'>
        Silahkan kunjungi <code className='bg-slate-200 px-2 py-1 rounded-md'><Link to='/iltizamat'>/iltizamat</Link></code> untuk melihat form komitmen.
      </h1>
    </div>)
}
