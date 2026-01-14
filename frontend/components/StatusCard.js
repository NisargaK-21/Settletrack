export default function StatusCard({ status, message, icon, color }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg shadow-sm ${color}`}
    >
      <div className="text-2xl">{icon}</div>

      <div>
        <p className="font-semibold text-gray-800">{status}</p>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}
