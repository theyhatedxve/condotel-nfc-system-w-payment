import { useMemo, useState } from "react";
import {
  BedDouble,
  CalendarCheck,
  ChevronRight,
  CreditCard,
  RefreshCw,
  SunMedium,
  UsersRound,
  Wifi,
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
    <div className="min-h-full bg-[#f4f6fb]">
      <div className="mx-auto max-w-[1480px]">
        {/* Dashboard toolbar: the global search is already provided by Topbar. */}
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setLastUpdated(new Date())}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-[11px] font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>

        {/* Hero banner */}
        <section className="relative mb-5 min-h-[176px] overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-navy-800 to-brand-600 shadow-lg shadow-navy-900/20">
          <img
            src="/dashboard/condotel-hero.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent" />

          {/* decorative NFC signal rings */}
          <div className="pointer-events-none absolute -right-10 -top-14 hidden sm:block">
            <Wifi
              size={220}
              strokeWidth={0.6}
              className="rotate-45 text-white/10"
            />
          </div>

          <div className="relative flex min-h-[176px] items-center justify-between gap-4 px-5 py-5 sm:px-7">
            <div>
              <p className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-sky-200 backdrop-blur-sm">
                <Wifi size={11} />
                Admin Dashboard
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[28px]">
                Good Morning, {userName}!
              </h1>
              <p className="mt-1.5 max-w-[430px] text-xs text-slate-300">
                Here&apos;s what&apos;s happening with your condotel today.
              </p>
            </div>

            <div className="hidden shrink-0 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
              <p className="text-right text-[10px] font-semibold text-slate-300">
                {new Date().toLocaleDateString("en-PH", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <SunMedium size={25} className="text-amber-300" />
                <div>
                  <p className="text-xl font-bold leading-none text-white">
                    28°C
                  </p>
                  <p className="mt-1 text-[9px] font-medium text-slate-300">
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
            accent="brand"
            onClick={() => navigate("rooms")}
          />
          <StatCard
            label="Current Guests"
            value={stats.currentGuests}
            helper={`${stats.occupancyRate}% occupancy`}
            icon={UsersRound}
            accent="success"
            onClick={() => navigate("guests")}
          />
          <StatCard
            label="Today's Check-ins"
            value={stats.todaysCheckIns}
            helper="View details"
            icon={CalendarCheck}
            accent="purple"
            onClick={() => navigate("reservations")}
          />
          <StatCard
            label="Today's Payments"
            value={formatCurrency(stats.todaysPayments)}
            helper="View payment activity"
            icon={CreditCard}
            accent="warning"
            onClick={() => setShowPayments((value) => !value)}
          />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.68fr)_minmax(300px,0.72fr)]">
          <RecentReservationsTable
            reservations={data.recentReservations || []}
            onViewAll={() => navigate("reservations")}
          />

          <div className="flex flex-col gap-4">
            <OccupancyChart
              data={data.occupancy || []}
              occupancyRate={stats.occupancyRate}
            />

            <section className="grid gap-2.5 rounded-2xl border border-slate-200/70 bg-white p-4.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <p className="px-0.5 text-[11px] font-bold text-navy-950">
                Quick Actions
              </p>
              <QuickLink
                title="Manage Rooms"
                description="Availability & status"
                icon={BedDouble}
                onClick={() => navigate("rooms")}
              />
              <QuickLink
                title="Manage Guests"
                description="Profiles & records"
                icon={UsersRound}
                onClick={() => navigate("guests")}
              />
              <QuickLink
                title="Manage Reservations"
                description="Upcoming & active"
                icon={CalendarCheck}
                onClick={() => navigate("reservations")}
              />
            </section>
          </div>
        </section>

        {showPayments && (
          <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-[13px] font-bold text-navy-950">
                  Today&apos;s Payments
                </h2>
                <p className="mt-1 text-[9.5px] text-slate-400">
                  Payment activity from the existing dashboard data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPayments(false)}
                className="rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                Hide
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="bg-slate-50/70">
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
                      className="border-t border-slate-100 hover:bg-slate-50/70"
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
                        <span className="rounded-full bg-success-50 px-2.5 py-1 text-[9px] font-bold text-success-600">
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

        <div className="mt-3 flex justify-end pb-4">
          <span className="text-[9px] text-slate-400">
            Updated{" "}
            {lastUpdated.toLocaleTimeString("en-PH", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuickLink({ title, description, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-left transition hover:border-brand-500/20 hover:bg-info-50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
        {Icon && <Icon size={16} strokeWidth={2.25} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11.5px] font-bold text-slate-800">
          {title}
        </p>
        <p className="truncate text-[9.5px] text-slate-400">{description}</p>
      </div>
      <ChevronRight
        size={15}
        className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
      />
    </button>
  );
}
