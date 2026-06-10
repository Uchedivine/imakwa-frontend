import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-cream flex items-center justify-center px-6">
                    <div className="max-w-md text-center">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h1 className="font-display text-3xl font-normal text-charcoal mb-3">
                            Something went wrong
                        </h1>
                        <p className="text-charcoal-soft text-sm mb-8">
                            We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-gray-100 rounded-xl text-left">
                                <p className="text-xs font-mono text-gray-600 break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 border border-charcoal/20 rounded-full text-sm font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
                            >
                                Refresh page
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-3 bg-terracotta text-white rounded-full text-sm font-medium hover:bg-terra-light transition-colors"
                            >
                                Go to homepage
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
