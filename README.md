# Order Desk Hyderabad — one page

Every order caught. Every rupee counted.

A single page for Order Desk Hyderabad, a one-founder order desk service for farm, food and
provisions sellers in Hyderabad who take orders by phone and lose some in a notebook.

No backend, no build step, no environment variables. `index.html` and `styles.css` are the
whole page; `assets/` holds the pictures.

## Look at it

Open `index.html` in a browser. Or serve the folder:

```
npx serve .
```

On import to Vercel it is a static site: leave the build command empty and the output
directory as the repository root.

## Two slots still to fill

Both sit in the "Who I am" section, each on its own line inside the sentence that
introduces it. Fill the bracket and the rest of the sentence stays as written.

| Line | Text |
|---|---|
| `index.html:158` | `<p>Why I started: [YOUR REASON]</p>` |
| `index.html:160` | `<blockquote>[CLIENT QUOTE]</blockquote>` |

Nothing else on the page is invented. Every number, service line and step comes from the
brief. Where the brief gave a line verbatim, it is used verbatim — the price especially:
`Rs 25,000 one time`.

## Contact links

All four are real links, and the page has nothing behind them (no form, no backend).

| Where | Line | Link |
|---|---|---|
| Header button, hero button, contact button, footer | 26, 38, 176, 193 | `https://cal.com/smerugumala/20-minutes-intro-call` |
| Contact and footer | — | `https://wa.me/919885626871` with a prefilled hello naming the business |
| Contact and footer | — | `mailto:somascloudworld@gmail.com` with a prefilled subject |

The booking link was supplied, so requirement 9's `BOOKING_LINK_GOES_HERE` placeholder was
never needed. To change the booking link, edit those four hrefs; to change the WhatsApp
number or the email, search the file for `wa.me/` and `mailto:`.

## The pictures

The `images/` folder does not use the names the brief expects. It holds a 2×2 contact
sheet of founder scenes, a stacked logo on a dark field, and six single-concept squares, so
the pictures were cut out of them. `tools/make-assets.mjs` records which crop became which
asset, so the mapping is auditable rather than guessed:

| Asset | Cut from | Notes |
|---|---|---|
| `logo-mark.png` | the stacked logo | the wheat mark alone, used in header and footer |
| `profile.webp` | contact sheet, top-left panel | head and shoulders, round avatar |
| `speaking.webp` | `Gemini…(2).png` | founder portrait on warm cream; fills the first screen |
| `working.webp` | contact sheet, top-right panel | at the order desk screen; a third of the width beside "Who I am" |
| `shot-before-after.webp` | `Gemini…(5).png` | paper slips and chat orders against the order desk screen |
| `shot-board.webp` | `Gemini…(4).png` | the four cards: New, Packed, Delivered, Unpaid |
| `shot-every-order.webp` | `Gemini…(3).png` | carries its own headline and logo; runs as the full-width band |

Regenerate them after replacing the source pictures:

```
node tools/make-assets.mjs
```

It needs `sharp`; it borrows the neighbouring `sweet-ginger-studio` install by default.
Point `SHARP_ROOT` at any project that has `sharp` if that one moves.

Photographs are converted to WebP, cutting the set from 7.7 MB to about 0.4 MB.

**One picture was deliberately left out.** `Gemini_Generated_Image_k5l88ak5l88ak5l8 (1).png`
is a good shop scene, but the laptop screen inside it has figures painted into it
(366 New, 1,328 Packed, 3,418 Delivered, "Daily ROAS"). Those numbers were never given, and
a picture is still a claim.

**These are placeholder mock-ups, not photographs of the real shop, and the garment of the
brand is not in them.** They are the pictures that were provided; they should be replaced
with real photographs of Soma and real shops before this page is relied on.

## A missing picture

Every picture sits inside a `<figure>`. If one fails to load, the figure hides itself and
the section keeps its heading and its words. Checked with two pictures removed: both
figures collapsed, all five headings and both slots stayed, and no horizontal scrolling
appeared.

## Colours and type

Named with their hex codes, used as the brief sets out:

- `#F7F1E4` Warm Rice Cream — page background
- `#141414` Ink Black — body text
- `#C97B2B` Saffron Thread — accent only: buttons, one headline word, the focus ring
- `#8A6A3B` Old Brass — small labels, icons, quiet rules
- `#1C2B2A` Night Ledger — header band, footer, and the ground behind the service shot

Fraunces for headlines, Inter for body, both from Google Fonts. Body text is 18 px at a
line height of 1.6, held to a comfortable measure. Sections use 56 px of padding on a phone
and up to 112 px on a laptop; buttons are at least 44 px tall.
