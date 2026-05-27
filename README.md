# Animation Class Portfolio

Single portfolio site for your animation class final. Edit all content in **`content/mine.json`**.

- **Live site:** `/` (home is your full portfolio)

Class checklist (from `Mine/instructions.Md`):

- Cover with full name + “Animation Portfolio”
- **10+** original design/drawing works (labeled with title + media)
- **3+** animations, with **one** including progress (storyboard, BTS, description)
- Clean sections by type (character, drawing, backgrounds, digital, etc.)

---

## Google Drive: images & videos

Keep files in Google Drive. The site stores **links** in `content/mine.json`, not the files themselves.

1. Share each file: **Anyone with the link** → **Viewer**
2. Paste the share link into `image`, `images`, `video`, `still`, or `storyboard` in `content/mine.json`
3. Replace the **same** file in Drive → same link updates on the site
4. Upload a **new** file → paste the new link in JSON and push to Git

After JSON changes: `git push` → Vercel redeploys.

---

## Local development

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```powershell
npm run build
```

---

## Git + Vercel

Repo: [legendary-journey](https://github.com/VaheMuradyan-creator/legendary-journey)

If `git remote add origin` says **remote origin already exists**, point it at your repo:

```powershell
git remote set-url origin https://github.com/VaheMuradyan-creator/legendary-journey.git
git remote -v
git push -u origin main
```

First-time setup:

```powershell
cd "c:\Users\Gugo3\Desktop\Projects\Animation Portfalio website"
git add .
git commit -m "Single animation portfolio"
git push -u origin main
```

On [vercel.com](https://vercel.com), import **legendary-journey** and deploy. Each push to `main` updates production.

---

## Customization

| File | Purpose |
|------|---------|
| `content/mine.json` | Name, artworks, animations, Drive links |
| `src/lib/drive.ts` | Google Drive URL helpers |
