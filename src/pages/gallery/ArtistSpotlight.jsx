import React from 'react';

const artworks = [
  {
    id: 1,
    title: 'Ancestral Echoes',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1578926288207-a90a5366a2b6?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    title: "The Elder's Gaze",
    price: 4200,
    image: 'https://images.unsplash.com/photo-1561059488-916d69792237?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Orún Rising',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Lagos at Twilight',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Iyawo',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=400&fit=crop'
  }
];

const tags = [
  { prefix: 'NG', label: 'Lagos, Nigeria' },
  { label: 'Oil on Canvas' },
  { label: 'Afrofuturism' },
  { label: 'Mixed Media' }
];

export default function ArtistSpotlight() {
  return (
    <section className="py-24 bg-[#F8F6F3] font-sans">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C25E36] mb-3">
              ARTIST OF THE MONTH
            </p>
            <h2 className="font-serif text-[3.5rem] md:text-[4.5rem] font-normal text-[#1A1A1A] leading-none">
              The <span className="italic text-[#C25E36]">Spotlight</span>
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-[#1A1A1A]/20 rounded-full text-[13px] font-medium text-[#1A1A1A] hover:bg-white transition-all">
            See All Artists →
          </button>
        </div>

        {/* Main content layout using flex for strict sizing */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left: Artist photo (Strict Width & Aspect Ratio) */}
          <div className="w-full lg:w-[400px] shrink-0 relative mx-auto lg:mx-0 pl-4 lg:pl-6">

            {/* Offset Background Blob (Positioned down and right) */}
            <div className="absolute top-6 left-10 w-[95%] h-full bg-[#F3E8E3] rounded-[24px] z-0"></div>

            {/* Main Image Container */}
            <div className="relative z-10 w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&fit=crop"
                alt="Kola Bankole"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Award badge */}
            <div className="absolute top-8 -left-4 lg:-left-6 z-20 bg-white rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] px-4 py-3.5 flex items-center gap-3 w-max pr-6">
              <span className="text-xl leading-none">🏆</span>
              <div className="flex flex-col pt-0.5">
                <p className="text-[12px] font-bold text-[#1A1A1A] leading-tight mb-0.5">
                  Dak'Art Biennale 2024
                </p>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                  Grand Prize Winner
                </p>
              </div>
            </div>
          </div>

          {/* Right: Artist info */}
          <div className="flex-1 pt-2 lg:pt-6 min-w-0">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C25E36] mb-4">
              FEATURED ARTIST
            </p>

            <h3 className="font-serif text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-normal text-[#1A1A1A] leading-none mb-6">
              Kola Bankole
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 rounded-full bg-[#F5EAE6] text-[#C25E36] text-[11px] font-semibold tracking-wide flex items-center gap-1.5"
                >
                  {tag.prefix && <span className="text-[9px] opacity-60 font-bold uppercase">{tag.prefix}</span>}
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-4 mb-10 text-[14.5px] leading-[1.8] text-[#5A5A5A] max-w-[600px]">
              <p>
                Born in Abeokuta in 1988, Kola Bankole is one of the most compelling voices in contemporary African painting. His work weaves Yoruba cosmology with Afrofuturist imagination — ancient myths rendered in bold, saturated strokes that command attention from across any gallery floor.
              </p>
              <p>
                A graduate of the Yaba College of Technology and a 2024 Dak'Art Grand Prize winner, Kola has exhibited across Lagos, London, and São Paulo. His practice asks: what does it mean to carry the past into an unwritten future?
              </p>
            </div>

            {/* CTA */}
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#C25E36] text-white text-[13px] font-medium rounded-full hover:bg-[#A84F2D] transition-colors shadow-sm mb-14">
              View Full Portfolio →
            </button>

            {/* Latest works */}
            <div className="max-w-[600px]">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-5">
                LATEST LISTED WORKS
              </p>

              {/* Artwork Cards Carousel */}
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                {artworks.map(work => (
                  <div
                    key={work.id}
                    className="flex-shrink-0 w-[130px] bg-white p-2 rounded-[16px] shadow-sm cursor-pointer group hover:shadow-md transition-all"
                  >
                    <div className="rounded-[12px] overflow-hidden aspect-square mb-2.5 bg-gray-100">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-1 pb-1">
                      <p className="font-serif text-[13px] text-[#1A1A1A] leading-tight mb-1 truncate">
                        {work.title}
                      </p>
                      <p className="text-[12px] text-[#C25E36] font-semibold">
                        ${work.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="flex items-center gap-1.5 mt-2 pl-2">
                <div className="h-[3px] w-6 bg-[#C25E36] rounded-full"></div>
                <div className="h-[3px] w-4 bg-[#E8E2DE] rounded-full"></div>
                <div className="h-[3px] w-4 bg-[#E8E2DE] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}