export const metadata = { title: "Zaza Draft", description: "Lehrerfreundliche KI-Schreibassistenz" };
export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="de"><body>{children}</body></html>);
}
