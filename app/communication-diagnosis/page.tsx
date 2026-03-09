import { permanentRedirect } from "next/navigation";

type CommunicationDiagnosisRedirectPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CommunicationDiagnosisRedirectPage({
  searchParams,
}: CommunicationDiagnosisRedirectPageProps) {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
      return;
    }

    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  permanentRedirect(query ? `/diagnosis?${query}` : "/diagnosis");
}
