# Animation Class Portfolios

Two student portfolios in one site (yours and a friend’s), built for your animation class requirements.

- **Home:** `/`
- **Your portfolio:** `/portfolio/mine` — edit `content/mine.json`
- **Friend’s portfolio:** `/portfolio/friend` — edit `content/friend.json`

Class checklist (from `Mine/instructions.Md`):

- Cover with full name + “Animation Portfolio”
- **10+** original design/drawing works (labeled with title + media)
- **3+** animations, with **one** including progress (storyboard, BTS, description)
- Clean sections by type (character, drawing, backgrounds, digital, etc.)

---

## Google Drive: images & videos that update

**Recommended workflow:** keep files in Google Drive (same place you already upload class work). The website does **not** store the big files in Git — only **links** in JSON.

### 1. Share each file publicly (required)

1. Right-click the file in Google Drive → **Share**
2. **General access** → **Anyone with the link** → **Viewer**
3. Copy the link

### 2. Paste the link into JSON

In `content/mine.json` or `content/friend.json`, put the link (or just the file ID) in `image`, `images`, `video`, `still`, or `storyboard` fields.

Example:

```json
"image": "https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing"
```

### 3. When does the site “auto-update”?

| What you do in Drive | What happens on the site |
|----------------------|---------------------------|
| **Replace** the file (same file, new version) | Same link → site shows the new file after refresh |
| **Upload a new file** and delete the old one | **New link** → you must paste the new link in JSON and redeploy |
| Change sharing to “Restricted” | Site breaks until sharing is public again |

There is no magic folder sync: the site reads **URLs you list in JSON**. Drive is the “source of truth” for the media bytes; JSON is the catalog.

### 4. Redeploy after JSON changes

- Edit JSON locally → `git push` → Vercel rebuilds (1–2 minutes)
- You do **not** need to re-upload videos to Vercel

### Alternatives (if Drive embeds act up)

- **Cloudinary** or **Vercel Blob** — upload once, paste stable CDN URLs in JSON
- **YouTube / Vimeo (unlisted)** — paste embed URLs for videos only

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Git + Vercel deploy

### 1. Create a GitHub repo

On GitHub: **New repository** (e.g. `animation-portfolio`). Do not add a README if this folder already has one.

### 2. Push from your machine

```powershell
cd "c:\Users\Gugo3\Desktop\Projects\Animation Portfalio website"
git init
git add .
git commit -m "Initial animation portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. Confirm build passes (before or after first push)

```powershell
npm run build
```

Fix any errors before relying on Vercel.

### 4. Connect Vercel

1. [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)
4. **Deploy**

Every `git push` to `main` triggers a new production deploy.

### 5. URLs for class

- Site root: `https://your-project.vercel.app`
- Your portfolio: `https://your-project.vercel.app/portfolio/mine`
- Friend: `https://your-project.vercel.app/portfolio/friend`

---

## Customization

| File | Purpose |
|------|---------|
| `content/mine.json` | Your name, sections, artworks, animations |
| `content/friend.json` | Friend’s portfolio (same structure) |
| `src/lib/drive.ts` | Google Drive URL helpers |

Rename slugs: change `slug` in JSON and URLs under `/portfolio/...` (or add entries in `src/lib/portfolio.ts`).

---

## Troubleshooting media

- **Image blank:** file must be “Anyone with the link”; try opening the share link in an incognito window
- **Video won’t play:** use MP4 in Drive; very large files can be slow — consider YouTube unlisted for the final film
- **Still not updating:** you probably uploaded a *new* file — update the link in JSON and push
