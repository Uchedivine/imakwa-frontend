import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import { useAuth } from '../../hooks/useAuth'
import Spinner from '../../components/ui/Spinner'

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, isLoading } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const from = location.state?.from?.pathname || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await login(formData)
            navigate(from, { replace: true })
        } catch (err) {
            // Handle Laravel validation errors (422)
            let errorMessage = 'Invalid email or password'

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
        }
    }

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleGoogleLogin = () => {
        // Redirect to backend OAuth endpoint
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
    }

    return (
        <AuthLayout>
            <div>
                <h1 className="font-display text-4xl font-normal text-charcoal mb-2">
                    Welcome back
                </h1>
                <p className="text-charcoal-soft text-sm mb-8">
                    Sign in to your account to continue
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
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-charcoal/15 focus:outline-none focus:border-terracotta transition-colors text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-charcoal/20 text-terracotta focus:ring-terracotta" />
                            <span className="ml-2 text-sm text-charcoal-soft">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="text-sm text-terracotta hover:text-terra-light">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-terracotta text-white rounded-full font-medium hover:bg-terra-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="sm" className="mr-2" />
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-charcoal/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-cream text-charcoal-soft">Or continue with</span>
                    </div>
                </div>

                {/* Google OAuth */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full py-3.5 border border-charcoal/15 rounded-full font-medium hover:bg-charcoal/5 transition-colors flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="mt-8 text-center text-sm text-charcoal-soft">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-terracotta font-medium hover:text-terra-light">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}
