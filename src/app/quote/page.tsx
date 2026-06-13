import type { Metadata } from "next";
import QuotePageContent from "./QuotePageContent";

export const metadata: Metadata = {
  title: "Get a Quote | Luxsun Energy India",
  description: "Request a free solar energy quote from Luxsun Energy. Tell us about your requirements and our experts will get back to you within 24 hours.",
};

export default function QuotePage() {
  return <QuotePageContent />;
}
