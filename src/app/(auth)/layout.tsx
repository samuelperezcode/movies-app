import {Waves} from "@/components/waves";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="h-full">
      <main className="container grid place-content-center">{children}</main>
      <footer className="w-full ">
        <Waves />
      </footer>
    </div>
  );
}
