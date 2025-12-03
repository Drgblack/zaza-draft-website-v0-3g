import SuiteClient from "@/app/suite/SuiteClient"
import { SetLanguage } from "@/components/set-language"

export default function SuiteDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <SuiteClient />
    </>
  )
}
