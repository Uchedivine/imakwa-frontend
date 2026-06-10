import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-charcoal/10 text-charcoal',
  terracotta: 'bg-terracotta/10 text-terracotta',
  gold: 'bg-gold/20 text-gold',
  green: 'bg-pitch/10 text-pitch',
  new: 'bg-pitch text-cream',
  limited: 'bg-charcoal text-cream',
  digital: 'bg-terracotta text-cream',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}