import { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from 'lucide-react';
import {
  formatEgp,
  FREE_SHIPPING_THRESHOLD,
  type AquariumPackageOption,
  type AquariumProduct,
} from '../data/aquariums';
import { AquariumMedia } from './AquariumMedia';

interface ProductDetailModalProps {
  product: AquariumProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: AquariumProduct,
    selectedPackage: AquariumPackageOption,
    quantity: number
  ) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [selectedPkgId, setSelectedPkgId] = useState<'standard' | 'complete'>('standard');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedPkgId('standard');
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const selectedPackage =
    product.packages.find((p) => p.id === selectedPkgId) ?? product.packages[0];
  const unitPrice = product.priceEgp + selectedPackage.extraPrice;
  const lineTotal = unitPrice * quantity;
  const qualifiesFreeShipping = lineTotal >= FREE_SHIPPING_THRESHOLD;

  const handleConfirmAdd = () => {
    onAddToCart(product, selectedPackage, quantity);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0C1016] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-4 left-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-black/70 text-white transition-colors hover:bg-white hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Gallery + Technical Specs Column */}
          <div className="border-b border-white/10 p-6 lg:col-span-6 lg:border-b-0 lg:border-l lg:p-8">
            <div className="mb-6 aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
              <AquariumMedia product={product} />
            </div>

            <h3 className="mb-4 text-2xl font-bold text-white">
              إيه اللي بيجي مع الحوض؟
            </h3>
            <ul className="space-y-3">
              {product.includedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg leading-[1.7] text-white/75"
                >
                  <Check className="mt-1.5 h-4 w-4 shrink-0 text-teal-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-base">
              <div>
                <span className="block text-sm text-white/45">الأبعاد</span>
                <span className="text-lg font-bold text-white">
                  {product.dimensionsCm}
                </span>
              </div>
              <div>
                <span className="block text-sm text-white/45">السعة الفعلية</span>
                <span className="tabular-egp text-lg font-bold text-white">
                  {product.volumeLiters} لتر
                </span>
              </div>
              <div>
                <span className="block text-sm text-white/45">نوع الزجاج</span>
                <span className="text-lg text-white/85">{product.glassType}</span>
              </div>
              <div>
                <span className="block text-sm text-white/45">الضمان</span>
                <span className="text-lg text-white/85">{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module Column */}
          <div className="flex flex-col justify-between p-6 lg:col-span-6 lg:p-8">
            <div>
              <div className="mb-2 flex items-center gap-2 text-base text-white/55">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-teal-300">{product.availability}</span>
              </div>

              <h2
                id="pdp-modal-title"
                className="mb-3 text-4xl leading-[1.3] font-bold text-white"
              >
                {product.name}
              </h2>

              <p className="mb-6 text-xl leading-[1.8] text-white/70">
                {product.fullDesc}
              </p>

              {/* Package Selector */}
              <div className="mb-6">
                <p className="mb-3 text-lg font-bold text-white">
                  اختار باقة التجهيز:
                </p>
                <div className="space-y-3">
                  {product.packages.map((pkg) => {
                    const active = selectedPackage.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPkgId(pkg.id)}
                        className={`w-full cursor-pointer rounded-xl border p-4 text-right transition-colors ${
                          active
                            ? 'border-teal-400 bg-teal-400/10'
                            : 'border-white/12 bg-[#121821] hover:border-white/30'
                        }`}
                      >
                        <div className="mb-1 flex items-center justify-between gap-4">
                          <span className="text-xl font-bold text-white">
                            {pkg.label}
                          </span>
                          <span className="tabular-egp text-lg font-bold text-teal-300">
                            {pkg.extraPrice === 0
                              ? 'مشمولة في السعر'
                              : `+ ${formatEgp(pkg.extraPrice)}`}
                          </span>
                        </div>
                        <p className="text-base text-white/65">
                          {pkg.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price Summary & Buy Action */}
            <div className="border-t border-white/10 pt-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-sm text-white/50">
                    الإجمالي بالجنيه المصري
                  </span>
                  <span className="tabular-egp text-3xl font-bold text-white">
                    {formatEgp(lineTotal)}
                  </span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-[#121821] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="تقليل الكمية"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="tabular-egp min-w-8 text-center text-xl font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="زيادة الكمية"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmAdd}
                className="mb-4 flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-xl font-bold text-black transition-transform duration-200 hover:bg-teal-50 active:scale-[0.99]"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>أضف للسلة — {formatEgp(lineTotal)}</span>
              </button>

              <div className="flex flex-wrap items-center justify-between gap-3 text-base text-white/60">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-teal-400" />
                  <span>
                    {qualifiesFreeShipping
                      ? 'مبروك! شحن مجاني لحد باب بيتك'
                      : 'توصيل مؤمّن لجميع محافظات مصر'}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-teal-400" />
                  <span>دفع عند الاستلام أو إنستا باي</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
