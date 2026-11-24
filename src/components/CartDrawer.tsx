import { useEffect, useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import {
  EGYPT_GOVERNORATES,
  formatEgp,
  FREE_SHIPPING_THRESHOLD,
} from '../data/aquariums';

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  subtitle: string;
  dimensions: string;
  unitPriceEgp: number;
  quantity: number;
  image?: string;
}

export interface ConfirmedOrder {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  governorateName: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orders: ConfirmedOrder[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onCompleteOrder: (order: ConfirmedOrder) => void;
}

type DrawerView = 'cart' | 'checkout' | 'success' | 'orders';

const PAYMENT_METHODS = [
  { id: 'cod', label: 'الدفع كاش عند الاستلام' },
  { id: 'instapay', label: 'تحويل إنستا باي (InstaPay)' },
  { id: 'vodafone', label: 'محفظة فودافون كاش' },
];

export function CartDrawer({
  isOpen,
  onClose,
  items,
  orders,
  onUpdateQty,
  onRemoveItem,
  onCompleteOrder,
}: CartDrawerProps) {
  const [view, setView] = useState<DrawerView>('cart');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorateId, setGovernorateId] = useState('cairo');
  const [address, setAddress] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('cod');
  const [errorMsg, setErrorMsg] = useState('');
  const [latestOrder, setLatestOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && view === 'success' && !latestOrder) {
      setView('cart');
    }
  }, [isOpen, view, latestOrder]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPriceEgp * item.quantity,
    0
  );
  const selectedGov =
    EGYPT_GOVERNORATES.find((g) => g.id === governorateId) ??
    EGYPT_GOVERNORATES[0];
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee =
    items.length === 0 ? 0 : isFreeShipping ? 0 : selectedGov.shippingFee;
  const grandTotal = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = customerName.trim();
    const cleanPhone = phone.replace(/\s+/g, '');
    const cleanAddress = address.trim();

    if (cleanName.length < 3) {
      setErrorMsg('من فضلك اكتب اسمك بالكامل عشان نقدر نتواصل معاك.');
      return;
    }
    if (!/^01[0125][0-9]{8}$/.test(cleanPhone)) {
      setErrorMsg('اكتب رقم موبايل مصري صحيح مكون من ١١ رقم (مثال: 01012345678).');
      return;
    }
    if (cleanAddress.length < 8) {
      setErrorMsg('اكتب العنوان بالتفصيل (الشارع، رقم العمارة، والمنطقة).');
      return;
    }

    const paymentLabel =
      PAYMENT_METHODS.find((p) => p.id === paymentMethodId)?.label ??
      PAYMENT_METHODS[0].label;

    const order: ConfirmedOrder = {
      orderNumber: `MRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      customerName: cleanName,
      phone: cleanPhone,
      governorateName: selectedGov.name,
      address: cleanAddress,
      paymentMethod: paymentLabel,
      items: [...items],
      subtotal,
      shippingFee,
      total: grandTotal,
    };

    setLatestOrder(order);
    onCompleteOrder(order);
    setView('success');
    setCustomerName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="سلة المشتريات وإتمام الطلب"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Slide-over drawer (on the left edge in RTL via justify-end) */}
      <div
        className="flex h-full w-full max-w-lg flex-col border-r border-white/12 bg-[#0B0F15] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-white">
              {view === 'cart' && 'سلة المشتريات'}
              {view === 'checkout' && 'بيانات التوصيل'}
              {view === 'success' && 'تم تأكيد طلبك'}
              {view === 'orders' && 'طلباتي السابقة'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {orders.length > 0 && view !== 'orders' && (
              <button
                type="button"
                onClick={() => setView('orders')}
                className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-base text-white/80 transition-colors hover:border-white/35 hover:text-white"
              >
                <ClipboardList className="h-4 w-4" />
                <span>طلباتي ({orders.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق السلة"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* VIEW 1: CART */}
          {view === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-white/25" />
                  <p className="mb-2 text-2xl font-bold text-white">
                    السلة فاضية حالياً
                  </p>
                  <p className="mb-7 max-w-xs text-lg text-white/60">
                    اختار الحوض المناسب لبيتك أو صمّم مقاسك الخاص وهنوصلهولك
                    لحد الباب.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-lg bg-white px-6 py-3 text-lg font-bold text-black transition-transform hover:scale-105"
                  >
                    اتفرج على الأحواض
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Free Shipping Status */}
                  <div className="rounded-xl border border-white/10 bg-[#111722] p-4">
                    <div className="mb-2 flex items-center gap-2 text-base text-white/85">
                      <Truck className="h-4 w-4 text-teal-400" />
                      {isFreeShipping ? (
                        <span className="font-bold text-teal-300">
                          مبروك! طلبك مؤهل للشحن المجاني لكل المحافظات
                        </span>
                      ) : (
                        <span>
                          فاضل{' '}
                          <strong className="tabular-egp text-white">
                            {formatEgp(remainingForFreeShipping)}
                          </strong>{' '}
                          وتاخد شحن مجاني!
                        </span>
                      )}
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-teal-400 transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Cart Item Rows */}
                  {items.map((item) => (
                    <div
                      key={item.key}
                      className="rounded-xl border border-white/10 bg-[#111722] p-4"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {item.name}
                          </h3>
                          <p className="text-base text-white/60">
                            {item.subtitle} · {item.dimensions}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`حذف ${item.name}`}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/10 hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg border border-white/12 bg-[#0B0F15] p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="تقليل الكمية"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-white hover:bg-white/10"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="tabular-egp min-w-6 text-center text-lg font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="زيادة الكمية"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-white hover:bg-white/10"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="tabular-egp text-xl font-bold text-white">
                          {formatEgp(item.unitPriceEgp * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* VIEW 2: EGYPTIAN CHECKOUT FORM */}
          {view === 'checkout' && (
            <form
              id="egypt-checkout-form"
              onSubmit={handleCheckoutSubmit}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="co-name"
                  className="mb-2 block text-lg font-bold text-white"
                >
                  الاسم بالكامل
                </label>
                <input
                  id="co-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: أحمد محمود السيد"
                  className="min-h-[48px] w-full rounded-xl border border-white/15 bg-[#111722] px-4 py-3 text-lg text-white placeholder:text-white/35 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="co-phone"
                  className="mb-2 block text-lg font-bold text-white"
                >
                  رقم الموبايل (واتساب / اتصال)
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  required
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="tabular-egp min-h-[48px] w-full rounded-xl border border-white/15 bg-[#111722] px-4 py-3 text-right text-lg text-white placeholder:text-white/35 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="co-gov"
                  className="mb-2 block text-lg font-bold text-white"
                >
                  المحافظة
                </label>
                <select
                  id="co-gov"
                  value={governorateId}
                  onChange={(e) => setGovernorateId(e.target.value)}
                  className="min-h-[48px] w-full cursor-pointer rounded-xl border border-white/15 bg-[#111722] px-4 py-3 text-lg text-white focus:border-teal-400 focus:outline-none"
                >
                  {EGYPT_GOVERNORATES.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.name} — {gov.deliveryDays} (
                      {isFreeShipping ? 'شحن مجاني' : formatEgp(gov.shippingFee)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="co-address"
                  className="mb-2 block text-lg font-bold text-white"
                >
                  العنوان بالتفصيل
                </label>
                <textarea
                  id="co-address"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="الحي / المنطقة، اسم الشارع، رقم العمارة والدور..."
                  className="w-full rounded-xl border border-white/15 bg-[#111722] px-4 py-3 text-lg text-white placeholder:text-white/35 focus:border-teal-400 focus:outline-none"
                />
              </div>

              <div>
                <p className="mb-2.5 text-lg font-bold text-white">
                  طريقة الدفع
                </p>
                <div className="space-y-2.5">
                  {PAYMENT_METHODS.map((pm) => {
                    const active = paymentMethodId === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethodId(pm.id)}
                        className={`flex min-h-[48px] w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-right text-lg transition-colors ${
                          active
                            ? 'border-teal-400 bg-teal-400/12 font-bold text-white'
                            : 'border-white/12 bg-[#111722] text-white/75 hover:border-white/30'
                        }`}
                      >
                        <span>{pm.label}</span>
                        <span
                          className={`h-4 w-4 rounded-full border-2 ${
                            active
                              ? 'border-teal-400 bg-teal-400'
                              : 'border-white/30'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-base text-rose-200"
                >
                  {errorMsg}
                </p>
              )}
            </form>
          )}

          {/* VIEW 3: ORDER CONFIRMED RECEIPT */}
          {view === 'success' && latestOrder && (
            <div className="space-y-6 py-4">
              <div className="rounded-2xl border border-teal-400/30 bg-teal-400/10 p-6 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-teal-300" />
                <h3 className="mb-1 text-3xl font-bold text-white">
                  طلبك اتأكد يا {latestOrder.customerName.split(' ')[0]}!
                </h3>
                <p className="tabular-egp text-lg text-teal-200">
                  رقم الطلب: #{latestOrder.orderNumber}
                </p>
                <p className="mt-2 text-base text-white/75">
                  فريق المرجان هيكلمك خلال ساعتين لتأكيد معاد التوصيل والتركيب.
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-white/10 bg-[#111722] p-5 text-lg">
                <div className="flex justify-between">
                  <span className="text-white/55">المحافظة</span>
                  <span className="text-white">{latestOrder.governorateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">الموبايل</span>
                  <span className="tabular-egp text-white">
                    {latestOrder.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">طريقة الدفع</span>
                  <span className="text-white">{latestOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3 font-bold">
                  <span className="text-white">الإجمالي المطلوب</span>
                  <span className="tabular-egp text-teal-300">
                    {formatEgp(latestOrder.total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setView('cart');
                  onClose();
                }}
                className="flex min-h-[50px] w-full cursor-pointer items-center justify-center rounded-xl bg-white px-6 py-3 text-xl font-bold text-black hover:bg-teal-50"
              >
                رجوع للمعرض
              </button>
            </div>
          )}

          {/* VIEW 4: PAST ORDERS */}
          {view === 'orders' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setView('cart')}
                className="cursor-pointer text-lg text-teal-300 underline-offset-4 hover:underline"
              >
                ← رجوع لسلة المشتريات
              </button>

              {orders.map((ord) => (
                <div
                  key={ord.orderNumber}
                  className="rounded-xl border border-white/12 bg-[#111722] p-5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="tabular-egp text-lg font-bold text-teal-300">
                      #{ord.orderNumber}
                    </span>
                    <span className="text-sm text-white/55">
                      {ord.createdAt}
                    </span>
                  </div>
                  <p className="mb-2 text-lg font-bold text-white">
                    {ord.customerName} · {ord.governorateName}
                  </p>
                  <ul className="mb-3 space-y-1 text-base text-white/70">
                    {ord.items.map((it) => (
                      <li key={it.key}>
                        {it.name} (×{it.quantity})
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base">
                    <span className="text-white/60">{ord.paymentMethod}</span>
                    <span className="tabular-egp text-lg font-bold text-white">
                      {formatEgp(ord.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Drawer Footer for Cart & Checkout */}
        {(view === 'cart' || view === 'checkout') && items.length > 0 && (
          <div className="border-t border-white/10 bg-[#080C11] px-6 py-5">
            <div className="mb-4 space-y-2 text-lg">
              <div className="flex justify-between text-white/70">
                <span>المجموع الفرعي</span>
                <span className="tabular-egp">{formatEgp(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>الشحن ({selectedGov.name})</span>
                <span className="tabular-egp text-teal-300">
                  {shippingFee === 0 ? 'مجاني' : formatEgp(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2.5 text-2xl font-bold text-white">
                <span>الإجمالي</span>
                <span className="tabular-egp">{formatEgp(grandTotal)}</span>
              </div>
            </div>

            {view === 'cart' ? (
              <button
                type="button"
                onClick={() => setView('checkout')}
                className="flex min-h-[52px] w-full cursor-pointer items-center justify-center rounded-xl bg-white px-6 py-3 text-xl font-bold text-black transition-transform hover:bg-teal-50 active:scale-[0.99]"
              >
                كمل بيانات التوصيل
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setView('cart')}
                  className="min-h-[52px] cursor-pointer rounded-xl border border-white/15 px-5 py-3 text-lg font-bold text-white hover:bg-white/5"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  form="egypt-checkout-form"
                  className="flex min-h-[52px] flex-1 cursor-pointer items-center justify-center rounded-xl bg-white px-6 py-3 text-xl font-bold text-black transition-transform hover:bg-teal-50 active:scale-[0.99]"
                >
                  تأكيد الطلب — {formatEgp(grandTotal)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
