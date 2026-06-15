"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function QuotePageContent() {
  useEffect(() => {
    // Scan and load Tally embeds when component mounts
    const Tally = (window as any).Tally;
    if (Tally) {
      Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-zinc-950 text-gray-100 overflow-x-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-32 pb-24 flex-grow flex flex-col justify-center">
        {/* Back navigation */}
        <div className="mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-200">
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 relative z-10"
          >
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-amber-500/20 bg-amber-500/5 text-xs font-semibold tracking-widest uppercase text-brand-accent">
              <Sparkles size={12} />
              <span>Free Consultation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Get Your <span className="text-brand-accent">Solar</span> Quote
            </h1>
            
            <p className="text-gray-400 font-light leading-relaxed max-w-lg">
              Take the first step towards clean, sustainable energy. Tell us about your needs and our engineering team will design a custom solar system for your home or business.
            </p>

            {/* List of guarantees */}
            <div className="flex flex-col gap-4 mt-4">
              {[
                "Response within 24 hours guaranteed",
                "Custom system design and layout",
                "No obligations — 100% free consultation",
                "Government subsidy assistance & documentation",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-gray-300 font-light">
                  <ShieldCheck size={16} className="text-brand-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Card Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full"
          >
            <div className="w-full bg-white border border-zinc-200/80 rounded-xl p-4 md:p-6 shadow-2xl relative overflow-hidden min-h-[500px]">
              {/* Glowing top line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

              <iframe
                data-tally-src="https://tally.so/embed/9qryqY?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Luxsun Energy Quote Form"
                className="w-full border-0"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          const Tally = (window as any).Tally;
          if (Tally) {
            Tally.loadEmbeds();
          }
        }}
      />

      {/* Footer */}
      <div className="w-full relative z-10">
        <Footer />
      </div>
    </div>
  );
}
