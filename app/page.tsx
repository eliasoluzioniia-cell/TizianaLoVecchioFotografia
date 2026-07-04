import { SiteHeader } from "@/components/site-header"
import { VerticalGallery } from "@/components/horizontal-gallery"
import { EditorialGrid } from "@/components/editorial-grid"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main id="top" className="relative">
      <SiteHeader />
      <VerticalGallery />
      <EditorialGrid />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
