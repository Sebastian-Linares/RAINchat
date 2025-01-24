import { Sidebar } from "@/app/components/Layouts/Sidebar";

export function LoggedInLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
