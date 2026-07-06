import { SiteHeader } from "@/components/site-header"
import { VerticalGallery } from "@/components/horizontal-gallery"
import { EditorialGrid } from "@/components/editorial-grid"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { getGallery, getGrid, getAbout } from "@/lib/notion"

// Forza il rendering dinamico per recuperare i dati in tempo reale ed evitare la scadenza degli URL delle immagini di Notion
export const dynamic = "force-dynamic"

export default async function Page() {
  // Eseguiamo il fetch in parallelo da Notion. Se un database o un blocco fallisce,
  // intercettiamo l'errore in modo da non rompere la pagina intera, lasciando agire i fallback.
  const [galleryData, gridData, aboutData] = await Promise.all([
    getGallery().catch((err) => {
      console.error("Errore nel recupero della galleria Notion:", err)
      return []
    }),
    getGrid().catch((err) => {
      console.error("Errore nel recupero della griglia Notion:", err)
      return []
    }),
    getAbout().catch((err) => {
      console.error("Errore nel recupero di about me Notion:", err)
      return null
    }),
  ])

  return (
    <main id="top" className="relative">
      <SiteHeader />
      <VerticalGallery slides={galleryData} />
      <EditorialGrid images={gridData} />
      <AboutSection data={aboutData} />
      <ContactSection />
    </main>
  )
}
