import { useMemo, useState } from 'react';
import { Bookmark, Check, Layers, ArrowRightLeft } from 'lucide-react';
import { computeLayeringRecipe, formatINR } from '../data/fragrances';
import { Fragrance, SavedPairing, VolumeOption } from '../types/fragrance';
import { LuxuryImage } from './LuxuryImage';

interface LayeringStudioViewProps {
  fragrances: Fragrance[];
  initialBaseId: string;
  initialTopId: string;
  savedPairings: SavedPairing[];
  onSavePairing: (baseId: string, topId: string, title: string) => void;
  onAddDuoToBag: (base: Fragrance, top: Fragrance, volume: VolumeOption, title: string) => void;
  onSelectFragrance: (id: string) => void;
}

export function LayeringStudioView({
  fragrances,
  initialBaseId,
  initialTopId,
  savedPairings,
  onSavePairing,
  onAddDuoToBag,
  onSelectFragrance,
}: LayeringStudioViewProps) {
  const [baseId, setBaseId] = useState(initialBaseId);
  const [topId, setTopId] = useState(initialTopId);
  const [duoVolume, setDuoVolume] = useState<VolumeOption>('50ml');
  const [addedDuo, setAddedDuo] = useState(false);

  const baseFragrance = useMemo(
    () => fragrances.find((f) => f.id === baseId) || fragrances[5],
    [fragrances, baseId]
  );

  const topFragrance = useMemo(
    () => fragrances.find((f) => f.id === topId) || fragrances[0],
    [fragrances, topId]
  );

  const recipe = useMemo(
    () => computeLayeringRecipe(baseFragrance, topFragrance),
    [baseFragrance, topFragrance]
  );

  const rawSum = baseFragrance.priceByVolume[duoVolume] + topFragrance.priceByVolume[duoVolume];
  const duoPrice = Math.round(rawSum * 0.9); // 10% Duo Privilege
  const savings = rawSum - duoPrice;

  const isAlreadySaved = savedPairings.some(
    (p) => p.baseId === baseFragrance.id && p.topId === topFragrance.id
  );

  const handleSwap = () => {
    setBaseId(topFragrance.id);
    setTopId(baseFragrance.id);
  };

  const handleAddDuo = () => {
    onAddDuoToBag(baseFragrance, topFragrance, duoVolume, recipe.title);
    setAddedDuo(true);
    setTimeout(() => setAddedDuo(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-16 lg:py-12 space-y-14 pb-24">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#EFE8DC] pb-8">
        <div className="space-y-3 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
            Accord Layering Matrix · Kannauj Ritual
          </p>
          <h1 className="font-bodoni text-4xl md:text-5xl text-[#1A1817]">
            The Fragrance Layering Studio
          </h1>
          <p className="text-[15px] leading-[1.7] text-[#504440]">
            In Indian royal courts, an earthy <span className="italic font-playfair text-[#2C1810]">ittar</span> of sandalwood, mitti, or oud anchors the skin before a veil of saffron or jasmine bloom is misted above it. Compose your own dual-flacon signature below.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-2 border border-[#C59A4E] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1817] hover:bg-[#F5EFE6] transition-colors self-start lg:self-auto cursor-pointer"
        >
          <ArrowRightLeft className="h-3.5 w-3.5 text-[#C59A4E]" />
          <span>Reverse Layering Order</span>
        </button>
      </div>

      {/* Split Dual-Card Juxtaposition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: Base Layer */}
        <div className="lg:col-span-5 border border-[#EFE8DC] bg-[#F5EFE6]/60 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#865225]">
                Layer I · Skin Anchor (Base)
              </span>
              <span className="text-[11px] text-[#504440]">{baseFragrance.concentration}</span>
            </div>

            <select
              aria-label="Select Base Anchor Fragrance"
              value={baseFragrance.id}
              onChange={(e) => setBaseId(e.target.value)}
              className="w-full border border-[#C59A4E]/60 bg-[#FAF7F2] px-4 py-3 text-sm font-medium text-[#1A1817] focus:border-[#C59A4E] focus:outline-none cursor-pointer"
            >
              {fragrances.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.olfactiveFamily}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-12 gap-5 items-center pt-2">
              <button
                type="button"
                onClick={() => onSelectFragrance(baseFragrance.id)}
                className="col-span-5 aspect-[3/4] overflow-hidden border border-[#EFE8DC] bg-[#FAF7F2] cursor-pointer"
              >
                <LuxuryImage
                  src={baseFragrance.image}
                  alt={baseFragrance.name}
                  className="h-full w-full object-cover"
                />
              </button>
              <div className="col-span-7 space-y-2.5">
                <h2 className="font-bodoni text-2xl text-[#1A1817]">{baseFragrance.name}</h2>
                <p className="font-playfair italic text-sm text-[#504440]">
                  {baseFragrance.sanskritSubtitle}
                </p>
                <div className="space-y-1 pt-2 border-t border-[#EFE8DC] text-xs text-[#504440]">
                  <p>
                    <span className="text-[#C59A4E]" aria-hidden="true">◆ </span>
                    Base: {baseFragrance.notes.base.map((n) => n.ingredient).join(', ')}
                  </p>
                  <p>
                    <span className="text-[#C59A4E]" aria-hidden="true">◆ </span>
                    Hold: {baseFragrance.longevityHours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center / Matrix Summary Connector */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4 px-2 space-y-3">
          <div className="h-12 w-12 flex items-center justify-center border border-[#C59A4E] bg-[#121110] text-[#E5C378] clip-chamfer">
            <Layers className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#865225]">
            Paired Harmony
          </span>
          <p className="font-playfair italic text-lg text-[#2C1810]">{recipe.title}</p>
          <span className="text-[11px] text-[#504440]">10% Atelier Duo Privilege</span>
        </div>

        {/* Right Card: Top Veil Layer */}
        <div className="lg:col-span-5 border border-[#D4A373]/50 bg-[#FDFBF7] p-6 md:p-8 rounded-lg shadow-plum flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#865225]">
                Layer II · Radiant Veil (Top)
              </span>
              <span className="text-[11px] text-[#504440]">{topFragrance.concentration}</span>
            </div>

            <select
              aria-label="Select Top Veil Fragrance"
              value={topFragrance.id}
              onChange={(e) => setTopId(e.target.value)}
              className="w-full rounded border border-[#D4A373]/60 bg-[#FAF7F2] px-4 py-3 text-sm font-medium text-[#2C1810] focus:border-[#C88A58] focus:outline-none cursor-pointer"
            >
              {fragrances.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.olfactiveFamily}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-12 gap-5 items-center pt-2">
              <button
                type="button"
                onClick={() => onSelectFragrance(topFragrance.id)}
                className="col-span-5 aspect-[3/4] overflow-hidden rounded-md border border-[#D4A373]/30 bg-[#F7F2EB] cursor-pointer"
              >
                <LuxuryImage
                  src={topFragrance.image}
                  alt={topFragrance.name}
                  className="h-full w-full object-cover"
                />
              </button>
              <div className="col-span-7 space-y-2.5">
                <h2 className="font-playfair font-medium text-2xl text-[#2C1810]">
                  {topFragrance.name}
                </h2>
                <p className="font-playfair italic text-sm text-[#504440]">
                  {topFragrance.sanskritSubtitle}
                </p>
                <div className="space-y-1 pt-2 border-t border-[#EFE8DC] text-xs text-[#504440]">
                  <p>
                    <span className="text-[#C88A58]" aria-hidden="true">◆ </span>
                    Bloom: {topFragrance.notes.top.map((n) => n.ingredient).join(', ')}
                  </p>
                  <p>
                    <span className="text-[#C88A58]" aria-hidden="true">◆ </span>
                    Heart: {topFragrance.notes.heart[0]?.ingredient}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accord Layering Matrix Result Panel */}
      <section className="border border-[#C59A4E]/40 bg-[#121110] text-[#FAF7F2] p-7 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Olfactive Synthesis */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E5C378]">
                Resulting Accord Synthesis
              </span>
              <h2 className="font-bodoni text-3xl md:text-4xl text-[#FAF7F2]">
                {recipe.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#F5EFE6]/80">
                <span>{recipe.occasion}</span>
                <span aria-hidden="true" className="text-[#C59A4E]">·</span>
                <span>{recipe.sillageProjection}</span>
              </div>
            </div>

            <p className="text-[15px] leading-[1.75] text-[#F5EFE6]/85">
              {recipe.harmonyNarrative}
            </p>

            {/* Bridge Botanicals */}
            <div className="space-y-2 pt-2">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-[#E5C378]">
                Olfactive Bridge Notes
              </span>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#FAF7F2]">
                {recipe.bridgeNotes.map((note) => (
                  <span key={note} className="inline-flex items-center gap-1.5">
                    <span className="text-[#C59A4E] text-xs" aria-hidden="true">◆</span>
                    <span>{note}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Blended Accord Bars */}
            <div className="space-y-3 pt-4 border-t border-[#C59A4E]/25">
              {recipe.blendedAccords.map((acc) => (
                <div key={acc.name} className="grid grid-cols-12 items-center gap-3">
                  <span className="col-span-4 text-xs text-[#F5EFE6]/90 truncate">{acc.name}</span>
                  <div className="col-span-6 h-1.5 bg-[#2A2623]">
                    <div
                      className="h-full bg-[#C59A4E]"
                      style={{ width: `${acc.intensity}%` }}
                    />
                  </div>
                  <span className="col-span-2 text-right text-xs text-[#E5C378] tabular-nums">
                    {acc.intensity}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Duo Purchase Box */}
          <div className="lg:col-span-5 border border-[#C59A4E]/35 bg-[#1A1817] p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#E5C378]">
                Acquire the Layering Duo
              </span>
              <p className="text-sm text-[#F5EFE6]/80">
                Includes both <strong className="font-medium text-[#FAF7F2]">{baseFragrance.name}</strong> and <strong className="font-medium text-[#FAF7F2]">{topFragrance.name}</strong> with a 10% Duo Privilege.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['10ml', '50ml', '100ml'] as VolumeOption[]).map((vol) => {
                const active = duoVolume === vol;
                return (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setDuoVolume(vol)}
                    className={`py-2.5 text-xs font-semibold uppercase tracking-[0.12em] border transition-colors cursor-pointer tabular-nums ${
                      active
                        ? 'border-[#E5C378] bg-[#C59A4E] text-[#121110]'
                        : 'border-[#C59A4E]/30 text-[#FAF7F2] hover:border-[#E5C378]'
                    }`}
                  >
                    2 × {vol}
                  </button>
                );
              })}
            </div>

            <div className="flex items-baseline justify-between border-t border-b border-[#C59A4E]/20 py-4">
              <div>
                <span className="block text-xs text-[#F5EFE6]/70">Duo Set Total</span>
                <span className="text-[11px] text-[#E5C378] tabular-nums">
                  Save {formatINR(savings)} (10% Privilege)
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs line-through text-[#F5EFE6]/50 tabular-nums">
                  {formatINR(rawSum)}
                </span>
                <span className="font-bodoni text-3xl text-[#FAF7F2] tabular-nums">
                  {formatINR(duoPrice)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAddDuo}
                className="w-full flex items-center justify-center gap-2 bg-[#C59A4E] py-4 px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#121110] hover:bg-[#E5C378] transition-colors cursor-pointer"
              >
                {addedDuo ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Layering Duo Added to Bag</span>
                  </>
                ) : (
                  <span>Add Layering Duo — {formatINR(duoPrice)}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onSavePairing(baseFragrance.id, topFragrance.id, recipe.title)}
                disabled={isAlreadySaved}
                className="w-full flex items-center justify-center gap-2 border border-[#C59A4E]/50 py-3 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] hover:bg-[#2A2623] disabled:opacity-60 transition-colors cursor-pointer"
              >
                <Bookmark className="h-3.5 w-3.5 text-[#E5C378]" />
                <span>{isAlreadySaved ? 'Saved in Your Atelier Journal' : 'Save Pairing Recipe'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Pairings Shelf */}
      {savedPairings.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#865225]">
            Your Saved Layering Rituals ({savedPairings.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedPairings.map((pairing) => {
              const b = fragrances.find((f) => f.id === pairing.baseId);
              const t = fragrances.find((f) => f.id === pairing.topId);
              if (!b || !t) return null;
              return (
                <button
                  key={pairing.id}
                  type="button"
                  onClick={() => {
                    setBaseId(b.id);
                    setTopId(t.id);
                  }}
                  className="text-left border border-[#EFE8DC] bg-[#F5EFE6]/70 p-4 hover:border-[#C59A4E] transition-colors cursor-pointer"
                >
                  <span className="block font-playfair italic text-lg text-[#1A1817]">
                    {pairing.title}
                  </span>
                  <span className="block text-xs text-[#504440] mt-1">
                    {b.name} + {t.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
