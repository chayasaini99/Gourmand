import heroRasaImg from '../assets/images/hero_rasa_kannauj_1794549895455.jpg';
import kesarMishtannImg from '../assets/images/flacon_kesar_mishtann_1794549896489.jpg';
import maduraiMograImg from '../assets/images/flacon_madurai_mogra_1794549897873.jpg';
import malabarVanilleImg from '../assets/images/flacon_malabar_vanille_1794549897377.jpg';
import mittiMonsoonImg from '../assets/images/flacon_mitti_monsoon_1794549897608.jpg';
import assamOudImg from '../assets/images/flacon_assam_oud_1794549898925.jpg';
import mysoreChandanaImg from '../assets/images/flacon_mysore_chandana_1794549899341.jpg';
import atelierDegBhapkaImg from '../assets/images/atelier_deg_bhapka_1794549900621.jpg';
import { Fragrance, LayeringDuoRecipe } from '../types/fragrance';

export const HERO_CAMPAIGN_IMAGE = heroRasaImg;
export const ATELIER_CRAFT_IMAGE = atelierDegBhapkaImg;

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'kesar-mishtann',
    name: 'Kesar Mishtann',
    sanskritSubtitle: 'Extrait de Safran & Cardamome',
    collection: 'mishtann',
    collectionLabel: 'Mishtann & Bloom',
    concentration: '28% Extrait de Parfum',
    distillation: 'Kannauj Copper Deg-Bhapka',
    maceration: 'Macerated 6 Months in Sandalwood',
    olfactiveFamily: 'Spiced Gourmand',
    priceByVolume: {
      '10ml': 2100,
      '50ml': 6800,
      '100ml': 9800,
    },
    sillage: 4,
    longevityHours: '10–12 Hours',
    seasonMood: 'Festive Dusk · Golden Evenings',
    poeticLine: 'Pampore saffron threads steeped in warm cardamom cream and roasted almond.',
    story:
      'Inspired by the heirloom brass vessels of festive royal kitchens, Kesar Mishtann opens with crimson Kashmiri saffron and freshly cracked Idukki green cardamom before melting into whipped almond cream, burnt palm jaggery, and silky Mysore sandalwood.',
    image: kesarMishtannImg,
    recommendedPairId: 'mysore-chandana',
    accords: [
      { name: 'Warm Saffron', intensity: 92 },
      { name: 'Spiced Lactonic', intensity: 84 },
      { name: 'Roasted Nut', intensity: 76 },
      { name: 'Creamy Wood', intensity: 68 },
    ],
    notes: {
      top: [
        { ingredient: 'Pampore Kesar', origin: 'Kashmir', descriptor: 'Leathery, honeyed crimson saffron' },
        { ingredient: 'Green Elaichi', origin: 'Idukki, Kerala', descriptor: 'Cool crushed cardamom seed' },
        { ingredient: 'Bitter Almond', origin: 'Himachal', descriptor: 'Toasted marzipan warmth' },
      ],
      heart: [
        { ingredient: 'Warm Khoa Accord', origin: 'Atelier Blend', descriptor: 'Slow-reduced caramelized milk' },
        { ingredient: 'Pistachio Praline', origin: 'Artisanal Roast', descriptor: 'Velvety roasted green nut' },
        { ingredient: 'Rose Gulkand', origin: 'Pushkar', descriptor: 'Sun-macerated damask petal preserve' },
      ],
      base: [
        { ingredient: 'Mysore Chandana', origin: 'Karnataka', descriptor: 'Buttery heartwood fixative' },
        { ingredient: 'Roasted Tonka', origin: 'Cured Pod', descriptor: 'Almond-hay balsamic depth' },
        { ingredient: 'Palm Gur Amber', origin: 'Bengal', descriptor: 'Molten unrefined sugar warmth' },
      ],
    },
  },
  {
    id: 'madurai-mogra',
    name: 'Madurai Mogra',
    sanskritSubtitle: 'Absolu de Jasmin & Rose de Pushkar',
    collection: 'mishtann',
    collectionLabel: 'Mishtann & Bloom',
    concentration: '26% Extrait de Parfum',
    distillation: 'Dawn Enfleurage & Hydro-Distillation',
    maceration: 'Macerated 4 Months in Clay Matka',
    olfactiveFamily: 'White Floral',
    priceByVolume: {
      '10ml': 1950,
      '50ml': 6200,
      '100ml': 8900,
    },
    sillage: 4,
    longevityHours: '9–11 Hours',
    seasonMood: 'Dawn Courtyard · Wedding Garlands',
    poeticLine: 'Dew-soaked Madurai jasmine buds folded into Pushkar rose petals and white honey.',
    story:
      'Harvested before sunrise around the temple towns of Madurai, unopened Mogra buds release an intoxicating, creamy nectar as they warm. Paired with Pushkar damask rose and wild forest honey, it captures the quiet radiance of morning garlands on woven silk.',
    image: maduraiMograImg,
    recommendedPairId: 'mitti-monsoon',
    accords: [
      { name: 'Nectarous Jasmine', intensity: 94 },
      { name: 'Dewy Rose', intensity: 78 },
      { name: 'Wild Honey', intensity: 72 },
      { name: 'Soft Musk', intensity: 60 },
    ],
    notes: {
      top: [
        { ingredient: 'Gondhoraj Lime', origin: 'Bengal', descriptor: 'Aromatic emerald citrus zest' },
        { ingredient: 'White Tea Leaf', origin: 'Darjeeling', descriptor: 'Silky, airy morning mist' },
      ],
      heart: [
        { ingredient: 'Madurai Mogra', origin: 'Tamil Nadu', descriptor: 'Lush, creamy dawn-picked jasmine' },
        { ingredient: 'Pushkar Gulab', origin: 'Rajasthan', descriptor: 'Velvet pink damask rose' },
        { ingredient: 'Tuberose Nectar', origin: 'Coimbatore', descriptor: 'Opulent nocturnal white bloom' },
      ],
      base: [
        { ingredient: 'Wild Sundarban Honey', origin: 'Sundarbans', descriptor: 'Golden floral nectar glaze' },
        { ingredient: 'Ambrette Seed', origin: 'Deccan', descriptor: 'Botanical skin-like musk' },
        { ingredient: 'White Sandalwood', origin: 'Mysore', descriptor: 'Luminous milky wood trail' },
      ],
    },
  },
  {
    id: 'malabar-vanille',
    name: 'Malabar Vanille',
    sanskritSubtitle: 'Extrait de Vanille Fumée & Épices',
    collection: 'mishtann',
    collectionLabel: 'Mishtann & Bloom',
    concentration: '30% Extrait de Parfum',
    distillation: 'Slow Tincture & Resin Infusion',
    maceration: 'Macerated 8 Months in Oak',
    olfactiveFamily: 'Spiced Gourmand',
    priceByVolume: {
      '10ml': 2250,
      '50ml': 7400,
      '100ml': 10600,
    },
    sillage: 5,
    longevityHours: '12–14 Hours',
    seasonMood: 'Candlelit Velvet · Winter Solace',
    poeticLine: 'Sun-cured Wayanad vanilla pods smoked over Tellicherry pepper and charred cinnamon.',
    story:
      'Far removed from synthetic sweetness, Malabar Vanille honors India’s spice coast. Plump dark vanilla beans grown under Kerala’s cardamom shade trees are infused with toasted cassia bark, black peppercorn resin, and molten benzoin tears.',
    image: malabarVanilleImg,
    recommendedPairId: 'assam-oud',
    accords: [
      { name: 'Smoked Vanilla', intensity: 95 },
      { name: 'Spice Coast', intensity: 86 },
      { name: 'Molten Resin', intensity: 82 },
      { name: 'Dark Cacao', intensity: 64 },
    ],
    notes: {
      top: [
        { ingredient: 'Tellicherry Pepper', origin: 'Malabar Coast', descriptor: 'Warm, fruity dark spice spark' },
        { ingredient: 'Nutmeg Mace', origin: 'Konkan', descriptor: 'Lacy aromatic warmth' },
      ],
      heart: [
        { ingredient: 'Wayanad Vanilla Pod', origin: 'Kerala', descriptor: 'Deep, leathery, unsweetened bean' },
        { ingredient: 'Ceylon Cinnamon Bark', origin: 'Western Ghats', descriptor: 'Dry, glowing wood spice' },
        { ingredient: 'Roasted Cacao Nib', origin: 'Idukki', descriptor: 'Bitter, velvety dark truffle' },
      ],
      base: [
        { ingredient: 'Sumatran Benzoin', origin: 'Resin Tears', descriptor: 'Balmy golden incense sweetness' },
        { ingredient: 'Burnt Sugar Accord', origin: 'Atelier Blend', descriptor: 'Caramelized amber glaze' },
        { ingredient: 'Vetiver Root', origin: 'Kannauj', descriptor: 'Earthy smoky dry-down' },
      ],
    },
  },
  {
    id: 'mitti-monsoon',
    name: 'Mitti Monsoon',
    sanskritSubtitle: 'Ittar de Terre Cuite & Khus Sauvage',
    collection: 'darbar',
    collectionLabel: 'Darbar & Oud',
    concentration: '28% Extrait de Parfum',
    distillation: 'Traditional Kannauj Mitti Deg-Bhapka',
    maceration: 'Aged 9 Months in Terracotta',
    olfactiveFamily: 'Monsoon Earth',
    priceByVolume: {
      '10ml': 2150,
      '50ml': 7100,
      '100ml': 10200,
    },
    sillage: 3,
    longevityHours: '10–12 Hours',
    seasonMood: 'First Rain · Quiet Sanctuary',
    poeticLine: 'Kiln-baked Ganges riverbank clay drenched in the first monsoon shower and green khus.',
    story:
      'Every Indian knows the unmistakable rush of petrichor when June rain strikes sun-parched earth. Crafted in Kannauj by hydro-distilling sun-baked terracotta discs into aged sandalwood and wild North Indian khus roots, Mitti Monsoon bottles that sacred seasonal memory.',
    image: mittiMonsoonImg,
    recommendedPairId: 'madurai-mogra',
    accords: [
      { name: 'Baked Terracotta', intensity: 94 },
      { name: 'Rain Petrichor', intensity: 88 },
      { name: 'Smoky Khus', intensity: 82 },
      { name: 'Cool Sandalwood', intensity: 74 },
    ],
    notes: {
      top: [
        { ingredient: 'Monsoon Ozone', origin: 'Atelier Accord', descriptor: 'Crisp rain-washed sky' },
        { ingredient: 'Crushed Coriander', origin: 'Rajasthan', descriptor: 'Bright herbal greenery' },
      ],
      heart: [
        { ingredient: 'Baked Mitti Discs', origin: 'Kannauj Clay', descriptor: 'Warm, mineral wet earth' },
        { ingredient: 'Ruh Khus (Vetiver)', origin: 'Bharatpur', descriptor: 'Cooling emerald root mist' },
        { ingredient: 'Lotus Leaf', origin: 'Dal Lake', descriptor: 'Dewy aquatic stillness' },
      ],
      base: [
        { ingredient: 'Aged Sandalwood', origin: 'Mysore', descriptor: 'Silky golden timber anchor' },
        { ingredient: 'Nagarmotha Root', origin: 'Madhya Pradesh', descriptor: 'Dry, papyrus-like earthy wood' },
        { ingredient: 'Black Ambergris', origin: 'Botanical Accord', descriptor: 'Saline mineral longevity' },
      ],
    },
  },
  {
    id: 'assam-oud',
    name: 'Assam Oud Noir',
    sanskritSubtitle: 'Oud Royal d’Assam & Ambre Fumé',
    collection: 'darbar',
    collectionLabel: 'Darbar & Oud',
    concentration: '32% Extrait Absolu',
    distillation: 'Wild Agarwood Hydro-Distillation',
    maceration: 'Macerated 12 Months in Glass Carboy',
    olfactiveFamily: 'Resinous Oud',
    priceByVolume: {
      '10ml': 2850,
      '50ml': 9400,
      '100ml': 13800,
    },
    sillage: 5,
    longevityHours: '14–18 Hours',
    seasonMood: 'Midnight Darbar · Ceremonial Presence',
    poeticLine: 'Rare aged Assam agarwood heartwood draped in molten labdanum, black plum, and loban smoke.',
    story:
      'Prized across royal courts from Assam to Istanbul, wild Aquilaria agallocha delivers an extraordinary balance of resinous warmth and refined leather. Paired with temple loban (frankincense), black plum, and golden labdanum, Assam Oud Noir commands the room with quiet gravity.',
    image: assamOudImg,
    recommendedPairId: 'malabar-vanille',
    accords: [
      { name: 'Aged Assam Oud', intensity: 96 },
      { name: 'Temple Loban', intensity: 85 },
      { name: 'Golden Labdanum', intensity: 80 },
      { name: 'Dark Leather', intensity: 72 },
    ],
    notes: {
      top: [
        { ingredient: 'Black Plum', origin: 'Nilgiris', descriptor: 'Velvety, jammy dark fruit' },
        { ingredient: 'Red Saffron', origin: 'Pampore', descriptor: 'Metallic dry spice tension' },
      ],
      heart: [
        { ingredient: 'Wild Assam Oud', origin: 'Upper Assam', descriptor: 'Resinous, complex dark timber' },
        { ingredient: 'Temple Loban', origin: 'Sal Resin', descriptor: 'Sacred smoky balsamic cloud' },
        { ingredient: 'Black Rose', origin: 'Kannauj', descriptor: 'Velvet crimson floral core' },
      ],
      base: [
        { ingredient: 'Molten Labdanum', origin: 'Amber Resin', descriptor: 'Warm leather & honeyed resin' },
        { ingredient: 'Charred Cedar', origin: 'Himalayas', descriptor: 'Architectural dry wood' },
        { ingredient: 'Smoked Patchouli', origin: 'Aged Leaf', descriptor: 'Earthy midnight trail' },
      ],
    },
  },
  {
    id: 'mysore-chandana',
    name: 'Mysore Chandana',
    sanskritSubtitle: 'Bois de Santal Sacré & Ambre Blanc',
    collection: 'darbar',
    collectionLabel: 'Darbar & Oud',
    concentration: '28% Extrait de Parfum',
    distillation: 'Steam Heartwood Extraction',
    maceration: 'Aged 10 Months in Brass Vessel',
    olfactiveFamily: 'Sacred Wood',
    priceByVolume: {
      '10ml': 2300,
      '50ml': 7600,
      '100ml': 11200,
    },
    sillage: 3,
    longevityHours: '11–13 Hours',
    seasonMood: 'Meditative Sun · Architectural Calm',
    poeticLine: 'Creamy, luminous Mysore sandalwood heartwood sculpted with Himalayan deodar and white amber.',
    story:
      'Santalum album from Karnataka is the golden spine of Indian perfumery—warm as sunlit skin and meditative as carved temple pillars. Mysore Chandana lets pure heartwood shine beside crisp Himalayan deodar cedar, dry iris root, and luminous white amber.',
    image: mysoreChandanaImg,
    recommendedPairId: 'kesar-mishtann',
    accords: [
      { name: 'Creamy Sandalwood', intensity: 96 },
      { name: 'Himalayan Cedar', intensity: 78 },
      { name: 'Powdery Iris', intensity: 66 },
      { name: 'White Amber', intensity: 74 },
    ],
    notes: {
      top: [
        { ingredient: 'Bergamot Peel', origin: 'Cold Pressed', descriptor: 'Sunlit golden citrus lift' },
        { ingredient: 'Pink Pepper', origin: 'Botanical', descriptor: 'Crisp, airy mineral spark' },
      ],
      heart: [
        { ingredient: 'Mysore Chandana', origin: 'Karnataka', descriptor: 'Opulent, creamy sacred wood' },
        { ingredient: 'Kashmiri Orris', origin: 'Aged Iris Root', descriptor: 'Suede-soft powdery elegance' },
        { ingredient: 'Deodar Cedar', origin: 'Himachal Pradesh', descriptor: 'Crisp mountain timber' },
      ],
      base: [
        { ingredient: 'White Amber', origin: 'Resin Accord', descriptor: 'Translucent, skin-hugging glow' },
        { ingredient: 'Cashmere Musk', origin: 'Clean Accord', descriptor: 'Weightless cashmere veil' },
        { ingredient: 'Golden Vetiver', origin: 'Kannauj', descriptor: 'Subtle grounded root finish' },
      ],
    },
  },
];

export const CURATED_PAIRING_INSIGHTS: Record<string, Partial<LayeringDuoRecipe>> = {
  'mysore-chandana__kesar-mishtann': {
    title: 'Royal Kesariya Santal',
    occasion: 'Festive Dusk & Wedding Ceremonies',
    sillageProjection: 'Luminous Halo · 14-Hour Skin Aura',
    harmonyNarrative:
      'Mysore Chandana provides a meditative, creamy wood canvas that tempers the opulent saffron and pistachio praline of Kesar Mishtann—evoking sacred sandalwood paste anointed with Kashmiri kesar.',
  },
  'mitti-monsoon__madurai-mogra': {
    title: 'Varsha Garland Ritual',
    occasion: 'Monsoon Evenings & Intimate Gatherings',
    sillageProjection: 'Intimate Petrichor Trail · 11-Hour Bloom',
    harmonyNarrative:
      'As first-rain terracotta and emerald khus cool the skin, Madurai Mogra unfurls above it like fresh white jasmine garlands worn during an evening downpour.',
  },
  'assam-oud__malabar-vanille': {
    title: 'Darbar Smoked Elixir',
    occasion: 'Black-Tie Winter Nights & Grand Receptions',
    sillageProjection: 'Commanding Projection · 16+ Hour Trail',
    harmonyNarrative:
      'Dark, resinous Assam Oud locks arms with Wayanad smoked vanilla and Tellicherry spice—transforming dry agarwood into molten, cognac-warm velvet.',
  },
};

export function computeLayeringRecipe(base: Fragrance, top: Fragrance): LayeringDuoRecipe {
  const key = `${base.id}__${top.id}`;
  const reverseKey = `${top.id}__${base.id}`;
  const preset = CURATED_PAIRING_INSIGHTS[key] || CURATED_PAIRING_INSIGHTS[reverseKey];

  const baseTerms = base.notes.base.map((n) => n.ingredient);
  const topTerms = top.notes.heart.map((n) => n.ingredient);
  const bridgeNotes = [
    base.notes.base[0]?.ingredient || 'Mysore Chandana',
    top.notes.heart[0]?.ingredient || 'Madurai Mogra',
    top.notes.top[0]?.ingredient || 'Pampore Kesar',
  ];

  // Blend accords dynamically
  const accordMap = new Map<string, number>();
  base.accords.slice(0, 2).forEach((a) => accordMap.set(a.name, Math.min(98, Math.round(a.intensity * 0.92))));
  top.accords.slice(0, 2).forEach((a) => accordMap.set(a.name, Math.min(98, Math.round(a.intensity * 0.94))));

  const combinedSillage = Math.min(5, Math.max(base.sillage, top.sillage));

  return {
    baseId: base.id,
    topId: top.id,
    title: preset?.title || `${base.name.split(' ')[0]} × ${top.name}`,
    bridgeNotes: Array.from(new Set([...bridgeNotes, ...baseTerms.slice(0, 1), ...topTerms.slice(0, 1)])).slice(0, 4),
    occasion: preset?.occasion || `${base.seasonMood.split('·')[0].trim()} & Layered Evenings`,
    sillageProjection:
      preset?.sillageProjection ||
      `Level ${combinedSillage}/5 Projection · ${base.longevityHours} Layered Hold`,
    harmonyNarrative:
      preset?.harmonyNarrative ||
      `Anchor two mists of ${base.name} at the pulse points to establish a ${base.olfactiveFamily.toLowerCase()} foundation, then veil with ${top.name} so ${top.notes.top[0]?.ingredient.toLowerCase()} and ${top.notes.heart[0]?.ingredient.toLowerCase()} bloom gradually over ${base.notes.base[0]?.ingredient.toLowerCase()}.`,
    blendedAccords: Array.from(accordMap.entries()).map(([name, intensity]) => ({ name, intensity })),
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
