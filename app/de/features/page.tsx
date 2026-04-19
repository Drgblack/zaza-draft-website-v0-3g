import FeaturesClient from "@/app/features/FeaturesClient";
import { SetLanguage } from "@/components/set-language";

export { metadata } from "./metadata";

export default function FeaturesDePage() {
  return (
    <>
      <SetLanguage lang="de" />
      <FeaturesClient />
    </>
  );
}
