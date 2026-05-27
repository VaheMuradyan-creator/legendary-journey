# Animation Class Portfolio

Portfolio for **Vahe Muradyan**.

## Public pages

| URL | Content |
|-----|---------|
| `/` | Animation class portfolio (10 works + 3 films) |
| `/art-structure` | Art Structure class — 7 works, material groups, 4 artist statements |
| `/animation` | Animation films only |

## Private editor: Portfolio Studio

Bookmark **`/studio/login`** (replaces old `/subpage`).

| URL | Purpose |
|-----|---------|
| `/studio` | **Portfolio Studio** hub |
| `/studio/art-structure` | Edit Art Structure portfolio |
| `/studio/animation` | Edit animation films |

Set `ADMIN_PASSWORD` and `SESSION_SECRET` on Vercel and in `.env.local`.

## Saves survive deploys

1. Vercel → **Storage** → **Blob** → Create  
2. Redeploy  
3. Save once in Portfolio Studio  

Live content stays in Blob; git pushes only update code.

---

## Art Structure requirements

From `Mine/Art_Structure_instructions.md`:

- Cover: name + **Art Structure Portfolio** + cover image  
- **7** artworks (title, **year**, media)  
- Full-view image + **detail** images  
- Grouped by **material/theme** (drawing, painting, etc.)  
- **4 artist's statements** (slots 1–4 flagged in studio)  
- Optional process / sketchbook images  

---

## Local dev

```powershell
npm install
npm run dev
```

```powershell
npm run build
```

## Git + Vercel

```powershell
git add .
git commit -m "Portfolio Studio, Art Structure layout, Blob persistence"
git push origin main
```

Vercel redeploys automatically on push to `main`.
