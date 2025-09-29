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
- `public/poster-og-placeholder.svg` &mdash; Text-based poster placeholder used for open graph metadata.

## Local Preview

Open any of the HTML files directly in a browser or serve the directory with a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

To verify the Open Graph placeholder renders, open `http://localhost:8000/public/poster-og-placeholder.svg` in a browser; the text-based poster should display crisply inlined against a dark background.
