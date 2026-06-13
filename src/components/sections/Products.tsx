"use client";

import { motion } from "framer-motion";
import { Sun, Battery, Zap } from "lucide-react";
import styles from "./Products.module.css";

const products = [
  {
    id: "on-grid",
    title: "On-Grid Solar",
    desc: "Connects directly to the public utility grid. Ideal for residential households looking to reduce monthly electricity costs using net metering benefits.",
    icon: <Sun size={32} />,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "off-grid",
    title: "Off-Grid Solar",
    desc: "Runs independently with a dedicated battery storage bank. Perfect for remote structures, farmhouses, and areas with frequent grid blackouts.",
    icon: <Battery size={32} />,
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hybrid",
    title: "Hybrid Solar",
    desc: "Combines grid connection with smart battery storage backup. Ensures seamless electrical power during blackouts while offering net metering savings.",
    icon: <Zap size={32} />,
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Products() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section-padding" id="products">
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className="badge">Our Solutions</span>
          <h2 className="section-title">Comprehensive Energy Solutions</h2>
          <p className="section-desc">We offer customized solar systems designed to meet your specific energy needs, providing maximum efficiency and long-term savings.</p>
        </div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.grid}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVars} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.title} />
                <div className={styles.iconWrapper}>
                  {product.icon}
                </div>
              </div>
              <div className={styles.content}>
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
                <button className={styles.learnMore}>Learn More →</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
