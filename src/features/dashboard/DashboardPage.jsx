import { useMemo, useState } from "react";
import {
  BedDouble,
  CalendarCheck,
  ChevronRight,
  CreditCard,
  RefreshCw,
  SunMedium,
  UsersRound,
} from "lucide-react";
import OccupancyChart from "./OccupancyChart";
import RecentReservationsTable from "./RecentReservationsTable";
import StatCard from "./StatCard";
import { DEMO_DASHBOARD, formatCurrency } from "./dashboardData";
import { loadDashboard } from "./dashboardStorage";

export default function DashboardPage({
  dashboardData,
  userName = "Admin",
  onNavigate,
}) {
  const [lastUpdated, setLastUpdated] = useState(() => new Date());
  const [showPayments, setShowPayments] = useState(false);

  const data = useMemo(
    () => dashboardData || loadDashboard(DEMO_DASHBOARD),
    [dashboardData],
  );
  const stats = data.stats || DEMO_DASHBOARD.stats;

  const navigate = (target) => {
    if (typeof onNavigate === "function") onNavigate(target);
  };

  return (
    <div className="min-h-full bg-[#f3f6f5]">
      <div className="mx-auto max-w-[1480px]">
        {/* Dashboard toolbar: the global search is already provided by Topbar. */}
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setLastUpdated(new Date())}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>

        {/* Hero banner */}
        <section className="relative mb-4 min-h-[172px] overflow-hidden rounded-xl border border-white/80 shadow-sm">
          <img
            src="/dashboard/condotel-hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/72 to-transparent" />

          <div className="relative flex min-h-[172px] items-center justify-between gap-4 px-5 py-5 sm:px-7">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#157565]">
                Admin Dashboard
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-[#102f3a] sm:text-[28px]">
                Good Morning, {userName}!
              </h1>
              <p className="mt-1 max-w-[430px] text-xs text-slate-600">
                Here&apos;s what&apos;s happening with your condotel today.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:block">
              <p className="text-right text-[10px] font-semibold text-slate-400">
                {new Date().toLocaleDateString("en-PH", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <SunMedium size={25} className="text-amber-400" />
                <div>
                  <p className="text-xl font-bold leading-none text-slate-800">
                    28°C
                  </p>
                  <p className="mt-1 text-[9px] font-medium text-slate-500">
                    Partly Cloudy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI cards */}
        <section className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Rooms"
            value={stats.totalRooms}
            helper={`+${stats.availableRooms} available`}
            icon={BedDouble}
            accent="blue"
            onClick={() => navigate("rooms")}
          />
          <StatCard
            label="Current Guests"
            value={stats.currentGuests}
            helper={`${stats.occupancyRate}% occupancy`}
            icon={UsersRound}
            accent="green"
            onClick={() => navigate("guests")}
          />
          <StatCard
            label="Today's Check-ins"
            value={stats.todaysCheckIns}
            helper="View details"
            icon={CalendarCheck}
            accent="slate"
            onClick={() => navigate("reservations")}
          />
          <StatCard
            label="Today's Payments"
            value={formatCurrency(stats.todaysPayments)}
            helper="View payment activity"
            icon={CreditCard}
            accent="orange"
            onClick={() => setShowPayments((value) => !value)}
          />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.68fr)_minmax(300px,0.72fr)]">
          <RecentReservationsTable
            reservations={data.recentReservations || []}
            onViewAll={() => navigate("reservations")}
          />

          <OccupancyChart
            data={data.occupancy || []}
            occupancyRate={stats.occupancyRate}
          />
        </section>

        {showPayments && (
          <section className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Today&apos;s Payments
                </h2>
                <p className="mt-1 text-[10px] text-slate-400">
                  Payment activity from the existing dashboard data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPayments(false)}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-700"
              >
                Hide
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    {["Guest", "Reference", "Method", "Amount", "Status"].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(data.todaysPayments || []).map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-5 py-3 text-xs font-semibold text-slate-800">
                        {payment.guestName}
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-500">
                        {payment.referenceNo}
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-500">
                        {payment.method}
                      </td>
                      <td className="px-5 py-3 text-xs font-bold text-slate-800">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="mt-3 flex justify-end">
          <span className="text-[9px] text-slate-400">
            Updated{" "}
            {lastUpdated.toLocaleTimeString("en-PH", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>

        <section className="mt-4 grid gap-3 pb-4 md:grid-cols-3">
          <QuickLink
            title="Manage Rooms"
            description="Review room availability and status."
            onClick={() => navigate("rooms")}
          />
          <QuickLink
            title="Manage Guests"
            description="Open guest profiles and records."
            onClick={() => navigate("guests")}
          />
          <QuickLink
            title="Manage Reservations"
            description="Review upcoming and active bookings."
            onClick={() => navigate("reservations")}
          />
        </section>
      </div>
    </div>
  );
}

function QuickLink({ title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#157f70]/30 hover:shadow-md"
    >
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="mt-1 text-[11px] text-slate-400">{description}</p>
      </div>
      <ChevronRight
        size={16}
        className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#157f70]"
      />
    </button>
  );
}
