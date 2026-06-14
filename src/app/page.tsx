import ProductSection from "@/components/sections/ProductSection";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Slide 1: Solar Panels */}
      <ProductSection
        id="solar-panels"
        title="Solar Panels"
        subtitle="Guaranteed Highest Yield Installations"
        bgImage="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
        specs={[
          { label: "22.8%", value: "Efficiency" },
          { label: "25-Year", value: "Warranty" },
          { label: "Guaranteed", value: "Best Price" },
        ]}
        ctas={[
          { text: "Get a Quote", href: "/quote", primary: true },
          { text: "Why Solar", href: "/#why-luxsun" },
        ]}
        showArrow={true}
      />

      {/* Slide 2: Solar Roof */}
      <ProductSection
        id="solar-roof"
        title="Solar Roof"
        subtitle="Beautiful Integrated Solar Tiles"
        bgImage="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2070&auto=format&fit=crop"
        specs={[
          { label: "Tile", value: "Warranty" },
          { label: "24/7", value: "Clean Power" },
          { label: "Wind & Fire", value: "Resistant" },
        ]}
        ctas={[
          { text: "Get a Quote", href: "/quote", primary: true },
          { text: "Learn More", href: "/#why-luxsun" },
        ]}
      />

      {/* Slide 4: Commercial Energy */}
      <ProductSection
        id="commercial"
        title="Commercial Energy"
        subtitle="Utility Scale Solar Infrastructures"
        bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        specs={[
          { label: "Max ROI", value: "Financials" },
          { label: "Scale-ready", value: "Architecture" },
          { label: "Subsidy", value: "Assistance" },
        ]}
        ctas={[
          { text: "Get a Quote", href: "/quote", primary: true },
          { text: "Learn More", href: "/#why-luxsun" },
        ]}
      />

      {/* Slide 5: About, Case Studies & Footer */}
      <About />
    </main>
  );
}
