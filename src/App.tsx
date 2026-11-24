import { useEffect, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { AquariumCatalog } from './components/AquariumCatalog';
import {
  CartDrawer,
  type CartItem,
  type ConfirmedOrder,
} from './components/CartDrawer';
import {
  CustomTankSection,
  type CustomTankOrderSpec,
} from './components/CustomTankSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import type {
  AquariumPackageOption,
  AquariumProduct,
} from './data/aquariums';

const CART_STORAGE_KEY = 'almorjan_cart_v1';
const ORDERS_STORAGE_KEY = 'almorjan_orders_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<ConfirmedOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ConfirmedOrder[]) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] =
    useState<AquariumProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const addItemToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === newItem.key);
      if (existing) {
        return prev.map((i) =>
          i.key === newItem.key
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
    showToast(`اتضاف "${newItem.name}" لسلة المشتريات`);
  };

  const handleQuickAdd = (product: AquariumProduct) => {
    const basePkg = product.packages[0];
    addItemToCart({
      key: `${product.id}-${basePkg.id}`,
      productId: product.id,
      name: product.name,
      subtitle: basePkg.label,
      dimensions: product.dimensionsCm,
      unitPriceEgp: product.priceEgp + basePkg.extraPrice,
      quantity: 1,
      image: product.image,
    });
  };

  const handleAddFromModal = (
    product: AquariumProduct,
    selectedPackage: AquariumPackageOption,
    quantity: number
  ) => {
    addItemToCart({
      key: `${product.id}-${selectedPackage.id}`,
      productId: product.id,
      name: product.name,
      subtitle: selectedPackage.label,
      dimensions: product.dimensionsCm,
      unitPriceEgp: product.priceEgp + selectedPackage.extraPrice,
      quantity,
      image: product.image,
    });
  };

  const handleAddCustomTank = (spec: CustomTankOrderSpec) => {
    const dimText = `${spec.lengthCm} × ${spec.widthCm} × ${spec.heightCm} سم`;
    const cabText = spec.includeCabinet ? 'مع كابينة خشب' : 'زجاج ونظام فقط';
    addItemToCart({
      key: `custom-${spec.lengthCm}-${spec.widthCm}-${spec.heightCm}-${spec.systemType}-${spec.includeCabinet ? 'cab' : 'nocab'}`,
      productId: 'custom-tank',
      name: `حوض تفصيل خاص (${spec.systemLabel})`,
      subtitle: `${cabText} · ${spec.volumeLiters} لتر · زجاج ${spec.glassThicknessMm} مم`,
      dimensions: dimText,
      unitPriceEgp: spec.estimatedPriceEgp,
      quantity: 1,
    });
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleCompleteOrder = (order: ConfirmedOrder) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-[#070A0E] font-ruqaa text-[#F4F6F8]">
      {/* Section 1: Fullscreen Looping Video Hero & Responsive Navbar */}
      <HeroSection
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Section 2: Featured Egyptian Aquarium Catalog */}
      <main>
        <AquariumCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Section 3: Craftsmanship, Client Proof & Custom Tank Price Calculator */}
        <CustomTankSection onAddCustomTank={handleAddCustomTank} />
      </main>

      {/* Section 4: Footer */}
      <Footer onOpenCart={() => setCartOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddFromModal}
      />

      {/* Slide-over Cart & Egyptian Checkout Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        orders={orders}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Subtle Add-to-Cart Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-6 bottom-6 left-6 z-40 mx-auto flex max-w-md items-center justify-between gap-4 rounded-xl border border-teal-400/30 bg-[#0E151E]/95 px-5 py-3.5 text-lg text-white shadow-2xl backdrop-blur-md sm:right-auto sm:left-8 sm:mx-0"
        >
          <span className="flex items-center gap-2.5">
            <Check className="h-5 w-5 shrink-0 text-teal-400" />
            <span>{toastMessage}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-base font-bold text-black hover:bg-teal-50"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>عرض السلة</span>
          </button>
        </div>
      )}
    </div>
  );
}
