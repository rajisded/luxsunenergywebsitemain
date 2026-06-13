import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/ui/QuoteForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Products />
      
      {/* Quote Section Overlay */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-tertiary)" }}>
        <div className="container">
          <QuoteForm />
        </div>
      </section>

      <FAQ />
    </main>
  );
}
