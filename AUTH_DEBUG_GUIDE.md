# Authentication Debugging Guide

## Test in Browser Console

### 1. Check if token exists in localStorage
```javascript
// Check auth data
const authData = localStorage.getItem('imakwa-auth')
console.log('Auth Data:', authData)

// Parse it
if (authData) {
  const parsed = JSON.parse(authData)
  console.log('Parsed:', parsed)
  console.log('Token:', parsed.state?.token)
}
```

### 2. Check if interceptor is working
```javascript
// After logging in, make a test request
fetch('https://imakwa-backend-production.up.railway.app/api/v1/user/profile', {
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('imakwa-auth')).state.token}`,
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(d => console.log('Profile:', d))
.catch(e => console.error('Error:', e))
```

### 3. Check Network Tab
- Open DevTools → Network tab
- Make any authenticated request (e.g., go to cart)
- Click the request
- Check Headers → Request Headers
- Should see: `Authorization: Bearer 1|abc123...`

## Expected localStorage Structure

```json
{
  "state": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "1|abc123def456...",
    "isAuthenticated": true
  },
  "version": 0
}
```

## Common Issues

### Issue: Token not saving
**Symptom:** `localStorage.getItem('imakwa-auth')` returns `null`

**Fix:** Check if login API is returning token in response

### Issue: Token saving but not being sent
**Symptom:** localStorage has token but Network tab shows no Authorization header

**Fix:** Check if axios interceptor is reading from correct path (`state.token`)

### Issue: 401 errors despite having token
**Symptom:** Token exists and is being sent, but backend returns 401

**Fix:** Check if token format is correct (should be `1|abc123...` from Sanctum)

## Manual Test Sequence

1. **Clear storage**
   ```javascript
   localStorage.clear()
   ```

2. **Login**
   - Go to `/login`
   - Enter credentials
   - Click "Sign in"

3. **Verify**
   ```javascript
   // Should return auth object with token
   JSON.parse(localStorage.getItem('imakwa-auth'))
   ```

4. **Test authenticated request**
   - Go to `/browse`
   - Add item to cart
   - Check Network tab for `POST /api/v1/cart`
   - Should have `Authorization: Bearer ...` header

5. **Test checkout**
   - Go to `/checkout`
   - Should see cart items (not "Cart is empty")
