import bag1 from "@/assets/bag-1.jpg";
import bag2 from "@/assets/bag-2.jpg";
import bag3 from "@/assets/bag-3.jpg";
import bag4 from "@/assets/bag-4.jpg";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  isNew?: boolean;
};

type ImageAsset = {
  image: string;
  path: string;
  number: number;
};

type NamedVariant = {
  name: string;
  image: string;
  price: number;
  isNew?: boolean;
};

const getImageNumber = (path: string) => {
  const match = path.match(/\/(\d+)\.jpg$/);
  return match ? Number(match[1]) : 0;
};

const sortImages = (images: Record<string, string>): ImageAsset[] =>
  Object.entries(images)
    .sort(([a], [b]) => getImageNumber(a) - getImageNumber(b))
    .map(([path, image]) => ({
      path,
      image,
      number: getImageNumber(path),
    }));

const footballImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/footbal/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const tacticalGloveImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/tactical gloves/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const skateboardingGloveImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/skateboarding gloves/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const motorbikerGloveImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/gloves moterbiker/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const fishingGloveImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/fishing and sailing gloves/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const dressingGloveImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/dressing gloves/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const gymGloveImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/gym gloves/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const hoodieImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/hoodies/[0-9]*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const tacticalHoodieImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/hoodies/tectical hoodies/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const tacticalJacketImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/jackets/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const uniformImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/uniform/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const uniformSleevelessImages = sortImages(
  import.meta.glob("../assets/YEXON IMPEX/uniform sleeveless/*.jpg", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

const colorLookup: Record<string, Record<number, string>> = {
  "Tactical Gloves": {
    1: "Coyote",
    2: "Stone",
    3: "Crimson",
    4: "Rust",
    5: "Sand",
    6: "Earth",
    7: "Slate",
    8: "Khaki",
  },
  "Skateboarding Gloves": {
    1: "Cherry",
    2: "Scarlet",
    3: "Ruby",
    4: "Crimson",
    5: "Rose",
    6: "Burgundy",
    7: "Fire",
    8: "Graphite",
    9: "Steel",
    10: "Blush",
    11: "Smoke Red",
    12: "Silver",
    13: "Ice",
    14: "Frost",
    15: "Arctic",
    16: "Snow",
    17: "Cobalt",
    18: "Ocean",
    19: "Navy",
    20: "Electric Blue",
    21: "Ash",
    22: "Olive Gray",
    23: "Sage",
    24: "Moss",
    25: "Gunmetal",
    26: "Alloy",
    27: "Shadow",
    28: "Mint",
  },
  "Motorbiker Gloves": {
    1: "Crimson",
    2: "Ruby",
    3: "Scarlet",
    4: "Inferno",
    5: "Torch Red",
    6: "Ember",
    7: "Blaze",
    8: "Rosewood",
    9: "Wine",
    10: "Merlot",
    11: "Volt",
    12: "Bronze",
    13: "Desert",
    14: "Stone",
    15: "Azure",
    16: "Denim",
    17: "Steel Blue",
    18: "Midnight",
    19: "Indigo",
    20: "Sapphire",
    21: "Lagoon",
    22: "Petrol",
    23: "Navy",
    24: "Storm",
    25: "Magenta",
    26: "Berry",
    27: "Orchid",
  },
  "Fishing and Sailing Gloves": {
    1: "Black",
    2: "Steel",
    3: "Silver",
    4: "Coral",
    5: "Olive",
    6: "Forest",
    7: "Drift",
    8: "Harbor",
    9: "Moss",
    10: "Sea Green",
    11: "Tundra",
    12: "Khaki",
    13: "Sage",
    14: "Mist",
    15: "Pearl",
    16: "Tide Gray",
  },
  "Dressing Gloves": {
    1: "Mocha",
    2: "Pearl",
    3: "Midnight",
    4: "Ivory",
    5: "Blue Ash",
    6: "Silver",
    7: "Platinum",
    8: "Jet",
    9: "Graphite",
    10: "Walnut",
    11: "Onyx",
    12: "Snow",
    13: "Frost",
    14: "Black",
    15: "Ebony",
    16: "Raven",
    17: "Coffee",
    18: "Espresso",
    19: "Smoke",
    20: "Slate",
    21: "Shadow",
    22: "Coal",
    23: "Cream",
    24: "Chalk",
    25: "White",
    26: "Ink",
    27: "Chrome",
  },
  "Gym Gloves": {
    1: "Graphite",
    2: "Crimson",
    3: "Ruby",
    4: "Shadow",
  },
  Hoodies: {
    1: "Ash",
    2: "Silver",
    3: "Pebble",
    4: "Frost",
    5: "Cloud",
    6: "White",
    7: "Steel",
    8: "Mist",
    9: "Glacier",
    10: "Snow",
    11: "Stone",
    12: "Pearl",
  },
  "Tactical Hoodies": {
    1: "Arctic",
    2: "Snow",
    3: "Smoke",
    4: "Ice",
    5: "White",
    6: "Silver",
    7: "Frost",
    8: "Steel",
  },
  "Tactical Jackets": {
    1: "Arctic",
    2: "Snow",
    3: "Stone",
    4: "Frost",
    5: "Pearl",
    6: "Charcoal",
    7: "Steel",
    8: "Jet",
    9: "Crimson",
    10: "Scarlet",
    11: "Burgundy",
    12: "Ruby",
    13: "Teal",
    14: "Olive",
    15: "Moss",
    16: "Forest",
    17: "Silver",
    18: "White",
    19: "Smoke",
    20: "Ice",
    21: "Navy",
    22: "Platinum",
    23: "Ivory",
    24: "Alloy",
    25: "Black",
    26: "Earth",
    27: "Coal",
    28: "Khaki",
    29: "Taupe",
    30: "Clay",
    31: "Raven",
    32: "Trail",
  },
  Uniforms: {
    1: "Royal Blue",
    2: "Navy",
    3: "Steel Blue",
    4: "Teal",
    5: "Indigo",
    6: "Cobalt",
    7: "Ocean",
    8: "Storm Blue",
    9: "Midnight Blue",
    10: "Sapphire",
    11: "Deep Blue",
    12: "Marine",
  },
  "Uniform Sleeveless": {
    1: "Red",
    2: "Red",
    3: "Red",
    4: "Red",
    5: "White",
    6: "White",
    7: "White",
    8: "White",
    9: "Pink",
    10: "Pink",
    11: "Pink",
    12: "Pink",
  },
  Football: {
    1: "Silver",
    2: "Steel",
    3: "Blue",
    4: "Graphite",
    5: "White",
    6: "Pearl",
  },
};

const titleLookup: Record<string, string[]> = {
  "Tactical Gloves": [
    "Recon Grip",
    "Outrider Shield",
    "Forge Guard",
    "Trail Armor",
    "Ranger Flex",
    "Command Grip",
    "Field Guard",
    "Summit Hold",
  ],
  "Skateboarding Gloves": [
    "Street Pulse",
    "Grind Flow",
    "Urban Drift",
    "Kickturn Edge",
    "Park Glide",
    "Asphalt Rush",
    "Ramp Voltage",
    "Freestyle Motion",
  ],
  "Motorbiker Gloves": [
    "Road Fury",
    "Throttle Edge",
    "Rider Pulse",
    "Velocity Guard",
    "Torque Shield",
    "Night Sprint",
    "Street Apex",
    "Highway Armor",
  ],
  "Fishing and Sailing Gloves": [
    "Harbor Grip",
    "Tide Guard",
    "Mariner Touch",
    "Ocean Hold",
    "Deck Flex",
    "Coastal Grip",
    "Anchor Guard",
    "Wave Trail",
  ],
  "Dressing Gloves": [
    "Classic Touch",
    "City Luxe",
    "Evening Grace",
    "Gentleman Line",
    "Signature Fit",
    "Velvet Touch",
    "Heritage Style",
    "Refined Edge",
  ],
  "Gym Gloves": [
    "Power Grip",
    "Iron Pulse",
    "Lift Core",
    "Train Force",
  ],
  Hoodies: [
    "Urban Core",
    "Street Layer",
    "Cloud Fit",
    "Downtown Warmth",
    "Metro Shield",
    "Easy Drift",
  ],
  "Tactical Hoodies": [
    "Stealth Layer",
    "Recon Zip",
    "Field Shadow",
    "Patrol Fleece",
    "Strike Cover",
    "Apex Utility",
  ],
  "Tactical Jackets": [
    "Summit Guard",
    "Alpine Shield",
    "Night Patrol",
    "Storm Lock",
    "Terrain Shell",
    "Rider Fortress",
    "Urban Scout",
    "Expedition Core",
  ],
  Uniforms: [
    "Court Pro",
    "Game Elite",
    "Victory Set",
    "Championship Fit",
    "Team Legacy",
    "Arena Motion",
  ],
  "Uniform Sleeveless": [
    "Strike",
    "Prime",
    "Fusion",
    "Elite",
    "Gold",
    "Shadow",
    "Classic",
    "Edge",
    "Motion",
    "Rise",
    "Victory",
    "Prime",
  ],
  Football: [
    "Match Ball",
    "Training Ball",
    "League Ball",
    "Arena Ball",
    "Pro Ball",
    "Street Ball",
  ],
};

const formatProductName = (
  subcategory: string,
  imageNumber: number,
  fallbackDescriptor: string,
) => {
  const color = colorLookup[subcategory]?.[imageNumber] ?? "Classic";
  const descriptors = titleLookup[subcategory] ?? [fallbackDescriptor];
  const descriptor = descriptors[(imageNumber - 1) % descriptors.length] ?? fallbackDescriptor;
  return `${color} ${descriptor}`;
};

const createProducts = ({
  startId,
  category,
  subcategory,
  images,
  priceStart,
  priceStep,
  newEvery = 0,
  fallbackDescriptor,
}: {
  startId: number;
  category: string;
  subcategory: string;
  images: ImageAsset[];
  priceStart: number;
  priceStep: number;
  newEvery?: number;
  fallbackDescriptor: string;
}): Product[] =>
  images.map((asset, index) => ({
    id: startId + index,
    name: formatProductName(subcategory, asset.number, fallbackDescriptor),
    price: priceStart + index * priceStep,
    image: asset.image,
    category,
    subcategory,
    isNew: newEvery > 0 ? index % newEvery === 0 : false,
  }));

const createNamedProducts = ({
  startId,
  category,
  subcategory,
  variants,
}: {
  startId: number;
  category: string;
  subcategory: string;
  variants: NamedVariant[];
}): Product[] =>
  variants.map((variant, index) => ({
    id: startId + index,
    name: variant.name,
    price: variant.price,
    image: variant.image,
    category,
    subcategory,
    isNew: variant.isNew ?? false,
  }));

const bagProducts: Product[] = [
  { id: 1, name: "Premium Sports Bag", price: 89, image: bag1, category: "Bags", isNew: true },
  { id: 2, name: "Athletic Backpack", price: 79, image: bag2, category: "Bags", isNew: true },
  { id: 3, name: "Travel Duffel Bag", price: 99, image: bag3, category: "Bags" },
  { id: 4, name: "Gym Training Bag", price: 69, image: bag4, category: "Bags" },
  { id: 5, name: "Urban Rider Bag", price: 95, image: bag1, category: "Bags", isNew: true },
  { id: 6, name: "Weekend Touring Bag", price: 105, image: bag2, category: "Bags" },
];

const gloveProducts = [
  ...createProducts({
    startId: 7,
    category: "Gloves",
    subcategory: "Tactical Gloves",
    images: tacticalGloveImages,
    priceStart: 39,
    priceStep: 2,
    newEvery: 4,
    fallbackDescriptor: "Guard",
  }),
  ...createProducts({
    startId: 7 + tacticalGloveImages.length,
    category: "Gloves",
    subcategory: "Skateboarding Gloves",
    images: skateboardingGloveImages,
    priceStart: 44,
    priceStep: 1,
    newEvery: 6,
    fallbackDescriptor: "Ride",
  }),
  ...createProducts({
    startId: 7 + tacticalGloveImages.length + skateboardingGloveImages.length,
    category: "Gloves",
    subcategory: "Motorbiker Gloves",
    images: motorbikerGloveImages,
    priceStart: 49,
    priceStep: 2,
    newEvery: 5,
    fallbackDescriptor: "Cruise",
  }),
  ...createProducts({
    startId:
      7 +
      tacticalGloveImages.length +
      skateboardingGloveImages.length +
      motorbikerGloveImages.length,
    category: "Gloves",
    subcategory: "Fishing and Sailing Gloves",
    images: fishingGloveImages,
    priceStart: 42,
    priceStep: 2,
    newEvery: 4,
    fallbackDescriptor: "Grip",
  }),
  ...createProducts({
    startId:
      7 +
      tacticalGloveImages.length +
      skateboardingGloveImages.length +
      motorbikerGloveImages.length +
      fishingGloveImages.length,
    category: "Gloves",
    subcategory: "Dressing Gloves",
    images: dressingGloveImages,
    priceStart: 46,
    priceStep: 2,
    newEvery: 5,
    fallbackDescriptor: "Style",
  }),
  ...createProducts({
    startId:
      7 +
      tacticalGloveImages.length +
      skateboardingGloveImages.length +
      motorbikerGloveImages.length +
      fishingGloveImages.length +
      dressingGloveImages.length,
    category: "Gloves",
    subcategory: "Gym Gloves",
    images: gymGloveImages,
    priceStart: 35,
    priceStep: 2,
    newEvery: 2,
    fallbackDescriptor: "Grip",
  }),
];

const hoodieProducts = [
  ...createProducts({
    startId: gloveProducts[gloveProducts.length - 1].id + 1,
    category: "Hoodies",
    subcategory: "Hoodies",
    images: hoodieImages,
    priceStart: 79,
    priceStep: 2,
    newEvery: 4,
    fallbackDescriptor: "Hoodie",
  }),
  ...createProducts({
    startId: gloveProducts[gloveProducts.length - 1].id + 1 + hoodieImages.length,
    category: "Hoodies",
    subcategory: "Tactical Hoodies",
    images: tacticalHoodieImages,
    priceStart: 99,
    priceStep: 3,
    newEvery: 3,
    fallbackDescriptor: "Layer",
  }),
];

const tacticalJacketProducts = createProducts({
  startId: hoodieProducts[hoodieProducts.length - 1].id + 1,
  category: "Tactical Jackets",
  subcategory: "Tactical Jackets",
  images: tacticalJacketImages,
  priceStart: 129,
  priceStep: 3,
  newEvery: 4,
  fallbackDescriptor: "Jacket",
});

const footballProducts = createProducts({
  startId: tacticalJacketProducts[tacticalJacketProducts.length - 1].id + 1,
  category: "Football",
  subcategory: "Football",
  images: footballImages,
  priceStart: 25,
  priceStep: 4,
  newEvery: 3,
  fallbackDescriptor: "Ball",
});

const uniformProducts = [
  ...createProducts({
    startId: footballProducts[footballProducts.length - 1].id + 1,
    category: "Uniforms",
    subcategory: "Uniforms",
    images: uniformImages,
    priceStart: 149,
    priceStep: 5,
    newEvery: 4,
    fallbackDescriptor: "Uniform",
  }),
  ...createNamedProducts({
    startId: footballProducts[footballProducts.length - 1].id + 1 + uniformImages.length,
    category: "Uniforms",
    subcategory: "Uniform Sleeveless",
    variants: uniformSleevelessImages.map((asset, index) => ({
      name: formatProductName("Uniform Sleeveless", asset.number, "Sleeveless"),
      image: asset.image,
      price: 139 + index * 4,
      isNew: index % 3 === 0,
    })),
  }),
];

export const products: Product[] = [
  ...bagProducts,
  ...gloveProducts,
  ...hoodieProducts,
  ...tacticalJacketProducts,
  ...footballProducts,
  ...uniformProducts,
];

export const categories = [
  "Bags",
  "Gloves",
  "Hoodies",
  "Tactical Jackets",
  "Football",
  "Uniforms",
];

export const mainCategories = [
  "Bags",
  "Tactical Jackets",
  "Gloves",
  "Hoodies",
];

const normalize = (value: string) => value.trim().toLowerCase();

const categoryFilterMap = categories.reduce<Record<string, string[]>>((acc, category) => {
  const categoryKey = normalize(category);
  const subcategories = Array.from(
    new Set(
      products
        .filter((product) => normalize(product.category) === categoryKey)
        .map((product) => product.subcategory)
        .filter(
          (subcategory): subcategory is string =>
            Boolean(subcategory) && normalize(subcategory) !== categoryKey,
        ),
    ),
  );

  acc[category] = subcategories;
  return acc;
}, {});

export const getProductsByCategory = (category: string): Product[] => {
  const categoryKey = normalize(category);
  return products.filter((product) => normalize(product.category) === categoryKey);
};

export const getProductsByFilter = (filter: string): Product[] => {
  const filterKey = normalize(filter);
  return products.filter((product) => {
    const matchesCategory = normalize(product.category) === filterKey;
    const matchesSubcategory = product.subcategory
      ? normalize(product.subcategory) === filterKey
      : false;
    return matchesCategory || matchesSubcategory;
  });
};

export const getSubcategoriesForCategory = (category: string): string[] =>
  categoryFilterMap[category] ?? [];

export const findParentCategory = (filter: string): string | null => {
  const filterKey = normalize(filter);

  for (const category of categories) {
    if (normalize(category) === filterKey) {
      return category;
    }

    if (getSubcategoriesForCategory(category).some((item) => normalize(item) === filterKey)) {
      return category;
    }
  }

  return null;
};
