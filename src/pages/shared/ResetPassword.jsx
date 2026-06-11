import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../api/auth'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import ErrorMessage from '../../components/ui/ErrorMessage'

export default function ResetPassword() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: '',
    })

    const resetMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            navigate('/login', {
                state: { message: 'Password reset successful! Please log in with your new password.' }
            })
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formData.password !== formData.password_confirmation) {
            return
        }

        resetMutation.mutate({
            token,
            email,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
        })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (!token || !email) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center">
                    <h2 className="font-serif text-2xl mb-4 text-charcoal">Invalid Reset Link</h2>
                    <p className="text-charcoal-soft mb-6">
                        This password reset link is invalid or has expired.
                    </p>
                    <Button onClick={() => navigate('/forgot-password')}>
                        Request New Link
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-4xl text-charcoal mb-2">Reset Password</h1>
                    <p className="text-charcoal-soft">Enter your new password below</p>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-charcoal/5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {resetMutation.isError && (
                            <ErrorMessage
                                message={resetMutation.error?.response?.data?.message || 'Failed to reset password'}
                            />
                        )}

                        <Input
                            label="New Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            required
                            minLength={8}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            required
                            minLength={8}
                        />

                        {formData.password !== formData.password_confirmation && formData.password_confirmation && (
                            <p className="text-sm text-red-600">Passwords do not match</p>
                        )}

                        <Button
                            type="submit"
                            disabled={
                                resetMutation.isPending ||
                                !formData.password ||
                                formData.password !== formData.password_confirmation
                            }
                            className="w-full"
                        >
                            {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-charcoal-soft mt-6">
                    Remember your password?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-terracotta hover:text-terra-light font-medium"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    )
}
