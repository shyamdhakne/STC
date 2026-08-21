# Shree Trimurti Computers — Static Website

Self-contained HTML, CSS, and JavaScript site for Shree Trimurti Computers (Cidco, Aurangabad). Upload the `shree-trimurti-computers` folder to any static host, or open `index.html` in a browser.

## Stack

- HTML5, CSS3, vanilla JavaScript
- No database, backend, login, or CMS
- Local images, logo, favicon, and hero video

## Local preview

Open `index.html`, or from this folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Enquiry form

Default behaviour is WhatsApp (`FORM_MODE: "whatsapp"` in `js/script.js`).

To switch:

1. Set `FORM_MODE` to `"mailto"` to open an email draft, or `"formspree"` for Formspree.
2. If using Formspree, replace `YOUR_FORM_ID` in `FORMSPREE_ENDPOINT`.
3. Netlify Forms can be added later by giving the form a `netlify` attribute and a static `action`.

Contact values in the page and in `CONFIG` match the supplied business details. Update them in both `index.html` and `js/script.js` if they change.

## Contact

- Address: N-2 Shop No.6, Darshan Plaza, Near Lokvikas Bank, Cidco, Aurangabad, Maharashtra, 431003
- Mobile / WhatsApp: +91-9823031563
- Email: shreetrimurti_computers@rediffmail.com
- Hours: 9:00 AM to 7:00 PM

## Structure

```
index.html
css/style.css
js/script.js
assets/images/...
assets/videos/hero-technology.mp4
assets/icons/favicon.svg
```
