import { useState } from 'react';
import { Waves } from 'lucide-react';
import type { AquariumProduct } from '../data/aquariums';

interface AquariumMediaProps {
  product: AquariumProduct;
  className?: string;
}

export function AquariumMedia({ product, className = '' }: AquariumMediaProps) {
  const [imgError, setImgError] = useState(false);

  if (product.image && !imgError && !product.isBespokeVisual) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-[#0E131A] ${className}`}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // Bespoke Marine Reef Studio Artwork / Zero-Broken-Image Fallback
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0C1824] via-[#09121B] to-[#06090D] p-6 ${className}`}
    >
      {/* Subtle studio overhead marine beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl"
      />
      <div className="relative flex w-full max-w-[280px] flex-col items-center">
        {/* Suspended slim LED bar */}
        <div className="mb-3 flex flex-col items-center">
          <div className="flex w-36 justify-between px-4">
            <span className="h-5 w-px bg-white/25" />
            <span className="h-5 w-px bg-white/25" />
          </div>
          <div className="h-1.5 w-44 rounded-full bg-slate-800 shadow-[0_6px_24px_rgba(56,189,248,0.55)] ring-1 ring-white/20" />
        </div>

        {/* Rimless marine glass tank */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-cyan-200/30 bg-gradient-to-b from-cyan-950/65 via-[#072235]/80 to-[#04101B] shadow-2xl">
          {/* Water surface shimmer */}
          <div className="absolute inset-x-0 top-2 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

          {/* Coral & reef silhouettes */}
          <svg
            viewBox="0 0 280 175"
            className="h-full w-full"
            aria-label={product.name}
            role="img"
          >
            <defs>
              <linearGradient id="reefGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#082F49" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="280" height="175" fill="url(#reefGlow)" />
            {/* Sand bed */}
            <path
              d="M0 148 Q70 138 140 146 T280 144 L280 175 L0 175 Z"
              fill="#1E293B"
            />
            {/* Reef rockwork */}
            <path
              d="M28 152 Q52 104 92 118 Q112 96 136 122 L156 152 Z"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <path
              d="M158 152 Q184 96 218 112 Q242 98 258 152 Z"
              fill="#111C2E"
              stroke="#2DD4BF"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
            {/* Subtle luminous corals */}
            <circle cx="88" cy="112" r="10" fill="#FB923C" fillOpacity="0.45" />
            <circle cx="104" cy="116" r="7" fill="#F472B6" fillOpacity="0.38" />
            <circle cx="204" cy="108" r="11" fill="#2DD4BF" fillOpacity="0.42" />
            <circle cx="222" cy="116" r="8" fill="#38BDF8" fillOpacity="0.42" />
            {/* Graceful reef fish shapes */}
            <ellipse cx="144" cy="72" rx="10" ry="5" fill="#F97316" fillOpacity="0.88" />
            <polygon points="154,72 162,67 162,77" fill="#F97316" fillOpacity="0.88" />
            <rect x="142" y="67" width="3" height="10" fill="#FFFFFF" fillOpacity="0.85" />

            <ellipse cx="112" cy="88" rx="8" ry="4" fill="#38BDF8" fillOpacity="0.85" />
            <polygon points="104,88 97,84 97,92" fill="#FACC15" fillOpacity="0.85" />
          </svg>
        </div>

        {/* Minimalist obsidian cabinet plinth */}
        <div className="h-9 w-full border-x border-b border-white/10 bg-[#0A0E14] px-3 pt-2">
          <div className="flex items-center justify-between text-xs text-white/55">
            <span className="flex items-center gap-1.5">
              <Waves className="h-3.5 w-3.5 text-teal-400" />
              <span>منظومة مياه مالحة بصمب سفلي</span>
            </span>
            <span className="tabular-egp">{product.volumeLiters}L</span>
          </div>
        </div>
      </div>
    </div>
  );
}
