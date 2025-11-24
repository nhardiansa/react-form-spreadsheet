import { Toaster } from '@/components/ui/sonner'
import { GlobalAlertDialogProvider } from '@/components/custom/global-alert-dialog/component'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="font-jakarta">
        <GlobalAlertDialogProvider>
          <Outlet />
        </GlobalAlertDialogProvider>
      </div>
      <Toaster />
    </>
  )
}
