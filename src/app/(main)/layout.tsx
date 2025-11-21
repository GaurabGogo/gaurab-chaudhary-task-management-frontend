import AuthUserWrapper from "@/context/AuthUserWrapper";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserWrapper>
      <div className="relative min-h-[60dvh] w-full">{children}</div>
    </AuthUserWrapper>
  );
}
