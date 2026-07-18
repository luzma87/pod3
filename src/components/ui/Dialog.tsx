import type { ReactNode } from 'react'
import { Dialog as RadixDialog } from 'radix-ui'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  trigger?: ReactNode
}

function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
}: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      ) : null}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-ink/40" />
        <RadixDialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-parchment p-6 shadow-lg">
          <RadixDialog.Title className="font-display text-xl text-maroon">
            {title}
          </RadixDialog.Title>
          {description ? (
            <RadixDialog.Description className="mt-2 text-ink-muted">
              {description}
            </RadixDialog.Description>
          ) : null}
          <div className="mt-4">{children}</div>
          <RadixDialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 text-ink-muted hover:text-ink cursor-pointer"
            >
              ✕
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

export default Dialog
