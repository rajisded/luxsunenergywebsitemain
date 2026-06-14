"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Send, CheckCircle, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function QuotePageContent() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Residential",
    requirement: "On-Grid System",
    urgency: "Immediate",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    if (e.target.name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      e.target.value = cleaned;
      value = cleaned;
    } else if (e.target.name === "email") {
      const cleaned = value.toLowerCase().replace(/\s+/g, "");
      e.target.value = cleaned;
      value = cleaned;
    }

    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    // Validate Indian phone number
    const validateIndianPhone = (phone: string): boolean => {
      const cleaned = phone.replace(/[^\d+]/g, "");
      if (cleaned.startsWith("+91")) {
        return /^[6-9]\d{9}$/.test(cleaned.slice(3));
      }
      if (cleaned.length === 10) {
        return /^[6-9]\d{9}$/.test(cleaned);
      }
      if (cleaned.length === 11 && cleaned.startsWith("0")) {
        return /^[6-9]\d{9}$/.test(cleaned.slice(1));
      }
      if (cleaned.length === 12 && cleaned.startsWith("91")) {
        return /^[6-9]\d{9}$/.test(cleaned.slice(2));
      }
      return false;
    };

    if (!validateIndianPhone(formData.phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

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
            className="relative z-10"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full bg-zinc-900/40 border border-white/10 rounded-xl p-8 md:p-12 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center gap-6"
                >
                  <CheckCircle size={64} className="text-emerald-500" />
                  <h2 className="text-2xl font-bold text-white tracking-tight">Quote Request Received!</h2>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Thank you, {formData.name}. Our solar experts will review your requirements and reach out to you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 justify-center">
                    <button
                      onClick={() => setStatus("idle")}
                      className="py-3 px-8 text-xs font-semibold uppercase tracking-widest rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition-colors border border-white/10"
                    >
                      Submit Another Request
                    </button>
                    <Link
                      href="/"
                      className="py-3 px-8 text-xs font-semibold uppercase tracking-widest rounded-md bg-white text-black hover:bg-gray-200 transition-colors text-center"
                    >
                      Return Home
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full bg-zinc-900/40 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                >
                  {/* Glowing top line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-accent via-amber-400 to-brand-accent animate-pulse" />

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Name & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Dave"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-md py-3 px-4 text-sm text-white placeholder-gray-600 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handleChange}
                          onKeyDown={(e) => {
                            const isDigit = /^[0-9]$/.test(e.key);
                            const isControl = [
                              "Backspace",
                              "Delete",
                              "Tab",
                              "Escape",
                              "Enter",
                              "ArrowLeft",
                              "ArrowRight",
                              "Home",
                              "End",
                            ].includes(e.key);
                            const isCmdCombination =
                              (e.ctrlKey || e.metaKey) &&
                              ["a", "c", "v", "x", "z"].includes(e.key.toLowerCase());

                            if (!isDigit && !isControl && !isCmdCombination) {
                              e.preventDefault();
                            }
                          }}
                          className="w-full bg-black/40 border border-white/10 rounded-md py-3 px-4 text-sm text-white placeholder-gray-600 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-black/40 border border-white/10 rounded-md py-3 px-4 text-sm text-white placeholder-gray-600 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="category" className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Category</label>
                        <div className="relative">
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-md py-3 px-4 text-sm text-white focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="Residential" className="bg-zinc-950 text-white">Residential</option>
                            <option value="Commercial" className="bg-zinc-950 text-white">Commercial</option>
                            <option value="Industrial" className="bg-zinc-950 text-white">Industrial</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* System Type & Timeline Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="requirement" className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">System Type</label>
                        <div className="relative">
                          <select
                            id="requirement"
                            name="requirement"
                            value={formData.requirement}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-md py-3 px-4 text-sm text-white focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="On-Grid System" className="bg-zinc-950 text-white">On-Grid Solar</option>
                            <option value="Off-Grid System" className="bg-zinc-950 text-white">Off-Grid Solar</option>
                            <option value="Hybrid System" className="bg-zinc-950 text-white">Hybrid Solar</option>
                            <option value="Solar Water Pump" className="bg-zinc-950 text-white">Solar Water Pump</option>
                            <option value="Unsure / Consultation" className="bg-zinc-950 text-white">Need Consultation</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="urgency" className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Timeline</label>
                        <div className="relative">
                          <select
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-md py-3 px-4 text-sm text-white focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/50 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="Immediate" className="bg-zinc-950 text-white">Immediate (1-2 weeks)</option>
                            <option value="Within a month" className="bg-zinc-950 text-white">Within a month</option>
                            <option value="Planning phase" className="bg-zinc-950 text-white">Researching (3+ months)</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Error display */}
                    {status === "error" && (
                      <div className="py-3 px-4 rounded-md border border-red-500/20 bg-red-500/5 text-xs text-red-500 text-center font-light">
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 disabled:opacity-50 text-white rounded-md text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 mt-4"
                    >
                      {status === "submitting" ? (
                        <div className="w-5 h-5 border-2 border-white/25 rounded-full border-t-white animate-spin" />
                      ) : (
                        <>
                          <span>Get My Free Quote</span>
                          <Send size={14} className="stroke-[1.5]" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full relative z-10">
        <Footer />
      </div>
    </div>
  );
}
