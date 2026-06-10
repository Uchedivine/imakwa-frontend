import { cn } from '../../lib/utils'

export default function StarRating({ rating = 5, className }) {
  return (
    <div className={cn('flex gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-gold' : 'text-charcoal/20'}
        >
          ★
        </span>
      ))}
    </div>
  )
}