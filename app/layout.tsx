import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./lib/providers/AuthProvider";
import { ErrorProvider } from "./lib/providers/ErrorProvider";
import { ErrorAlert } from "./lib/components/error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nullFIT",
  description: "Don't be null, get FIT!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <ErrorProvider>
            <ErrorAlert />
            {children}
          </ErrorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
