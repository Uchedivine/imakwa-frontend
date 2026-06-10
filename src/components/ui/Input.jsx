import { cn } from '../../lib/utils'

export default function Input({ className, theme = 'gallery', ...props }) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-full text-sm outline-none transition-all duration-200',
        theme === 'worldcup'
          ? 'bg-pitch-mid border border-gold/20 text-white placeholder:text-white/40 focus:border-gold'
          : 'bg-white border border-charcoal/10 text-charcoal placeholder:text-charcoal/40 focus:border-terracotta',
        className
      )}
      {...props}
    />
  )
}