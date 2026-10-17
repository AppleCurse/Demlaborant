# Demlab: Combined Store

Bring all the uploaded Demlab versions together into one Turkish store on this project's stack. Orders get saved for real with Lovable Cloud.

## What you get

Pages, taken from Demlab-main:
- Home (/): the main landing page from the landing-page versions, with the dilution vessel visual, package picker, price table, lot/COA analysis cards, customer stories, FAQ and payment trust section
- Products (/products) and product detail (/products/$slug)
- Calculator (/calculator)
- Checkout (/checkout) and order success (/order-success)
- Order tracking (/tracking): look an order up by its order number and phone
- Documents / lot certificates (/documents), About, Contact (with an inquiry form), Privacy, Terms

Shared on every page: header, cart drawer, footer, sticky bar on mobile, WhatsApp button, cookie banner.

Look: same visual style as the Demlab-Full-Ticaret HTML file and the landing component's styles, using the fonts and colors those files define.

## Data saved in Lovable Cloud
- packages (volume, price, badge, courier eligibility), loaded with the packages from the uploaded files
- districts (courier delivery time) and lots (lab analysis values), loaded the same way
- orders: created from checkout, with an order number; anyone can place one, but only the tracking lookup (order number + phone) can read one back
- inquiries from the contact form

## Technical details
- Port Next.js pages to TanStack routes, one file per page; `next/link`/`next/image` become router Link/img; the cart context goes into a client provider in __root
- Lovable Cloud tables + RLS: public SELECT on packages/districts/lots; INSERT-only for anon on orders/inquiries; tracking is a server function that checks the order number and phone together
- Seed rows go in the migration from the uploaded seed.ts/data files
- Each route gets its own head() metadata in Turkish
- Unused Next/drizzle files are left out
