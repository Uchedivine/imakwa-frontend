import { Link } from 'react-router-dom'

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-cream flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="inline-flex items-center gap-2 mb-10">
                        <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center">
                            <span className="text-white font-display text-sm font-semibold">I</span>
                        </div>
                        <span className="font-display text-xl font-normal text-charcoal">imakwa.</span>
                    </Link>

                    {/* Content */}
                    {children}
                </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=1200&q=80&fit=crop"
                    alt="African art"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal/60 to-terracotta/40" />

                {/* Quote overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="max-w-lg text-center">
                        <p className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">
                            "Where authentic African artistry meets the digital marketplace"
                        </p>
                        <p className="text-white/80 text-sm">
                            Join thousands of collectors and artists celebrating African creativity worldwide
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
