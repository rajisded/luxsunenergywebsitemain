"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
}

interface CtaItem {
  text: string;
  href: string;
  primary?: boolean;
}

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  bgImage: string;
  specs?: SpecItem[];
  ctas?: CtaItem[];
  showArrow?: boolean;
}

export default function ProductSection({
  id,
  title,
  subtitle,
  bgImage,
  specs = [],
  ctas = [],
  showArrow = false,
}: ProductSectionProps) {
  return (
    <section
      id={id}
      className="h-screen w-full snap-start relative flex flex-col justify-between items-center text-center px-6 pt-28 pb-12 overflow-hidden bg-black"
    >
      {/* Background Image with slight darkening gradient at top and bottom */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover opacity-90 transition-scale duration-10000 ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-gray-200 font-light tracking-wide">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Footer / Interactive Specs and CTA Buttons */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Specs Showcase */}
        {specs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full px-4"
          >
            {specs.map((spec, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-medium text-white tracking-tight">
                  {spec.label}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-300 font-medium mt-1">
                  {spec.value}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        {ctas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-6"
          >
            {ctas.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className={`w-full sm:w-56 py-3 px-8 text-xs font-semibold uppercase tracking-widest rounded-md transition-all duration-300 ${
                  cta.primary
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black/45 text-white backdrop-blur-md border border-white/20 hover:bg-white/10"
                }`}
              >
                {cta.text}
              </Link>
            ))}
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {showArrow && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-white opacity-80"
            >
              <ArrowDown size={24} className="stroke-[1.5]" />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
