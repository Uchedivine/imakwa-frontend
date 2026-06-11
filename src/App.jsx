import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from './components/ui/ErrorBoundary'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import GalleryHome from './pages/gallery/GalleryHome'
import GalleryBrowse from './pages/gallery/GalleryBrowse'
import ArtworkDetail from './pages/gallery/ArtworkDetail'
import Artists from './pages/gallery/Artists'
import ArtistDetail from './pages/gallery/ArtistDetail'
import Collections from './pages/gallery/Collections'
import CollectionDetail from './pages/gallery/CollectionDetail'
import Account from './pages/gallery/Account'
import Checkout from './pages/gallery/Checkout'
import CheckoutSuccess from './pages/gallery/CheckoutSuccess'
import Orders from './pages/gallery/Orders'
import WorldCupHome from './pages/worldcup/WorldCupHome'
import WorldCupProducts from './pages/worldcup/WorldCupProducts'
import WorldCupProductDetail from './pages/worldcup/WorldCupProductDetail'
import WorldCupOrderStatus from './pages/worldcup/WorldCupOrderStatus'
import WorldCupPayment from './pages/worldcup/WorldCupPayment'
import WorldCupSuccess from './pages/worldcup/WorldCupSuccess'
import WorldCupDownload from './pages/worldcup/WorldCupDownload'
import WorldCupOrderLookup from './pages/worldcup/WorldCupOrderLookup'
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
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistDetail />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:id" element={<CollectionDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected routes */}
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/checkout/success" element={<ProtectedRoute><CheckoutSuccess /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

            {/* World Cup */}
            <Route path="/worldcup" element={<WorldCupHome />} />
            <Route path="/worldcup/products" element={<WorldCupProducts />} />
            <Route path="/worldcup/products/:id" element={<WorldCupProductDetail />} />
            <Route path="/worldcup/order/:id" element={<WorldCupOrderStatus />} />
            <Route path="/worldcup/payment/:orderId" element={<WorldCupPayment />} />
            <Route path="/worldcup/success" element={<WorldCupSuccess />} />
            <Route path="/worldcup/download/:token" element={<WorldCupDownload />} />
            <Route path="/worldcup/lookup" element={<WorldCupOrderLookup />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
