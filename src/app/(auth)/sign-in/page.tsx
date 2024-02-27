import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <section className="flex h-full flex-col items-center gap-y-[40px]">
      <h1 className="text-[64px] font-semibold leading-[60px]">Sign in</h1>
      <LoginForm />
    </section>
  );
}
