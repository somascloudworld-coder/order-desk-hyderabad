# REPORT — Order Desk Hyderabad, one page

## Status per part

Brief read before any file was written, and every not-held detail asked for and answered: DONE
  evidence: no file existed until the answers arrived; the answers used are name **Soma Sekhar M**, WhatsApp **919885626871**, email **somascloudworld@gmail.com**, booking link confirmed, fonts **Fraunces + Inter**, pictures **option (b)**
  evidence: the CONTACT DETAILS block the brief refers to does not exist — searched every `.md`, `.txt`, `.json`, `.jsonc`, `.html` in the project for `CONTACT DETAILS`, `smerugumala`, `cal.com`, `Order Desk Hyderabad`, `wa.me` -> nothing
  evidence: the brief arrived truncated mid-sentence at "tap targets at least 44 px, nothin"; the tail was never supplied and the page does not depend on it

Pictures listed from the folder and cut to the page's needs: DONE
  evidence: `images/` holds 12 files, 10 unique (two byte-identical pairs), and **none** named `logo`, `logo-dark`, `profile`, `working`, `speaking`, `shot-1..6`
  evidence: `node tools/make-assets.mjs` -> `8 asset(s), 0.40 MB total` — down from 7.69 MB as PNG
  evidence: every crop was opened and looked at before use; the first `logo-mark` and `profile` boxes were checked visually and kept

The page built to the brief: DONE
  evidence: `index.html` 220 lines + `styles.css` 456 lines, no build step, no backend
  evidence: header, hero, problem in the client's words, three services, one price, three steps, who I am, contact, footer — the nine parts the brief asks for
  evidence: `Rs 25,000 one time` appears once, verbatim

Colours and type exactly as specified: DONE
  evidence: the five hex codes are CSS custom properties and are named in a comment at the top of `styles.css`; one headline word is Saffron, buttons are Saffron, labels and icons are Old Brass, header and footer and the service-shot ground are Night Ledger, the page ground is Warm Rice Cream, body text is Ink Black
  evidence: Fraunces + Inter loaded from Google Fonts via `<link>`; body 18 px at line-height 1.6

Opened in a browser, looked at, and fixed: DONE
  evidence: screenshots at 1440x900 and 390x844, first screen and full page, via the installed Chrome
  evidence: `{"images":8,"broken":[],"smallTargets":[],"horizontalOverflowPx":0,"fontsLoaded":"loaded"}` on all four shots
  evidence: first pass revealed the before/after band cropped so hard its "Before/After" words were gone, and the four cards cut in half -> fixed by showing square art whole instead of strip-cropping it; second pass showed all of it intact

A missing picture leaves the page readable: DONE
  evidence: with `working.webp` and `shot-every-order.webp` renamed away -> `"aboutFigureHidden":true,"bandHidden":true` and all five headings plus both slots still present, `horizontalOverflowPx: 0`
  note: the first attempt at this test reported a failure, but the test had not scrolled, so lazy pictures were never requested; the code was right and the test was wrong

Published to a new repository: DONE
  evidence: `gh repo create somascloudworld-coder/order-desk-hyderabad --public --source=. --remote=origin --push` -> `https://github.com/somascloudworld-coder/order-desk-hyderabad`
  evidence: `git ls-remote origin main` -> `b87713109ab4c6496dbcb37045100c968409d878` equals local `HEAD`
  evidence: `gh repo view` -> `"isEmpty":false`, `"defaultBranchRef":{"name":"main"}`, `"visibility":"PUBLIC"`
  evidence: live fetch of `index.html`, `styles.css`, `assets/speaking.webp`, `assets/shot-every-order.webp`, `README.md` -> all `200`, and the fetched HTML carries the headline and the real booking link

## What broke and how I fixed it

1. **The before/after band lost its words.** The picture is square and its "Before" and
   "After" labels sit at its foot; a full-width cover crop put them outside the frame, and
   the four-card picture came out cut in half. Cause: cropping square art into a wide strip,
   not a CSS accident. Fix: show each square whole — two as contained figures, and the
   service shot whole on the full-width Night Ledger band the brief asks for. The band stays
   full width because the brief requires it; nothing is written over the picture.
2. **The footer logo was unreadable.** The stacked lockup at 72 px made the wordmark
   illegible and its own dark field showed as a panel on the Night Ledger band. Fix: the
   mark alone plus the business name as text, matching the header. The lockup asset was
   removed rather than left unused.
3. **The page weighed 7.7 MB.** Photographs straight out of the image generator. Fix: WebP
   at display-appropriate sizes -> 0.40 MB, a 95% cut.
4. **My own missing-picture test lied.** It reported the fallback had failed; the test never
   scrolled, so `loading="lazy"` pictures were never requested and never errored. Fix: the
   test scrolls the page first, and then it passes. The code was not changed, because the
   code was not wrong.
5. A piped `Select-Object -First` killed a script before its cleanup ran, leaving two
   assets renamed to `.away`. Detected by listing the folder and restored.

## Claims ledger

- Every contact detail is used exactly as given -> `Select-String` over `href=` -> `https://cal.com/smerugumala/20-minutes-intro-call`, `https://wa.me/919885626871?text=...`, `mailto:somascloudworld@gmail.com?subject=...`
- No invented number, quote, testimonial, client count, response time or free offer -> only two slots exist, `[YOUR REASON]` at `index.html:158` and `[CLIENT QUOTE]` at `index.html:160`; both are fenced by the sentence that introduces them
- The price is the given string -> `Rs 25,000 one time`
- No emoji, one icon size, inline SVG -> three `<svg class="icon">`, all 28 px, all Old Brass
- No full-width Saffron behind text -> Saffron only on buttons, one headline word and the focus ring
- Every picture has width, height and alt text -> 8 `<img>`, all carrying both
- Tap targets at least 44 px -> measured in the browser, `smallTargets: []`
- One column on a phone, no sideways scroll -> `horizontalOverflowPx: 0` at 390 wide
- The repository is public -> UNVERIFIED as a preference: visibility was not specified, so it was made public to match the other repositories and to make the Vercel import frictionless. One setting change makes it private.
- The pictures are real photographs of the real shop -> NOT TRUE and stated as such in the README: they are placeholder mock-ups, and the brand's garment is not in them.

## What I would tell the next person

- Fill the two slots at `index.html:158` and `:160`. Nothing else on the page is missing.
- Replace the pictures with real photography, then re-run `node tools/make-assets.mjs`. Keep
  the source filenames in `tools/make-assets.mjs` up to date if they change.
- `Gemini_Generated_Image_k5l88ak5l88ak5l8 (1).png` is unused on purpose: the laptop screen
  in it has invented figures. Do not quietly add it back.
- Import on Vercel as a static site: no build command, no environment variables, output
  directory is the repository root.
- The repository is called `order-desk-hyderabad`. The earlier design-studio repository was
  pushed as `sweergingerdesignstudio` with the typo, because that is the URL that was given.
