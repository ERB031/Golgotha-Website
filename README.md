# Golgotha Website

Static marketing site for the feature film **Golgotha**, a poetic horror-noir about Detective David Hill confronting grief, faith, and supernatural crime. The site is optimized to cultivate financing conversations, audience signups, and supporter donations.

## Structure

- `index.html` &mdash; Homepage hero, KPIs, and momentum overview.
- `story.html` &mdash; Three-act synopsis.
- `director.html` &mdash; Director's statement.
- `cast-crew.html` &mdash; Placeholder cast and crew bios.
- `gallery.html` &mdash; Mood still placeholders.
- `press.html` &mdash; Press status.
- `screenings.html` &mdash; Screening updates.
- `investors.html` &mdash; Financing overview, KPIs, and CTAs.
- `contact.html` &mdash; Contact form and production office details.
- `assets/css/main.css` &mdash; Shared noir-inspired styling.

## Local Preview

Open any of the HTML files directly in a browser or serve the directory with a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.


## Porkbun Deployment

Porkbun&rsquo;s static hosting expects your upload to unpack so that `index.html` and the other HTML files live directly at the document root. When creating a ZIP archive, ensure you compress the contents of the repository (all HTML files plus the `assets/` directory) rather than a parent folder. For example:

```bash
zip -r golgotha-site.zip index.html story.html director.html cast-crew.html gallery.html press.html screenings.html investors.html contact.html assets
```

Upload that archive to Porkbun and the platform will serve the site exactly as it appears locally.
