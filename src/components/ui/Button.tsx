import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { Slot } from 'radix-ui'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'default' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-maroon text-parchment hover:bg-maroon-dark border border-transparent',
  secondary: 'bg-transparent text-ink border border-gold hover:bg-gold-light',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-4 py-2',
  icon: 'h-9 w-9 p-0 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'default',
    className = '',
    asChild = false,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : 'button'}
      className={`inline-flex items-center justify-center rounded-md font-sans font-medium transition-colors cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
})

export default Button
