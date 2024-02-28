import {Waves} from "@/components/waves";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="h-full">
      <main className="container grid h-full place-content-center">{children}</main>
      <footer className="absolute bottom-0 w-full">
        <Waves />
      </footer>
    </div>
  );
}
