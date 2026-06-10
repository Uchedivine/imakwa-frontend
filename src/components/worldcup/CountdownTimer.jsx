import { useCountdown } from '../../hooks/useCountdown'

export default function CountdownTimer({ targetDate, label = 'Time Until Kickoff' }) {
    const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

    if (isExpired) {
        return (
            <div className="text-center">
                <p className="text-gold-light text-2xl font-bold">🏆 The Tournament Has Begun!</p>
            </div>
        )
    }

    const timeUnits = [
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
        { value: seconds, label: 'Seconds' }
    ]

    return (
        <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-gold-light mb-4 font-semibold">
                {label}
            </p>
            <div className="flex justify-center gap-4 md:gap-8">
                {timeUnits.map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center">
                        <div className="bg-pitch-accent/30 backdrop-blur-sm rounded-xl px-4 md:px-6 py-3 md:py-4 border border-gold/20 min-w-[70px] md:min-w-[90px]">
                            <span className="text-3xl md:text-5xl font-bold text-gold-light font-mono">
                                {value.toString().padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-xs md:text-sm text-gold/80 mt-2 font-medium uppercase tracking-wide">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
