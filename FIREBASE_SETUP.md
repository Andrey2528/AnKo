# Firebase + GitHub Setup Guide

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "AnKo Portfolio")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click "Create database"
3. Select **Start in production mode**
4. Choose location (closest to your users)
5. Click "Enable"

### 3. Set Firestore Security Rules

Go to **Firestore Database** > **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access
    match /{document=**} {
      allow read: if true;
    }
    
    // Allow write only for authenticated users
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

### 4. Get Firebase Config

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll to "Your apps" section
3. Click web icon (`</>`)
4. Register app (nickname: "AnKo Web")
5. Copy the `firebaseConfig` object values

### 5. Enable Authentication (Optional but recommended)

1. Go to **Build** > **Authentication**
2. Click "Get started"
3. Enable **Email/Password** provider
4. Add your admin email

## 🐙 GitHub Setup

### 1. Generate Personal Access Token

1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click **Developer settings** > **Personal access tokens** > **Tokens (classic)**
3. Click "Generate new token (classic)"
4. Name it: "AnKo Image Uploads"
5. Set expiration (or "No expiration")
6. Select scopes:
   - ✅ **repo** (Full control of private repositories)
7. Click "Generate token"
8. **⚠️ Copy the token immediately** (you won't see it again!)

### 2. Create Images Directory in Repo

Option A: Via GitHub Web Interface
1. Go to your repository
2. Navigate to `src/assets/images/`
3. Click "Add file" > "Create new file"
4. Name it: `uploads/.gitkeep`
5. Commit changes

Option B: Via Terminal
```bash
mkdir -p src/assets/images/uploads
touch src/assets/images/uploads/.gitkeep
git add src/assets/images/uploads/.gitkeep
git commit -m "Create uploads directory"
git push
```

## ⚙️ Project Configuration

### 1. Create .env File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 2. Fill in Environment Variables

Edit `.env` with your credentials:

```env
# Firebase Config (from step 4 above)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# GitHub Config
VITE_GITHUB_OWNER=Andrey2528
VITE_GITHUB_REPO=AnKo
VITE_GITHUB_BRANCH=main
VITE_GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Add .env to .gitignore

Make sure `.env` is in `.gitignore` (already done):

```
.env
.env.local
```

**⚠️ NEVER commit .env to GitHub!**

## 🚀 Migration from localStorage

### Option 1: Manual Migration

1. Open your site with old localStorage data
2. Open browser console
3. Run migration script:

```javascript
// Export localStorage data
const homeSections = JSON.parse(localStorage.getItem('anko_home_sections_v1'));
const projects = JSON.parse(localStorage.getItem('anko_projects_v1'));
const pages = JSON.parse(localStorage.getItem('anko_pages_v1'));

console.log('Home Sections:', homeSections);
console.log('Projects:', projects);
console.log('Pages:', pages);

// Copy these to clipboard and save to Firestore via admin panel
```

### Option 2: Automatic Migration Script

Create and run a migration script (will be provided separately).

## 🧪 Testing

1. Start dev server:
```bash
npm run dev
```

2. Go to admin panel: `http://localhost:5173/admin`

3. Test:
   - ✅ Load data from Firestore
   - ✅ Edit sections
   - ✅ Upload image to GitHub
   - ✅ Create/edit/delete projects
   - ✅ Create/edit/delete pages

## 🔒 Security Checklist

- ✅ `.env` in `.gitignore`
- ✅ Firestore rules allow only authenticated writes
- ✅ GitHub token has minimal permissions (only `repo`)
- ✅ Token stored in environment variables
- ✅ Enable Firebase Authentication for admin
- ⚠️ Don't share your `.env` file
- ⚠️ Rotate GitHub token if compromised

## 📝 Notes

### Image Uploads
- Images stored in: `src/assets/images/uploads/`
- Max size: 5MB
- Formats: jpg, png, gif, svg, webp
- URL format: `https://raw.githubusercontent.com/Andrey2528/AnKo/main/src/assets/images/uploads/filename.jpg`

### Firestore Collections
- `homeSections` - Single document with all sections
- `projects` - Collection of project documents
- `pages` - Collection of page documents

### GitHub Commits
- Each image upload creates a commit
- Commit message: "Upload image: filename.jpg"
- Each delete creates a commit: "Delete image: filename.jpg"

## 🆘 Troubleshooting

### "GitHub token not configured"
- Check `.env` file exists
- Verify `VITE_GITHUB_TOKEN` is set
- Restart dev server after changing `.env`

### "Firebase: Error (auth/invalid-api-key)"
- Check Firebase config in `.env`
- Verify API key is correct
- Check Firebase project is active

### Image upload fails
- Check GitHub token permissions
- Verify repo name is correct
- Check if `uploads` directory exists in repo

### Firestore permission denied
- Check Firestore rules
- Enable Authentication
- Sign in to admin panel

## 🎉 Done!

Your admin panel now uses:
- 🔥 **Firebase Firestore** for data storage
- 🐙 **GitHub** for image hosting
- 🔐 **Firebase Auth** for admin security

Data is accessible from anywhere, syncs in real-time, and images are versioned in Git!
