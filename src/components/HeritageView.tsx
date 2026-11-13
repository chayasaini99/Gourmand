import { ArrowRight } from 'lucide-react';
import { ATELIER_CRAFT_IMAGE } from '../data/fragrances';
import { AppScreen } from '../types/fragrance';
import { LuxuryImage } from './LuxuryImage';

interface HeritageViewProps {
  onNavigate: (screen: AppScreen) => void;
}

export function HeritageView({ onNavigate }: HeritageViewProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 lg:px-16 lg:py-14 space-y-16 pb-24">
      <div className="max-w-3xl space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
          Maison Monograph · Kannauj, Uttar Pradesh
        </p>
        <h1 className="font-bodoni text-4xl md:text-5xl leading-[1.15] text-[#1A1817]">
          A Thousand Years of Indian Attar, <span className="font-playfair italic font-normal text-[#2C1810]">Refined for Modern Skin.</span>
        </h1>
        <p className="text-base leading-[1.8] text-[#504440]">
          Long before synthetic perfumery existed, the river town of Kannauj perfected zero-electricity hydro-distillation using hammered copper stills, bamboo condensers, and aged Mysore sandalwood receivers. Rasa Kannauj preserves these heirloom methods while formulating high-concentration extraits suited for contemporary wardrobes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 border border-[#EFE8DC] overflow-hidden min-h-[340px]">
          <LuxuryImage
            src={ATELIER_CRAFT_IMAGE}
            alt="Master perfumers in Kannauj working with copper deg-bhapka stills and fresh mogra blossoms"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="lg:col-span-5 border border-[#EFE8DC] bg-[#F7F2EB] p-8 md:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl md:text-3xl text-[#2C1810]">
              Three Pillars of Our Craft
            </h2>
            <div className="space-y-5 border-t border-[#EFE8DC] pt-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#865225]">
                  01. Single-Origin Indian Harvests
                </h3>
                <p className="text-sm text-[#504440] mt-1 leading-relaxed">
                  Autumn Kashmiri saffron from Pampore, dawn-plucked Madurai jasmine buds, wild Assam agarwood, and Wayanad shade-grown vanilla pods.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#865225]">
                  02. Copper Deg &amp; Clay Bhapka
                </h3>
                <p className="text-sm text-[#504440] mt-1 leading-relaxed">
                  Gentle wood-fired steam carries delicate floral vapors through hollow bamboo into pure sandalwood oil, preserving nuances harsh high-pressure stills burn away.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#865225]">
                  03. Unhurried Maturation
                </h3>
                <p className="text-sm text-[#504440] mt-1 leading-relaxed">
                  Every batch rests six to twelve months in clay matkas or dark glass carboys so sharp edges round into seamless skin-hugging longevity.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('boutique')}
            className="inline-flex items-center justify-center gap-2.5 bg-[#1A1817] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#C59A4E] hover:text-[#121110] transition-colors cursor-pointer"
          >
            <span>Return to the Collection</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
