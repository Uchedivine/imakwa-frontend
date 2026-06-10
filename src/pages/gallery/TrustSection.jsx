const pillars = [
  {
    icon: '🔒',
    title: 'Certified Authenticity',
    description: 'Every work comes with a blockchain-anchored certificate of authenticity, verifiable provenance, and artist signature documentation.'
  },
  {
    icon: '✈️',
    title: 'White-Glove Shipping',
    description: 'Professional museum-grade packing, climate-controlled transport, and full insurance coverage to 90+ countries worldwide.'
  },
  {
    icon: '🤝',
    title: 'Artist-First Ethos',
    description: 'Artists receive 80% of every sale — the highest royalty structure in the premium art market. Imakwa exists to serve creators.'
  },
  {
    icon: '💰',
    title: 'Investment Grade',
    description: 'Our curators are Oxford-trained art historians. Every listed work is evaluated for cultural, historical, and investment significance.'
  }
];

export default function TrustSection() {
  return (
    <section className="py-24 bg-[#FCFBFA] font-sans">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C25E36] mb-4">
            WHY IMAKWA
          </p>
          <h2 className="font-serif text-[3.5rem] md:text-[4rem] font-normal text-[#1A1A1A] leading-tight mb-4">
            Collecting With <span className="italic text-[#C25E36]">Confidence</span>
          </h2>
          <p className="text-[15px] leading-[1.8] text-gray-500 max-w-2xl mx-auto">
            Every artwork on Imakwa is authenticated, provenance-verified, and protected. We are guardians of cultural heritage.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-[24px] p-8 lg:p-10 text-left shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col"
            >
              <div className="text-[32px] leading-none mb-6">
                {icon}
              </div>
              <h3 className="font-serif text-[20px] font-normal text-[#1A1A1A] leading-tight mb-4">
                {title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}