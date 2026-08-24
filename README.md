## Grant press access

    .\scripts\grant-press.ps1 -Email "reporter@nyt.com" -Outlet "The New York Times"

Creates the account, grants access, and sends the branded email with a
one-click link to the film. Safe to run twice — re-sends rather than duplicating.

.\scripts\grant-licence.ps1 -Email "colin@permapigs.com" -Organisation "Test School" -Type school

.\scripts\grant-licence.ps1 -Email "hr@acme.com" -Organisation "Acme Ltd" -Type organisation -InvoiceRef "INV-2026-015"

.\scripts\grant-licence.ps1 -Email "info@westlibrary.ie" -Organisation "West Library" -Type single

Creates the account, grants access, and sends the branded email with a
one-click link to the film. Safe to run twice — re-sends rather than duplicating.

If it complains about the secret:

    setx POSHPORK_ADMIN_SECRET "your-secret"

then open a new terminal.

See who has press access:

    select u.email, p.created_at
    from purchases p join auth.users u on u.id = p.user_id
    where p.source = 'press' order by p.created_at desc;


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



How to add an Agrotourismo Venue Code for supabase:

insert into venues (
  slug,
  name,
  contact_name,
  contact_email,
  phone,
  town,
  seats_per_table,
  adult_price_cents,
  status
)
values (
  'their-slug',
  'Their Hotel Name',
  'Contact person',
  'their@email.com',
  '+34 600 000 000',
  'Their town',
  4,
  1500,
  'active'
);

Then send them the one page agreement, they sign and return then set them as live by running this code: 
update venues set status = 'active', agreed_at = now()
where slug = 'agroturismo-example';

.\scripts\grant-venue.ps1 -Slug "vernissa"