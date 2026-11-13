import { useEffect, useState } from 'react';
import { BoutiqueView } from './components/BoutiqueView';
import { CartDrawer } from './components/CartDrawer';
import { FragranceDetailView } from './components/FragranceDetailView';
import { HeritageView } from './components/HeritageView';
import { LayeringStudioView } from './components/LayeringStudioView';
import { COFFRET_PRICE, ScentFinderView } from './components/ScentFinderView';
import { TopBar } from './components/TopBar';
import { FRAGRANCES } from './data/fragrances';
import { AppScreen, CartItem, Fragrance, SavedPairing, VolumeOption } from './types/fragrance';

const STORAGE_CART_KEY = 'rasa_kannauj_cart_v1';
const STORAGE_PAIRINGS_KEY = 'rasa_kannauj_pairings_v1';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('boutique');
  const [selectedFragranceId, setSelectedFragranceId] = useState<string>(FRAGRANCES[0].id);
  const [layeringBaseId, setLayeringBaseId] = useState<string>('mysore-chandana');
  const [layeringTopId, setLayeringTopId] = useState<string>('kesar-mishtann');
  const [coffretVialIds, setCoffretVialIds] = useState<string[]>(['kesar-mishtann', 'mitti-monsoon']);
  const [bagOpen, setBagOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CART_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [savedPairings, setSavedPairings] = useState<SavedPairing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PAIRINGS_KEY);
      return saved ? (JSON.parse(saved) as SavedPairing[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PAIRINGS_KEY, JSON.stringify(savedPairings));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedPairings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const navigateTo = (screen: AppScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFragrance = (id: string) => {
    setSelectedFragranceId(id);
    navigateTo('detail');
  };

  const handleAddFlacon = (fragrance: Fragrance, volume: VolumeOption, engraving?: string) => {
    const key = `flacon__${fragrance.id}__${volume}__${engraving || ''}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === key);
      if (existing) {
        return prev.map((i) => (i.cartId === key ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          cartId: key,
          type: 'flacon',
          title: fragrance.name,
          subtitle: `${volume} · ${fragrance.concentration}`,
          image: fragrance.image,
          unitPrice: fragrance.priceByVolume[volume],
          quantity: 1,
          volume,
          engraving,
        },
      ];
    });
    showToast(`Added ${fragrance.name} (${volume}) to your bag`);
  };

  const handleAddDuo = (
    base: Fragrance,
    top: Fragrance,
    volume: VolumeOption,
    duoTitle: string
  ) => {
    const rawSum = base.priceByVolume[volume] + top.priceByVolume[volume];
    const duoPrice = Math.round(rawSum * 0.9);
    const key = `duo__${base.id}__${top.id}__${volume}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === key);
      if (existing) {
        return prev.map((i) => (i.cartId === key ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          cartId: key,
          type: 'duo',
          title: `Layering Duo: ${duoTitle}`,
          subtitle: `2 × ${volume} (${base.name} + ${top.name})`,
          image: base.image,
          unitPrice: duoPrice,
          quantity: 1,
          volume,
        },
      ];
    });
    showToast(`Added Layering Duo "${duoTitle}" to your bag`);
  };

  const handleToggleCoffretVial = (fragranceId: string) => {
    setCoffretVialIds((prev) => {
      if (prev.includes(fragranceId)) {
        return prev.filter((id) => id !== fragranceId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, fragranceId];
    });
  };

  const handleAddCoffret = (vials: Fragrance[]) => {
    if (vials.length !== 3) return;
    const key = `coffret__${vials.map((v) => v.id).sort().join('_')}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === key);
      if (existing) {
        return prev.map((i) => (i.cartId === key ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          cartId: key,
          type: 'coffret',
          title: 'Sampada Discovery Coffret',
          subtitle: '3 × 5 ml Glass Sprays · Brass-Sealed Box',
          image: vials[0].image,
          unitPrice: COFFRET_PRICE,
          quantity: 1,
          vialNames: vials.map((v) => v.name),
        },
      ];
    });
    showToast('Added Sampada 3-Vial Discovery Coffret to your bag');
  };

  const handleSavePairing = (baseId: string, topId: string, title: string) => {
    setSavedPairings((prev) => {
      if (prev.some((p) => p.baseId === baseId && p.topId === topId)) return prev;
      return [
        {
          id: `${baseId}__${topId}`,
          baseId,
          topId,
          title,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
    showToast(`Saved "${title}" to your Atelier Journal`);
  };

  const handleOpenLayeringWith = (baseId: string, topId: string) => {
    setLayeringBaseId(baseId);
    setLayeringTopId(topId);
    navigateTo('layering');
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const selectedFragrance =
    FRAGRANCES.find((f) => f.id === selectedFragranceId) || FRAGRANCES[0];
  const recommendedPair =
    FRAGRANCES.find((f) => f.id === selectedFragrance.recommendedPairId) || FRAGRANCES[1];

  const totalBagCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1817]">
      <TopBar
        activeScreen={activeScreen}
        onNavigate={navigateTo}
        bagCount={totalBagCount}
        onOpenBag={() => setBagOpen(true)}
      />

      <main className="flex-1">
        {activeScreen === 'boutique' && (
          <BoutiqueView
            fragrances={FRAGRANCES}
            onSelectFragrance={handleSelectFragrance}
            onQuickAdd={(fragrance) => handleAddFlacon(fragrance, '50ml')}
            onNavigate={navigateTo}
          />
        )}

        {activeScreen === 'detail' && (
          <FragranceDetailView
            fragrance={selectedFragrance}
            recommendedPair={recommendedPair}
            onBack={() => navigateTo('boutique')}
            onAddToBag={handleAddFlacon}
            onOpenLayering={handleOpenLayeringWith}
            onSelectFragrance={handleSelectFragrance}
          />
        )}

        {activeScreen === 'layering' && (
          <LayeringStudioView
            fragrances={FRAGRANCES}
            initialBaseId={layeringBaseId}
            initialTopId={layeringTopId}
            savedPairings={savedPairings}
            onSavePairing={handleSavePairing}
            onAddDuoToBag={handleAddDuo}
            onSelectFragrance={handleSelectFragrance}
          />
        )}

        {activeScreen === 'finder' && (
          <ScentFinderView
            fragrances={FRAGRANCES}
            coffretVialIds={coffretVialIds}
            onToggleCoffretVial={handleToggleCoffretVial}
            onAddCoffretToBag={handleAddCoffret}
            onSelectFragrance={handleSelectFragrance}
            onOpenLayering={handleOpenLayeringWith}
          />
        )}

        {activeScreen === 'heritage' && <HeritageView onNavigate={navigateTo} />}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#EFE8DC] bg-[#F5EFE6]/70">
        <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-bodoni text-xl text-[#1A1817]">Rasa Kannauj</p>
            <p className="text-xs text-[#504440]">
              Kannauj Deg-Bhapka Distillery · Mysore Sandalwood &amp; Botanical Extraits
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#504440]">
            <button
              type="button"
              onClick={() => navigateTo('boutique')}
              className="hover:text-[#1A1817] cursor-pointer"
            >
              Boutique
            </button>
            <button
              type="button"
              onClick={() => navigateTo('layering')}
              className="hover:text-[#1A1817] cursor-pointer"
            >
              Layering Studio
            </button>
            <button
              type="button"
              onClick={() => navigateTo('finder')}
              className="hover:text-[#1A1817] cursor-pointer"
            >
              Discovery Coffret
            </button>
            <button
              type="button"
              onClick={() => navigateTo('heritage')}
              className="hover:text-[#1A1817] cursor-pointer"
            >
              Atelier Heritage
            </button>
          </div>
        </div>
      </footer>

      {/* Confirmation Toast */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-40 border border-[#C59A4E] bg-[#121110] px-5 py-3.5 text-xs text-[#FAF7F2] shadow-xl flex items-center gap-4"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setBagOpen(true)}
            className="text-[#E5C378] font-semibold uppercase tracking-[0.14em] hover:underline cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={bagOpen}
        items={cart}
        onClose={() => setBagOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setCart([])}
      />
    </div>
  );
}
