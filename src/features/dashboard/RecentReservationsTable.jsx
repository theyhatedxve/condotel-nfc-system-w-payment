import { ArrowRight, CalendarClock } from "lucide-react";
import { formatDate } from "./dashboardData";

const STATUS_CLASSES = {
  Pending: "bg-warning-50 text-warning-600",
  Confirmed: "bg-info-50 text-brand-600",
  "Checked-in": "bg-success-50 text-success-600",
  "Checked-out": "bg-slate-100 text-slate-600",
};

const AVATAR_COLORS = [
  "bg-brand-600",
  "bg-success-600",
  "bg-purple-500",
  "bg-warning-600",
  "bg-navy-700",
];

function initials(name = "") {
  return (
    name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export default function RecentReservationsTable({ reservations, onViewAll }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-info-50 text-brand-600">
            <CalendarClock size={15} strokeWidth={2.25} />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-navy-950">
              Recent Reservations
            </h2>
            <p className="text-[9.5px] text-slate-400">
              Latest booking activity
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-brand-600 transition hover:bg-info-50"
        >
          View all
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/70">
              {["Guest Name", "Room", "Check-in", "Check-out", "Status"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-5 py-2.5 text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400"
                  >
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation, index) => (
              <tr
                key={reservation.referenceNo}
                className="border-t border-slate-100 transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                        AVATAR_COLORS[index % AVATAR_COLORS.length]
                      }`}
                    >
                      {initials(reservation.guestName)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-slate-800">
                        {reservation.guestName}
                      </p>
                      <p className="text-[9px] text-slate-400">
                        {reservation.referenceNo}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-[10px] font-medium text-slate-600">
                  {reservation.room}
                </td>
                <td className="px-5 py-3 text-[10px] text-slate-500">
                  {formatDate(reservation.checkIn)}
                </td>
                <td className="px-5 py-3 text-[10px] text-slate-500">
                  {formatDate(reservation.checkOut)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[8.5px] font-bold ${
                      STATUS_CLASSES[reservation.status] ||
                      STATUS_CLASSES.Pending
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
              </tr>
            ))}

            {reservations.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-xs text-slate-400"
                >
                  No recent reservations.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
