const galleryImageHeights: Record<string, number> = {
  adat01: 450,
  danau03: 450,
  danau06: 450,
  danau14: 450,
  food01: 450,
  hotsprings01: 450,
  hotsprings03: 600,
  scr01: 450,
  senaru01: 450,
  senaru03: 450,
  senaru08: 450,
  senaru12: 450,
  senaru21: 369,
  smbln03: 450,
  smbln09: 600,
  smbln21: 369,
  smbln22: 369,
  ss06: 450,
  ss09: 450,
  ss12: 450,
  summit: 450,
  summit08: 600,
  summit10: 450,
  trn01: 450,
  trn16: 369,
};

export interface GalleryImageVariants {
  thumbnail: string;
  full: string;
  width?: number;
  height?: number;
  fullWidth?: number;
  fullHeight?: number;
}

export const getGalleryImageVariants = (src: string): GalleryImageVariants => {
  const filename = decodeURIComponent(src.split("?")[0].split("/").pop() ?? "");
  const stem = filename.replace(/\.jpg$/i, "");
  const height = galleryImageHeights[stem];

  if (!height) return { thumbnail: src, full: src };

  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const directory = `${base}/images/optimized/gallery/${stem}`;
  return {
    thumbnail: `${directory}-800.webp`,
    full: `${directory}-2200.webp`,
    width: 800,
    height,
    fullWidth: 2200,
    fullHeight: height === 450 ? 1238 : height === 369 ? 1016 : 1650,
  };
};
