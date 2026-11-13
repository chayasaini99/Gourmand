import React, { useState } from 'react';
import { CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { formatINR } from '../data/fragrances';
import { CartItem } from '../types/fragrance';
import { LuxuryImage } from './LuxuryImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearBag: () => void;
}

const FREE_SHIPPING_THRESHOLD = 5000;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}: CartDrawerProps) {
  const [giftWrap, setGiftWrap] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [cityAddress, setCityAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'cod'>('upi');
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderNumber: string;
    total: number;
    recipient: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 250;
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !cityAddress.trim() || !pincode.trim()) return;
    const orderNum = `RK-${Math.floor(1000 + Math.random() * 8999)}`;
    setOrderConfirmed({
      orderNumber: orderNum,
      total,
      recipient: customerName.trim(),
    });
    onClearBag();
    setCheckoutOpen(false);
  };

  const handleClose = () => {
    setOrderConfirmed(null);
    setCheckoutOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121110]/55 backdrop-blur-xs"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#FAF7F2] border-l border-[#EFE8DC] shadow-2xl"
        aria-label="Shopping Bag"
      >
        <div className="flex items-center justify-between border-b border-[#EFE8DC] px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#865225]">
              Rasa Kannauj
            </p>
            <h2 className="font-bodoni text-2xl text-[#1A1817]">Your Atelier Bag</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-[#504440] hover:text-[#1A1817] cursor-pointer"
            aria-label="Close shopping bag"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {orderConfirmed ? (
            <div className="border border-[#C59A4E] bg-[#F5EFE6] p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-[#2C1810]">
                <CheckCircle2 className="h-5 w-5 text-[#865225]" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  Order #{orderConfirmed.orderNumber} Confirmed
                </span>
              </div>
              <h3 className="font-playfair text-2xl text-[#1A1817]">
                Thank you, {orderConfirmed.recipient}.
              </h3>
              <p className="text-sm text-[#504440] leading-relaxed">
                Our Kannauj atelier is preparing your hand-sealed parcel{giftWrap ? ' with complimentary brass-seal festive wrapping' : ''}. Dispatch details will follow shortly.
              </p>
              <div className="border-t border-[#EFE8DC] pt-3 flex items-center justify-between text-sm">
                <span className="text-[#504440]">Total Settled ({paymentMode === 'upi' ? 'UPI / Card' : 'Cash on Delivery'})</span>
                <span className="font-semibold text-[#1A1817] tabular-nums">
                  {formatINR(orderConfirmed.total)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full bg-[#1A1817] py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#C59A4E] hover:text-[#121110] cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="font-playfair italic text-xl text-[#2C1810]">
                Your atelier bag is currently empty.
              </p>
              <p className="text-sm text-[#504440] max-w-xs mx-auto">
                Explore our single-origin Indian extraits, compose a layering duo, or curate a 3-vial discovery coffret.
              </p>
            </div>
          ) : (
            <>
              {/* Shipping progress */}
              <div className="border border-[#EFE8DC] bg-[#F5EFE6] px-4 py-3 text-xs text-[#504440]">
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#2C1810] font-medium">
                    Complimentary insured courier across India unlocked.
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#1A1817] tabular-nums">{formatINR(remainingForFreeShipping)}</strong> more for complimentary courier delivery.
                  </span>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#EFE8DC]">
                {items.map((item) => (
                  <div key={item.cartId} className="py-4 flex gap-4">
                    <div className="h-24 w-20 shrink-0 overflow-hidden border border-[#EFE8DC] bg-[#F5EFE6]">
                      <LuxuryImage
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-playfair font-medium text-base text-[#1A1817] leading-snug">
                          {item.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-[#827470] hover:text-[#ba1a1a] cursor-pointer"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#504440]">{item.subtitle}</p>
                      {item.engraving && (
                        <p className="text-[11px] text-[#865225]">
                          Monogram: “{item.engraving}”
                        </p>
                      )}
                      {item.vialNames && item.vialNames.length > 0 && (
                        <p className="text-[11px] text-[#504440]">
                          Vials: {item.vialNames.join(' · ')}
                        </p>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#EFE8DC] bg-[#FDFBF7]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="p-1.5 text-[#1A1817] hover:bg-[#F5EFE6] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="p-1.5 text-[#1A1817] hover:bg-[#F5EFE6] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-[#1A1817] tabular-nums">
                          {formatINR(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Festive Gift Wrap Option */}
              <label className="flex items-start gap-3 border border-[#EFE8DC] bg-[#F7F2EB] p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#C59A4E]"
                />
                <span className="text-xs text-[#504440] leading-relaxed">
                  <strong className="block text-[#1A1817] font-medium">
                    Complimentary Brass-Seal Festive Gift Box
                  </strong>
                  Hand-wrapped in textured cotton paper with a Kannauj wax &amp; brass seal.
                </span>
              </label>

              {/* Inline Checkout Form */}
              {checkoutOpen && (
                <form onSubmit={handleConfirmOrder} className="border border-[#C59A4E]/50 bg-[#FDFBF7] p-5 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1817]">
                    Delivery &amp; Payment Verification
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full border border-[#EFE8DC] bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1A1817] focus:border-[#C59A4E] focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile Number (+91)"
                      className="w-full border border-[#EFE8DC] bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1A1817] focus:border-[#C59A4E] focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={cityAddress}
                      onChange={(e) => setCityAddress(e.target.value)}
                      placeholder="Street Address, City & State"
                      className="w-full border border-[#EFE8DC] bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1A1817] focus:border-[#C59A4E] focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="PIN Code (e.g., 110001)"
                      className="w-full border border-[#EFE8DC] bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1A1817] focus:border-[#C59A4E] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('upi')}
                      className={`py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] border cursor-pointer ${
                        paymentMode === 'upi'
                          ? 'border-[#C59A4E] bg-[#1A1817] text-[#FAF7F2]'
                          : 'border-[#EFE8DC] text-[#504440]'
                      }`}
                    >
                      UPI / Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('cod')}
                      className={`py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] border cursor-pointer ${
                        paymentMode === 'cod'
                          ? 'border-[#C59A4E] bg-[#1A1817] text-[#FAF7F2]'
                          : 'border-[#EFE8DC] text-[#504440]'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C59A4E] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#121110] hover:bg-[#E5C378] transition-colors cursor-pointer"
                  >
                    Place Order — {formatINR(total)}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer Totals */}
        {items.length > 0 && !orderConfirmed && (
          <div className="border-t border-[#EFE8DC] bg-[#F5EFE6] px-6 py-5 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#504440]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#504440]">
                <span>Insured Courier</span>
                <span className="tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : formatINR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#1A1817] pt-2 border-t border-[#EFE8DC]">
                <span>Total</span>
                <span className="tabular-nums">{formatINR(total)}</span>
              </div>
            </div>

            {!checkoutOpen && (
              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="w-full bg-[#1A1817] py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#FAF7F2] hover:bg-[#C59A4E] hover:text-[#121110] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
