# Environment Variables Setup

## Quick Start

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your credentials** (see instructions below)

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

## Firebase Setup

### Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new one)
3. Click **Settings** ⚙️ → **Project Settings**
4. Scroll to **"Your apps"** section
5. Click **Web app** icon `</>`
6. Copy the config values:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## GitHub Token Setup

### Generate Personal Access Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Settings:**
   - Name: `AnKo Image Uploads`
   - Expiration: Your choice (or "No expiration")
   - Scopes: ✅ **repo** (Full control of private repositories)
4. Click **"Generate token"**
5. **⚠️ COPY TOKEN IMMEDIATELY** (you won't see it again!)

```env
VITE_GITHUB_OWNER=Andrey2528
VITE_GITHUB_REPO=AnKo
VITE_GITHUB_BRANCH=master
VITE_GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Vercel Deployment

### Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase app ID |
| `VITE_GITHUB_OWNER` | `Andrey2528` |
| `VITE_GITHUB_REPO` | `AnKo` |
| `VITE_GITHUB_BRANCH` | `master` |
| `VITE_GITHUB_TOKEN` | Your GitHub personal access token |

5. **Redeploy** your project after adding variables

## Security Notes

⚠️ **IMPORTANT:**

- ✅ `.env` is in `.gitignore` - never commit it!
- ✅ Use `.env.example` as template
- ✅ Keep tokens secret
- ✅ Rotate GitHub token if compromised
- ✅ Use different tokens for dev/production

## Troubleshooting

### "GitHub token not configured"
- Check if `.env` file exists in project root
- Verify `VITE_GITHUB_TOKEN` is set
- **Restart dev server** after editing `.env`

### "Firebase: invalid-api-key"
- Check Firebase config in `.env`
- Verify all Firebase variables are set correctly
- Check Firebase project is active
- **Restart dev server**

### Changes not working
- **Always restart dev server** after editing `.env`:
  ```bash
  # Stop server (Ctrl+C)
  npm run dev
  ```

## File Structure

```
.env                 # Your actual credentials (NEVER commit!)
.env.example         # Template with placeholder values (committed to Git)
src/
  config/
    firebase.js      # Reads VITE_FIREBASE_* variables
    github.js        # Reads VITE_GITHUB_* variables
```

## How It Works

### In Code:

```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "fallback",
  // ...
};
```

### Environment:

```env
# .env
VITE_FIREBASE_API_KEY=actual-key
```

Vite automatically loads `.env` and makes variables available via `import.meta.env.VITE_*`.

**⚠️ Important:** Only variables starting with `VITE_` are exposed to the browser!

## Next Steps

1. ✅ Copy `.env.example` to `.env`
2. ✅ Fill in Firebase credentials
3. ✅ Generate and add GitHub token
4. ✅ Restart dev server
5. ✅ Test admin panel: http://localhost:5173/admin
6. ✅ Add variables to Vercel for production
