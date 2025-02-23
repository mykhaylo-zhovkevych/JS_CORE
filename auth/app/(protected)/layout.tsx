import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <div className="h-full w-full flex flex-col gap-y10 
                      items-center justify-center 
                      bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
