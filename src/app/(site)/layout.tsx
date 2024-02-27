import {Waves} from "@/components/waves";

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <main className="container pb-[120px]">{children}</main>
      <footer className="w-full ">
        <Waves />
      </footer>
    </>
  );
}
