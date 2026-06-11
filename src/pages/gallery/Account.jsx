import { useState, useEffect } from 'react'
import GalleryNavbar from '../../components/layout/GalleryNavbar'
import GalleryFooter from '../../components/layout/GalleryFooter'
import SectionReveal from '../../components/ui/SectionReveal'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { updateProfile, changePassword } from '../../api/auth'
import { useQueryClient } from '@tanstack/react-query'

export default function Account() {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const [activeTab, setActiveTab] = useState('profile') // 'profile' | 'favorites' | 'settings'
    const [isEditing, setIsEditing] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: localStorage.getItem('imakwa-account-phone') || '+234 800 000 0000',
        location: localStorage.getItem('imakwa-account-location') || 'Lagos, Nigeria',
        bio: localStorage.getItem('imakwa-account-bio') || 'Art collector and enthusiast with a passion for contemporary African art'
    })

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState('')
    const [saveSuccess, setSaveSuccess] = useState('')

    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')
    const [passwordLoading, setPasswordLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email,
            }))
        }
    }, [user])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    }

    const handleSaveProfile = async () => {
        setSaving(true)
        setSaveError('')
        setSaveSuccess('')
        try {
            await updateProfile({
                name: formData.name,
                email: formData.email,
            })
            // Save local attributes in localStorage
            localStorage.setItem('imakwa-account-phone', formData.phone)
            localStorage.setItem('imakwa-account-location', formData.location)
            localStorage.setItem('imakwa-account-bio', formData.bio)

            await queryClient.invalidateQueries({ queryKey: ['me'] })
            setSaveSuccess('Profile updated successfully!')
            setIsEditing(false)
        } catch (err) {
            setSaveError(err.response?.data?.message || err.message || 'Failed to update profile')
        } finally {
            setSaving(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setPasswordError('')
        setPasswordSuccess('')

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match')
            return
        }

        setPasswordLoading(true)
        try {
            await changePassword({
                current_password: passwordForm.currentPassword,
                password: passwordForm.newPassword,
                password_confirmation: passwordForm.confirmPassword,
            })
            setPasswordSuccess('Password updated successfully!')
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        } catch (err) {
            setPasswordError(err.response?.data?.message || err.message || 'Failed to change password')
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cream">
            <GalleryNavbar />

            <SectionReveal>
                <div className="pt-32 pb-24 px-6 md:px-8">
                    <div className="max-w-[1200px] mx-auto">
                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="font-serif text-5xl text-charcoal mb-2">My Account</h1>
                            <p className="text-charcoal-soft">Manage your profile and preferences</p>
                        </div>

                        <div className="grid lg:grid-cols-[240px,1fr] gap-8">
                            {/* Sidebar Navigation */}
                            <aside className="lg:sticky lg:top-32 h-fit">
                                <nav className="bg-white rounded-2xl border border-charcoal/10 p-2">
                                    <button
                                        onClick={() => {
                                            setActiveTab('profile')
                                            setSaveSuccess('')
                                            setSaveError('')
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile'
                                            ? 'bg-terracotta text-white'
                                            : 'text-charcoal hover:bg-cream'
                                            }`}
                                    >
                                        Profile Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('favorites')}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'favorites'
                                            ? 'bg-terracotta text-white'
                                            : 'text-charcoal hover:bg-cream'
                                            }`}
                                    >
                                        Favorite Artists
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveTab('settings')
                                            setPasswordSuccess('')
                                            setPasswordError('')
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings'
                                            ? 'bg-terracotta text-white'
                                            : 'text-charcoal hover:bg-cream'
                                            }`}
                                    >
                                        Account Settings
                                    </button>
                                </nav>
                            </aside>

                            {/* Main Content */}
                            <div>
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <div className="bg-white rounded-2xl border border-charcoal/10 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="text-2xl font-bold text-charcoal">Profile Information</h2>
                                            {!isEditing ? (
                                                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                                                    Edit Profile
                                                </Button>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Button onClick={() => setIsEditing(false)} variant="outline" size="sm" disabled={saving}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleSaveProfile} size="sm" disabled={saving}>
                                                        {saving ? 'Saving...' : 'Save Changes'}
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        {saveError && (
                                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                                                {saveError}
                                            </div>
                                        )}
                                        {saveSuccess && (
                                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">
                                                {saveSuccess}
                                            </div>
                                        )}

                                        {/* Profile Picture */}
                                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-charcoal/10">
                                            <div className="w-24 h-24 rounded-full bg-terracotta text-white flex items-center justify-center text-3xl font-bold">
                                                {formData.name.charAt(0) || 'U'}
                                            </div>
                                            {isEditing && (
                                                <div>
                                                    <Button variant="outline" size="sm">
                                                        Change Photo
                                                    </Button>
                                                    <p className="text-xs text-charcoal-soft mt-2">JPG, PNG. Max 2MB</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Form Fields */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                                                <Input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
                                                <Input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-charcoal mb-2">Bio</label>
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent disabled:bg-gray-50 disabled:text-charcoal-soft"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Favorites Tab */}
                                {activeTab === 'favorites' && (
                                    <div className="bg-white rounded-2xl border border-charcoal/10 p-8">
                                        <h2 className="text-2xl font-bold text-charcoal mb-8">Favorite Artists</h2>

                                        <div className="space-y-4">
                                            {[
                                                {
                                                    name: 'Kola Bankole',
                                                    location: 'Lagos, Nigeria',
                                                    artworks: 12,
                                                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80'
                                                },
                                                {
                                                    name: 'Amina Keita',
                                                    location: 'Dakar, Senegal',
                                                    artworks: 8,
                                                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
                                                },
                                                {
                                                    name: 'Thandiwe Nkosi',
                                                    location: 'Cape Town, South Africa',
                                                    artworks: 15,
                                                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
                                                }
                                            ].map((artist, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-4 border border-charcoal/10 rounded-xl hover:border-terracotta/30 transition-colors"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={artist.avatar}
                                                            alt={artist.name}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-charcoal">{artist.name}</p>
                                                            <p className="text-sm text-charcoal-soft">{artist.location}</p>
                                                            <p className="text-xs text-charcoal-soft mt-1">{artist.artworks} artworks</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm">
                                                        Unfollow
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Settings Tab */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-6">
                                        {/* Change Password */}
                                        <div className="bg-white rounded-2xl border border-charcoal/10 p-8">
                                            <h2 className="text-2xl font-bold text-charcoal mb-6">Change Password</h2>

                                            {passwordError && (
                                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                                                    {passwordError}
                                                </div>
                                            )}
                                            {passwordSuccess && (
                                                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600">
                                                    {passwordSuccess}
                                                </div>
                                            )}

                                            <form onSubmit={handleChangePassword} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-charcoal mb-2">Current Password</label>
                                                    <Input
                                                        type="password"
                                                        name="currentPassword"
                                                        value={passwordForm.currentPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-charcoal mb-2">New Password</label>
                                                    <Input
                                                        type="password"
                                                        name="newPassword"
                                                        value={passwordForm.newPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-charcoal mb-2">Confirm New Password</label>
                                                    <Input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={passwordForm.confirmPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </div>

                                                <Button type="submit" disabled={passwordLoading}>
                                                    {passwordLoading ? 'Updating...' : 'Update Password'}
                                                </Button>
                                            </form>
                                        </div>

                                        {/* Email Preferences */}
                                        <div className="bg-white rounded-2xl border border-charcoal/10 p-8">
                                            <h2 className="text-2xl font-bold text-charcoal mb-6">Email Preferences</h2>

                                            <div className="space-y-4">
                                                <label className="flex items-center justify-between cursor-pointer">
                                                    <div>
                                                        <p className="font-medium text-charcoal">New Artwork Alerts</p>
                                                        <p className="text-sm text-charcoal-soft">Get notified when new artworks are added</p>
                                                    </div>
                                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-terracotta rounded focus:ring-terracotta" />
                                                </label>

                                                <label className="flex items-center justify-between cursor-pointer">
                                                    <div>
                                                        <p className="font-medium text-charcoal">Artist Updates</p>
                                                        <p className="text-sm text-charcoal-soft">Updates from artists you follow</p>
                                                    </div>
                                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-terracotta rounded focus:ring-terracotta" />
                                                </label>

                                                <label className="flex items-center justify-between cursor-pointer">
                                                    <div>
                                                        <p className="font-medium text-charcoal">Newsletter</p>
                                                        <p className="text-sm text-charcoal-soft">Monthly curated collections and art insights</p>
                                                    </div>
                                                    <input type="checkbox" className="w-5 h-5 text-terracotta rounded focus:ring-terracotta" />
                                                </label>

                                                <label className="flex items-center justify-between cursor-pointer">
                                                    <div>
                                                        <p className="font-medium text-charcoal">Order Updates</p>
                                                        <p className="text-sm text-charcoal-soft">Shipping and delivery notifications</p>
                                                    </div>
                                                    <input type="checkbox" defaultChecked className="w-5 h-5 text-terracotta rounded focus:ring-terracotta" />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Danger Zone */}
                                        <div className="bg-white rounded-2xl border border-red-200 p-8">
                                            <h2 className="text-2xl font-bold text-red-600 mb-4">Danger Zone</h2>
                                            <p className="text-charcoal-soft mb-6">
                                                Once you delete your account, there is no going back. Please be certain.
                                            </p>
                                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionReveal>

            <GalleryFooter />
        </div>
    )
}
