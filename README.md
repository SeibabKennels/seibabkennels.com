# Seibab Kennel

Reconstruction of the client's public React website with its original styles, copy, photographs, and video. The recovered view code is formatted in `app/recovered-site.jsx`; server routes and content management are separate editable source files.

## Owner dashboard

Visit `/admin` and sign in with the credentials provided during setup. The password is configured as a PBKDF2 hash in hosting secrets, never in client code. Sessions expire after eight hours. The owner can manage puppies, studs, news, upcoming breedings, incoming messages, deposit requests, reviews, page text, and gallery photos. Text fields in listings save automatically; wait for the saving indicator to disappear before leaving. The website text editor has an explicit Save button.

Reviews require approval before appearing publicly. Contact and animal-interest forms save messages to the dashboard. Email Customer opens the owner's email application; this site does not send email automatically or process payments. Deposit requests are records, not payment transactions.

## Development and hosting

Install with `npm ci`, run `npm run dev`, and build with `npm run build`. Set the variables listed in `.env.example` in `.dev.vars` locally and in the hosting secret manager for production. Never commit `.dev.vars` or `.env`. The server uses Cloudflare Workers, D1 (`DB`), and R2 (`FILES`). Drizzle migrations are in `drizzle/` and must be applied before running against a new database. The Sites manifest contains the project reference and logical storage bindings.

## Migration notes

The original public site had eight content pages plus `/admin`. Its old database hostname did not resolve during recovery, so existing listings, updates, reviews, inquiries, and deposit records could not be imported. No sample animals or fabricated customer reviews are included. Original bundled images and video are stored locally and do not depend on the old hosting account.

The original browser-only password logic and old database client were removed. New API authorization is server-side and applies to every private read and owner write. Public reviews exclude email addresses. Uploads validate file signatures and size; accepted formats are JPEG, PNG, WebP, and owner-uploaded pedigree PDFs.

## Domain handoff

The replacement is initially hosted privately for review. Before making it public and connecting `seibabkennels.com`, confirm the owner has reviewed the content and entered current listings. Add both the apex and `www` domain to the chosen host and copy the host's exact DNS instructions into GoDaddy. Preserve all existing MX, SPF, DKIM, and other mail-related records. Verify HTTPS and the website before retiring the old hosting. Source and hosting ownership should be handed to the client as part of launch.

## Verification

Production build and TypeScript checks passed. HTTP integration checks covered login failure/success, unauthorized reads/writes, listing create/edit/read/delete, inquiries, review moderation and email privacy, image upload/delivery, and session revocation. Browser interaction and visual comparison were not performed. Optional WebMCP read tooling is feature-detected; no supported validation context was available in this session.
