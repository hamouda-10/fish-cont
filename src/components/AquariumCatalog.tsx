import { useMemo, useState } from 'react';
import { ArrowUpDown, Plus, Search } from 'lucide-react';
import {
  AQUARIUM_PRODUCTS,
  CATEGORY_TABS,
  formatEgp,
  type AquariumCategory,
  type AquariumProduct,
} from '../data/aquariums';
import { AquariumMedia } from './AquariumMedia';

interface AquariumCatalogProps {
  onSelectProduct: (product: AquariumProduct) => void;
  onQuickAdd: (product: AquariumProduct) => void;
}

type SortMode = 'featured' | 'price-asc' | 'price-desc' | 'volume-desc';

export function AquariumCatalog({
  onSelectProduct,
  onQuickAdd,
}: AquariumCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<AquariumCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortMode>('featured');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = AQUARIUM_PRODUCTS.filter((item) => {
      const matchesCat =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.dimensionsCm.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEgp - b.priceEgp;
      if (sortBy === 'price-desc') return b.priceEgp - a.priceEgp;
      if (sortBy === 'volume-desc') return b.volumeLiters - a.volumeLiters;
      return a.featuredRank - b.featuredRank;
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section
      id="aquariums"
      className="relative border-t border-white/10 bg-[#070A0E] px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-[1360px]">
        {/* Editorial Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-lg text-teal-300/90">
              معرض المرجان · أسعار شاملة الفلتر والإضاءة
            </p>
            <h2
              className="text-4xl leading-[1.35] font-bold text-white sm:text-5xl lg:text-6xl"
              style={{ textWrap: 'balance' }}
            >
              تشكيلة أحواض سمك الزينة
            </h2>
          </div>

          <p className="max-w-xl text-xl leading-[1.8] text-white/65">
            كل حوض متصنع بزجاج نقي ولصق سيليكون ألماني، وجاهز للتشغيل أول ما
            يوصلك لحد البيت.
          </p>
        </div>

        {/* Interactive Filter Tabs + Search + Sort Bar */}
        <div className="mb-12 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Segmented Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="تصنيفات الأحواض"
            className="flex flex-wrap items-center gap-2 rounded-xl bg-[#10151D] p-1.5"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[42px] cursor-pointer whitespace-nowrap shrink-0 rounded-lg px-5 py-2 text-lg font-bold transition-colors duration-200 ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-[240px] flex-1 sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 right-3.5 h-5 w-5 -translate-y-1/2 text-white/45" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="دور على حوض أو مقاس..."
                aria-label="ابحث في الأحواض"
                className="min-h-[46px] w-full rounded-lg border border-white/12 bg-[#10151D] py-2.5 pr-11 pl-4 text-lg text-white placeholder:text-white/40 focus:border-teal-400/60 focus:outline-none"
              />
            </div>

            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-white/50" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortMode)}
                aria-label="ترتيب الأحواض"
                className="min-h-[46px] w-full cursor-pointer appearance-none rounded-lg border border-white/12 bg-[#10151D] py-2.5 pr-10 pl-8 text-lg text-white focus:border-teal-400/60 focus:outline-none sm:w-auto"
              >
                <option value="featured">الأكثر طلباً</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="volume-desc">السعة: من الأكبر للأصغر</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#0E131A] px-6 py-16 text-center">
            <p className="mb-4 text-2xl font-bold text-white">
              مفيش أحواض مطابقة لبحثك دلوقتي
            </p>
            <p className="mb-7 text-lg text-white/60">
              جرب تمسح البحث أو تختار تصنيف تاني، أو اطلب حوض بمقاسك الخاص تحت.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="cursor-pointer rounded-lg bg-white px-6 py-3 text-lg font-bold text-black transition-transform hover:scale-105"
            >
              عرض كل الأحواض
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0E131A] transition-transform duration-200 hover:-translate-y-1 hover:border-white/20"
              >
                {/* Uniform 4:3 Product Photography */}
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  aria-label={`عرض تفاصيل ${product.name}`}
                  className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden text-right focus-visible:outline-2 focus-visible:outline-teal-400"
                >
                  <AquariumMedia product={product} />
                </button>

                {/* Card Body — Identical Field Order & Clean Unboxed Metadata */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Quiet unboxed metadata line with typographic separators */}
                    <div className="mb-2.5 flex flex-wrap items-center gap-2 text-base text-white/55">
                      <span>{product.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-egp">{product.volumeLiters} لتر</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.availability}</span>
                    </div>

                    {/* Product Title in Large Crisp Ruq'ah */}
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="mb-3 block cursor-pointer text-right text-3xl leading-[1.35] font-bold text-white transition-colors hover:text-teal-300"
                    >
                      {product.name}
                    </button>

                    <p className="mb-5 text-lg leading-[1.75] text-white/65">
                      {product.shortDesc}
                    </p>
                  </div>

                  {/* Aligned Price Baseline & Actions */}
                  <div className="border-t border-white/10 pt-5">
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <div>
                        <span className="block text-sm text-white/50">
                          السعر شامل الفلتر والإضاءة
                        </span>
                        <span className="tabular-egp text-2xl font-bold text-white">
                          {formatEgp(product.priceEgp)}
                        </span>
                      </div>
                      <span className="text-base text-white/55">
                        {product.dimensionsCm}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => onQuickAdd(product)}
                        className="inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-4 py-2.5 text-lg font-bold text-black transition-transform duration-200 hover:bg-teal-50 active:scale-[0.98]"
                      >
                        <Plus className="h-4 w-4" />
                        <span>أضف للسلة</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="inline-flex min-h-[46px] cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border border-white/15 bg-transparent px-4 py-2.5 text-lg font-bold text-white transition-colors hover:border-white/35 hover:bg-white/5"
                      >
                        التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
