import { Link } from 'react-router-dom'

const regions = [
  {
    name: 'Nigeria, Ghana & Senegal',
    label: 'WEST AFRICA',
    slug: 'west-africa',
    works: 842,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80&fit=crop'
  },
  {
    name: 'Kenya, Ethiopia & Tanzania',
    label: 'EAST AFRICA',
    slug: 'east-africa',
    works: 531,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80&fit=crop'
  },
  {
    name: 'South Africa, Zimbabwe & Mozambique',
    label: 'SOUTHERN AFRICA',
    slug: 'southern-africa',
    works: 394,
    image: 'https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=600&q=80&fit=crop'
  },
  {
    name: 'Congo, Cameroon & Chad',
    label: 'CENTRAL AFRICA',
    slug: 'central-africa',
    works: 278,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80&fit=crop'
  },
  {
    name: 'Morocco, Egypt & Tunisia',
    label: 'NORTH AFRICA',
    slug: 'north-africa',
    works: 356,
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80&fit=crop'
  }
];

const mediums = [
  { icon: '🎨', name: 'Traditional Paintings', slug: 'paintings' },
  { icon: '🗿', name: 'Bronze & Wood Sculpture', slug: 'sculpture' },
  { icon: '💻', name: 'Digital & Generative Art', slug: 'digital' },
  { icon: '🧵', name: 'Kente & Aso-Oke Textiles', slug: 'textiles' },
  { icon: '📷', name: 'Fine Art Photography', slug: 'photography' },
  { icon: '🏺', name: 'Ceramics & Pottery', slug: 'ceramics' },
  { icon: '✏️', name: 'Drawing & Illustration', slug: 'drawing' },
  { icon: '💍', name: 'Beadwork & Jewelry Art', slug: 'jewelry' }
];

export default function RegionSection() {
  return (
    <section className="py-24 bg-[#1C1915] font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#D4AF37] mb-4">
              EXPLORE THE CONTINENT
            </p>
            <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] font-normal text-white leading-tight">
              Discover by <span className="italic text-[#D4AF37]">Region & Medium</span>
            </h2>
          </div>

          <Link
            to="/browse?region=all"
            className="hidden md:flex items-center justify-center px-6 py-2.5 border border-white/20 rounded-full text-[13px] font-medium text-white/90 hover:bg-white/10 transition-all"
          >
            View Map →
          </Link>
        </div>

        {/* Region cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {regions.map((region) => (
            <Link
              key={region.label}
              to={`/browse?region=${region.slug}`}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group"
            >
              {/* Background Image */}
              <img
                src={region.image}
                alt={region.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay - Darker at bottom for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14120E] via-[#14120E]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card Content - Clustered at the bottom */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#D4AF37] mb-1.5">
                  {region.label}
                </p>

                <h3 className="font-serif text-[17px] text-white leading-[1.2] mb-2 pr-4">
                  {region.name}
                </h3>

                <p className="text-[11px] font-medium text-white/60">
                  {region.works} works available
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse by Medium */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/50 mb-6">
            BROWSE BY MEDIUM
          </p>

          <div className="flex flex-wrap gap-3">
            {mediums.map((medium) => (
              <Link
                key={medium.name}
                to={`/browse?category=${medium.slug}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-transparent text-[13px] text-white/80 hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <span className="text-[14px]">{medium.icon}</span>
                <span>{medium.name}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}