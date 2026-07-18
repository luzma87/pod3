import type { ButtonHTMLAttributes } from 'react'
import { Slot } from 'radix-ui'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-maroon text-parchment hover:bg-maroon-dark border border-transparent',
  secondary: 'bg-transparent text-ink border border-gold hover:bg-gold-light',
}

function Button({
  variant = 'primary',
  className = '',
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      type={asChild ? undefined : 'button'}
      className={`rounded-md px-4 py-2 font-sans font-medium transition-colors cursor-pointer ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}

export default Button
