import {Waves} from "@/components/waves";

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <main className="pb-[120px] lg:container">{children}</main>
      <footer className="w-full">
        <Waves />
      </footer>
    </>
  );
}
