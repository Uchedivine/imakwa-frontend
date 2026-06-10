import { useState } from 'react';

export default function InnerCircle() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-[#28211D] via-[#1B1D1C] to-[#18201D] font-sans">
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A373] mb-4">
          EXCLUSIVE ACCESS
        </p>

        {/* Title */}
        <div className="mb-6">
          <h2 className="font-serif text-[3.5rem] md:text-[4.5rem] font-normal text-white leading-[1.1]">
            Join the
          </h2>
          <h2 className="font-serif text-[3.5rem] md:text-[4.5rem] italic font-normal text-[#D4A373] leading-[1.1]">
            Inner Circle
          </h2>
        </div>

        {/* Description */}
        <p className="text-[14px] leading-[1.8] text-gray-400 mb-10 max-w-[540px] mx-auto">
          Get first access to new collections, private exhibition previews, artist studio visits, and collector-only acquisition opportunities — before anyone else.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-[13px] focus:outline-none focus:border-[#D4A373]/50 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#C25E36] text-white text-[13px] font-medium rounded-full hover:bg-[#A84F2D] transition-colors shadow-sm whitespace-nowrap"
          >
            Join Now
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-[11px] text-gray-500 leading-relaxed">
          No spam. Unsubscribe anytime. We respect your inbox as much as we respect the art.
        </p>

      </div>
    </section>
  );
}