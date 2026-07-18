import type { HTMLAttributes } from 'react'

function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-border bg-parchment-dark p-6 shadow-sm ${className}`}
      {...props}
    />
  )
}

export default Card
