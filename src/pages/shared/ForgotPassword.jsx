import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import Spinner from '../../components/ui/Spinner'
import { forgotPassword } from '../../api/auth'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await forgotPassword({ email })
            setSuccess(true)
        } catch (err) {
            // Handle Laravel validation errors (422)
            let errorMessage = 'Failed to send reset link'

            if (err.response?.data?.errors) {
                // Extract first error from Laravel validation errors object
                const errors = err.response.data.errors
                const firstErrorKey = Object.keys(errors)[0]
                errorMessage = errors[firstErrorKey][0]
            } else if (err.response?.data?.message) {
                // Generic error message
                errorMessage = err.response.data.message
            }

            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <AuthLayout>
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="font-display text-3xl font-normal text-charcoal mb-3">
                        Check your email
                    </h1>
                    <p className="text-charcoal-soft text-sm mb-8">
                        We've sent a password reset link to<br />
                        <span className="font-medium text-charcoal">{email}</span>
                    </p>

                    <p className="text-sm text-charcoal-soft mb-6">
                        Didn't receive the email? Check your spam folder or{' '}
                        <button
                            onClick={() => setSuccess(false)}
                            className="text-terracotta font-medium hover:text-terra-light"
                        >
                            try again
                        </button>
                    </p>

                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm text-terracotta font-medium hover:text-terra-light"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to login
                    </Link>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
            <div>
                <h1 className="font-display text-4xl font-normal text-charcoal mb-2">
                    Forgot password?
                </h1>
                <p className="text-charcoal-soft text-sm mb-8">
                    No worries, we'll send you reset instructions
                </p>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-terracotta text-white rounded-full font-medium hover:bg-terra-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="sm" className="mr-2" />
                                Sending...
                            </>
                        ) : (
                            'Reset password'
                        )}
                    </button>
                </form>

                <Link
                    to="/login"
                    className="mt-8 inline-flex items-center text-sm text-charcoal-soft hover:text-charcoal"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to login
                </Link>
            </div>
        </AuthLayout>
    )
}
