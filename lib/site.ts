/* Single source of truth for the contact details that appear across the site.
   These used to be hardcoded in the navbar, the footer and the contact page
   independently, which is how support@aigforce.com outlived the domain. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aigforce.co";

export const SUPPORT_EMAIL = "support@aigforce.co";
