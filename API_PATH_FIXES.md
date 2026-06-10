# API Path Alignment - Change Log

## ✅ Completed Fixes

### 1. Authentication API (`src/api/auth.js`)
- ✅ **Changed:** `/auth/me` → `/auth/user`
- ✅ **Added:** `password_confirmation` parameter to register function
- ✅ **Stubbed:** `forgotPassword` function (endpoint doesn't exist yet on backend)
- ✅ **Unchanged:** `/auth/login`, `/auth/register`, `/auth/logout`

**Register Function Update:**
```javascript
// Before
export const register = async ({ name, email, password, role })

// After
export const register = async ({ name, email, password, password_confirmation, role })
```

### 2. Gallery API (`src/api/gallery.js`)
All paths now prefixed with `/gallery/`:

| Old Path | New Path |
|----------|----------|
| `/artworks` | `/gallery/artworks` |
| `/artworks/:id` | `/gallery/artworks/:id` |
| `/artists` | `/gallery/artists` |
| `/artists/:id` | `/gallery/artists/:id` |
| `/collections` | `/gallery/collections` |
| `/collections/:id` | `/gallery/collections/:id` |

### 3. Routes (`src/App.jsx`)
- ✅ **Added:** TODO comments for missing routes:
  - `/artists/:id` → ArtistDetail page (not created yet)
  - `/collections` → Collections page (not created yet)
  - `/collections/:id` → CollectionDetail page (not created yet)
  - `/account` → Account page (not created yet)

## ℹ️ Not Yet Implemented (Backend Endpoints Missing)

These API files exist but their endpoints aren't ready on the backend yet:

- `src/api/cart.js` - Paths stay same (Step 9)
- `src/api/orders.js` - Paths stay same (Step 10)
- `src/api/worldcup.js` - Paths stay same (Step 7)
- `src/api/favorites.js` - Paths stay same (Step 9)
- `src/api/search.js` - Paths stay same (Step 13)
- `src/api/newsletter.js` - Paths stay same (Step 13)

## 🧪 Testing Checklist

When backend is connected, test:

- [ ] Login with correct credentials
- [ ] Register new user (with password_confirmation)
- [ ] Get user profile data (now uses `/auth/user`)
- [ ] Fetch artworks list
- [ ] Fetch single artwork detail
- [ ] Fetch artists list (when implemented)
- [ ] Fetch single artist detail (when implemented)
- [ ] Password reset flow (currently stubbed)

## 📝 Notes

- Frontend Register form already includes `password_confirmation` field
- `password_confirmation` validation happens on frontend before API call
- All changes are backward compatible with existing frontend code
- Stubbed `forgotPassword` simulates success for now
