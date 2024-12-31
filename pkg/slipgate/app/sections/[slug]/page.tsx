import { getSectionBySlug } from '@/lib/sections'
import { notFound } from 'next/navigation'

interface SectionPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SectionPage(props: SectionPageProps) {
  const params = await props.params;
  const section = getSectionBySlug(params.slug)
  
  if (!section) {
    notFound()
  }

  const hasScheme = section.appUrl.match(/^[a-zA-Z][a-zA-Z0-9+.-]*:/)
  const url = hasScheme ? section.appUrl : new URL(section.appUrl, process.env.APP_URL).toString()

  return (
    <div className="w-full h-screen">
      <iframe
        src={url}
        className="w-full h-full border-0"
        allow="accelerometer; camera; encrypted-media; geolocation; microphone"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  )
} 
