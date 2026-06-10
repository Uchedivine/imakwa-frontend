import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-terracotta text-white hover:bg-terracotta/90',
  outline: 'bg-transparent border border-charcoal text-charcoal hover:bg-charcoal/5',
  ghost: 'bg-transparent text-charcoal hover:bg-charcoal/5',
  gold: 'bg-gold text-charcoal hover:bg-gold-light',
  'gold-outline': 'bg-transparent border border-gold text-gold hover:bg-gold/10',
  dark: 'bg-charcoal text-cream hover:bg-charcoal-mid',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  )
}