/**
 * Single source of truth for company details.
 *
 * TODO(owner): fill in the empty strings below. Nothing here is invented:
 * empty values are simply hidden (phone, email) or rendered as disabled
 * buttons (social links) until real data is provided.
 */
interface Company {
  name: string;
  shortName: string;
  tagline: string;
  slogan: string;
  credentials: string;
  credentialsDetail: string;
  phone: string;
  email: string;
  city: string;
  serviceArea: string;
  social: { facebook: string; instagram: string };
}

export const company: Company = {
  name: 'WOLF1K SERVICES',
  shortName: 'WOLF1K Services',
  tagline: 'Professional Trim & Carpentry Services',
  slogan: 'Built with precision · Finished with pride',
  // TODO(owner): shown next to the logo. Leave `credentials` empty ('') to hide the badge
  // if the company is not currently licensed and insured.
  credentials: 'Licensed & Insured',
  credentialsDetail: 'Residential · Reliable',
  phone: '407-603-1545',
  email: 'wolf1kservices@gmail.com',
  city: 'Tampa, FL',
  serviceArea: 'Tampa, Florida',
  social: {
    facebook: 'https://www.facebook.com/share/1EBtbpxtGQ/?mibextid=wwXIfr',
    instagram: '', // full URL
  },
};

/** Centralised brand asset paths (files live in frontend/public/assets/brand/). */
export const brandAssets = {
  logo: '/assets/brand/wolf1k-logo.png',
} as const;
