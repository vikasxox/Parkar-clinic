# Parkar Health Care — Website Bundle

A responsive, single-page website built with plain HTML, CSS and JavaScript. No build process or package installation is required.

## Files

- `index.html` — page content, metadata and structured business information
- `style.css` — design system, responsive layouts, motion and gallery styling
- `script.js` — mobile navigation, scroll reveals, expandable photo gallery and lightbox
- `assets/media/` — supplied clinic/storefront photographs used by the website
- `assets/reviews/` — original review screenshots supplied for this project
- `assets/reference/` — screenshots of the Maps service listings supplied for reference
- `assets/favicon.svg` — small site icon

## Preview locally

Open `index.html` in a modern browser. For best results, use a small local server (for example, VS Code Live Server) so local assets behave exactly as they will after deployment.

## Deploy

Upload the entire folder, preserving the directory structure, to your static host (GitHub Pages, Netlify, Vercel static hosting or a web server). Do not upload only the HTML file; the CSS, JavaScript and `assets` folder are required.

## Before publishing

1. **Confirm the telephone number.** It was transcribed from the supplied Maps screenshot as `093214 44300`. The `tel:` and WhatsApp links use the normalized Indian number `+91 93214 44300`.
2. Confirm that home collection, specific tests, listed specialties and day-care services are currently offered. The website advises visitors to call first because availability can change.
3. Confirm clinic hours, fees, doctor names/qualifications, booking process and any required legal/registration details before adding them. These details were not assumed.
4. Review the customer-review excerpts and ensure you are comfortable publishing them. Original screenshots are retained in `assets/reviews/`.
5. The site uses Google Fonts when online; system fonts are configured as fallbacks.

## Accessibility and behaviour

- Responsive desktop, tablet and mobile layouts
- Semantic landmarks, skip link and descriptive image text
- Keyboard-accessible navigation and gallery controls
- Reduced-motion preference support
- Call links open the dialler; WhatsApp links open a prefilled enquiry; direction links open the Maps listing

The site is informational and does not provide medical advice or emergency triage.
