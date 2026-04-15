export const WA_NUMBER = "917975193033";

export const COLLEGE_IMAGES = {
  "rvce-bangalore":              "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80",
  "christ-university-bangalore": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80",
  "bms-college-of-engineering":  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
  "pes-university-bangalore":    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=80",
  "msrit-bangalore":             "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80",
};

const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
  "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80",
];

export const FALLBACK_IMAGE = STOCK_IMAGES[0];

export function getCollegeImage(college) {
  if (!college) return STOCK_IMAGES[0];
  if (COLLEGE_IMAGES[college.slug]) return COLLEGE_IMAGES[college.slug];
  if (college.cover_url) return college.cover_url;
  const id = typeof college.id === "number" ? college.id : 0;
  return STOCK_IMAGES[id % STOCK_IMAGES.length];
}

export function waLink(msg) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
