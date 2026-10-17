/**
 * Supplied collection concept photography. These are preview images, not product records.
 * Keep prices, composition, availability, release dates and membership benefits out of this data.
 */
export type MemberImage = {
  id: string;
  title: string;
  category: 'Editorial' | 'Knitwear' | 'Small goods';
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  fit: 'cover' | 'contain';
  objectPosition: string;
  screenshotCrop?: boolean;
};

export const memberImages: MemberImage[] = [
  {
    "id": "reading-room-ivory",
    "title": "In the reading room / ivory",
    "category": "Editorial",
    "src": "/media/members/reading-room-ivory-1118.webp",
    "srcSet": "/media/members/reading-room-ivory-480.webp 480w, /media/members/reading-room-ivory-800.webp 800w, /media/members/reading-room-ivory-1118.webp 1118w",
    "width": 1118,
    "height": 1407,
    "alt": "Model in an ivory cable-knit hoodie with burgundy sleeve stripes, crouching beside books in a softly lit room.",
    "fit": "cover",
    "objectPosition": "50% 30%"
  },
  {
    "id": "reading-room-noir",
    "title": "In the reading room / noir",
    "category": "Editorial",
    "src": "/media/members/reading-room-noir-1097.webp",
    "srcSet": "/media/members/reading-room-noir-480.webp 480w, /media/members/reading-room-noir-800.webp 800w, /media/members/reading-room-noir-1097.webp 1097w",
    "width": 1097,
    "height": 1434,
    "alt": "Model reading in a warm wood-lined room, wearing a dark hooded knit with gold sleeve stripes.",
    "fit": "cover",
    "objectPosition": "50% 46%"
  },
  {
    "id": "ivory-portrait",
    "title": "Portrait / ivory",
    "category": "Editorial",
    "src": "/media/members/ivory-portrait-1073.webp",
    "srcSet": "/media/members/ivory-portrait-480.webp 480w, /media/members/ivory-portrait-800.webp 800w, /media/members/ivory-portrait-1073.webp 1073w",
    "width": 1073,
    "height": 1465,
    "alt": "Portrait of a model in glasses and a brimmed hat wearing an ivory cable-knit hoodie with burgundy sleeve stripes.",
    "fit": "cover",
    "objectPosition": "50% 38%"
  },
  {
    "id": "ivory-full-look",
    "title": "Full look / ivory",
    "category": "Editorial",
    "src": "/media/members/ivory-full-look-876.webp",
    "srcSet": "/media/members/ivory-full-look-480.webp 480w, /media/members/ivory-full-look-800.webp 800w, /media/members/ivory-full-look-876.webp 876w",
    "width": 876,
    "height": 1795,
    "alt": "Full-length model wearing an ivory zip hoodie with burgundy sleeve stripes, dark trousers and black shoes.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "ivory-stripe-zip",
    "title": "Ivory / striped zip",
    "category": "Knitwear",
    "src": "/media/members/ivory-stripe-zip-1092.webp",
    "srcSet": "/media/members/ivory-stripe-zip-480.webp 480w, /media/members/ivory-stripe-zip-800.webp 800w, /media/members/ivory-stripe-zip-1092.webp 1092w",
    "width": 1092,
    "height": 1440,
    "alt": "Ivory cable-knit zip hoodie with burgundy sleeve stripes and a circular chest emblem.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "midnight-tonal-zip",
    "title": "Midnight / tonal zip",
    "category": "Knitwear",
    "src": "/media/members/midnight-tonal-zip-1200.webp",
    "srcSet": "/media/members/midnight-tonal-zip-480.webp 480w, /media/members/midnight-tonal-zip-800.webp 800w, /media/members/midnight-tonal-zip-1200.webp 1200w",
    "width": 1200,
    "height": 2601,
    "alt": "Black textured hooded knit with an asymmetric zipper and tonal monogram on a light background.",
    "fit": "contain",
    "objectPosition": "50% 50%",
    "screenshotCrop": true
  },
  {
    "id": "midnight-cognac-zip",
    "title": "Midnight / cognac signature",
    "category": "Knitwear",
    "src": "/media/members/midnight-cognac-zip-1092.webp",
    "srcSet": "/media/members/midnight-cognac-zip-480.webp 480w, /media/members/midnight-cognac-zip-800.webp 800w, /media/members/midnight-cognac-zip-1092.webp 1092w",
    "width": 1092,
    "height": 1440,
    "alt": "Black hooded cable knit with an asymmetric warm-brown zipper and contrasting monogram.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "midnight-collar-knit",
    "title": "Midnight / raised collar",
    "category": "Knitwear",
    "src": "/media/members/midnight-collar-knit-1200.webp",
    "srcSet": "/media/members/midnight-collar-knit-480.webp 480w, /media/members/midnight-collar-knit-800.webp 800w, /media/members/midnight-collar-knit-1200.webp 1200w",
    "width": 1200,
    "height": 800,
    "alt": "Black textured pullover with a raised collar and sculpted cable lines on a white background.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "ivory-ribbed-zip",
    "title": "Ivory / ribbed zip",
    "category": "Knitwear",
    "src": "/media/members/ivory-ribbed-zip-1200.webp",
    "srcSet": "/media/members/ivory-ribbed-zip-480.webp 480w, /media/members/ivory-ribbed-zip-800.webp 800w, /media/members/ivory-ribbed-zip-1200.webp 1200w",
    "width": 1200,
    "height": 960,
    "alt": "Ivory ribbed zip hoodie with two lower patch pockets on a warm off-white background.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "scarlet-tall-wallet",
    "title": "Scarlet / tall form",
    "category": "Small goods",
    "src": "/media/members/scarlet-tall-wallet-1200.webp",
    "srcSet": "/media/members/scarlet-tall-wallet-480.webp 480w, /media/members/scarlet-tall-wallet-800.webp 800w, /media/members/scarlet-tall-wallet-1200.webp 1200w",
    "width": 1200,
    "height": 1097,
    "alt": "Tall red wallet or cover with an embossed flowing monogram and edge stitching.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "scarlet-wallet",
    "title": "Scarlet / folded form",
    "category": "Small goods",
    "src": "/media/members/scarlet-wallet-1179.webp",
    "srcSet": "/media/members/scarlet-wallet-480.webp 480w, /media/members/scarlet-wallet-800.webp 800w, /media/members/scarlet-wallet-1179.webp 1179w",
    "width": 1179,
    "height": 1334,
    "alt": "Red folded wallet with a large embossed monogram and fine perimeter stitching.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "cognac-wallet",
    "title": "Cognac / folded form",
    "category": "Small goods",
    "src": "/media/members/cognac-wallet-1199.webp",
    "srcSet": "/media/members/cognac-wallet-480.webp 480w, /media/members/cognac-wallet-800.webp 800w, /media/members/cognac-wallet-1199.webp 1199w",
    "width": 1199,
    "height": 1312,
    "alt": "Warm cognac-colored folded wallet with an embossed monogram and perimeter stitching.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  },
  {
    "id": "ivory-wallet",
    "title": "Ivory / folded form",
    "category": "Small goods",
    "src": "/media/members/ivory-wallet-1199.webp",
    "srcSet": "/media/members/ivory-wallet-480.webp 480w, /media/members/ivory-wallet-800.webp 800w, /media/members/ivory-wallet-1199.webp 1199w",
    "width": 1199,
    "height": 1312,
    "alt": "Ivory folded wallet with a tonal embossed monogram and perimeter stitching.",
    "fit": "contain",
    "objectPosition": "50% 50%"
  }
];

export function getMemberImage(id: string): MemberImage {
  const image = memberImages.find((item) => item.id === id);
  if (!image) {
    throw new Error(`Unknown member image: "${id}"`);
  }
  return image;
}
