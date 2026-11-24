import { MapPin, Phone, Clock } from 'lucide-react';

interface FooterProps {
  onOpenCart: () => void;
}

export function Footer({ onOpenCart }: FooterProps) {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-[#05070A] px-6 py-16 md:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-3">
          {/* Brand Column */}
          <div>
            <a
              href="#home"
              className="mb-4 inline-block text-4xl font-bold text-white"
            >
              المرجان
            </a>
            <p className="max-w-sm text-lg leading-[1.85] text-white/60">
              متجر وورشة مصرية متخصصة في تصنيع وتجهيز أحواض سمك الزينة النباتية
              والبحرية والمنزلية بأعلى جودة زجاج وسيليكون ألماني.
            </p>
          </div>

          {/* Contact Details (Egyptian Showroom) */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">تواصل معانا</h3>
            <div className="space-y-3 text-lg text-white/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-teal-400" />
                <span>المعادي، شارع ٩ — القاهرة، مصر (توصيل لكل المحافظات)</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-teal-400" />
                <span dir="ltr" className="tabular-egp">
                  010 2480 9915
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-teal-400" />
                <span>يومياً من ١١ صباحاً لـ ١٠ مساءً</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">روابط سريعة</h3>
            <ul className="space-y-2.5 text-lg text-white/70">
              <li>
                <a href="#home" className="transition-colors hover:text-white">
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#aquariums"
                  className="transition-colors hover:text-white"
                >
                  معرض الأحواض
                </a>
              </li>
              <li>
                <a
                  href="#custom-tank"
                  className="transition-colors hover:text-white"
                >
                  احسب سعر حوض تفصيل
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="cursor-pointer transition-colors hover:text-white"
                >
                  افتح سلة المشتريات
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-base text-white/50 sm:flex-row">
          <p>© ٢٠٢٦ المرجان لأحواض سمك الزينة — جميع الحقوق محفوظة.</p>
          <p>الأسعار بالجنيه المصري (ج.م) · دفع عند الاستلام أو إنستا باي</p>
        </div>
      </div>
    </footer>
  );
}
