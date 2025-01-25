import { Sidebar } from "@/app/components/Layouts/Sidebar";

export function LoggedInLayout({ user, children }) {
  return (
    <div className="flex h-screen">
      <Sidebar monthlyDuration={user.monthlyDuration} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
