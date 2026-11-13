import { useState } from 'react';
import { ArrowLeft, Check, Layers, Sparkles } from 'lucide-react';
import { formatINR } from '../data/fragrances';
import { Fragrance, VolumeOption } from '../types/fragrance';
import { LuxuryImage } from './LuxuryImage';

interface FragranceDetailViewProps {
  fragrance: Fragrance;
  recommendedPair: Fragrance;
  onBack: () => void;
  onAddToBag: (fragrance: Fragrance, volume: VolumeOption, engraving?: string) => void;
  onOpenLayering: (baseId: string, topId: string) => void;
  onSelectFragrance: (id: string) => void;
}

const VOLUMES: { value: VolumeOption; label: string; note: string }[] = [
  { value: '10ml', label: '10 ml', note: 'Travel Attar Roll-On' },
  { value: '50ml', label: '50 ml', note: 'Signature Crystal Flacon' },
  { value: '100ml', label: '100 ml', note: 'Collector Decanter' },
];

export function FragranceDetailView({
  fragrance,
  recommendedPair,
  onBack,
  onAddToBag,
  onOpenLayering,
  onSelectFragrance,
}: FragranceDetailViewProps) {
  const [selectedVolume, setSelectedVolume] = useState<VolumeOption>('50ml');
  const [engraving, setEngraving] = useState('');
  const [addedFlash, setAddedFlash] = useState(false);

  const isGourmand = fragrance.collection === 'mishtann';
  const currentPrice = fragrance.priceByVolume[selectedVolume];

  const handleAdd = () => {
    onAddToBag(fragrance, selectedVolume, engraving.trim() || undefined);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1800);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-16 lg:py-12 space-y-16">
      {/* Breadcrumb Back */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#504440] hover:text-[#1A1817] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Boutique</span>
        </button>
      </div>

      {/* Main Sticky Flacon + Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Sticky Portrait Flacon */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div
            className={`relative aspect-[3/4] w-full overflow-hidden border bg-[#F5EFE6] ${
              isGourmand
                ? 'rounded-lg border-[#D4A373]/40 shadow-plum'
                : 'rounded-none border-[#EFE8DC] shadow-bronze'
            }`}
          >
            <LuxuryImage
              src={fragrance.image}
              alt={fragrance.name}
              className="h-full w-full object-cover"
              fallbackTitle={fragrance.name}
            />
            <div className="absolute bottom-4 left-4 right-4 glass-gourmand px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#865225]">
                  Distillation Method
                </span>
                <span className="text-xs font-medium text-[#2C1810]">
                  {fragrance.distillation}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-[0.18em] text-[#865225]">
                  Aging
                </span>
                <span className="text-xs font-medium text-[#2C1810]">{fragrance.maceration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-3 border-b border-[#EFE8DC] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#865225]">
              <span>{fragrance.collectionLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{fragrance.concentration}</span>
              <span aria-hidden="true">·</span>
              <span>{fragrance.olfactiveFamily}</span>
            </div>

            <h1
              className={`text-4xl md:text-[44px] leading-tight text-[#1A1817] ${
                isGourmand ? 'font-playfair font-medium' : 'font-bodoni font-normal'
              }`}
            >
              {fragrance.name}
            </h1>
            <p className="font-playfair italic text-lg text-[#504440]">
              {fragrance.sanskritSubtitle}
            </p>
            <p className="text-[15px] leading-[1.7] text-[#504440] pt-2">
              {fragrance.story}
            </p>
          </div>

          {/* Volume Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A1817]">
                Select Presentation
              </span>
              <span className="text-2xl font-semibold text-[#1A1817] tabular-nums">
                {formatINR(currentPrice)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {VOLUMES.map((vol) => {
                const active = selectedVolume === vol.value;
                return (
                  <button
                    key={vol.value}
                    type="button"
                    onClick={() => setSelectedVolume(vol.value)}
                    className={`p-3.5 text-left border transition-all duration-150 cursor-pointer ${
                      isGourmand ? 'rounded-md' : 'rounded-none'
                    } ${
                      active
                        ? 'border-[#C59A4E] bg-[#F5EFE6] ring-1 ring-[#C59A4E]'
                        : 'border-[#EFE8DC] bg-[#FAF7F2] hover:border-[#D4A373]'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-[#1A1817] tabular-nums">
                      {vol.label}
                    </span>
                    <span className="block text-[11px] text-[#504440] mt-0.5">{vol.note}</span>
                    <span className="block text-xs font-medium text-[#865225] mt-1.5 tabular-nums">
                      {formatINR(fragrance.priceByVolume[vol.value])}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complimentary Monogram Engraving */}
          {selectedVolume !== '10ml' && (
            <div className="space-y-2">
              <label
                htmlFor="engraving-input"
                className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1A1817]"
              >
                Complimentary Flacon Monogram (Optional · Max 12 Characters)
              </label>
              <input
                id="engraving-input"
                type="text"
                maxLength={12}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="e.g., A. K. 2026"
                className="w-full border border-[#EFE8DC] bg-[#FDFBF7] px-4 py-3 text-sm text-[#1A1817] placeholder:text-[#827470] caret-[#C59A4E] focus:border-[#C59A4E] focus:outline-none"
              />
            </div>
          )}

          {/* Primary & Secondary CTAs */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2.5 py-4 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] transition-all duration-150 cursor-pointer ${
                isGourmand
                  ? 'rounded bg-[#2C1810] hover:bg-[#C88A58] hover:text-[#2C1810]'
                  : 'rounded-none bg-[#1A1817] hover:bg-[#C59A4E] hover:text-[#121110]'
              }`}
            >
              {addedFlash ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <span>
                  Add {selectedVolume} to Bag — {formatINR(currentPrice)}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenLayering(fragrance.id, recommendedPair.id)}
              className="w-full flex items-center justify-center gap-2.5 border border-[#C59A4E] bg-transparent py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1817] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
            >
              <Layers className="h-4 w-4 text-[#C59A4E]" />
              <span>Pair in Layering Studio with {recommendedPair.name}</span>
            </button>
          </div>

          {/* Sillage & Longevity Meter */}
          <div className="border border-[#EFE8DC] bg-[#F7F2EB] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#865225] mb-2">
                  Sillage Projection
                </span>
                <div className="flex items-center gap-1.5" aria-label={`Sillage ${fragrance.sillage} out of 5`}>
                  {[1, 2, 3, 4, 5].map((step) => (
                    <span
                      key={step}
                      className={`h-2.5 flex-1 transition-colors ${
                        step <= fragrance.sillage ? 'bg-[#C59A4E]' : 'bg-[#EFE8DC]'
                      }`}
                    />
                  ))}
                </div>
                <span className="block text-xs text-[#504440] mt-1.5 tabular-nums">
                  {fragrance.sillage}/5 · {fragrance.sillage >= 4 ? 'Enveloping Trail' : 'Intimate Aura'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#865225] mb-2">
                  Skin Longevity
                </span>
                <span className="block font-bodoni text-2xl text-[#1A1817] tabular-nums">
                  {fragrance.longevityHours}
                </span>
                <span className="block text-xs text-[#504440] mt-0.5">{fragrance.seasonMood}</span>
              </div>
            </div>

            {/* Accord Strength Bars */}
            <div className="pt-3 border-t border-[#EFE8DC] space-y-2.5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#865225]">
                Dominant Accords
              </span>
              {fragrance.accords.map((accord) => (
                <div key={accord.name} className="grid grid-cols-12 items-center gap-3">
                  <span className="col-span-4 text-xs text-[#1A1817] truncate">{accord.name}</span>
                  <div className="col-span-6 h-1.5 bg-[#EFE8DC]">
                    <div
                      className="h-full bg-[#2C1810]"
                      style={{ width: `${accord.intensity}%` }}
                    />
                  </div>
                  <span className="col-span-2 text-right text-[11px] text-[#504440] tabular-nums">
                    {accord.intensity}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3-Tier Note Pyramid */}
      <section className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
            Architecture Olfactive
          </p>
          <h2 className="font-bodoni text-3xl md:text-4xl text-[#1A1817]">
            The Three-Tier Note Pyramid
          </h2>
          <p className="text-sm text-[#504440]">
            Every Indian botanical unfolds deliberately across skin temperature—from first aromatic spark to sandalwood dry-down.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { stage: 'Tête / Top Notes', timing: 'First 30 Minutes', notes: fragrance.notes.top },
            { stage: 'Cœur / Heart Notes', timing: '1 to 5 Hours', notes: fragrance.notes.heart },
            { stage: 'Fond / Base Notes', timing: '5 to 14+ Hours', notes: fragrance.notes.base },
          ].map((tier) => (
            <div
              key={tier.stage}
              className={`p-6 md:p-8 ${
                isGourmand
                  ? 'rounded-lg glass-gourmand'
                  : 'rounded-none border border-[#EFE8DC] bg-[#F5EFE6]/70'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-3 space-y-1">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#865225]">
                    {tier.stage}
                  </span>
                  <span className="block text-xs text-[#504440]">{tier.timing}</span>
                </div>

                <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {tier.notes.map((n) => (
                    <div key={n.ingredient} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#C59A4E] text-xs" aria-hidden="true">
                          ◆
                        </span>
                        <h3 className="font-playfair font-medium text-lg text-[#1A1817]">
                          {n.ingredient}
                        </h3>
                      </div>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#865225]">
                        {n.origin}
                      </p>
                      <p className="text-xs text-[#504440] leading-relaxed">{n.descriptor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Layering Partner Strip */}
      <section className="border border-[#C59A4E]/40 bg-[#F5EFE6] p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="h-24 w-20 shrink-0 overflow-hidden border border-[#EFE8DC]">
              <LuxuryImage
                src={recommendedPair.image}
                alt={recommendedPair.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
                <Sparkles className="h-3 w-3" />
                <span>Recommended Layering Partner</span>
              </span>
              <h3 className="font-bodoni text-2xl text-[#1A1817]">{recommendedPair.name}</h3>
              <p className="text-sm text-[#504440] max-w-lg">{recommendedPair.poeticLine}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSelectFragrance(recommendedPair.id)}
              className="border border-[#C59A4E] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1A1817] hover:bg-[#FAF7F2] cursor-pointer"
            >
              View {recommendedPair.name}
            </button>
            <button
              type="button"
              onClick={() => onOpenLayering(fragrance.id, recommendedPair.id)}
              className="bg-[#1A1817] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] hover:bg-[#C59A4E] hover:text-[#121110] cursor-pointer"
            >
              Test This Pairing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
