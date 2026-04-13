export const WA_NUMBER = "917975193033";

export const ACTIVE_SLUGS = new Set([
  // Original 5 colleges
  "rvce-bangalore",
  "christ-university-bangalore",
  "bms-college-of-engineering",
  "msrit-bangalore",
  "pes-university-bangalore",

  // Bangalore colleges with keyword search volume
  "dayananda-sagar-college-of-engineering",
  "rnsit-bangalore",
  "new-horizon-college-of-engineering",
  "jain-university-bangalore",
  "alliance-college-of-engineering",
  "presidency-university-bangalore",
  "reva-university-bangalore",
  "acharya-institute-of-technology",
  "ramaiah-university-bangalore",
  "bmsit-bangalore",
  "rvitm-bangalore",
  "nitte-meenakshi-bangalore",
  "atria-institute-of-technology",
  "dayananda-sagar-university",
  "dsatm-bangalore",
  "oxford-college-of-engineering",
  "east-point-college-of-engineering",
  "cmr-university-bangalore",
  "t-john-institute-bangalore",

  // Additional colleges with fee data
  "srm-university-chennai",
  "bnmit-bangalore",
  "sapthagiri-nps-university",
  "nmam-institute-of-technology",
  "rv-university-bangalore",
  "hkbk-college-of-engineering",

  // GINED network colleges
  "east-west-institute-of-technology",
  "amc-engineering-college",
  "aditya-college-of-engineering",
  "akash-institute-of-engineering",
  "amruta-institute-of-engineering",
  "bangalore-technological-institute",
  "dhanwantari-college-of-engineering",
  "harsha-institute-of-technology",
  "impact-college-of-engineering",
  "national-college-of-engineering",
  "rajiv-gandhi-institute-of-technology",

  // High search-demand Karnataka colleges
  "jss-science-technology-university-mysore",
  "sir-mvit-bangalore",
  "bangalore-institute-of-technology",
  "mvj-college-of-engineering",
  "siddaganga-institute-of-technology-tumkur",
  "sjbit-bangalore",
  "kle-technological-university-hubli",
  "sdm-college-of-engineering-dharwad",
  "manipal-institute-of-technology",
]);

export const COLLEGE_IMAGES = {
  "rvce-bangalore":              "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80",
  "christ-university-bangalore": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80",
  "bms-college-of-engineering":  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
  "pes-university-bangalore":    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=80",
  "msrit-bangalore":             "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
};

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80";

export function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
