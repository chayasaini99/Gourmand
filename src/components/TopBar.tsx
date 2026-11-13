import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { AppScreen } from '../types/fragrance';

interface TopBarProps {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_ITEMS: { id: AppScreen; label: string }[] = [
  { id: 'boutique', label: 'Boutique' },
  { id: 'layering', label: 'Layering Studio' },
  { id: 'finder', label: 'Scent Finder' },
  { id: 'heritage', label: 'Heritage' },
];

export function TopBar({ activeScreen, onNavigate, bagCount, onOpenBag }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: AppScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#EFE8DC] bg-[#FAF7F2]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-4 md:px-10 lg:px-16">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('boutique')}
          className="font-bodoni text-xl md:text-2xl tracking-[0.04em] text-[#1A1817] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C59A4E]"
        >
          Rasa Kannauj
        </button>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeScreen === item.id || (activeScreen === 'detail' && item.id === 'boutique');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-[12px] font-medium uppercase tracking-[0.14em] whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C59A4E] ${
                  isActive
                    ? 'text-[#1A1817]'
                    : 'text-[#504440] hover:text-[#1A1817]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#C59A4E] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="inline-flex items-center gap-2.5 bg-[#1A1817] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#C59A4E] hover:text-[#121110] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C59A4E]"
            aria-label={`Open shopping bag with ${bagCount} items`}
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.6} />
            <span className="tabular-nums">Bag ({bagCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden items-center justify-center p-2 text-[#1A1817] border border-[#EFE8DC] bg-[#F5EFE6]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EFE8DC] bg-[#FAF7F2] px-5 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2.5 text-xs uppercase tracking-[0.16em] border-b border-[#EFE8DC]/70 last:border-b-0 ${
                  isActive ? 'text-[#C59A4E] font-semibold' : 'text-[#1A1817]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
