"use client";

import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

export default function About() {
  const pillars = [
    {
      title: "Desh Ka Solar",
      description: "Established in 2021 by Yash Gautam, powering homes and businesses across Madhya Pradesh.",
    },
    {
      title: "Custom Engineering",
      description: "Tailored solar designs for maximum solar yield, aesthetics, and long-term durability.",
    },
    {
      title: "Seamless Support",
      description: "Complete assistance from government subsidy approvals to regular system maintenance.",
    },
  ];

  return (
    <section
      id="why-luxsun"
      className="h-screen w-full snap-start relative flex flex-col justify-between overflow-hidden bg-zinc-950 text-white"
    >
      {/* Background Graphic or Subtle Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-zinc-900 to-black opacity-80" />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-grow pt-24 pb-12">
        {/* Left Column: Heading and Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <span className="text-xs uppercase tracking-widest text-brand-accent font-semibold">
            About Luxsun
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Building India's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              Sustainable Future
            </span>
          </h2>
          <p className="text-gray-300 font-light leading-relaxed max-w-lg">
            Luxsun Energy is pioneering clean energy access across India. We believe solar systems shouldn't just be functional—they should be beautifully integrated, high-performing, and financially transformative.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 mt-6 border-t border-white/10 pt-8">
            <div>
              <span className="text-3xl md:text-4xl font-semibold text-white">300+</span>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Clients Served</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-semibold text-white">2.5 MW+</span>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Installed</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-semibold text-white">99%</span>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">Uptime Rate</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Pillars list */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8 lg:pl-12"
        >
          {pillars.map((pillar, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xs font-semibold text-brand-accent">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2 uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer at the bottom of the snapping section */}
      <div className="relative z-10 w-full bg-black/40 border-t border-white/5 backdrop-blur-md">
        <Footer />
      </div>
    </section>
  );
}
