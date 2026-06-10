import { cn } from '../../lib/utils'

export default function Spinner({ size = 'md', className }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-2',
    lg: 'w-10 h-10 border-[3px]',
  }

  return (
    <div
      className={cn(
        'rounded-full border-charcoal/20 border-t-terracotta animate-spin',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}
