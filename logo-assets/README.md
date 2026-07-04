# SaudinTech Logo — Asset Package

Final selection: **the "6a / 4d" mark** — a gradient chevron badge paired with the
lowercase wordmark `saudintech`.

## Files

### `svg/` (vector — use these in the actual web/app build)
- `icon.svg` — badge mark only (gradient green circle + white chevron). Use for favicons, app icons, social avatars.
- `icon-reversed.svg` — white circle + green chevron, for placing the mark on dark/green surfaces.
- `logo-horizontal-light.svg` — full lockup (icon + wordmark) for light backgrounds.
- `logo-horizontal-dark.svg` — full lockup for dark or brand-green backgrounds.
- `logo-stacked.svg` — icon centered above the wordmark, for square/tall placements (splash screens, print).

**Note on the wordmark text:** the SVGs set `font-family="Sora, Arial, sans-serif"`. Sora is a free Google Font — load it in the target app (`@import` or `<link>` to Google Fonts, weight 800) so the wordmark renders exactly as designed. Without it, browsers fall back to the nearest system sans-serif.

### `png/` (raster — favicons & app icons, no font dependency)
- `icon-16.png`, `icon-32.png`, `icon-64.png`, `icon-180.png`, `icon-192.png`, `icon-512.png` — badge mark at standard favicon/app-icon sizes.
- `apple-touch-icon-180.png` — same as `icon-180.png`, named for iOS home-screen icons.
- `icon-reversed-512.png` — white/green reversed mark, e.g. for a dark-mode app icon or avatar on a green surface.

## Colors

| Token | Hex |
|---|---|
| Brand green (solid) | `#0a5c3a` |
| Gradient light stop | `#34d399` |
| Gradient dark stop | `#0a5c3a` |
| Mint (text-on-dark accent) | `#a7f3d0` |
| Ink (wordmark on light) | `#0f1f18` |

Badge gradient: `linear-gradient(135deg, #34d399 0%, #0a5c3a 100%)` (diagonal, top-left to bottom-right).

## Typography

- Wordmark: **Sora**, weight 800, lowercase, letter-spacing ≈ `-0.035em`.
- "tech" is always colored `#0a5c3a` (or `#a7f3d0` on dark), "saudin" stays the surrounding text color.

## Usage guidance

- Minimum clear space around the lockup: half the badge diameter on all sides.
- Minimum size: don't render the horizontal lockup below ~24px badge height — the wordmark stops being legible.
- Use `icon.svg` / the PNG set for favicons (`<link rel="icon">`), Apple touch icon, and Android/PWA manifest icons.
- Use `logo-horizontal-light.svg` in the site header on white/light surfaces; `logo-horizontal-dark.svg` on the brand-green footer or dark sections.

### Favicon/manifest snippet
```html
<link rel="icon" href="/icon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
```

## Source

Full logo exploration (all directions considered) lives in `SaudinTech Logo.dc.html` in this project, for reference/history.
