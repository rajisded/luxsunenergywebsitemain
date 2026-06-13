"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Send, CheckCircle, ArrowLeft, Sparkles } from "lucide-react";
import styles from "./QuotePage.module.css";

export default function QuotePageContent() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: "On-Grid System",
    urgency: "Immediate",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setErrorMsg("Please enter a valid 10-digit Indian phone number (e.g., +91 98765 43210).");
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
    <main className={styles.page}>
      {/* Ambient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      {/* Stars */}
      <div className={styles.stars}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.successCard}
          >
            <CheckCircle size={64} className={styles.successIcon} />
            <h2>Quote Request Received!</h2>
            <p>
              Thank you, {formData.name}. Our solar experts will reach out to
              you within 24 hours.
            </p>
            <div className={styles.successActions}>
              <button
                onClick={() => setStatus("idle")}
                className="btn btn-outline"
              >
                Submit Another Request
              </button>
              <Link href="/" className="btn btn-primary">
                Return Home
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className={styles.layout}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.leftCol}
            >
              <div className={styles.tagline}>
                <Sparkles size={14} />
                <span>Free Consultation</span>
              </div>
              <h1 className={styles.heading}>
                Get Your <span className={styles.accent}>Solar</span> Quote
              </h1>
              <p className={styles.subtitle}>
                Take the first step towards clean, sustainable energy. Tell us
                about your needs and our engineers will design a custom solution
                for you.
              </p>

              <div className={styles.guarantees}>
                {[
                  "Response within 24 hours",
                  "Custom system design",
                  "No obligations — 100% free",
                  "Government subsidy assistance",
                ].map((item, idx) => (
                  <div key={idx} className={styles.guaranteeItem}>
                    <CheckCircle size={16} className={styles.guaranteeIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={styles.formCard}
            >
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <div className={styles.field}>
                    <label htmlFor="requirement">System Type</label>
                    <select
                      id="requirement"
                      name="requirement"
                      value={formData.requirement}
                      onChange={handleChange}
                    >
                      <option value="On-Grid System">On-Grid Solar</option>
                      <option value="Off-Grid System">Off-Grid Solar</option>
                      <option value="Hybrid System">Hybrid Solar</option>
                      <option value="Solar Water Pump">Solar Water Pump</option>
                      <option value="Unsure / Consultation">
                        Need Consultation
                      </option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="urgency">Timeline</label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                    >
                      <option value="Immediate">Immediate (1-2 weeks)</option>
                      <option value="Within a month">Within a month</option>
                      <option value="Planning phase">
                        Researching (3+ months)
                      </option>
                    </select>
                  </div>
                </div>

                {status === "error" && (
                  <div className={styles.errorMsg}>{errorMsg}</div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      Get My Free Quote <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
