import { useMemo, useState } from 'react';
import { Check, Plus, Sparkles } from 'lucide-react';
import { formatINR } from '../data/fragrances';
import { Fragrance } from '../types/fragrance';
import { LuxuryImage } from './LuxuryImage';

interface ScentFinderViewProps {
  fragrances: Fragrance[];
  coffretVialIds: string[];
  onToggleCoffretVial: (fragranceId: string) => void;
  onAddCoffretToBag: (vials: Fragrance[]) => void;
  onSelectFragrance: (id: string) => void;
  onOpenLayering: (baseId: string, topId: string) => void;
}

type MoodChoice = 'festive' | 'monsoon' | 'midnight' | 'morning';
type MemoryChoice = 'saffron' | 'jasmine' | 'rain' | 'sandalwood';
type SillageChoice = 'intimate' | 'balanced' | 'commanding';

export const COFFRET_PRICE = 2400;

export function ScentFinderView({
  fragrances,
  coffretVialIds,
  onToggleCoffretVial,
  onAddCoffretToBag,
  onSelectFragrance,
  onOpenLayering,
}: ScentFinderViewProps) {
  const [mood, setMood] = useState<MoodChoice>('festive');
  const [memory, setMemory] = useState<MemoryChoice>('saffron');
  const [sillagePref, setSillagePref] = useState<SillageChoice>('balanced');
  const [coffretAdded, setCoffretAdded] = useState(false);

  const recommended = useMemo(() => {
    const scored = fragrances.map((f) => {
      let score = 0;
      if (mood === 'festive' && (f.id === 'kesar-mishtann' || f.id === 'assam-oud')) score += 3;
      if (mood === 'monsoon' && (f.id === 'mitti-monsoon' || f.id === 'madurai-mogra')) score += 3;
      if (mood === 'midnight' && (f.id === 'assam-oud' || f.id === 'malabar-vanille')) score += 3;
      if (mood === 'morning' && (f.id === 'mysore-chandana' || f.id === 'madurai-mogra')) score += 3;

      if (memory === 'saffron' && (f.id === 'kesar-mishtann' || f.id === 'malabar-vanille')) score += 4;
      if (memory === 'jasmine' && (f.id === 'madurai-mogra' || f.id === 'mysore-chandana')) score += 4;
      if (memory === 'rain' && (f.id === 'mitti-monsoon' || f.id === 'madurai-mogra')) score += 4;
      if (memory === 'sandalwood' && (f.id === 'mysore-chandana' || f.id === 'assam-oud')) score += 4;

      if (sillagePref === 'intimate' && f.sillage <= 3) score += 2;
      if (sillagePref === 'balanced' && f.sillage === 4) score += 2;
      if (sillagePref === 'commanding' && f.sillage === 5) score += 2;

      return { fragrance: f, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 2).map((s) => s.fragrance);
  }, [fragrances, mood, memory, sillagePref]);

  const selectedVials = useMemo(
    () =>
      coffretVialIds
        .map((id) => fragrances.find((f) => f.id === id))
        .filter((f): f is Fragrance => Boolean(f)),
    [coffretVialIds, fragrances]
  );

  const handleAddCoffret = () => {
    if (selectedVials.length !== 3) return;
    onAddCoffretToBag(selectedVials);
    setCoffretAdded(true);
    setTimeout(() => setCoffretAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-16 lg:py-12 space-y-16 pb-24">
      {/* Header */}
      <div className="space-y-3 max-w-2xl border-b border-[#EFE8DC] pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
          Bespoke Consultation &amp; Sampada Coffret
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl text-[#2C1810]">
          Find Your Olfactory <span className="italic">Rasa</span>
        </h1>
        <p className="text-[15px] leading-[1.7] text-[#504440]">
          Select the atmosphere and Indian botanical memories closest to your heart. Discover your signature extraits below, or compose a 3 × 5 ml <span className="italic font-playfair text-[#2C1810]">Sampada Discovery Coffret</span> to test on skin at home.
        </p>
      </div>

      {/* 3-Step Olfactory Consultation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-8">
          {/* Prompt 1 */}
          <div className="glass-gourmand rounded-lg p-6 md:p-8 space-y-4">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
              01. Atmosphere &amp; Hour
            </span>
            <h2 className="font-playfair text-2xl text-[#2C1810]">
              When will you wear this creation most?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'festive', label: 'Festive Dusk & Celebrations', sub: 'Silk, brass lamps & warm air' },
                { id: 'monsoon', label: 'Monsoon Afternoons', sub: 'Rain-washed verandas & tea' },
                { id: 'midnight', label: 'Winter & Midnight Gatherings', sub: 'Velvet shawls & deep embers' },
                { id: 'morning', label: 'Sunlit Mornings & Sanctuary', sub: 'Linen, meditation & quiet clarity' },
              ].map((opt) => {
                const active = mood === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMood(opt.id as MoodChoice)}
                    className={`p-4 text-left rounded border transition-all cursor-pointer ${
                      active
                        ? 'border-[#C88A58] bg-[#2C1810] text-[#FAF7F2]'
                        : 'border-[#D4A373]/40 bg-[#FAF7F2]/80 text-[#2C1810] hover:border-[#C88A58]'
                    }`}
                  >
                    <span className="block text-sm font-medium">{opt.label}</span>
                    <span
                      className={`block text-xs mt-1 ${
                        active ? 'text-[#E5C378]' : 'text-[#504440]'
                      }`}
                    >
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt 2 */}
          <div className="glass-gourmand rounded-lg p-6 md:p-8 space-y-4">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
              02. Cherished Scent Memory
            </span>
            <h2 className="font-playfair text-2xl text-[#2C1810]">
              Which Indian botanical draws you immediately?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'saffron', label: 'Kashmiri Saffron & Cardamom', sub: 'Spiced lactonic & cured vanilla' },
                { id: 'jasmine', label: 'Dawn Madurai Mogra & Rose', sub: 'Nectarous white temple florals' },
                { id: 'rain', label: 'First Rain on Baked Earth', sub: 'Kannauj mitti & cool green khus' },
                { id: 'sandalwood', label: 'Aged Sandalwood & Assam Oud', sub: 'Sacred heartwood & resin' },
              ].map((opt) => {
                const active = memory === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMemory(opt.id as MemoryChoice)}
                    className={`p-4 text-left rounded border transition-all cursor-pointer ${
                      active
                        ? 'border-[#C88A58] bg-[#2C1810] text-[#FAF7F2]'
                        : 'border-[#D4A373]/40 bg-[#FAF7F2]/80 text-[#2C1810] hover:border-[#C88A58]'
                    }`}
                  >
                    <span className="block text-sm font-medium">{opt.label}</span>
                    <span
                      className={`block text-xs mt-1 ${
                        active ? 'text-[#E5C378]' : 'text-[#504440]'
                      }`}
                    >
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt 3 */}
          <div className="glass-gourmand rounded-lg p-6 md:p-8 space-y-4">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
              03. Desired Sillage Presence
            </span>
            <h2 className="font-playfair text-2xl text-[#2C1810]">
              How close or enveloping should your trail be?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'intimate', label: 'Intimate Aura', sub: 'Close to skin · 3/5' },
                { id: 'balanced', label: 'Luminous Halo', sub: 'Arm’s length · 4/5' },
                { id: 'commanding', label: 'Royal Trail', sub: 'Statement · 5/5' },
              ].map((opt) => {
                const active = sillagePref === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSillagePref(opt.id as SillageChoice)}
                    className={`p-4 text-left rounded border transition-all cursor-pointer ${
                      active
                        ? 'border-[#C88A58] bg-[#2C1810] text-[#FAF7F2]'
                        : 'border-[#D4A373]/40 bg-[#FAF7F2]/80 text-[#2C1810] hover:border-[#C88A58]'
                    }`}
                  >
                    <span className="block text-sm font-medium">{opt.label}</span>
                    <span
                      className={`block text-xs mt-1 ${
                        active ? 'text-[#E5C378]' : 'text-[#504440]'
                      }`}
                    >
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Recommendation Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 border border-[#C59A4E]/40 bg-[#121110] text-[#FAF7F2] p-7 md:p-9 space-y-6">
          <div className="space-y-1.5 border-b border-[#C59A4E]/25 pb-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C378]">
              <Sparkles className="h-3 w-3" />
              <span>Your Tailored Atelier Matches</span>
            </span>
            <h3 className="font-bodoni text-2xl md:text-3xl text-[#FAF7F2]">
              Curated for Your Senses
            </h3>
          </div>

          <div className="space-y-5">
            {recommended.map((item, idx) => (
              <div
                key={item.id}
                className="flex gap-4 border border-[#C59A4E]/25 bg-[#1A1817] p-4"
              >
                <div className="h-24 w-20 shrink-0 overflow-hidden border border-[#C59A4E]/20">
                  <LuxuryImage
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[#E5C378]">
                    {idx === 0 ? 'Primary Match' : 'Harmonious Companion'} · {item.olfactiveFamily}
                  </span>
                  <h4 className="font-playfair text-xl text-[#FAF7F2]">{item.name}</h4>
                  <p className="text-xs text-[#F5EFE6]/75 line-clamp-2">{item.poeticLine}</p>
                  <div className="pt-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectFragrance(item.id)}
                      className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E5C378] underline underline-offset-4 hover:text-[#FAF7F2] cursor-pointer"
                    >
                      Explore Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleCoffretVial(item.id)}
                      className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] hover:text-[#E5C378] cursor-pointer"
                    >
                      {coffretVialIds.includes(item.id) ? '✓ In Coffret' : '+ Add Vial'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recommended.length === 2 && (
            <button
              type="button"
              onClick={() => onOpenLayering(recommended[1].id, recommended[0].id)}
              className="w-full bg-[#C59A4E] py-3.5 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#121110] hover:bg-[#E5C378] transition-colors cursor-pointer"
            >
              Layer Both in Studio
            </button>
          )}
        </div>
      </div>

      {/* Sampada 3-Vial Discovery Coffret Builder */}
      <section className="border border-[#D4A373]/50 bg-[#F7F2EB] p-7 md:p-10 lg:p-12 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#EFE8DC] pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#865225]">
              Sampada Discovery Set · 3 × 5 ml Glass Sprays
            </span>
            <h2 className="font-bodoni text-3xl md:text-4xl text-[#1A1817]">
              Experience Three Creations on Skin
            </h2>
            <p className="text-sm text-[#504440]">
              Choose any three fragrances to assemble your brass-sealed discovery coffret for {formatINR(COFFRET_PRICE)}, redeemable toward your first 50 ml or 100 ml flacon.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.16em] text-[#865225]">
                Coffret Selection
              </span>
              <span className="text-base font-semibold text-[#1A1817] tabular-nums">
                {coffretVialIds.length} of 3 Vials Selected
              </span>
            </div>

            <button
              type="button"
              disabled={selectedVials.length !== 3}
              onClick={handleAddCoffret}
              className="inline-flex items-center gap-2 bg-[#2C1810] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#C88A58] hover:text-[#2C1810] disabled:opacity-45 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {coffretAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Coffret Added to Bag</span>
                </>
              ) : (
                <span>
                  {selectedVials.length === 3
                    ? `Add Discovery Coffret — ${formatINR(COFFRET_PRICE)}`
                    : `Select ${3 - selectedVials.length} More Vial${3 - selectedVials.length === 1 ? '' : 's'}`}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fragrances.map((f) => {
            const selected = coffretVialIds.includes(f.id);
            const fullAndNotSelected = !selected && coffretVialIds.length >= 3;
            return (
              <div
                key={f.id}
                className={`flex items-center gap-4 p-4 border transition-all ${
                  selected
                    ? 'border-[#C59A4E] bg-[#FDFBF7] ring-1 ring-[#C59A4E]'
                    : 'border-[#EFE8DC] bg-[#FAF7F2]'
                }`}
              >
                <div className="h-20 w-16 shrink-0 overflow-hidden border border-[#EFE8DC]">
                  <LuxuryImage src={f.image} alt={f.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#865225]">
                    {f.collectionLabel}
                  </span>
                  <h3 className="font-playfair text-lg text-[#1A1817] truncate">{f.name}</h3>
                  <span className="block text-xs text-[#504440] truncate">
                    {f.notes.top[0]?.ingredient} · {f.notes.base[0]?.ingredient}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={fullAndNotSelected}
                  onClick={() => onToggleCoffretVial(f.id)}
                  className={`shrink-0 inline-flex items-center gap-1 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    selected
                      ? 'bg-[#C59A4E] text-[#121110]'
                      : 'border border-[#C59A4E] text-[#1A1817] hover:bg-[#F5EFE6]'
                  }`}
                >
                  {selected ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Picked</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" />
                      <span>5 ml</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
