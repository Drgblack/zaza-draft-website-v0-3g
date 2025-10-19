import type { Metadata } from "next"
import { notFound } from "next/navigation"
import YearReportClient from "./year-report-client"

const validYears = ["2022", "2023", "2024"]

export async function generateStaticParams() {
  return validYears.map((year) => ({
    year,
  }))
}

export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const { year } = params

  if (!validYears.includes(year)) {
    return {}
  }

  return {
    title: `State of AI in Education ${year} Report | Zaza Draft`,
    description: `Comprehensive analysis of AI adoption in K-12 education from ${year}. Download the full report with insights from thousands of teachers.`,
    openGraph: {
      title: `State of AI in Education ${year} Report`,
      description: `Comprehensive analysis of AI adoption in K-12 education from ${year}`,
      type: "article",
    },
  }
}

export default function YearReportPage({ params }: { params: { year: string } }) {
  const { year } = params

  if (!validYears.includes(year)) {
    notFound()
  }

  return <YearReportClient year={year} />
}
