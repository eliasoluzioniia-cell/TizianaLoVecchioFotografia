import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export interface GalleryItem {
  src: string
  title: string
}

export interface GridItem {
  src: string
  title: string
  category: string
}

export interface AboutData {
  portrait: string
  name: string
  headline: string
  biography: string[]
  location: string
  activeSince: string
  specialization: string
  awards: string
}

// Funzione helper per interrogare un database Notion tramite le nuove API Data Sources (Notion Version 2025-09-03)
async function queryDatabase(databaseId: string, options: Omit<any, "data_source_id"> = {}): Promise<any> {
  const db = await notion.databases.retrieve({ database_id: databaseId })
  const dataSourceId = db.data_sources?.[0]?.id
  if (!dataSourceId) {
    throw new Error(`Nessuna data source trovata per il database: ${databaseId}`)
  }
  return await notion.dataSources.query({
    data_source_id: dataSourceId,
    ...options,
  })
}

// Funzione helper ricorsiva per recuperare tutti i blocchi figli di una pagina o blocco Notion
async function getAllBlocks(blockId: string): Promise<any[]> {
  const blocks: any[] = []
  let cursor: string | undefined = undefined
  
  do {
    const response: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })
    blocks.push(...response.results)
    cursor = response.next_cursor || undefined
  } while (cursor)

  for (const block of blocks) {
    if (block.has_children) {
      block.children = await getAllBlocks(block.id)
    }
  }

  return blocks
}

// Funzione helper per appiattire l'albero dei blocchi in una lista lineare
function flattenBlocks(blocks: any[]): any[] {
  const flat: any[] = []
  for (const block of blocks) {
    flat.push(block)
    if (block.children) {
      flat.push(...flattenBlocks(block.children))
    }
  }
  return flat
}

// Funzione helper per estrarre il testo da un blocco Notion
function getBlockText(block: any): string {
  const type = block.type
  const richText = block[type]?.rich_text
  if (richText && Array.isArray(richText)) {
    return richText.map((t: any) => t.plain_text).join("")
  }
  return ""
}

// Funzione helper per estrarre l'URL dell'immagine da un blocco Notion
function getBlockImageUrl(block: any): string {
  if (block.type !== "image") return ""
  const image = block.image
  if (!image) return ""
  if (image.type === "file") {
    return image.file.url
  } else if (image.type === "external") {
    return image.external.url
  }
  return ""
}

export async function getGallery(): Promise<GalleryItem[]> {
  const databaseId = process.env.NOTION_GALLERY_DATABASE_ID
  if (!databaseId) {
    console.warn("NOTION_GALLERY_DATABASE_ID non definito in .env.local")
    return []
  }

  try {
    const response = await queryDatabase(databaseId, {
      filter: {
        property: "Visibile",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Ordine",
          direction: "ascending",
        },
      ],
    })

    return response.results.map((page: any) => {
      const title = page.properties.Titolo?.title?.map((t: any) => t.plain_text).join("") || ""
      const fileProp = page.properties.Foto?.files?.[0]
      const src = fileProp ? (fileProp.type === "file" ? fileProp.file.url : fileProp.external.url) : ""
      return { title, src }
    }).filter(item => item.src !== "")
  } catch (error) {
    console.error("Errore getGallery da Notion, provo fallback query semplice:", error)
    try {
      const response = await queryDatabase(databaseId)
      return response.results.map((page: any) => {
        const title = page.properties.Titolo?.title?.map((t: any) => t.plain_text).join("") || 
                      page.properties.Name?.title?.map((t: any) => t.plain_text).join("") || ""
        const fileProp = page.properties.Foto?.files?.[0] || page.properties.Image?.files?.[0]
        const src = fileProp ? (fileProp.type === "file" ? fileProp.file.url : fileProp.external.url) : ""
        return { title, src }
      }).filter(item => item.src !== "")
    } catch (fallbackError) {
      console.error("Errore query fallback getGallery:", fallbackError)
      return []
    }
  }
}

export async function getGrid(): Promise<GridItem[]> {
  const databaseId = process.env.NOTION_GRID_DATABASE_ID
  if (!databaseId) {
    console.warn("NOTION_GRID_DATABASE_ID non definito in .env.local")
    return []
  }

  try {
    const response = await queryDatabase(databaseId, {
      sorts: [
        {
          property: "Data Pubblicazione",
          direction: "descending",
        },
      ],
    })

    return response.results.map((page: any) => {
      const title = page.properties["Nome Progetto"]?.title?.map((t: any) => t.plain_text).join("") || ""
      
      let category = page.properties.Categoria?.select?.name || 
                     page.properties.Categoria?.rich_text?.map((t: any) => t.plain_text).join("") || 
                     ""
      
      if (!category) {
        const intro = page.properties["Testo Introspettivo"]?.rich_text?.map((t: any) => t.plain_text).join("") || ""
        category = intro.split(" ")[0] || "Progetto"
      }

      const fileProp = page.properties["Copertina Progetto"]?.files?.[0]
      const src = fileProp ? (fileProp.type === "file" ? fileProp.file.url : fileProp.external.url) : ""
      return { title, category, src }
    }).filter(item => item.src !== "")
  } catch (error) {
    console.error("Errore getGrid da Notion, provo fallback query semplice:", error)
    try {
      const response = await queryDatabase(databaseId)
      return response.results.map((page: any) => {
        const title = page.properties["Nome Progetto"]?.title?.map((t: any) => t.plain_text).join("") || 
                      page.properties.Name?.title?.map((t: any) => t.plain_text).join("") || ""
        
        let category = page.properties.Categoria?.select?.name || 
                       page.properties.Categoria?.rich_text?.map((t: any) => t.plain_text).join("") || 
                       ""
        
        if (!category) {
          const intro = (page.properties["Testo Introspettivo"] || page.properties.Biography)?.rich_text?.map((t: any) => t.plain_text).join("") || ""
          category = intro.split(" ")[0] || "Progetto"
        }

        const fileProp = page.properties["Copertina Progetto"]?.files?.[0] || page.properties.Image?.files?.[0]
        const src = fileProp ? (fileProp.type === "file" ? fileProp.file.url : fileProp.external.url) : ""
        return { title, category, src }
      }).filter(item => item.src !== "")
    } catch (fallbackError) {
      console.error("Errore query fallback getGrid:", fallbackError)
      return []
    }
  }
}

export async function getAbout(): Promise<AboutData | null> {
  const pageId = process.env.NOTION_ABOUT_PAGE_ID
  if (!pageId) {
    console.warn("NOTION_ABOUT_PAGE_ID non definito in .env.local")
    return null
  }

  try {
    const rawBlocks = await getAllBlocks(pageId)
    const blocks = flattenBlocks(rawBlocks)

    const portraitBlock = blocks.find(b => b.type === "image")
    const portrait = portraitBlock ? getBlockImageUrl(portraitBlock) : ""

    let startIndex = blocks.findIndex(b => {
      const text = getBlockText(b).toLowerCase()
      return text.includes("about me") || text.includes("su di me") || text.includes("dietro l'obiettivo")
    })

    if (startIndex === -1) {
      startIndex = 0
    }

    const aboutBlocks = blocks.slice(startIndex + 1)
    
    let headline = ""
    const biography: string[] = []
    
    for (const block of aboutBlocks) {
      const text = getBlockText(block).trim()
      if (!text) continue

      if (text.toLowerCase().includes("link social") || text.toLowerCase().includes("instagram |")) {
        break
      }

      if (text.toLowerCase() === "dietro l'obiettivo") {
        continue
      }

      if (!headline) {
        headline = text
      } else {
        biography.push(text)
      }
    }

    if (!portrait && !headline && biography.length === 0) {
      return null
    }

    return {
      portrait,
      name: "Tiziana Lo Vecchio",
      headline,
      biography,
      location: "Italia",
      activeSince: "2012",
      specialization: "Paesaggi · Ritratti · Editoriale",
      awards: "—",
    }
  } catch (error) {
    console.error("Errore getAbout da Notion:", error)
    return null
  }
}
