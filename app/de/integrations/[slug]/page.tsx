import type { Metadata } from "next"
import IntegrationClient from "./integration-client"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const integrationName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${integrationName} Integration - Zaza Draft`,
    description: `Connect Zaza Draft with ${integrationName}. Step-by-step setup guide, use cases, and best practices for teachers.`,
  }
}

export default function IntegrationPage({ params }: { params: { slug: string } }) {
  return <IntegrationClient slug={params.slug} />
}
