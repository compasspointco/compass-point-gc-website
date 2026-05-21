# Compass Point LLC — Website

This is a lightweight, accessible, mobile-responsive website scaffold for Compass Point LLC (SDVOSB) intended for government contracting audiences.

Quick start
- Open `index.html` in a browser for a local preview.
- Replace placeholders for contact info and registration values in `index.html` (if needed):
  - Email: `mpetty@compasspointgc.com` is already set in the template.
  - Replace `PHONE_HERE` with your phone number (two places).
  - Replace `CAGE_PLACEHOLDER` and `UEI_PLACEHOLDER` with confirmed values when available.

Form handling
- The contact form includes `data-netlify="true"` and a hidden `form-name` input to allow direct Netlify form submissions. If you host on Netlify, no further backend is required.
- Alternative: remove `data-netlify` and integrate with Formspree, SendGrid, or a server endpoint. The current JS provides a mailto fallback when a server endpoint is not configured.

Accessibility & performance
- Semantic HTML, labeled controls, and ARIA attributes are included for WCAG 2.1 AA compatibility.
- Minimal JS and CSS to keep page weight low for restricted networks.

Deployment notes — Netlify (recommended)
- Files included: `netlify.toml` and `_headers` are present to simplify Netlify hosting.

Option A — Quick deploy (drag & drop)
1. Zip the `website` folder.
2. In Netlify, choose "Sites" → "Add new site" → "Deploy manually" and drag the folder to the Netlify window.
3. Netlify will publish immediately.

Option B — Git integration (recommended for updates)
1. Push your repo to GitHub/GitLab/Bitbucket.
2. In Netlify, choose "New site from Git" and connect your repository.
3. Set the build settings: leave "Build command" empty and set "Publish directory" to `website` (unless you make this folder the repository root, then use `.`).

Forms on Netlify
- The contact form uses `data-netlify="true"` and a `form-name` hidden input. Netlify will detect the form at build time and enable submissions.
- To receive email notifications for submissions, configure notifications in the Netlify dashboard or add a webhook (e.g., Zapier) to forward entries to email/Slack.
- After deploying, test the form from the live site. You can view submissions in Netlify under "Forms" for the site.

Security & performance
- `_headers` sets conservative caching and security headers. Adjust as needed for faster caching of static assets.

Next steps I can do for you
- Deploy the site for you if you provide repository access or a Netlify user account invite.
- Configure an email webhook or Zapier integration to forward form submissions to `mpetty@compasspointgc.com`.
- Replace placeholder logos with your uploaded artwork and tweak colors to match.
