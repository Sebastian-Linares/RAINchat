import "./globals.css";
import { ClientLayoutWrapper } from "@/app/components/Layouts/ClientLayoutWrapper";

export const metadata = {
  title: "Rain Chat",
  description: "RainGroup Chat Training",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
