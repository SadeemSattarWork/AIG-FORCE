/* Single source of truth for the contact details that appear across the site.
   These used to be hardcoded in the navbar, the footer and the contact page
   independently, which is how support@aigforce.com outlived the domain. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aigforce.co";

export const SUPPORT_EMAIL = "support@aigforce.co";

/** E.164 for tel: links; the display form is spaced for readability. */
export const PHONE_E164 = "+447828726419";
export const PHONE_DISPLAY = "+44 7828 726419";
