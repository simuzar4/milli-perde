# Milli Pərdə

Azərbaycan kinosunun kataloqu: filmlər, rejissorlar, aktyorlar. Hər filmin səhifəsində YouTube pleyeri var, video rəsmi kanallarda açılır.

Stack: Vite, React, TypeScript, React Router, Tailwind CSS 3.

## İşə salmaq

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Data

- `research/` (film məlumatı, YouTube linkləri, icmallar) → `node scripts/build-films.mjs research` → `src/data/films.json`.
- `node scripts/build-people.mjs` aktyor və rejissor fotoları üçün Vikipediya/Wikidata-nı yoxlayır → `src/data/people.json`. Yalnız ad və təsvir uyğun gələn, pulsuz lisenziyalı şəkillər qəbul olunur.
- `PRODUCT.md` məhsul kontekstidir, `DESIGN.md` dizayn sistemidir.
