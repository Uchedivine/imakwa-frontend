import { cn } from '../../lib/utils'

// Skeleton pulse for a single artwork card — matches ArtworkCard dimensions exactly
export function SkeletonCard({ className }) {
  return (
    <div className={cn('bg-white rounded-3xl border border-[#EBEBEB] p-3 animate-pulse', className)}>
      {/* Image placeholder */}
      <div className="rounded-2xl bg-charcoal/8 aspect-[4/5] mb-4" />

      {/* Text placeholders */}
      <div className="px-1 pb-1 space-y-2">
        <div className="h-2 w-16 bg-charcoal/8 rounded-full" />
        <div className="h-4 w-3/4 bg-charcoal/8 rounded-full" />
        <div className="h-3 w-1/2 bg-charcoal/8 rounded-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-16 bg-charcoal/8 rounded-full" />
          <div className="h-[34px] w-[105px] bg-charcoal/8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Convenience: render N skeleton cards in a grid
export function SkeletonGrid({ count = 8, className }) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonCard
