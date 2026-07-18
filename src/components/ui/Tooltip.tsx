import type { ReactNode } from 'react'
import { Tooltip as RadixTooltip } from 'radix-ui'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
}

function Tooltip({ content, children }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            sideOffset={6}
            className="z-10 max-w-56 rounded-md border border-border bg-parchment px-3 py-2 text-xs text-ink shadow-md"
          >
            {content}
            <RadixTooltip.Arrow className="fill-parchment" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
