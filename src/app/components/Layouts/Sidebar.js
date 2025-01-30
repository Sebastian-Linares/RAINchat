import { timeHelpers } from "@/app/lib/helpers/timeHelpers";
import { useCurrentUser } from "@/app/lib/hooks/useCurrentUser";

export function Sidebar({ monthlyDuration }) {
  const { logout } = useCurrentUser();

  return (
    <aside className="w-64 bg-gray-900 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Rain Chat</h2>
      <div className="flex-1 space-y-2 overflow-y-auto">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Monthly Duration</span>
          <span className="text-gray-200">
            {timeHelpers.secondsToMinutes(monthlyDuration)} m
          </span>
        </div>
      </div>
      <button
        onClick={logout}
        className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 transition rounded text-white text-sm"
      >
        Log Out
      </button>
    </aside>
  );
}
