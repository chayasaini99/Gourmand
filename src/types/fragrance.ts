export type CollectionId = 'mishtann' | 'darbar';

export type VolumeOption = '10ml' | '50ml' | '100ml';

export interface OlfactiveNote {
  ingredient: string;
  origin: string;
  descriptor: string;
}

export interface AccordProfile {
  name: string;
  intensity: number; // 0 to 100
}

export interface Fragrance {
  id: string;
  name: string;
  sanskritSubtitle: string;
  collection: CollectionId;
  collectionLabel: string;
  concentration: string;
  distillation: string;
  maceration: string;
  olfactiveFamily: 'Spiced Gourmand' | 'White Floral' | 'Monsoon Earth' | 'Resinous Oud' | 'Sacred Wood';
  priceByVolume: Record<VolumeOption, number>;
  sillage: 1 | 2 | 3 | 4 | 5;
  longevityHours: string;
  seasonMood: string;
  poeticLine: string;
  story: string;
  image: string;
  recommendedPairId: string;
  accords: AccordProfile[];
  notes: {
    top: OlfactiveNote[];
    heart: OlfactiveNote[];
    base: OlfactiveNote[];
  };
}

export interface LayeringDuoRecipe {
  baseId: string;
  topId: string;
  title: string;
  bridgeNotes: string[];
  occasion: string;
  sillageProjection: string;
  harmonyNarrative: string;
  blendedAccords: AccordProfile[];
}

export type CartItemType = 'flacon' | 'duo' | 'coffret';

export interface CartItem {
  cartId: string;
  type: CartItemType;
  title: string;
  subtitle: string;
  image: string;
  unitPrice: number;
  quantity: number;
  volume?: VolumeOption;
  engraving?: string;
  vialNames?: string[];
}

export interface SavedPairing {
  id: string;
  baseId: string;
  topId: string;
  title: string;
  createdAt: string;
}

export type AppScreen = 'boutique' | 'detail' | 'layering' | 'finder' | 'heritage';
