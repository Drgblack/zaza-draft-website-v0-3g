export const metadata = { title: "Zaza Draft", description: "Teacher-first AI writing assistance" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
