"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import styles from "./QuoteForm.module.css";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Residential",
    requirement: "On-Grid System",
    urgency: "Immediate",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate an API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.successMessage}
      >
        <CheckCircle size={64} className={styles.successIcon} />
        <h3>Quote Request Received!</h3>
        <p>Thank you, {formData.name}. Our solar experts will reach out to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="btn btn-outline" style={{ marginTop: "1.5rem" }}>
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className={styles.formWrapper} id="quote">
      <div className={styles.formHeader}>
        <span className="badge">Get Started</span>
        <h2 className="section-title">Request a Free Quote</h2>
        <p>Take the first step towards clean, sustainable energy. Tell us about your needs.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="John Doe"
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
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="category">Category</label>
            <div className={styles.selectWrapper}>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label htmlFor="requirement">System Requirement</label>
            <div className={styles.selectWrapper}>
              <select
                id="requirement"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
              >
                <option value="On-Grid System">On-Grid Solar System</option>
                <option value="Off-Grid System">Off-Grid Solar System</option>
                <option value="Hybrid System">Hybrid Solar System</option>
                <option value="Solar Water Pump">Solar Water Pump</option>
                <option value="Unsure / Consultation">Not Sure - Need Consultation</option>
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="urgency">Urgency</label>
            <div className={styles.selectWrapper}>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="Immediate">Immediate (1-2 weeks)</option>
                <option value="Within a month">Within a month</option>
                <option value="Planning phase">Just researching (3+ months)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${styles.submitBtn}`}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <span className={styles.spinner}></span>
          ) : (
            <>
              Get My Free Quote <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
