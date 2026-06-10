import { useCountdown } from '../../hooks/useCountdown'

export default function CountdownBanner() {
  const { timeLeft, worldCupStarted, worldCupEnded } = useCountdown()

  // Fallbacks if data is still loading
  const days = timeLeft?.days ?? 39
  const hours = timeLeft?.hours ?? 0
  const minutes = timeLeft?.minutes ?? 32
  const seconds = timeLeft?.seconds ?? 10

  const timeUnits = [
    { value: days, label: 'DAYS' },
    { value: hours, label: 'HRS' },
    { value: minutes, label: 'MIN' },
    { value: seconds, label: 'SEC' }
  ]

  return (
    <div className="w-full bg-[#C1623F] text-white py-5 px-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-20 relative z-30 select-none text-center shadow-md">
      
      {/* Left Text */}
      <p className="text-[13px] md:text-[15px] font-semibold tracking-wide leading-relaxed">
        Limited Tournament Window. <span className="opacity-90 font-normal">This collection closes at the final whistle — July 19, 2026.</span>
      </p>

      {/* Countdown Timer */}
      <div className="flex items-center gap-2">
        {timeUnits.map(({ value, label }, index) => (
          <div key={label} className="flex items-center">
            {index > 0 && (
              <span className="text-[16px] font-bold text-white/50 mx-2 md:mx-3">:</span>
            )}
            <div className="flex flex-col items-center justify-center bg-black/15 w-14 h-14 rounded-lg min-w-[56px] py-1">
              <span className="text-[17px] font-bold font-mono leading-none mt-0.5">
                {value.toString().padStart(2, '0')}
              </span>
              <span className="text-[8px] font-bold tracking-widest text-white/70 mt-1 uppercase">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Right Text */}
      <p className="text-[13px] md:text-[15px] font-semibold tracking-wide">
        {worldCupEnded
          ? 'The store is now closed.'
          : worldCupStarted
          ? 'The tournament is live. Collection closes at the final whistle.'
          : 'Store closes at the final whistle — July 19, 2026.'}
      </p>

    </div>
  )
}
