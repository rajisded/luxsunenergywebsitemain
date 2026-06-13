"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "What types of solar energy systems do you offer?",
    answer:
      "We offer On-Grid (utility-interactive), Off-Grid (independent battery backup), and Hybrid solar systems. Each configuration is tailored to match residential, commercial, or agricultural needs, maximizing cost benefits and efficiency.",
  },
  {
    question: "How can I determine which solar system is right for me?",
    answer:
      "Our engineering team performs a structural assessment and energy load audit. Depending on whether you have a stable power grid or regular blackouts, we customize the panels and inverters accordingly.",
  },
  {
    question: "What is the typical break-even period for a solar investment?",
    answer:
      "For most residential and commercial installations, the break-even period ranges between 3 to 5 years. Given that panels have a lifetime of 25+ years, you will enjoy free electricity for the remaining 20+ years.",
  },
  {
    question: "Are there any government subsidies available?",
    answer:
      "Yes, the Government of India provides attractive subsidies for residential rooftop solar systems under PM Surya Ghar Yojana. We assist customers in securing low-cost financing options and bank loans for hassle-free solar investments.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <div className={`container ${styles.layout}`}>
        <div className={styles.leftCol}>
          <span className="badge">FAQ</span>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-desc" style={{ margin: 0, textAlign: "left" }}>
            Everything you need to know about going solar with Luxsun Energy.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ""}`}
            >
              <button
                className={styles.faqTrigger}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.faqNumber}>0{index + 1}</span>
                <span className={styles.faqQuestion}>{faq.question}</span>
                <ChevronDown
                  className={styles.faqIcon}
                  size={18}
                  style={{ transform: openIndex === index ? "rotate(180deg)" : "rotate(0)" }}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.faqContent}
                  >
                    <div className={styles.faqAnswer}>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
