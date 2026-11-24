import { useMemo, useState } from 'react';
import { Check, Plus, Ruler } from 'lucide-react';
import { CLIENT_REVIEWS, formatEgp } from '../data/aquariums';

export interface CustomTankOrderSpec {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  systemType: 'freshwater' | 'planted' | 'marine';
  systemLabel: string;
  includeCabinet: boolean;
  volumeLiters: number;
  glassThicknessMm: number;
  estimatedPriceEgp: number;
}

interface CustomTankSectionProps {
  onAddCustomTank: (spec: CustomTankOrderSpec) => void;
}

const SYSTEM_OPTIONS: {
  id: 'freshwater' | 'planted' | 'marine';
  label: string;
  desc: string;
  multiplier: number;
}[] = [
  {
    id: 'freshwater',
    label: 'مياه عذبة',
    desc: 'فلتر خارجي + إضاءة ليد + سخان',
    multiplier: 34,
  },
  {
    id: 'planted',
    label: 'نباتي مزروع',
    desc: 'إضاءة نباتات RGB + تربة زراعية + فلتر',
    multiplier: 46,
  },
  {
    id: 'marine',
    label: 'بحري مالح',
    desc: 'صمب سفلي + بروتين سكيمر + إضاءة شعاب',
    multiplier: 68,
  },
];

export function CustomTankSection({ onAddCustomTank }: CustomTankSectionProps) {
  const [lengthCm, setLengthCm] = useState(120);
  const [widthCm, setWidthCm] = useState(45);
  const [heightCm, setHeightCm] = useState(50);
  const [systemType, setSystemType] = useState<'freshwater' | 'planted' | 'marine'>('planted');
  const [includeCabinet, setIncludeCabinet] = useState(true);
  const [addedNotice, setAddedNotice] = useState(false);

  const calculation = useMemo(() => {
    const volumeLiters = Math.round((lengthCm * widthCm * heightCm) / 1000);
    const glassThicknessMm =
      heightCm >= 60 || volumeLiters >= 350
        ? 12
        : heightCm >= 45 || volumeLiters >= 160
          ? 10
          : 8;

    const system =
      SYSTEM_OPTIONS.find((s) => s.id === systemType) ?? SYSTEM_OPTIONS[0];

    const tankAndSystemBase = Math.max(2600, volumeLiters * system.multiplier);
    const cabinetCost = includeCabinet ? Math.round(lengthCm * 38 + 1400) : 0;
    const rawTotal = tankAndSystemBase + cabinetCost;
    const estimatedPriceEgp = Math.round(rawTotal / 50) * 50;

    return {
      volumeLiters,
      glassThicknessMm,
      systemLabel: system.label,
      estimatedPriceEgp,
    };
  }, [lengthCm, widthCm, heightCm, systemType, includeCabinet]);

  const handleAddCustom = () => {
    onAddCustomTank({
      lengthCm,
      widthCm,
      heightCm,
      systemType,
      systemLabel: calculation.systemLabel,
      includeCabinet,
      volumeLiters: calculation.volumeLiters,
      glassThicknessMm: calculation.glassThicknessMm,
      estimatedPriceEgp: calculation.estimatedPriceEgp,
    });
    setAddedNotice(true);
    window.setTimeout(() => setAddedNotice(false), 2600);
  };

  return (
    <section
      id="custom-tank"
      className="border-t border-white/10 bg-[#0A0E14] px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* 2-Column Balanced Split: Egyptian Craftsmanship + Interactive Custom Estimator */}
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          {/* Right Column (Start in RTL): Story, Quantitative Guarantees & Proof */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="mb-3 text-lg text-teal-300/90">
                تفصيل خاص وجودة مصرية مضمونة
              </p>
              <h2
                className="mb-6 text-4xl leading-[1.35] font-bold text-white sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                عايز حوض بمقاس حيطتك أو مكتبك بالظبط؟
              </h2>
              <p className="mb-10 text-xl leading-[1.85] text-white/70">
                في ورشة المرجان بالقاهرة بنقص الزجاج بالليزر ونقفله بسيليكون
                ألماني أصلي مقاوم للضغط، وبنسلمك الحوض راكب وشغّال في بيتك من
                غير أي تعب.
              </p>

              {/* Quantitative Rigor Strip */}
              <div className="mb-10 grid grid-cols-2 gap-6 border-y border-white/10 py-8">
                <div>
                  <span className="tabular-egp block text-3xl font-bold text-white">
                    +850
                  </span>
                  <span className="text-lg text-white/60">
                    حوض متسلّم في مصر خلال ٤ سنين
                  </span>
                </div>
                <div>
                  <span className="tabular-egp block text-3xl font-bold text-white">
                    ٢ إلى ٣ سنين
                  </span>
                  <span className="text-lg text-white/60">
                    ضمان فعلي على الزجاج والسيليكون
                  </span>
                </div>
                <div>
                  <span className="tabular-egp block text-3xl font-bold text-white">
                    ٢٤ - ٤٨ ساعة
                  </span>
                  <span className="text-lg text-white/60">
                    توصيل وتركيب داخل القاهرة والجيزة
                  </span>
                </div>
                <div>
                  <span className="tabular-egp block text-3xl font-bold text-white">
                    10,000 ج.م
                  </span>
                  <span className="text-lg text-white/60">
                    شحن مجاني لأي طلب فوق المبلغ ده
                  </span>
                </div>
              </div>
            </div>

            {/* Attributable Customer Proof Adjacent to Claim */}
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-white">
                كلام عملائنا بعد الاستلام
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {CLIENT_REVIEWS.map((review) => (
                  <blockquote
                    key={review.id}
                    className="rounded-xl border border-white/10 bg-[#0E131B] p-5"
                  >
                    <p className="mb-3 text-lg leading-[1.8] text-white/80">
                      «{review.quote}»
                    </p>
                    <footer className="flex flex-wrap items-center justify-between gap-2 text-base text-white/55">
                      <span className="font-bold text-white/90">
                        {review.name} · {review.roleAndCity}
                      </span>
                      <span className="text-teal-300/80">
                        {review.aquariumBought}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column (End in RTL): Interactive Custom Aquarium Calculator in EGP */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/12 bg-[#0E131B] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    احسب سعر حوضك التفصيل
                  </h3>
                  <p className="mt-1 text-lg text-white/60">
                    اختار الأبعاد والنظام وهتشوف السعر الفوري بالجنيه المصري
                  </p>
                </div>
                <Ruler className="h-7 w-7 shrink-0 text-teal-400" />
              </div>

              {/* Dimensions Sliders */}
              <div className="mb-7 space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between text-lg">
                    <label htmlFor="custom-length" className="text-white/85">
                      الطول
                    </label>
                    <span className="tabular-egp font-bold text-teal-300">
                      {lengthCm} سم
                    </span>
                  </div>
                  <input
                    id="custom-length"
                    type="range"
                    min={50}
                    max={200}
                    step={5}
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-teal-400"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-lg">
                    <label htmlFor="custom-width" className="text-white/85">
                      العرض (العمق)
                    </label>
                    <span className="tabular-egp font-bold text-teal-300">
                      {widthCm} سم
                    </span>
                  </div>
                  <input
                    id="custom-width"
                    type="range"
                    min={30}
                    max={70}
                    step={5}
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-teal-400"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-lg">
                    <label htmlFor="custom-height" className="text-white/85">
                      الارتفاع
                    </label>
                    <span className="tabular-egp font-bold text-teal-300">
                      {heightCm} سم
                    </span>
                  </div>
                  <input
                    id="custom-height"
                    type="range"
                    min={35}
                    max={70}
                    step={5}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/15 accent-teal-400"
                  />
                </div>
              </div>

              {/* System Type Choice */}
              <div className="mb-6">
                <p className="mb-3 text-lg font-bold text-white">
                  نوع تشغيل الحوض:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {SYSTEM_OPTIONS.map((opt) => {
                    const active = systemType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSystemType(opt.id)}
                        className={`cursor-pointer rounded-xl border p-3.5 text-right transition-colors ${
                          active
                            ? 'border-teal-400 bg-teal-400/12 text-white'
                            : 'border-white/12 bg-[#131924] text-white/75 hover:border-white/30'
                        }`}
                      >
                        <span className="block text-xl font-bold text-white">
                          {opt.label}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/60">
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cabinet Toggle */}
              <label className="mb-8 flex cursor-pointer items-center justify-between rounded-xl border border-white/12 bg-[#131924] px-5 py-4">
                <div>
                  <span className="block text-xl font-bold text-white">
                    إضافة كابينة خشب مقاوم للرطوبة
                  </span>
                  <span className="text-base text-white/60">
                    متاح أسود مطفي، رمادي فحمي، أو خشب زان طبيعي
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={includeCabinet}
                  onChange={(e) => setIncludeCabinet(e.target.checked)}
                  className="h-6 w-6 cursor-pointer accent-teal-400"
                />
              </label>
            </div>

            {/* Live EGP Result & Direct Add to Cart */}
            <div className="border-t border-white/10 pt-6">
              <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-[#090D12] p-4 text-center">
                <div>
                  <span className="block text-sm text-white/50">السعة</span>
                  <span className="tabular-egp text-xl font-bold text-white">
                    {calculation.volumeLiters} لتر
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-white/50">سمك الزجاج</span>
                  <span className="tabular-egp text-xl font-bold text-white">
                    {calculation.glassThicknessMm} مم
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-white/50">السعر التقديري</span>
                  <span className="tabular-egp text-xl font-bold text-teal-300">
                    {formatEgp(calculation.estimatedPriceEgp)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddCustom}
                className="flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-xl font-bold text-black transition-transform duration-200 hover:bg-teal-50 active:scale-[0.99]"
              >
                {addedNotice ? (
                  <>
                    <Check className="h-5 w-5 text-emerald-700" />
                    <span>اتضاف مقاسك الخاص للسلة!</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span>
                      أضف الحوض التفصيل للسلة —{' '}
                      {formatEgp(calculation.estimatedPriceEgp)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
