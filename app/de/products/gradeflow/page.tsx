"use client"

import GradeflowClient from "@/app/products/gradeflow/gradeflow-client"
import { SetLanguage } from "@/components/set-language"

export default function GradeflowDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <GradeflowClient />
    </>
  )
}
