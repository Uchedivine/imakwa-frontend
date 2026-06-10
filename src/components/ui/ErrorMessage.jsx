import { cn } from '../../lib/utils'

export default function ErrorMessage({ message, onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="w-12 h-12 rounded-full bg-terra-pale flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="font-serif text-lg text-charcoal mb-1">Something went wrong</p>
      <p className="text-sm text-charcoal-soft mb-5">
        {message ? message : "We couldn't load this content. Please try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-terracotta text-white text-sm font-medium rounded-full hover:bg-terra-light transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
