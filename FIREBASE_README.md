# 🔥 Firebase & GitHub Integration - Summary

## What's New?

Your admin panel now supports **cloud-based data storage**:

- **Firebase Firestore** - Cloud database for all content
- **GitHub** - Image hosting via repository
- **Migration tool** - Easy transition from localStorage

## Quick Setup (5 minutes)

### 1. Install Dependencies ✅
```bash
npm install firebase
```
Already done!

### 2. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Create project → Enable Firestore → Get config
3. Details in `FIREBASE_SETUP.md`

### 3. Get GitHub Token

1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Copy token

### 4. Configure Environment

Create `.env` file:

```env
# Firebase
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender
VITE_FIREBASE_APP_ID=your-app-id

# GitHub
VITE_GITHUB_OWNER=Andrey2528
VITE_GITHUB_REPO=AnKo
VITE_GITHUB_BRANCH=main
VITE_GITHUB_TOKEN=ghp_your_token
```

See `.env.example` for template.

### 5. Create Uploads Directory

```bash
mkdir -p src/assets/images/uploads
touch src/assets/images/uploads/.gitkeep
git add src/assets/images/uploads/.gitkeep
git commit -m "Add uploads directory"
git push
```

### 6. Restart Dev Server

```bash
npm run dev
```

**Important:** Restart required for .env changes!

## Migration

### Option A: Admin Panel (Recommended)

1. Open http://localhost:5173/admin
2. Click **"Migration"** tab in sidebar
3. Click **"🚀 Migrate to Firestore"**
4. Verify data in other tabs
5. (Optional) Click **"🗑️ Clear Old LocalStorage"**

### Option B: Manual

Check existing data:
```javascript
localStorage.getItem('anko_home_sections_v1')
localStorage.getItem('anko_projects_v1')
localStorage.getItem('anko_pages_v1')
```

## New Files Structure

```
src/
├── config/
│   ├── firebase.js          # Firebase config & initialization
│   └── github.js            # GitHub image upload API
├── api/
│   └── firestore/           # Firestore APIs (replaces localStorage)
│       ├── homeSections.js
│       ├── projects.js
│       └── pages.js
├── components/ui/
│   └── ImageUpload/         # Image upload component
│       ├── ImageUpload.jsx
│       └── ImageUpload.scss
├── admin/components/
│   └── MigrationTab.jsx     # Migration UI
└── utils/
    └── migration.js         # Migration utilities

.env.example                 # Environment template
FIREBASE_SETUP.md           # Detailed setup guide
MIGRATION_GUIDE_UA.md       # Ukrainian guide
```

## Features

### Image Upload Component

```jsx
import { ImageUpload } from '@/components/ui';

<ImageUpload
  currentImage={project.image}
  onImageUploaded={(url) => setProject({ ...project, image: url })}
  showPreview={true}
/>
```

- Auto-upload to GitHub
- Preview before upload
- Delete functionality
- Max 5MB size
- Image validation

### Firestore API

```javascript
// Home Sections
import { loadHomeSections, saveHomeSection } from '@/api/firestore/homeSections';

const sections = await loadHomeSections();
await saveHomeSection('hero', heroData);

// Projects
import { getProjects, createProject, updateProject, deleteProject } from '@/api/firestore/projects';

const projects = await getProjects();
const newProject = await createProject({ title: 'New', ... });
await updateProject(id, { title: 'Updated' });
await deleteProject(id);

// Pages
import { getPages, getPageBySlug, createPage, updatePage, deletePage } from '@/api/firestore/pages';

const pages = await getPages();
const page = await getPageBySlug('about');
```

## Documentation

- **FIREBASE_SETUP.md** - Complete Firebase setup guide
- **MIGRATION_GUIDE_UA.md** - Ukrainian instructions
- **.env.example** - Environment variables template

## Security Notes

⚠️ **Before production:**

1. Add `.env` to `.gitignore` (already done)
2. Never commit `.env` to GitHub
3. Enable Firebase Authentication
4. Update Firestore security rules:

```javascript
match /{document=**} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

## Benefits

✅ **Cloud Storage**
- Access admin from any device
- Data persists across browsers
- No localStorage limitations

✅ **Image Hosting**
- Free GitHub storage
- Version control for images
- Fast CDN delivery

✅ **Real Database**
- Proper queries
- Scalability
- Real-time sync

✅ **Backup**
- Images in Git history
- Data in Firebase
- Export to localStorage

## Testing Checklist

After setup, verify:

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] GitHub token generated
- [ ] `.env` file configured
- [ ] Uploads directory exists in repo
- [ ] Dev server restarted
- [ ] Migration tab visible in admin
- [ ] Data migrated successfully
- [ ] Image upload works
- [ ] Data loads from Firestore

## Next Steps

1. Complete Firebase setup (FIREBASE_SETUP.md)
2. Configure `.env` file
3. Run migration
4. Test image uploads
5. Enable Firebase Authentication
6. Update security rules
7. Deploy to production

## Troubleshooting

**"GitHub token not configured"**
- Check `.env` file exists
- Restart dev server

**"Firebase: invalid-api-key"**
- Verify Firebase config in `.env`
- Check project is active

**Image upload fails**
- Check GitHub token has `repo` permissions
- Verify uploads directory exists in GitHub
- Check repo name in `.env`

---

📚 **Full Documentation:** See `FIREBASE_SETUP.md` and `MIGRATION_GUIDE_UA.md`

🚀 **Ready to go!** Your admin now uses Firebase + GitHub for professional cloud-based content management.
