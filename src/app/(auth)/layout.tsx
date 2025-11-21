export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="relative w-full overflow-hidden bg-background">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Primary Accent Circle */}
          <div className="absolute top-16 right-16 h-24 w-24 rounded-full bg-primary/80"></div>

          {/* Blobby Shape */}
          <div
            className="absolute -bottom-32 -left-32 h-96 w-96 bg-primary/50"
            style={{
              borderRadius: "54% 46% 38% 62% / 49% 56% 44% 51%",
              transform: "rotate(-20deg)",
            }}
          ></div>

          {/* Accent Triangles */}
          <div
            className="absolute top-16 left-1/4 h-8 w-8 bg-accent/80"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>

          <div
            className="absolute right-1/3 bottom-32 h-6 w-6 bg-accent/70"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>

          {/* Small Accent Dots */}
          <div className="absolute right-20 bottom-16 h-4 w-4 rounded-full bg-primary"></div>
          <div className="absolute top-1/2 right-8 h-3 w-3 rounded-full bg-accent"></div>
        </div>

        <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-8">
          <div className="flex w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-2xl md:max-w-6xl">
            {/* Left side - Auth Form */}
            <div className="flex flex-1 items-center justify-center p-6 md:p-12">
              <div className="w-full max-w-sm">{children}</div>
            </div>

            {/* Right Side - Branding */}
            <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary md:flex">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-primary blur-xl"></div>
                <div className="absolute right-20 bottom-20 h-48 w-48 rounded-full bg-primary/80 blur-2xl"></div>
                <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-muted blur-lg"></div>
              </div>

              {/* Logo Card */}
              <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-xl bg-card">
                  <span className="text-3xl font-bold text-primary">cp</span>
                  <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
