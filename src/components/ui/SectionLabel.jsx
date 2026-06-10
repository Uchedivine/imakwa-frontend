import { cn } from '../../lib/utils'

export default function SectionLabel({ label, heading, headingItalic, theme = 'gallery', className }) {
  return (
    <div className={cn('', className)}>
      {label && (
        <p className={cn(
          'text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2',
          theme === 'worldcup' ? 'text-gold-light' : 'text-terracotta'
        )}>
          {theme === 'gallery' && <span className="inline-block w-6 h-px bg-terracotta" />}
          {label}
          {theme === 'gallery' && <span className="inline-block w-6 h-px bg-terracotta" />}
        </p>
      )}
      {heading && (
        <h2 className={cn(
          'font-display font-semibold leading-tight',
          'text-3xl md:text-4xl lg:text-5xl',
          theme === 'worldcup' ? 'text-white' : 'text-charcoal'
        )}>
          {heading}{' '}
          {headingItalic && (
            <span className={cn(
              'italic',
              theme === 'worldcup' ? 'text-gold-light' : 'text-terracotta'
            )}>
              {headingItalic}
            </span>
          )}
        </h2>
      )}
    </div>
  )
}