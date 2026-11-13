import { useMemo, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ATELIER_CRAFT_IMAGE, HERO_CAMPAIGN_IMAGE, formatINR } from '../data/fragrances';
import { AppScreen, CollectionId, Fragrance } from '../types/fragrance';
import { LuxuryImage } from './LuxuryImage';

interface BoutiqueViewProps {
  fragrances: Fragrance[];
  onSelectFragrance: (fragranceId: string) => void;
  onQuickAdd: (fragrance: Fragrance) => void;
  onNavigate: (screen: AppScreen) => void;
}

type FilterSelection = 'all' | CollectionId;

export function BoutiqueView({
  fragrances,
  onSelectFragrance,
  onQuickAdd,
  onNavigate,
}: BoutiqueViewProps) {
  const [collectionFilter, setCollectionFilter] = useState<FilterSelection>('all');
  const [familyFilter, setFamilyFilter] = useState<string>('all');

  const families = useMemo(
    () => ['all', ...Array.from(new Set(fragrances.map((f) => f.olfactiveFamily)))],
    [fragrances]
  );

  const filteredFragrances = useMemo(() => {
    return fragrances.filter((item) => {
      const matchesCollection = collectionFilter === 'all' || item.collection === collectionFilter;
      const matchesFamily = familyFilter === 'all' || item.olfactiveFamily === familyFilter;
      return matchesCollection && matchesFamily;
    });
  }, [fragrances, collectionFilter, familyFilter]);

  const flagship = fragrances[0];

  return (
    <div className="space-y-20 pb-24">
      {/* 1. Storefront Hero Showcase */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10 lg:px-16 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F7F2EB] border border-[#EFE8DC] p-7 md:p-10">
            <div className="space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
                Kannauj Heritage · Extrait de Parfum
              </p>
              <h1 className="font-bodoni text-4xl md:text-[52px] leading-[1.12] tracking-[-0.02em] text-[#1A1817] text-balance">
                The Soul of India, <span className="italic font-playfair font-normal text-[#2C1810]">Distilled in Copper.</span>
              </h1>
              <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#504440] max-w-md">
                From Pampore saffron steeped in warm cardamom cream to first monsoon rain over Ganges clay and aged Assam agarwood—six modern extraits macerated in Kannauj.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="gold-hairline" />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectFragrance(flagship.id)}
                  className="inline-flex items-center gap-3 bg-[#1A1817] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] whitespace-nowrap transition-colors duration-150 hover:bg-[#C59A4E] hover:text-[#121110] cursor-pointer"
                >
                  <span>Explore {flagship.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('finder')}
                  className="inline-flex items-center gap-2 border border-[#C59A4E] bg-transparent px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A1817] whitespace-nowrap transition-colors duration-150 hover:bg-[#F5EFE6] cursor-pointer"
                >
                  <span>Build Discovery Coffret</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#504440]">
                <span>26%–32% Pure Extrait</span>
                <span aria-hidden="true" className="text-[#C59A4E]">·</span>
                <span>Deg-Bhapka Hydro-Distilled</span>
                <span aria-hidden="true" className="text-[#C59A4E]">·</span>
                <span>Complimentary Monogramming</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative overflow-hidden border border-[#EFE8DC] bg-[#F5EFE6] min-h-[340px] lg:min-h-[520px]">
            <LuxuryImage
              src={HERO_CAMPAIGN_IMAGE}
              alt="Rasa Kannauj amber crystal flacon with Kashmiri saffron, green cardamom pods, and sandalwood curls"
              className="h-full w-full object-cover"
              fallbackTitle="Rasa Kannauj Signature Flacon"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121110]/80 via-[#121110]/30 to-transparent p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4 text-[#FAF7F2]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5C378] mb-1">
                    Featured Creation · 28% Extrait
                  </p>
                  <p className="font-playfair italic text-2xl md:text-3xl">
                    Kesar Mishtann &amp; Mysore Chandana
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('layering')}
                  className="border border-[#E5C378]/70 bg-[#121110]/60 backdrop-blur-md px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] whitespace-nowrap transition-colors hover:bg-[#C59A4E] hover:text-[#121110] cursor-pointer"
                >
                  Open Layering Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Collection Filter & Dual-House Gallery */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#EFE8DC] pb-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
              La Collection Complète
            </p>
            <h2 className="font-bodoni text-3xl md:text-4xl text-[#1A1817]">
              Two Expressions of Indian Parfumerie
            </h2>
            <p className="text-sm text-[#504440] leading-relaxed">
              Browse comforting gourmand &amp; floral extraits from <span className="font-playfair italic text-[#2C1810]">Mishtann &amp; Bloom</span> alongside architectural resins &amp; monsoon earth from <span className="font-bodoni font-medium text-[#1A1817]">Darbar &amp; Oud</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Collection Segmented Tabs */}
            <div className="inline-flex items-center border border-[#EFE8DC] bg-[#F5EFE6] p-1">
              {[
                { id: 'all', label: 'All Creations (6)' },
                { id: 'mishtann', label: 'Mishtann & Bloom' },
                { id: 'darbar', label: 'Darbar & Oud' },
              ].map((tab) => {
                const active = collectionFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCollectionFilter(tab.id as FilterSelection)}
                    className={`px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                      active
                        ? 'bg-[#1A1817] text-[#FAF7F2]'
                        : 'text-[#504440] hover:text-[#1A1817]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Family Filter */}
            <select
              aria-label="Filter by olfactive family"
              value={familyFilter}
              onChange={(e) => setFamilyFilter(e.target.value)}
              className="border border-[#EFE8DC] bg-[#FAF7F2] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1817] focus:border-[#C59A4E] focus:outline-none cursor-pointer"
            >
              {families.map((fam) => (
                <option key={fam} value={fam}>
                  {fam === 'all' ? 'All Olfactive Families' : fam}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        {filteredFragrances.length === 0 ? (
          <div className="border border-[#EFE8DC] bg-[#F5EFE6] p-12 text-center space-y-4">
            <p className="font-playfair italic text-xl text-[#2C1810]">
              No creations match the selected olfactive family in this house.
            </p>
            <button
              type="button"
              onClick={() => {
                setCollectionFilter('all');
                setFamilyFilter('all');
              }}
              className="border border-[#C59A4E] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1817] hover:bg-[#FAF7F2] cursor-pointer"
            >
              Reset Collection Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFragrances.map((fragrance) => {
              const isGourmand = fragrance.collection === 'mishtann';
              return (
                <article
                  key={fragrance.id}
                  className={`group flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 ${
                    isGourmand
                      ? 'rounded-lg border border-[#D4A373]/40 bg-[#FDFBF7]/90 shadow-plum hover:border-[#C88A58]'
                      : 'rounded-none border border-[#EFE8DC] bg-[#FAF7F2] shadow-bronze hover:border-[#C59A4E]'
                  }`}
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onSelectFragrance(fragrance.id)}
                      className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C59A4E]"
                    >
                      <div
                        className={`relative aspect-[3/4] w-full overflow-hidden bg-[#F5EFE6] ${
                          isGourmand ? 'rounded-t-lg' : 'rounded-none'
                        }`}
                      >
                        <LuxuryImage
                          src={fragrance.image}
                          alt={`${fragrance.name} — ${fragrance.sanskritSubtitle}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          fallbackTitle={fragrance.name}
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
                              isGourmand
                                ? 'rounded-sm bg-[#FDFBF7]/85 backdrop-blur-md text-[#2C1810] border border-[#D4A373]/40'
                                : 'clip-chamfer-sm bg-[#121110]/85 text-[#E5C378]'
                            }`}
                          >
                            {fragrance.collectionLabel}
                          </span>
                        </div>
                      </div>
                    </button>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#865225]">
                        <span>{fragrance.concentration}</span>
                        <span aria-hidden="true">◆</span>
                        <span>{fragrance.olfactiveFamily}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectFragrance(fragrance.id)}
                        className="block text-left cursor-pointer"
                      >
                        <h3
                          className={`text-2xl text-[#1A1817] group-hover:text-[#865225] transition-colors ${
                            isGourmand ? 'font-playfair font-medium' : 'font-bodoni font-normal'
                          }`}
                        >
                          {fragrance.name}
                        </h3>
                        <p className="font-playfair italic text-sm text-[#504440]">
                          {fragrance.sanskritSubtitle}
                        </p>
                      </button>

                      <p className="text-sm text-[#504440] leading-relaxed line-clamp-2">
                        {fragrance.poeticLine}
                      </p>

                      {/* Unboxed key botanical notes */}
                      <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#2C1810]">
                        <span className="text-[#C59A4E]" aria-hidden="true">◆</span>
                        <span>{fragrance.notes.top[0]?.ingredient}</span>
                        <span className="text-[#C59A4E]" aria-hidden="true">·</span>
                        <span>{fragrance.notes.heart[0]?.ingredient}</span>
                        <span className="text-[#C59A4E]" aria-hidden="true">·</span>
                        <span>{fragrance.notes.base[0]?.ingredient}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#EFE8DC] flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-[#504440]">
                        50 ml Flacon
                      </span>
                      <span className="text-base font-semibold text-[#1A1817] tabular-nums">
                        {formatINR(fragrance.priceByVolume['50ml'])}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectFragrance(fragrance.id)}
                        className="px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1A1817] border border-[#D4A373]/60 hover:bg-[#F5EFE6] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Notes
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(fragrance)}
                        className={`px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FAF7F2] transition-colors whitespace-nowrap cursor-pointer ${
                          isGourmand
                            ? 'rounded bg-[#2C1810] hover:bg-[#C88A58] hover:text-[#2C1810]'
                            : 'rounded-none bg-[#1A1817] hover:bg-[#C59A4E] hover:text-[#121110]'
                        }`}
                      >
                        Add 50ml
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Kannauj Deg-Bhapka Craftsmanship & Layering Invitation */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#C59A4E]/30 bg-[#121110] text-[#FAF7F2] items-stretch">
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden">
            <LuxuryImage
              src={ATELIER_CRAFT_IMAGE}
              alt="Kannauj artisans tending hammered copper deg-bhapka perfume stills with baskets of fresh jasmine and khus roots"
              className="h-full w-full object-cover"
              fallbackTitle="Kannauj Deg-Bhapka Atelier"
            />
          </div>
          <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5C378]">
                Kannauj Provenance · Since Antiquity
              </p>
              <h2 className="font-bodoni text-3xl md:text-4xl leading-tight text-[#FAF7F2]">
                Copper Stills, Clay Condensers &amp; Sandalwood Aging
              </h2>
              <p className="text-[15px] leading-[1.75] text-[#F5EFE6]/85">
                Along the banks of the Ganges in Kannauj, our master distillers capture delicate flowers, monsoon-baked mitti clay, and wild vetiver in slow wood-fired copper <span className="italic font-playfair text-[#E5C378]">deg</span> vessels. Each harvest rests up to twelve months in Mysore sandalwood or glass carboys before bottling.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#C59A4E]/25">
                <div>
                  <span className="block font-bodoni text-2xl text-[#E5C378] tabular-nums">100%</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#F5EFE6]/70">
                    Botanical Origin
                  </span>
                </div>
                <div>
                  <span className="block font-bodoni text-2xl text-[#E5C378] tabular-nums">6–12 Mo</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#F5EFE6]/70">
                    Slow Maceration
                  </span>
                </div>
                <div>
                  <span className="block font-bodoni text-2xl text-[#E5C378] tabular-nums">32%</span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#F5EFE6]/70">
                    Peak Extrait Oil
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('layering')}
                className="inline-flex items-center gap-2.5 bg-[#C59A4E] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#121110] hover:bg-[#E5C378] transition-colors cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Compose a Layering Duo</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('heritage')}
                className="border border-[#C59A4E]/60 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#1A1817] transition-colors cursor-pointer"
              >
                Read Atelier Monograph
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
