import { useEffect, useState } from 'react';
import { ArrowLeft, Menu, ShoppingBag, X } from 'lucide-react';

interface HeroSectionProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'الأحواض', href: '#aquariums' },
  { label: 'تفصيل خاص', href: '#custom-tank' },
  { label: 'تواصل معانا', href: '#contact' },
];

export function HeroSection({ cartCount, onOpenCart }: HeroSectionProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleOpenCartFromMobile = () => {
    setMobileMenuOpen(false);
    onOpenCart();
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-black font-ruqaa"
    >
      {/* Fullscreen Looping Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover object-[70%_center]"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Measured contrast scrim: keeps right-side video & glowing water vibrant while ensuring crisp readability on the left text area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-transparent to-[#070A0E]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/35 to-transparent"
      />

      {/* Responsive Navbar (z-30) — 3-Zone Top Bar Contract */}
      <header className="relative z-30 flex items-center justify-between gap-8 px-6 py-5 md:px-12 lg:px-16">
        {/* Zone 1 & 2 (Start in RTL): Single-word Brand Mark + Desktop Links */}
        <div className="flex items-center gap-10">
          <a
            href="#home"
            className="whitespace-nowrap shrink-0 text-3xl font-bold tracking-normal text-white transition-opacity hover:opacity-90 sm:text-4xl"
          >
            المرجان
          </a>

          <nav
            aria-label="التنقل الرئيسي"
            className="hidden items-center gap-8 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 text-xl text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Zone 3 (End in RTL): Primary Desktop CTA (Shopping Cart) */}
        <div className="hidden items-center md:flex">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg bg-white px-5 py-2.5 text-lg font-bold text-black transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>السلة</span>
            {cartCount > 0 && (
              <span className="tabular-egp rounded bg-black px-2 py-0.5 text-sm font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Controls: Quick Cart + Animated Menu/X Toggle (44x44, z-50) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="فتح سلة المشتريات"
            className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="tabular-egp absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-400 px-1 text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            className="relative z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-white transition-transform active:scale-90"
          >
            <Menu
              className={`absolute h-7 w-7 transition-all duration-300 ${
                mobileMenuOpen
                  ? 'rotate-90 scale-75 opacity-0'
                  : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              className={`absolute h-7 w-7 transition-all duration-300 ${
                mobileMenuOpen
                  ? 'rotate-0 scale-100 opacity-100'
                  : '-rotate-90 scale-75 opacity-0'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu (z-20) */}
      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen
            ? 'h-screen opacity-100'
            : 'pointer-events-none h-0 opacity-0'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center gap-7 px-8 transition-all duration-500 delay-100 ${
            mobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-4xl font-bold text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleOpenCartFromMobile}
            className="mt-6 inline-flex w-fit cursor-pointer items-center gap-3 rounded-full bg-white px-8 py-4 text-xl font-bold text-black transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>افتح السلة ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Hero Content (z-10) — Positioned cleanly in the left negative space (mr-auto in RTL) so right-side water & fish stay unobstructed */}
      <div className="relative z-10 flex h-[calc(100vh-88px)] min-h-[580px] flex-col justify-between px-6 pt-10 pb-10 sm:pt-14 sm:pb-12 md:px-12 md:pt-16 md:pb-16 lg:px-16">
        {/* Top Section (left empty space on desktop) */}
        <div className="w-full md:mr-auto md:max-w-[46%] lg:max-w-[44%]">
          <p className="mb-5 animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-lg text-white/90 sm:mb-6 sm:text-xl">
            أحواض سمك زينة فاخرة · صناعة وتجهيز مصري · أسعار بالجنيه المصري
          </p>

          <h1
            className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-4xl leading-[1.4] font-bold text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            style={{ textWrap: 'balance' }}
          >
            جمال البحر الحي،
            <br />
            في قلب بيتك،
            <br />
            بأرقى تصميم مصري.
          </h1>
        </div>

        {/* Bottom Section (aligned cleanly below in the same left column) */}
        <div className="w-full md:mr-auto md:max-w-[46%] lg:max-w-[44%]">
          <p className="mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-xl leading-[1.85] text-white/80 sm:mb-7 sm:text-2xl">
            بنقدملك أحواض سمك زينة متكاملة بزجاج ألترا كلير نقي، إضاءة ذكية،
            وفلاتر هادية بتوصيل مؤمّن وتركيب لحد باب البيت في كل محافظات مصر.
          </p>

          <div className="animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            <a
              href="#aquariums"
              className="inline-flex min-h-[50px] items-center gap-3 whitespace-nowrap rounded-lg bg-white px-7 py-3.5 text-xl font-bold text-black transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
            >
              <span>اتفرج على الأحواض</span>
              <ArrowLeft className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
