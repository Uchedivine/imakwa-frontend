import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ui/ErrorBoundary'

// Pages
import GalleryHome from './pages/gallery/GalleryHome'
import GalleryBrowse from './pages/gallery/GalleryBrowse'
import ArtworkDetail from './pages/gallery/ArtworkDetail'
import WorldCupHome from './pages/worldcup/WorldCupHome'
import Login from './pages/shared/Login'
import Register from './pages/shared/Register'
import ForgotPassword from './pages/shared/ForgotPassword'

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<GalleryHome />} />
            <Route path="/browse" element={<GalleryBrowse />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* World Cup */}
            <Route path="/worldcup" element={<WorldCupHome />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
