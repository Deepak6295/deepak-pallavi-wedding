# Pallavi & Deepak — Wedding Invitation

A single-page invitation for **Sunday, 13 December 2026**, at Bongal Pukhuri, Club Road, Jorhat.
Plain HTML, CSS and JavaScript — nothing to build, nothing to pay for.

## Files

```
index.html
style.css
script.js
preview.jpg              ← the picture WhatsApp shows when the link is shared
images/couple.jpg        ← the portrait in the arch
images/location-qr.png   ← the QR that opens the venue in Google Maps
```

## Putting it on GitHub Pages

1. Open your repository → **Add file → Upload files**.
2. Drag in `index.html`, `style.css`, `script.js`, `preview.jpg`, and the whole `images` folder.
   Let them replace the old files.
3. Commit.
4. **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main`, Folder: `/ (root)`.
5. Give it a minute, then open `https://deepak6295.github.io/deepak-pallavi-wedding/`.

If the WhatsApp preview still shows the old picture, that is WhatsApp's cache. Share the link
with a `?1` on the end once (`...wedding/?1`) and it will fetch the new one.

## What is on the page

- A folded card that parts down the middle when the seal is tapped.
- The portrait, set in an arch.
- The invitation and both sets of parents.
- A live countdown to 13 December. At midnight on the day it turns into
  *"Today is the day"* with a shower of petals; the day after, *"We are married"*.
- Time and venue, with **Add to your calendar** (downloads an `.ics`), **Open in Maps**,
  **Copy the address**, the QR code, and a phone number that dials on a tap.
- **Share this invitation** — uses the phone's native share sheet, so it goes straight to WhatsApp.

## Changing things

Everything you are likely to want to edit is plain text in `index.html`:

| To change | Look for |
|---|---|
| Names, parents, address, phone | anywhere in `index.html` — it reads top to bottom like the page |
| The date | `index.html`, and the three dates at the top of the countdown block in `script.js` |
| The map link | the two `https://maps.app.goo.gl/...` links in `index.html` |
| Colours | the `:root` block at the top of `style.css` |
| The Assamese line (শুভ বিবাহ) | `class="assamese"` — delete both if you would rather not have it |
| The timings | the `panel` block in `index.html` |

The countdown reads `2026-12-13T12:00:00+05:30` — that is 12 noon IST, so it is correct for
guests opening the page from anywhere in the world.

## Notes

- Works without JavaScript (the card simply opens straight to the invitation).
- Respects "reduce motion" in phone accessibility settings — the petals stop.
- Prints cleanly if anyone wants it on paper.
- The fonts (Italiana, EB Garamond, Noto Serif Bengali) load from Google Fonts.
